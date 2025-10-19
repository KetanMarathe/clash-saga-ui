const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiCall = async <T, D extends Record<string, unknown> = Record<string, unknown>>(
  endpoint: string,
  method: string = 'GET',
  data?: D,
): Promise<T> => {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'API Error');
  }

  return response.json();
};
