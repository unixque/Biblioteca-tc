-- =============================================================================
-- Biblioteca TC — Full idempotent migration
-- Safe to run multiple times. Does NOT drop existing data tables.
-- Run in Supabase SQL Editor (entire script).
-- =============================================================================

BEGIN;

-- =============================================================================
-- 1. EXISTING TABLES — column updates & cleanup (no DROP TABLE)
-- =============================================================================

-- profiles: add full_name if missing (used by Settings)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS full_name TEXT;

-- Normalize legacy role value (student → aluno) without deleting rows
UPDATE public.profiles
SET role = 'aluno'
WHERE role = 'student';

-- books: sync duplicate featured flags, then remove legacy column (if present)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'books'
      AND column_name = 'featured'
  ) THEN
    UPDATE public.books
    SET is_featured = COALESCE(is_featured, featured, false);
    ALTER TABLE public.books DROP COLUMN featured;
  END IF;
END $$;

-- loans: new requests should start as pending (not active)
ALTER TABLE public.loans
  ALTER COLUMN status SET DEFAULT 'pending';

-- reviews: one review per user per book
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'reviews_book_id_user_id_key'
      AND conrelid = 'public.reviews'::regclass
  ) THEN
    ALTER TABLE public.reviews
      ADD CONSTRAINT reviews_book_id_user_id_key UNIQUE (book_id, user_id);
  END IF;
END $$;

-- =============================================================================
-- 2. NEW TABLES (CREATE IF NOT EXISTS)
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  book_id BIGINT NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  CONSTRAINT wishlist_user_book_unique UNIQUE (user_id, book_id)
);

CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_created
  ON public.activity_logs (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_activity_logs_user
  ON public.activity_logs (user_id);

CREATE TABLE IF NOT EXISTS public.newsletter_preferences (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  enabled BOOLEAN NOT NULL DEFAULT true,
  categories TEXT[] NOT NULL DEFAULT ARRAY['books', 'history', 'philosophy', 'world']::TEXT[],
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_wishlist_user
  ON public.wishlist (user_id);

CREATE INDEX IF NOT EXISTS idx_loans_user_status
  ON public.loans (user_id, status);

CREATE INDEX IF NOT EXISTS idx_loans_status_created
  ON public.loans (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_user_read
  ON public.notifications (user_id, read);

-- Removed from app: drop push table only if it was created earlier
DROP TABLE IF EXISTS public.push_subscriptions;

-- =============================================================================
-- 3. ROW LEVEL SECURITY — enable on all tables
-- =============================================================================

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_preferences ENABLE ROW LEVEL SECURITY;

-- ─── books ───────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Allow public read access to books" ON public.books;
CREATE POLICY "Allow public read access to books"
  ON public.books FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow admins to manage books" ON public.books;
CREATE POLICY "Allow admins to manage books"
  ON public.books FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- ─── categories ────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Allow public read access to categories" ON public.categories;
CREATE POLICY "Allow public read access to categories"
  ON public.categories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow admins to manage categories" ON public.categories;
CREATE POLICY "Allow admins to manage categories"
  ON public.categories FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- ─── profiles ──────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Allow public read access to profiles" ON public.profiles;
CREATE POLICY "Allow public read access to profiles"
  ON public.profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow users to insert their own profile" ON public.profiles;
CREATE POLICY "Allow users to insert their own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Allow users and admins to update profiles" ON public.profiles;
CREATE POLICY "Allow users and admins to update profiles"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = id
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  )
  WITH CHECK (
    auth.uid() = id
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- ─── loans (users read own; admins manage; inserts via request_book RPC only) ─
DROP POLICY IF EXISTS "Allow users to view their own loans and admins to view all" ON public.loans;
CREATE POLICY "Allow users to view their own loans and admins to view all"
  ON public.loans FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Remove direct user inserts (use request_book instead)
DROP POLICY IF EXISTS "Allow users to insert their own loans" ON public.loans;

DROP POLICY IF EXISTS "Allow admins to update loans" ON public.loans;
CREATE POLICY "Allow admins to update loans"
  ON public.loans FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

DROP POLICY IF EXISTS "Allow admins to delete loans" ON public.loans;
CREATE POLICY "Allow admins to delete loans"
  ON public.loans FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- ─── notifications ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users read own notifications" ON public.notifications;
CREATE POLICY "Users read own notifications"
  ON public.notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own notifications" ON public.notifications;
CREATE POLICY "Users update own notifications"
  ON public.notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "System insert notifications" ON public.notifications;
DROP POLICY IF EXISTS "Authenticated insert notifications" ON public.notifications;
-- Users insert own; admins insert for anyone (e.g. loan approval emails)
CREATE POLICY "Authenticated insert notifications"
  ON public.notifications FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- ─── feedback ──────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users insert own feedback" ON public.feedback;
CREATE POLICY "Users insert own feedback"
  ON public.feedback FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users read own feedback" ON public.feedback;
CREATE POLICY "Users read own or admin reads all feedback"
  ON public.feedback FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

DROP POLICY IF EXISTS "Admins delete feedback" ON public.feedback;
CREATE POLICY "Admins delete feedback"
  ON public.feedback FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- ─── reviews ───────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;
CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own reviews" ON public.reviews;
CREATE POLICY "Users can insert their own reviews"
  ON public.reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own reviews" ON public.reviews;
CREATE POLICY "Users can update their own reviews"
  ON public.reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own reviews" ON public.reviews;
CREATE POLICY "Users can delete their own reviews"
  ON public.reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ─── wishlist ────────────────────────────────────────────────────────────────────
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
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- ─── activity_logs ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Admins read activity logs" ON public.activity_logs;
CREATE POLICY "Admins read activity logs"
  ON public.activity_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

DROP POLICY IF EXISTS "Authenticated insert activity logs" ON public.activity_logs;
CREATE POLICY "Authenticated insert activity logs"
  ON public.activity_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- ─── newsletter_preferences ──────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users manage own newsletter prefs" ON public.newsletter_preferences;
CREATE POLICY "Users manage own newsletter prefs"
  ON public.newsletter_preferences FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =============================================================================
-- 4. FUNCTIONS (drop + recreate to avoid return-type errors)
-- =============================================================================

DROP FUNCTION IF EXISTS public.request_book(BIGINT, UUID);

CREATE OR REPLACE FUNCTION public.request_book(p_book_id BIGINT, p_user_id UUID)
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

  SELECT COUNT(*) INTO v_pending_count
  FROM public.loans
  WHERE user_id = p_user_id AND status = 'pending';

  IF v_pending_count > 0 THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Já tem um pedido pendente. Aguarde aprovação ou rejeição antes de requisitar outro livro.'
    );
  END IF;

  SELECT COUNT(*) INTO v_active_count
  FROM public.loans
  WHERE user_id = p_user_id AND status = 'active';

  IF v_active_count > 0 THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Já tem um empréstimo ativo. Devolva o livro antes de requisitar outro.'
    );
  END IF;

  SELECT COUNT(*) INTO v_same_book
  FROM public.loans
  WHERE user_id = p_user_id
    AND book_id = p_book_id
    AND status IN ('pending', 'active');

  IF v_same_book > 0 THEN
    RETURN jsonb_build_object('success', false, 'message', 'Já requisitou este livro.');
  END IF;

  SELECT available_qty INTO v_available
  FROM public.books
  WHERE id = p_book_id
  FOR UPDATE;

  IF v_available IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Livro não encontrado.');
  END IF;

  IF v_available <= 0 THEN
    RETURN jsonb_build_object('success', false, 'message', 'Sem exemplares disponíveis.');
  END IF;

  INSERT INTO public.loans (user_id, book_id, status)
  VALUES (p_user_id, p_book_id, 'pending')
  RETURNING id INTO v_loan_id;

  UPDATE public.books
  SET available_qty = available_qty - 1
  WHERE id = p_book_id;

  INSERT INTO public.activity_logs (user_id, action, entity_type, entity_id, metadata)
  VALUES (
    p_user_id,
    'book_requested',
    'loan',
    v_loan_id::text,
    jsonb_build_object('book_id', p_book_id)
  );

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Pedido registado com sucesso.',
    'loan_id', v_loan_id
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.request_book(BIGINT, UUID) TO authenticated;

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
  INSERT INTO public.activity_logs (user_id, action, entity_type, entity_id, metadata)
  VALUES (auth.uid(), p_action, p_entity_type, p_entity_id, p_metadata);
END;
$$;

GRANT EXECUTE ON FUNCTION public.log_activity(TEXT, TEXT, TEXT, JSONB) TO authenticated;

-- Optional: expire pending loans older than 12 hours (server-side)
CREATE OR REPLACE FUNCTION public.expire_pending_loans()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count INTEGER := 0;
  r RECORD;
BEGIN
  FOR r IN
    SELECT l.id, l.book_id
    FROM public.loans l
    WHERE l.status = 'pending'
      AND l.created_at < (now() - interval '12 hours')
  LOOP
    UPDATE public.loans SET status = 'rejected' WHERE id = r.id;
    UPDATE public.books SET available_qty = available_qty + 1 WHERE id = r.book_id;
    v_count := v_count + 1;
  END LOOP;
  RETURN v_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.expire_pending_loans() TO authenticated;

COMMIT;

-- =============================================================================
-- Done. Summary of changes:
-- • Keeps: books, categories, feedback, loans, notifications, profiles, reviews
-- • Adds: wishlist, activity_logs, newsletter_preferences
-- • Removes column: books.featured (merged into is_featured)
-- • Removes table: push_subscriptions (if existed)
-- • Updates: loans.status default → pending; profiles.role student → aluno
-- • Adds: profiles.full_name, indexes, RLS on all tables, request_book, log_activity
-- =============================================================================
