import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

export const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // If user is already logged in, they shouldn't see onboarding/login/signup
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
