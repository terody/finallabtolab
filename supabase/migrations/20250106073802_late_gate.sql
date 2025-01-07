-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
  DROP TABLE IF EXISTS public.profiles;

  -- Remove existing admin user if exists
  DELETE FROM auth.users WHERE email = 'h.reinhard6@gmail.com';
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

-- Temporarily disable RLS for initial setup
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

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
  -- Determine role and permissions
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

  -- Insert profile
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
    RAISE LOG 'Profile already exists for user %', NEW.id;
    RETURN NEW;
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

-- Create admin user with proper data
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  last_sign_in_at,
  confirmation_token,
  email_change_token_new,
  recovery_token
) VALUES (
  uuid_generate_v4(),
  '00000000-0000-0000-0000-000000000000',
  'h.reinhard6@gmail.com',
  crypt('Chapmanar6!', gen_salt('bf')),
  NOW(),
  jsonb_build_object(
    'name', 'Admin',
    'role', 'admin'
  ),
  NOW(),
  NOW(),
  NOW(),
  encode(gen_random_bytes(32), 'hex'),
  encode(gen_random_bytes(32), 'hex'),
  encode(gen_random_bytes(32), 'hex')
);