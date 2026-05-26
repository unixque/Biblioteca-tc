BEGIN;

-- ==========================================
-- 1. BOOKS TABLE
-- ==========================================
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to books" ON public.books;
CREATE POLICY "Allow public read access to books"
ON public.books FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow admins to manage books" ON public.books;
CREATE POLICY "Allow admins to manage books"
ON public.books FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- ==========================================
-- 2. CATEGORIES TABLE
-- ==========================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to categories" ON public.categories;
CREATE POLICY "Allow public read access to categories"
ON public.categories FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow admins to manage categories" ON public.categories;
CREATE POLICY "Allow admins to manage categories"
ON public.categories FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- ==========================================
-- 3. PROFILES TABLE
-- ==========================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

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
  auth.uid() = id OR
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
)
WITH CHECK (
  auth.uid() = id OR
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- ==========================================
-- 4. LOANS TABLE
-- ==========================================
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow users to view their own loans and admins to view all" ON public.loans;
CREATE POLICY "Allow users to view their own loans and admins to view all"
ON public.loans FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

DROP POLICY IF EXISTS "Allow users to insert their own loans" ON public.loans;
CREATE POLICY "Allow users to insert their own loans"
ON public.loans FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow admins to update loans" ON public.loans;
CREATE POLICY "Allow admins to update loans"
ON public.loans FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

COMMIT;
