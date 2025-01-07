-- First, clean up existing user if possible
DELETE FROM public.profiles WHERE email = 'h.reinhard6@gmail.com';
DELETE FROM auth.users WHERE email = 'h.reinhard6@gmail.com';

-- Reset profiles table
DROP TABLE IF EXISTS public.profiles CASCADE;
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'professional',
  name TEXT,
  permissions JSONB DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Keep RLS disabled for now
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;