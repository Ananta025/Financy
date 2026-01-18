/**
 * SECURE AUTHENTICATION SERVICE
 * Never exposes tokens in URLs or logs
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

class SecureAuthService {
  /**
   * Login with credentials
   * Stores token securely in localStorage (consider HttpOnly cookies in production)
   */
  async login(email, password) {
    try {
      const response = await fetch(`${BACKEND_URL}/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      
      // SECURITY: Store in localStorage (not in URL)
      // TODO: Use HTTP-only cookies for production
      if (data.token && data.userId) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        
        return {
          success: true,
          userId: data.userId
        };
      }
      
      throw new Error('Invalid response from server');
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Signup new user
   */
  async signup(name, email, password) {
    try {
      const response = await fetch(`${BACKEND_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Signup failed');
      }

      const data = await response.json();
      
      // SECURITY: Store in localStorage (not in URL)
      if (data.token && data.userId) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        
        return {
          success: true,
          userId: data.userId
        };
      }
      
      throw new Error('Invalid response from server');
      
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  /**
   * Get current user ID
   */
  getUserId() {
    return localStorage.getItem('userId');
  }
}

export default new SecureAuthService();
