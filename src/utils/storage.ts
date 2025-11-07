// Token storage utilities
export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const clearToken = () => {
  localStorage.removeItem('token');
};

// Username storage utilities
export const saveUsername = (username: string) => {
  localStorage.setItem('username', username);
};

export const getUsername = (): string | null => {
  return localStorage.getItem('username');
};
