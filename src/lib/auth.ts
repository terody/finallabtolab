import { supabase } from './supabase';
import type { UserRole } from '../types/user';

interface UserMetadata {
  name: string;
  role: UserRole;
  title?: string | null;
  company?: string | null;
  certifications?: string[] | null
}

export async function signUp(email: string, password: string, userData: UserMetadata) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.href}/auth/callback`
      }
    });
    if (error) throw error;
    
    const { data: profileData, error: profileError } = await supabase.from('profiles').insert({
      id: data.user?.id,
      email: data.user?.email,
      name: userData.name,
      role: userData.role,
      title: userData.title,
      company: userData.company,
      certifications: userData.certifications
    })
    if (profileError) throw profileError;
    
    return { data, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { data: null, error };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { data: null, error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error };
  }
}