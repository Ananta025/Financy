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
        console.log("Checking authentication...");
        
        // Check if token exists in localStorage
        const hasToken = authService.isAuthenticated();
        console.log("Token exists:", hasToken);
        
        // Check if token came from URL params (like redirects)
        const gotTokenFromParams = authService.initializeAuthFromParams();
        console.log("Got token from params:", gotTokenFromParams);
        
        // If we have a token (either from localStorage or freshly set from params)
        if (authService.isAuthenticated()) {
          // If we just got the token from URL params, consider it valid without extra check
          if (gotTokenFromParams) {
            console.log("Using token from params, skipping validation");
            setIsAuthenticated(true);
            setUser({
              id: authService.getUserId()
            });
          } else {
            // Otherwise validate with backend
            try {
              console.log("Validating existing token with backend");
              const isValid = await authService.validateToken();
              if (isValid) {
                console.log("Token validated successfully");
                setIsAuthenticated(true);
                setUser({
                  id: authService.getUserId()
                });
              } else {
                console.log("Token validation failed");
                authService.logout();
                setIsAuthenticated(false);
              }
            } catch (validationError) {
              console.error('Token validation error:', validationError);
              authService.logout();
              setIsAuthenticated(false);
            }
          }
        } else {
          console.log("No authentication token found");
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
    console.log("Login called with token and userId:", token?.substring(0, 10) + "...", userId);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
    setUser({ id: userId });
  };

  const logout = () => {
    console.log("Logout called");
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
