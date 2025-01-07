/*
  # Clean Database Setup

  1. Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `role` (text, enum)
      - `name` (text)
      - `title` (text)
      - `company` (text) 
      - `certifications` (text array)
      - `permissions` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on profiles table
    - Add policies for viewing, creating, and updating profiles
    - Set up trigger for automatic profile creation
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clean up everything first
DO $$ 
BEGIN
  -- Drop existing policies
  DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
  DROP POLICY IF EXISTS "New users can create profile" ON public.profiles;
  
  -- Drop existing trigger
  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
  
  -- Drop existing function
  DROP FUNCTION IF EXISTS public.handle_new_user();
  
  -- Drop existing table
  DROP TABLE IF EXISTS public.profiles;
END $$;

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'professional', 'lab')),
  name TEXT,
  title TEXT,
  company TEXT,
  certifications TEXT[],
  permissions JSONB DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "New users can create profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER 
SECURITY DEFINER SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    role,
    name,
    title,
    company,
    certifications,
    permissions
  )
  VALUES (
    NEW.id,
    NEW.email,
    CASE 
      WHEN NEW.email = 'h.reinhard6@gmail.com' THEN 'admin'
      ELSE COALESCE(NEW.raw_user_meta_data->>'role', 'professional')
    END,
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
    NEW.raw_user_meta_data->>'title',
    NEW.raw_user_meta_data->>'company',
    CASE 
      WHEN NEW.raw_user_meta_data->>'certifications' IS NOT NULL 
      THEN string_to_array(NEW.raw_user_meta_data->>'certifications', ',')
      ELSE NULL
    END,
    CASE 
      WHEN NEW.email = 'h.reinhard6@gmail.com' THEN 
        jsonb_build_object(
          'canManageUsers', true,
          'canManageLabs', true,
          'canManageContent', true,
          'canViewAnalytics', true,
          'canManageJobs', true,
          'canManageMarketplace', true
        )
      ELSE NULL
    END
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();