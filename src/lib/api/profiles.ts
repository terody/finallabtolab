import { supabase } from '../supabase';
import { handleDatabaseError } from '../utils/errorHandling';
import type { UserProfile } from '../../types/user';

export async function createProfile(profile: UserProfile) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        ...profile
      })
      .maybeSingle();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: handleDatabaseError(error) };
  }
}

export async function getProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: handleDatabaseError(error) };
  }
}

export async function updateProfile(userId: string, updates: Partial<UserProfile>) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .maybeSingle();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: handleDatabaseError(error) };
  }
}