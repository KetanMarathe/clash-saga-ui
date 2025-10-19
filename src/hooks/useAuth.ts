// src/hooks/useAuth.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiCall } from '../api/api';
import { clearToken } from '../utils/storage';
import { useAuthContext } from '../context/useAuthContext';
import type { User } from '../context/authContextTypes';

interface ValidationResponse {
  valid: boolean;
}

export const useValidateToken = () => {
  return useQuery<ValidationResponse>({
    queryKey: ['validate'],
    queryFn: () => apiCall<ValidationResponse>('/auth/validate'),
  });
};

interface LoginResponse {
  access_token: string;
  user: User;
}

export const useLogin = () => {
  const { setUser } = useAuthContext();

  return useMutation({
    mutationFn: async (credential: string) => {
      return apiCall<LoginResponse>('/auth/google', 'POST', { credential });
    },
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('token', data.access_token);
      setUser(data.user);
    },
  });
};

export const useLogout = () => {
  const { setUser } = useAuthContext();

  return useMutation({
    mutationFn: () => apiCall('/auth/logout', 'POST'),
    onSuccess: () => {
      clearToken();
      setUser(null);
      window.location.href = '/login';
    },
  });
};
