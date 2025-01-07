import { supabase } from '../supabase';
import { handleAuthError } from '../utils/errorHandling';
import { validateUserData } from '../utils/validation';
import type { UserRole } from '../../types/user';

interface SignUpData {
  name: string;
  role: UserRole;
  title?: string;
  company?: string;
  certifications?: string;
}

export async function signUp(email: string, password: string, userData: SignUpData) {
  try {
    // Validate input data
    const validationError = validateUserData({ email, password, ...userData });
    if (validationError) {
      throw new Error(validationError);
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          ...userData,
          certifications: userData.certifications ? 
            userData.certifications.split(',').map(c => c.trim()) : 
            []
        }
      }
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: handleAuthError(error) };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data: { session }, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    if (!session?.user) {
      throw new Error('No session created after login');
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    return { 
      data: { session, profile }, 
      error: null 
    };
  } catch (error) {
    return { data: null, error: handleAuthError(error) };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error: handleAuthError(error) };
  }
}

export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { data: session, error: null };
  } catch (error) {
    return { data: null, error: handleAuthError(error) };
  }
}