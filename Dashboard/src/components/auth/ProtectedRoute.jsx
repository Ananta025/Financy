import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../../services/authService';

/**
 * Component that protects routes requiring authentication
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // First check for token in URL params (for initial redirection)
      const gotTokenFromParams = authService.initializeAuthFromParams();
      
      // Check if user is authenticated in localStorage
      const isAuthed = authService.isAuthenticated();
      
      if (!isAuthed) {
        // User is not authenticated, will redirect
        setIsAuthenticated(false);
        setIsChecking(false);
        return;
      }
      
      // Verify token with backend for extra security
      // Only if the token wasn't just received from params
      if (!gotTokenFromParams) {
        try {
          const isValid = await authService.validateToken();
          setIsAuthenticated(isValid);
        } catch (error) {
          console.error("Token validation error:", error);
          setIsAuthenticated(false);
        }
      } else {
        // We just got the token from params, assume it's valid
        setIsAuthenticated(true);
      }
      
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={import.meta.env.VITE_FRONTEND_URL + '/login'} replace />;
  }

  // Render children routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
