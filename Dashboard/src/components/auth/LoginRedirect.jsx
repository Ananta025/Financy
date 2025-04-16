import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Component to handle redirects from login page with token
 */
const LoginRedirect = () => {
  const [isReady, setIsReady] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userId = params.get('userId');
    
    if (token && userId) {
      login(token, userId);
    }
    
    setIsReady(true);
  }, [login]);

  if (!isReady) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Redirect to home page
  return <Navigate to="/" replace />;
};

export default LoginRedirect;
