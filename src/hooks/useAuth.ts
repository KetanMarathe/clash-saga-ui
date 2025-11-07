// src/hooks/useAuth.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiCall } from '../api/api';
import { saveToken, clearToken, saveUsername } from '../utils/storage';
import { useAuthContext } from '../context/useAuthContext';
import type { User } from '../context/authContextTypes';

interface ValidationResponse {
  valid: boolean;
}

export const useValidateToken = (options?: { enabled?: boolean; staleTime?: number; gcTime?: number }) => {
  return useQuery<ValidationResponse>({
    queryKey: ['validate'],
    queryFn: () => apiCall<ValidationResponse>('/auth/validate'),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime,
    gcTime: options?.gcTime,
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
      saveToken(data.access_token);
      saveUsername(data.user.username);
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
