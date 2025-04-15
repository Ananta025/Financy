import React, { useState } from 'react';

export default function SecuritySettings() {
  const [changePassword, setChangePassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const handlePasswordChange = (e) => {
    setChangePassword({
      ...changePassword,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    
    // Validation
    if (!changePassword.currentPassword) {
      alert("Please enter your current password");
      return;
    }
    
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    
    // This would be replaced with an actual API call
    alert("Password changed successfully!");
    
    // Reset form
    setChangePassword({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    
    // This would be replaced with an actual API call
    if (!twoFactorEnabled) {
      alert("2FA would be enabled here. In a real app, this would show a QR code or send a verification code.");
    } else {
      alert("2FA disabled");
    }
  };
  
  const handleLogoutAll = () => {
    alert("This would log you out from all devices");
  };
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
      
      {/* Change Password Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Change Password</h3>
        <form onSubmit={handleSubmitPassword}>
          <div className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                value={changePassword.currentPassword}
                onChange={handlePasswordChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                value={changePassword.newPassword}
                onChange={handlePasswordChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={changePassword.confirmPassword}
                onChange={handlePasswordChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full md:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Password
              </button>
            </div>
          </div>
        </form>
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
      
      {/* Logout from all devices */}
      <div className="py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Active Sessions</h3>
            <p className="text-sm text-gray-500 mt-1">
              Log out from all devices except this one
            </p>
          </div>
          <button
            onClick={handleLogoutAll}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout All Devices
          </button>
        </div>
      </div>
    </div>
  );
}
