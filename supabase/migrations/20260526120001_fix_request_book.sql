-- Run this if request_book failed with "cannot change return type"
-- Safe to run after partial migration (tables already created)

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

  SELECT COUNT(*) INTO v_pending_count
  FROM loans WHERE user_id = p_user_id AND status = 'pending';

  IF v_pending_count > 0 THEN
    RETURN jsonb_build_object('success', false, 'message', 'Já tem um pedido pendente. Aguarde aprovação ou rejeição antes de requisitar outro livro.');
  END IF;

  SELECT COUNT(*) INTO v_active_count
  FROM loans WHERE user_id = p_user_id AND status = 'active';

  IF v_active_count > 0 THEN
    RETURN jsonb_build_object('success', false, 'message', 'Já tem um empréstimo ativo. Devolva o livro antes de requisitar outro.');
  END IF;

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
