import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token came from URL params (like redirects)
        const gotTokenFromParams = authService.initializeAuthFromParams();
        
        // Check if we have a token in localStorage
        if (authService.isAuthenticated()) {
          // If we just got the token from URL params, consider it valid without extra check
          if (!gotTokenFromParams) {
            // Otherwise validate with backend
            const isValid = await authService.validateToken();
            if (!isValid) {
              authService.logout();
              setIsAuthenticated(false);
              setIsLoading(false);
              return;
            }
          }
          
          setIsAuthenticated(true);
          // Here you could fetch user data if needed
          setUser({
            id: authService.getUserId()
          });
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
    setUser({ id: userId });
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
