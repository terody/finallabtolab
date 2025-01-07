-- Reset everything first with CASCADE to handle dependencies
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Create profiles table with role validation
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'professional', 'lab')),
  name TEXT,
  permissions JSONB DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create basic policies
CREATE POLICY "Enable read access for everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Enable insert for authenticated users"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for users based on id"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, name, permissions)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      CASE 
        WHEN NEW.email = 'h.reinhard6@gmail.com' THEN 'admin'
        WHEN NEW.raw_user_meta_data->>'role' IN ('professional', 'lab') 
        THEN NEW.raw_user_meta_data->>'role'
        ELSE 'professional'
      END,
      'professional'
    ),
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
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