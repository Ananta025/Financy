import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { handleAuthFailure, handleSignupRedirect, isSignupFlow } from '../../utils/authRedirect';

/**
 * Component that protects routes requiring authentication
 * Redirects to appropriate login/signup based on context
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Handle unauthenticated users
  if (!isAuthenticated) {
    const currentUrl = window.location.href;
    
    // Check if this is a signup flow
    if (isSignupFlow()) {
      console.log('Unauthorized access during signup flow, redirecting to signup');
      handleSignupRedirect(currentUrl);
    } else {
      console.log('Unauthorized access, redirecting to login');
      handleAuthFailure('Access to protected route without authentication', currentUrl);
    }
    
    // Return loading while redirect happens
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Render children routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
