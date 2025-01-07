-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean up everything first
DO $$ 
BEGIN
  -- Drop existing policies
  DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
  
  -- Drop existing trigger
  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
  
  -- Drop existing function
  DROP FUNCTION IF EXISTS public.handle_new_user();
  
  -- Drop existing table
  DROP TABLE IF EXISTS public.profiles CASCADE;

  -- Remove existing admin user if exists
  DELETE FROM auth.users WHERE email = 'h.reinhard6@gmail.com';
END $$;

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'professional',
  name TEXT NOT NULL DEFAULT 'New User',
  title TEXT,
  company TEXT,
  certifications TEXT[],
  permissions JSONB DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  CONSTRAINT fk_user
    FOREIGN KEY (id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE,
  CONSTRAINT valid_role
    CHECK (role IN ('admin', 'professional', 'lab'))
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only insert if profile doesn't exist
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = NEW.id) THEN
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
  END IF;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();