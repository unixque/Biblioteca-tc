-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.books (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  isbn text NOT NULL,
  title text NOT NULL,
  author text,
  publisher text,
  year_edition integer,
  cover_image text,
  quantity integer DEFAULT 5,
  available_qty integer DEFAULT 5,
  category_id bigint,
  is_featured boolean DEFAULT false,
  ai_summary text,
  created_at timestamp with time zone DEFAULT now(),
  featured boolean DEFAULT false,
  CONSTRAINT books_pkey PRIMARY KEY (id),
  CONSTRAINT books_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);
CREATE TABLE public.categories (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL UNIQUE,
  display_order integer DEFAULT 0,
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.feedback (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT feedback_pkey PRIMARY KEY (id),
  CONSTRAINT feedback_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.loans (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  book_id bigint,
  user_id uuid,
  status text DEFAULT 'active'::text,
  due_date timestamp with time zone,
  returned_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  fine_amount numeric DEFAULT 0,
  CONSTRAINT loans_pkey PRIMARY KEY (id),
  CONSTRAINT loans_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id),
  CONSTRAINT loans_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT fk_loans_user FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT fk_loans_book FOREIGN KEY (book_id) REFERENCES public.books(id)
);
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info'::text,
  read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  email text UNIQUE,
  role text DEFAULT 'student'::text,
  name text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  book_id bigint,
  user_id uuid,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT reviews_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id),
  CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);