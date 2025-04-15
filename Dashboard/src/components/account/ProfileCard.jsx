import React, { useState } from 'react';

export default function ProfileCard() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Ananta Chandra Das',
    email: 'ananta.dhun@example.com',
    mobile: '+91 9876543210',
  });
  
  const [formData, setFormData] = useState({...profile});
  
  const handleEdit = () => {
    setEditing(true);
  };
  
  const handleCancel = () => {
    setEditing(false);
    setFormData({...profile});
  };
  
  const handleSave = () => {
    setProfile({...formData});
    setEditing(false);
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 overflow-ellipsis"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 overflow-ellipsis"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 overflow-ellipsis"
                />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button 
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Save Changes
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
                  <p className="break-words">{profile.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="break-words">{profile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mobile Number</p>
                  <p className="break-words">{profile.mobile}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
