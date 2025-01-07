-- Reset everything
DROP TABLE IF EXISTS public.profiles;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'professional',
  name TEXT,
  permissions JSONB DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Disable RLS completely for now
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;