import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import type { ReactElement } from 'react';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Loader from './components/Loader/Loader';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuthGuard } from './hooks/useAuthGuard';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { isLoading, isAuthenticated } = useAuthGuard(true);

  if (isLoading) {
    return <Loader />;
  }

  return isAuthenticated ? children : <Navigate to='/login' replace />;
};

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const { isLoading } = useAuthGuard(false);

  if (isLoading) {
    return <Loader />;
  }

  return children;
};

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route
                  path='/'
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/login'
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
