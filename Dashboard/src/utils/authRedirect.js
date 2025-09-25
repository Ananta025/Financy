/**
 * Centralized authentication redirect utility
 * Ensures consistent URL handling across the application
 */

/**
 * Get the frontend URL from environment variables
 * @returns {string} Frontend URL without trailing slash
 */
export const getFrontendUrl = () => {
  let frontendUrl = import.meta.env.VITE_FRONTEND_URL;
  
  // Fallback for development if env var is not set
  if (!frontendUrl) {
    console.warn('VITE_FRONTEND_URL not set, using localhost fallback');
    frontendUrl = 'http://localhost:5174';
  }
  
  // Remove trailing slash if present
  if (frontendUrl.endsWith('/')) {
    frontendUrl = frontendUrl.slice(0, -1);
  }
  
  return frontendUrl;
};

/**
 * Redirect to login page
 * @param {string} returnUrl - Optional return URL to redirect back after login
 */
export const redirectToLogin = (returnUrl = null) => {
  const frontendUrl = getFrontendUrl();
  let loginUrl = `${frontendUrl}/login`;
  
  // Add return URL as query parameter if provided
  if (returnUrl) {
    const encodedReturnUrl = encodeURIComponent(returnUrl);
    loginUrl += `?returnTo=${encodedReturnUrl}`;
  }
  
  console.log('Redirecting to login:', loginUrl);
  window.location.href = loginUrl;
};

/**
 * Redirect to signup page
 * @param {string} returnUrl - Optional return URL to redirect back after signup
 */
export const redirectToSignup = (returnUrl = null) => {
  const frontendUrl = getFrontendUrl();
  let signupUrl = `${frontendUrl}/signup`;
  
  // Add return URL as query parameter if provided
  if (returnUrl) {
    const encodedReturnUrl = encodeURIComponent(returnUrl);
    signupUrl += `?returnTo=${encodedReturnUrl}`;
  }
  
  console.log('Redirecting to signup:', signupUrl);
  window.location.href = signupUrl;
};

/**
 * Clear authentication data from localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('user');
};

/**
 * Handle authentication failure (token expired, invalid, etc.)
 * Clears auth data and redirects to login
 * @param {string} reason - Reason for auth failure (for logging)
 * @param {string} returnUrl - Optional return URL
 */
export const handleAuthFailure = (reason = 'Unknown', returnUrl = null) => {
  console.log(`Authentication failed: ${reason}`);
  
  clearAuthData();
  
  // Use current page as return URL if not provided
  const currentUrl = returnUrl || window.location.href;
  
  redirectToLogin(currentUrl);
};

/**
 * Handle unauthorized access during signup flow
 * @param {string} returnUrl - Optional return URL
 */
export const handleSignupRedirect = (returnUrl = null) => {
  console.log('Redirecting to signup flow');
  
  // Use current page as return URL if not provided
  const currentUrl = returnUrl || window.location.href;
  
  redirectToSignup(currentUrl);
};

/**
 * Check if current page is a signup-related route
 * @returns {boolean}
 */
export const isSignupFlow = () => {
  const currentPath = window.location.pathname.toLowerCase();
  return currentPath.includes('signup') || 
         currentPath.includes('register') ||
         currentPath.includes('onboard');
};

export default {
  getFrontendUrl,
  redirectToLogin,
  redirectToSignup,
  clearAuthData,
  handleAuthFailure,
  handleSignupRedirect,
  isSignupFlow
};