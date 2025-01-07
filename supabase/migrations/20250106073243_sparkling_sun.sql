-- Update existing admin user's profile
UPDATE public.profiles
SET
  role = 'admin',
  name = 'Admin',
  permissions = jsonb_build_object(
    'canManageUsers', true,
    'canManageLabs', true,
    'canManageContent', true,
    'canViewAnalytics', true,
    'canManageJobs', true,
    'canManageMarketplace', true
  )
WHERE email = 'h.reinhard6@gmail.com';