import { useValidateToken } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

export const LoginGuard = () => {
  const { data: validationData, isLoading } = useValidateToken();

  if (isLoading) {
    return <Loader />;
  }

  if (validationData?.valid) {
    return <Navigate to='/' replace />;
  }

  return null;
};
