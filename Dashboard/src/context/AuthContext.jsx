import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';
import userService from '../services/userService';
import { positionManager } from '../Data/Data';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Function to fetch and set user profile data
  const fetchUserProfile = async (userId) => {
    try {
      const profile = await userService.getUserProfile(userId);
      setUser({
        id: userId,
        name: profile.name,
        email: profile.email,
        // Add any other profile fields as needed
        ...profile
      });
      return profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Set basic user info even if profile fetch fails
      setUser({ id: userId });
      return null;
    }
  };

  // Function to update user profile
  const updateUserProfile = async (profileData) => {
    try {
      if (!user?.id) {
        throw new Error('No user logged in');
      }
      
      await userService.updateUserProfile(user.id, profileData);
      
      // Refresh user profile after update
      await fetchUserProfile(user.id);
      
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

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
          const userId = authService.getUserId();
          
          // If we just got the token from URL params, consider it valid without extra check
          if (gotTokenFromParams) {
            console.log("Using token from params, skipping validation");
            setIsAuthenticated(true);
            // Fetch user profile data
            await fetchUserProfile(userId);
          } else {
            // Otherwise validate with backend
            try {
              console.log("Validating existing token with backend");
              const isValid = await authService.validateToken();
              if (isValid) {
                console.log("Token validated successfully");
                setIsAuthenticated(true);
                // Fetch user profile data
                await fetchUserProfile(userId);
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

  const login = async (token, userId) => {
    console.log("Login called with token and userId:", token?.substring(0, 10) + "...", userId);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    
    // Initialize user-specific positions (starts empty for new users)
    positionManager.initializeUser(userId);
    
    setIsAuthenticated(true);
    
    // Fetch user profile data after login
    await fetchUserProfile(userId);
  };

  const logout = () => {
    console.log("Logout called");
    
    // Clear user-specific position data
    positionManager.clearUserData();
    
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    updateUserProfile,
    refreshUserProfile: () => fetchUserProfile(user?.id)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
