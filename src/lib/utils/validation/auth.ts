// Authentication validation
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