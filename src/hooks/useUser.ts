// src/hooks/useUser.ts
import { useQuery } from '@tanstack/react-query';
import { apiCall } from '../api/api';

export interface User {
  id: string;
  name: string;
  email: string;
}

export const useUser = () => {
  return useQuery<User>({
    queryKey: ['me'],
    queryFn: () => apiCall<User>('/auth/me'),
    // suspense: true,
  });
};
