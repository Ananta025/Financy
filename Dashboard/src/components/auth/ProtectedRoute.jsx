import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Component that protects routes requiring authentication
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

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

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Use Frontend URL from env variables or fallback to a default
    let frontendUrl = import.meta.env.VITE_FRONTEND_URL;
    
    // Ensure frontend URL doesn't end with a slash
    if (frontendUrl && frontendUrl.endsWith('/')) {
      frontendUrl = frontendUrl.slice(0, -1);
    }
    
    // Create full absolute URL without prepending current domain
    const returnTo = encodeURIComponent(window.location.href);
    const loginUrl = `${frontendUrl}/login?returnTo=${returnTo}`;
    
    console.log("Redirecting to login:", loginUrl);
    
    // Use window.location for full URL redirect instead of Navigate
    window.location.href = loginUrl;
    
    // Return null while redirecting
    return null;
  }

  // Render children routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
