import React, { useState } from 'react';

export default function PreferencesSection() {
  const [preferences, setPreferences] = useState({
    language: 'english',
    notifications: {
      email: {
        marketUpdates: true,
        accountActivity: true,
        promotions: false
      },
      push: {
        tradeAlerts: true,
        priceAlerts: true,
        news: true
      }
    }
  });
  
  const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' }
  ];
  
  const handleLanguageChange = (e) => {
    setPreferences({
      ...preferences,
      language: e.target.value
    });
  };
  
  const handleNotificationChange = (channel, setting) => {
    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [channel]: {
          ...preferences.notifications[channel],
          [setting]: !preferences.notifications[channel][setting]
        }
      }
    });
  };
  
  const handleSavePreferences = () => {
    // This would be replaced with an actual API call
    alert("Preferences saved successfully!");
  };
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Preferences</h2>
      
      {/* Language Preferences */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Language Settings</h3>
        <div className="max-w-xs">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">Select Language</label>
          <select
            id="language"
            name="language"
            value={preferences.language}
            onChange={handleLanguageChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Notification Preferences */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Notification Settings</h3>
        
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">Email Notifications</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="marketUpdates"
                name="marketUpdates"
                type="checkbox"
                checked={preferences.notifications.email.marketUpdates}
                onChange={() => handleNotificationChange('email', 'marketUpdates')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="marketUpdates" className="ml-3 block text-sm font-medium text-gray-700">
                Market Updates
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="accountActivity"
                name="accountActivity"
                type="checkbox"
                checked={preferences.notifications.email.accountActivity}
                onChange={() => handleNotificationChange('email', 'accountActivity')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="accountActivity" className="ml-3 block text-sm font-medium text-gray-700">
                Account Activity
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="promotions"
                name="promotions"
                type="checkbox"
                checked={preferences.notifications.email.promotions}
                onChange={() => handleNotificationChange('email', 'promotions')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="promotions" className="ml-3 block text-sm font-medium text-gray-700">
                Promotional Offers
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-md font-medium mb-2">Push Notifications</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="tradeAlerts"
                name="tradeAlerts"
                type="checkbox"
                checked={preferences.notifications.push.tradeAlerts}
                onChange={() => handleNotificationChange('push', 'tradeAlerts')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="tradeAlerts" className="ml-3 block text-sm font-medium text-gray-700">
                Trade Alerts
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="priceAlerts"
                name="priceAlerts"
                type="checkbox"
                checked={preferences.notifications.push.priceAlerts}
                onChange={() => handleNotificationChange('push', 'priceAlerts')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="priceAlerts" className="ml-3 block text-sm font-medium text-gray-700">
                Price Alerts
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="news"
                name="news"
                type="checkbox"
                checked={preferences.notifications.push.news}
                onChange={() => handleNotificationChange('push', 'news')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="news" className="ml-3 block text-sm font-medium text-gray-700">
                News & Updates
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <button
          onClick={handleSavePreferences}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
