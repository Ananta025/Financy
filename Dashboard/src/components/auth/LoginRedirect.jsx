import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { redirectToLogin } from '../../utils/authRedirect';

/**
 * Component to handle redirects from login page with token
 */
const LoginRedirect = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Flag to track if we've already processed authentication
  const [hasProcessedAuth, setHasProcessedAuth] = useState(false);

  useEffect(() => {
    // Avoid processing auth multiple times
    if (hasProcessedAuth) return;

    const processAuth = async () => {
      try {
        // Get URL search parameters
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const userId = params.get('userId');
        
        // Mark that we've processed authentication attempt
        setHasProcessedAuth(true);
        
        if (token && userId) {
          console.log("Found token and userId in URL parameters");
          
          // Clear URL parameters for security
          const url = new URL(window.location);
          url.searchParams.delete('token');
          url.searchParams.delete('userId');
          window.history.replaceState({}, document.title, url);
          
          // Log in the user
          login(token, userId);
          
          // Wait to ensure state is updated
          setTimeout(() => {
            setIsReady(true);
          }, 500);
        } else if (isAuthenticated) {
          // User is already authenticated
          console.log("No URL parameters but user is already authenticated");
          setIsReady(true);
        } else {
          console.log("No authentication parameters found");
          setError("Authentication failed. Missing required parameters.");
          setIsReady(true);
        }
      } catch (err) {
        console.error("Error processing authentication redirect:", err);
        setError("Authentication process failed. Please try again.");
        setIsReady(true);
      }
    };

    processAuth();
  }, [login, isAuthenticated, hasProcessedAuth]);

  // Force redirect if authenticated
  useEffect(() => {
    if (isAuthenticated && isReady) {
      console.log("User is authenticated, redirecting to dashboard home");
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isReady, navigate]);

  // Show error if authentication failed and user is not authenticated
  if (error && !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Authentication Error</div>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              redirectToLogin();
            }}
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // Show loading while processing
  if (!isReady) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Processing authentication...</p>
        </div>
      </div>
    );
  }

  // Final redirect to dashboard home
  return <Navigate to="/" replace />;
};

export default LoginRedirect;
