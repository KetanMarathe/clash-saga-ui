import { useValidateToken } from './useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthGuard = (isProtectedRoute: boolean = true) => {
  const navigate = useNavigate();
  const { data: validationData, isLoading } = useValidateToken({
    enabled: isProtectedRoute, // Only run validation on protected routes
    staleTime: 30000, // Cache the result for 30 seconds
    gcTime: 60000, // Keep in cache for 1 minute before garbage collection
  });

  useEffect(() => {
    if (!isProtectedRoute) return;

    if (!isLoading && validationData?.valid === false) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, validationData, navigate, isProtectedRoute]);

  return {
    isLoading: isProtectedRoute && isLoading,
    isAuthenticated: validationData?.valid ?? false,
  };
};
