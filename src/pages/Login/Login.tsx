import { useLogin } from '../../hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { LoginGuard } from './LoginGuard';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      loginMutation.mutate(credentialResponse.credential, {
        onSuccess: () => {
          navigate('/');
        },
      });
    }
  };

  const handleGoogleError = () => {
    alert('Login failed. Please try again.');
  };

  return (
    <>
      <LoginGuard />
      <div className='login-page'>
        <div className='login-container'>
          <h1 className='logo'>
            <span className='clash'>Clash</span>
            <span className='saga'>Saga</span>
          </h1>
          <div className='login-button-container'>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              text='signin_with'
              shape='rectangular'
              size='large'
              width='320'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
