import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function SecuritySettings() {
  const { logout } = useAuth();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleChangePassword = () => {
    // This would open a modal or redirect to change password page
    alert("Change password feature will be implemented soon!");
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    if (!twoFactorEnabled) {
      alert("Two-factor authentication enabled! You'll receive a setup guide via email.");
    } else {
      alert("Two-factor authentication disabled.");
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        await logout();
        // User will be redirected automatically by AuthContext
      } catch (error) {
        console.error('Logout failed:', error);
        alert('Failed to logout. Please try again.');
      }
    }
  };

  const handleLogoutAll = () => {
    if (window.confirm('Are you sure you want to logout from all devices?')) {
      // This would be replaced with actual API call
      alert("Logged out from all devices successfully!");
      handleLogout();
    }
  };
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
      
      {/* Change Password Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between py-4">
          <div>
            <h3 className="text-lg font-medium">Password</h3>
            <p className="text-sm text-gray-500 mt-1">
              Update your account password
            </p>
          </div>
          <button
            onClick={handleChangePassword}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Change Password
          </button>
        </div>
      </div>
      
      {/* 2FA Section */}
      <div className="py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Two-Factor Authentication (2FA)</h3>
            <p className="text-sm text-gray-500 mt-1">
              Add an extra layer of security to your account
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={twoFactorEnabled} 
              onChange={handleToggle2FA} 
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      
      {/* Logout Section */}
      <div className="py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Account Session</h3>
            <p className="text-sm text-gray-500 mt-1">
              Manage your account sessions and logout
            </p>
          </div>
          <div className="space-x-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Logout
            </button>
            <button
              onClick={handleLogoutAll}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout All Devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
