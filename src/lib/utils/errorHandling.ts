export function handleAuthError(error: any) {
  console.error('Auth error:', error);
  
  // Map common error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    'invalid_credentials': 'Invalid email or password',
    'user_not_found': 'No account found with this email',
    'email_taken': 'An account with this email already exists',
    'weak_password': 'Password is too weak. It must be at least 6 characters long',
    'invalid_email': 'Please enter a valid email address'
  };

  const message = errorMessages[error.code] || error.message || 'Authentication failed. Please try again.';
  
  return {
    code: error.code,
    message
  };
}

export function handleDatabaseError(error: any) {
  console.error('Database error:', error);
  return {
    code: error.code,
    message: error.message || 'Database operation failed. Please try again.'
  };
}

export function handleApiError(error: any) {
  console.error('API error:', error);
  return {
    code: error.code,
    message: error.message || 'Operation failed. Please try again.'
  };
}