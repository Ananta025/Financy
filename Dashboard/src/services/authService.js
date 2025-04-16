import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const authService = {
  // Initialize auth from URL params (for redirects with token)
  initializeAuthFromParams: () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userId = params.get('userId');
    
    if (token && userId) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      return true;
    }
    return false;
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  // Get auth token
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  // Get user ID
  getUserId: () => {
    return localStorage.getItem('userId');
  },
  
  // Validate token with backend
  validateToken: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;
      
      const response = await axios.get(`${API_URL}/users/validate-token`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.status === 200;
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      return false;
    }
  },
  
  // Logout function
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = import.meta.env.VITE_FRONTEND_URL + '/login';
  }
};

export default authService;
