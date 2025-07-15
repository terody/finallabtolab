import { supabase } from './supabase';
import { handleDatabaseError } from './utils/errorHandling';

export async function getListings() {
  try {
    const { data, error } = await supabase
      .from('lab')
      .select('*');
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: handleDatabaseError(error) };
  }
}
