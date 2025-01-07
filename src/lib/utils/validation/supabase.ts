// Supabase configuration validation
export function validateSupabaseConfig(url?: string, key?: string): void {
  if (!url) {
    throw new Error(
      'Missing VITE_SUPABASE_URL - Please connect to Supabase using the button in the top right corner'
    );
  }
  
  try {
    new URL(url);
  } catch {
    throw new Error(
      'Invalid VITE_SUPABASE_URL - Please reconnect to Supabase using the button in the top right corner'
    );
  }

  if (!key) {
    throw new Error(
      'Missing VITE_SUPABASE_ANON_KEY - Please connect to Supabase using the button in the top right corner'
    );
  }
}