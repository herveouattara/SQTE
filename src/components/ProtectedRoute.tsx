import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  // Vérifier si l'utilisateur accède au bon dashboard
  const path = location.pathname.split('/')[1]; // admin, membre, etc.
  if (user?.role.toLowerCase() !== path) {
    return <Navigate to={`/${user?.role.toLowerCase()}`} replace />;
  }

  return <>{children}</>;
};