-- Biblioteca TC — Feature-complete migration
-- Run in Supabase SQL Editor or via: supabase db push

-- ─── Wishlist ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  book_id BIGINT NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()) NOT NULL,
  UNIQUE(user_id, book_id)
);

ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own wishlist" ON public.wishlist;
CREATE POLICY "Users manage own wishlist"
ON public.wishlist FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins read all wishlists" ON public.wishlist;
CREATE POLICY "Admins read all wishlists"
ON public.wishlist FOR SELECT
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ─── Activity logs ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON public.activity_logs(created_at DESC);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins read activity logs" ON public.activity_logs;
CREATE POLICY "Admins read activity logs"
ON public.activity_logs FOR SELECT
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

DROP POLICY IF EXISTS "Authenticated insert activity logs" ON public.activity_logs;
CREATE POLICY "Authenticated insert activity logs"
ON public.activity_logs FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- ─── Newsletter preferences ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.newsletter_preferences (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT true NOT NULL,
  categories TEXT[] DEFAULT ARRAY['books', 'history', 'philosophy', 'world']::TEXT[],
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now()) NOT NULL
);

ALTER TABLE public.newsletter_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own newsletter prefs" ON public.newsletter_preferences;
CREATE POLICY "Users manage own newsletter prefs"
ON public.newsletter_preferences FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- ─── Notifications RLS ──────────────────────────────────────
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own notifications" ON public.notifications;
CREATE POLICY "Users read own notifications"
ON public.notifications FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own notifications" ON public.notifications;
CREATE POLICY "Users update own notifications"
ON public.notifications FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "System insert notifications" ON public.notifications;
CREATE POLICY "System insert notifications"
ON public.notifications FOR INSERT
TO authenticated
WITH CHECK (true);

-- ─── Feedback RLS ─────────────────────────────────────────────
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users insert own feedback" ON public.feedback;
CREATE POLICY "Users insert own feedback"
ON public.feedback FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users read own feedback" ON public.feedback;
CREATE POLICY "Users read own feedback"
ON public.feedback FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ─── request_book RPC (atomic reservation + business rules) ───
DROP FUNCTION IF EXISTS public.request_book(BIGINT, UUID);

CREATE FUNCTION public.request_book(p_book_id BIGINT, p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_available INT;
  v_pending_count INT;
  v_active_count INT;
  v_same_book INT;
  v_loan_id BIGINT;
BEGIN
  IF auth.uid() IS NULL OR auth.uid() <> p_user_id THEN
    RETURN jsonb_build_object('success', false, 'message', 'Não autorizado.');
  END IF;

  -- Only one pending request at a time (any book)
  SELECT COUNT(*) INTO v_pending_count
  FROM loans WHERE user_id = p_user_id AND status = 'pending';

  IF v_pending_count > 0 THEN
    RETURN jsonb_build_object('success', false, 'message', 'Já tem um pedido pendente. Aguarde aprovação ou rejeição antes de requisitar outro livro.');
  END IF;

  -- Only one active loan until it ends
  SELECT COUNT(*) INTO v_active_count
  FROM loans WHERE user_id = p_user_id AND status = 'active';

  IF v_active_count > 0 THEN
    RETURN jsonb_build_object('success', false, 'message', 'Já tem um empréstimo ativo. Devolva o livro antes de requisitar outro.');
  END IF;

  -- No duplicate pending/active for same book
  SELECT COUNT(*) INTO v_same_book
  FROM loans
  WHERE user_id = p_user_id AND book_id = p_book_id AND status IN ('pending', 'active');

  IF v_same_book > 0 THEN
    RETURN jsonb_build_object('success', false, 'message', 'Já requisitou este livro.');
  END IF;

  SELECT available_qty INTO v_available FROM books WHERE id = p_book_id FOR UPDATE;

  IF v_available IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Livro não encontrado.');
  END IF;

  IF v_available <= 0 THEN
    RETURN jsonb_build_object('success', false, 'message', 'Sem exemplares disponíveis.');
  END IF;

  INSERT INTO loans (user_id, book_id, status)
  VALUES (p_user_id, p_book_id, 'pending')
  RETURNING id INTO v_loan_id;

  UPDATE books SET available_qty = available_qty - 1 WHERE id = p_book_id;

  INSERT INTO activity_logs (user_id, action, entity_type, entity_id, metadata)
  VALUES (p_user_id, 'book_requested', 'loan', v_loan_id::text, jsonb_build_object('book_id', p_book_id));

  RETURN jsonb_build_object('success', true, 'message', 'Pedido registado com sucesso.', 'loan_id', v_loan_id);
END;
$$;

GRANT EXECUTE ON FUNCTION public.request_book(BIGINT, UUID) TO authenticated;

-- ─── Log activity helper ──────────────────────────────────────
CREATE OR REPLACE FUNCTION public.log_activity(
  p_action TEXT,
  p_entity_type TEXT DEFAULT NULL,
  p_entity_id TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO activity_logs (user_id, action, entity_type, entity_id, metadata)
  VALUES (auth.uid(), p_action, p_entity_type, p_entity_id, p_metadata);
END;
$$;

GRANT EXECUTE ON FUNCTION public.log_activity(TEXT, TEXT, TEXT, JSONB) TO authenticated;
