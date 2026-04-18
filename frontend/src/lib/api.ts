const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  } as Record<string, string>;

  // Inject JWT token if it exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Handle URL encoding for application/x-www-form-urlencoded if needed (like for OAuth2PasswordRequestForm)
  const isFormData = headers['Content-Type'] === 'application/x-www-form-urlencoded';

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || 'An error occurred during the request');
  }

  return response.json();
};
