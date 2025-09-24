import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ProfileCard() {
  const { user, updateUserProfile, isLoading: authLoading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  
  const [formData, setFormData] = useState({...profile});

  // Update profile state when user data changes
  useEffect(() => {
    if (user) {
      const newProfile = {
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '', // This might need to be added to backend model
      };
      setProfile(newProfile);
      setFormData(newProfile);
    }
  }, [user]);
  
  const handleEdit = () => {
    setEditing(true);
  };
  
  const handleCancel = () => {
    setEditing(false);
    setFormData({...profile});
  };
  
  const handleSave = async () => {
    try {
      setIsUpdating(true);
      await updateUserProfile(formData);
      setProfile({...formData});
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 overflow-hidden">
      <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
      
      {authLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden mb-2">
              <img 
                src="/images/Avatar.png" 
                alt="User profile" 
                className="w-full h-full object-cover"
              />
            </div>
            {!editing && (
              <button 
                className="text-blue-600 text-sm hover:text-blue-800"
                onClick={() => alert('Image upload functionality would go here')}
              >
                Change Photo
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-hidden">
            {editing ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isUpdating}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 overflow-ellipsis disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isUpdating}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 overflow-ellipsis disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    disabled={isUpdating}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 overflow-ellipsis disabled:bg-gray-100"
                  />
                </div>
                <div className="flex gap-3 justify-end pt-2">
                  <button 
                    onClick={handleCancel}
                    disabled={isUpdating}
                    className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {isUpdating && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    )}
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Personal Details</h3>
                  <button 
                    onClick={handleEdit}
                    className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                  >
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="break-words">{profile.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="break-words">{profile.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="break-words">{profile.mobile || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
