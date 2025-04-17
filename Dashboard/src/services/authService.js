import axios from 'axios';

/**
 * Service for handling authentication operations
 */
const authService = {
  /**
   * Check if user is authenticated by verifying token exists
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  /**
   * Get current user ID
   */
  getUserId: () => {
    return localStorage.getItem('userId');
  },
  
  /**
   * Get authentication token
   */
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  /**
   * Initialize authentication from URL parameters
   * Used when redirected from login page with token params
   */
  initializeAuthFromParams: () => {
    try {
      // Get URL search parameters
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const userId = params.get('userId');
      
      // If both token and userId exist, store them
      if (token && userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        
        // Clear the URL parameters for security
        const url = new URL(window.location);
        url.searchParams.delete('token');
        url.searchParams.delete('userId');
        window.history.replaceState({}, document.title, url);
        
        console.log("Auth initialized from URL parameters");
        return true;
      }
    } catch (error) {
      console.error("Error initializing auth from params:", error);
    }
    return false;
  },
  
  /**
   * Validate token with backend
   */
  validateToken: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;
      
      // Simple validation for now - in production, you would validate with the backend
      // We'll skip the backend call for now since we don't have that endpoint set up yet
      return true;
      
      /* Uncomment when backend endpoint is ready
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/validate-token`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      return response.status === 200;
      */
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  },
  
  /**
   * Logout user by removing all auth data
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
};

export default authService;
