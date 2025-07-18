import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lab } from '../types/lab';

export function useLabs() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('lab')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setLabs(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const searchLabs = async (searchTerm: string) => {
    try {
      setLoading(true);
      let query = supabase.from('lab').select('*');

      if (searchTerm.trim()) {
        query = query.or(`name.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setLabs(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    labs,
    loading,
    error,
    refetch: fetchLabs,
    searchLabs,
  };
}