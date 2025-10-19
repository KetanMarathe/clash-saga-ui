import { useLogin } from '../../hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
const Login = () => {
  const loginMutation = useLogin();

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      loginMutation.mutate(credentialResponse.credential);
    }
  };

  const handleGoogleError = () => {
    alert('Google Login Failed');
  };

  return (
    <div className='login-container'>
      hello
      <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
    </div>
  );
};

export default Login;
