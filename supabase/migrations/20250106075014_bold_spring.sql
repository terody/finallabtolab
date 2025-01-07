/*
  # Create profiles table and setup admin handling

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `role` (text, enum)
      - `name` (text)
      - `title` (text)
      - `company` (text) 
      - `certifications` (text[])
      - `permissions` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on profiles table
    - Add policies for viewing, creating and updating profiles
    - Add admin-specific policy

  3. Triggers
    - Add trigger for automatic profile creation on user signup
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing table if it exists
DROP TABLE IF EXISTS public.profiles;

-- Create profiles table with all required fields
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'lab', 'professional')),
  name TEXT,
  title TEXT,
  company TEXT,
  certifications TEXT[],
  permissions JSONB DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can do everything"
  ON public.profiles
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles 
      WHERE role = 'admin' 
      AND (permissions->>'canManageUsers')::boolean = true
    )
  );

-- Create function to handle profile updates
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  is_admin BOOLEAN;
BEGIN
  -- Check if the email is for admin
  is_admin := NEW.email = 'h.reinhard6@gmail.com';
  
  INSERT INTO public.profiles (
    id,
    email,
    role,
    name,
    permissions
  ) VALUES (
    NEW.id,
    NEW.email,
    CASE WHEN is_admin THEN 'admin'
         ELSE COALESCE(NEW.raw_user_meta_data->>'role', 'professional')
    END,
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
    CASE WHEN is_admin THEN
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update existing admin user's profile if it exists
DO $$
DECLARE
  admin_id UUID;
BEGIN
  -- Get the ID of the existing admin user
  SELECT id INTO admin_id FROM auth.users WHERE email = 'h.reinhard6@gmail.com';
  
  IF admin_id IS NOT NULL THEN
    -- Update or insert admin profile
    INSERT INTO public.profiles (
      id,
      email,
      role,
      name,
      permissions
    ) VALUES (
      admin_id,
      'h.reinhard6@gmail.com',
      'admin',
      'Admin',
      jsonb_build_object(
        'canManageUsers', true,
        'canManageLabs', true,
        'canManageContent', true,
        'canViewAnalytics', true,
        'canManageJobs', true,
        'canManageMarketplace', true
      )
    )
    ON CONFLICT (id) DO UPDATE SET
      role = 'admin',
      permissions = EXCLUDED.permissions;
  END IF;
END $$;