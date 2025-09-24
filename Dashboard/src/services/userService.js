import axios from 'axios';
import authService from './authService';

const API_BASE_URL = 'https://financy-6bzf.onrender.com';

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
      const token = authService.getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(
        `${API_BASE_URL}/users/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
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
      const token = authService.getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.put(
        `${API_BASE_URL}/users/profile/${userId}`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
   * Get current user's profile using stored userId
   * @returns {Promise<object>} Current user's profile data
   */
  getCurrentUserProfile: async () => {
    try {
      const userId = authService.getUserId();
      if (!userId) {
        throw new Error('No user ID found');
      }

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
      const userId = authService.getUserId();
      if (!userId) {
        throw new Error('No user ID found');
      }

      return await userService.updateUserProfile(userId, profileData);
    } catch (error) {
      console.error('Error updating current user profile:', error);
      throw error;
    }
  }
};

export default userService;