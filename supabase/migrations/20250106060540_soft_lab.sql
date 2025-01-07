-- First, clean up any existing admin data
DO $$ 
BEGIN
  -- Delete from profiles first (due to foreign key constraint)
  DELETE FROM public.profiles WHERE email = 'h.reinhard6@gmail.com';
  
  -- Then delete from auth.users
  DELETE FROM auth.users WHERE email = 'h.reinhard6@gmail.com';
END $$;

-- Now create the admin user properly
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  last_sign_in_at
) VALUES (
  gen_random_uuid(),
  'h.reinhard6@gmail.com',
  crypt('Chapmanar6!', gen_salt('bf')),
  now(),
  jsonb_build_object(
    'name', 'Admin',
    'role', 'admin'
  ),
  now(),
  now(),
  now()
);

-- The profile will be created automatically by the trigger