import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { AuthProvider } from './context/AuthContext';
import { authLoader } from './loaders/authLoader';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Loader from './components/Loader/Loader';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path='/' element={<AuthGuard component={<Home />} />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

const AuthGuard = ({ component }: { component: ReactElement }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    authLoader().then(res => setIsValid(res.valid));
  }, []);

  if (isValid === null) return <Loader />;
  return isValid ? component : <Navigate to='/login' replace />;
};

export default App;
