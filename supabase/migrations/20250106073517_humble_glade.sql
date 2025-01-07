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

-- Create profiles table with proper constraints
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

-- Create simplified policies
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create improved trigger function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_role TEXT;
  new_permissions JSONB;
BEGIN
  -- Determine role
  IF NEW.email = 'h.reinhard6@gmail.com' THEN
    new_role := 'admin';
    new_permissions := jsonb_build_object(
      'canManageUsers', true,
      'canManageLabs', true,
      'canManageContent', true,
      'canViewAnalytics', true,
      'canManageJobs', true,
      'canManageMarketplace', true
    );
  ELSE
    new_role := COALESCE(NEW.raw_user_meta_data->>'role', 'professional');
    new_permissions := NULL;
  END IF;

  -- Insert profile with COALESCE to handle NULL values
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
    new_role,
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
    NEW.raw_user_meta_data->>'title',
    NEW.raw_user_meta_data->>'company',
    CASE 
      WHEN NEW.raw_user_meta_data->>'certifications' IS NOT NULL 
      THEN string_to_array(NEW.raw_user_meta_data->>'certifications', ',')
      ELSE NULL
    END,
    new_permissions
  );

  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Log the error and continue
    RAISE LOG 'Duplicate profile for user %', NEW.id;
    RETURN NEW;
  WHEN OTHERS THEN
    -- Log other errors and continue
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();