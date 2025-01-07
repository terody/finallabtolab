import { supabase } from './supabase';

export async function initDatabase() {
  try {
    // Check if admin user exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'h.reinhard6@gmail.com')
      .single();

    if (!existingUser) {
      // Create admin user
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: 'h.reinhard6@gmail.com',
        password: 'Chapmanar6!',
        options: {
          data: {
            name: 'Admin',
            role: 'admin'
          }
        }
      });

      if (signUpError && signUpError.message !== 'User already registered') {
        console.error('Sign up error:', signUpError);
        return;
      }

      // Create admin profile
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: 'h.reinhard6@gmail.com',
            role: 'admin',
            name: 'Admin',
            permissions: {
              canManageUsers: true,
              canManageLabs: true,
              canManageContent: true,
              canViewAnalytics: true,
              canManageJobs: true,
              canManageMarketplace: true
            }
          });

        if (profileError) {
          console.error('Error creating admin profile:', profileError);
        }
      }
    }
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}