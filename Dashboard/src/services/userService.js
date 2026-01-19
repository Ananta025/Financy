import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Service for handling user-related API operations
 */
const userService = {
  /**
   * Get user profile by ID
   * @param {string} userId - The user ID
   * @returns {Promise<object>} User profile data
   */
  getUserProfile: async (userId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/profile/${userId}`
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  /**
   * Update user profile
   * @param {string} userId - The user ID
   * @param {object} profileData - The profile data to update
   * @returns {Promise<object>} Updated profile data
   */
  updateUserProfile: async (userId, profileData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/users/profile/${userId}`,
        profileData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  /**
   * Get current user's profile using hardcoded userId
   * @returns {Promise<object>} Current user's profile data
   */
  getCurrentUserProfile: async () => {
    try {
      // No auth - use default user ID
      const userId = '000000000000000000000001';
      return await userService.getUserProfile(userId);
    } catch (error) {
      console.error('Error fetching current user profile:', error);
      throw error;
    }
  },

  /**
   * Update current user's profile
   * @param {object} profileData - The profile data to update
   * @returns {Promise<object>} Updated profile data
   */
  updateCurrentUserProfile: async (profileData) => {
    try {
      // No auth - use default user ID
      const userId = '000000000000000000000001';
      return await userService.updateUserProfile(userId, profileData);
    } catch (error) {
      console.error('Error updating current user profile:', error);
      throw error;
    }
  }
};

export default userService;