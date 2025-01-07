// Validation utilities
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 6;
}

export function validateUserData(data: any): string | null {
  if (!data.name?.trim()) {
    return 'Name is required';
  }
  if (!validateEmail(data.email)) {
    return 'Invalid email format';
  }
  if (!validatePassword(data.password)) {
    return 'Password must be at least 6 characters';
  }
  return null;
}

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