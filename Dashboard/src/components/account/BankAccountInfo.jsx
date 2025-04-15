import React, { useState } from 'react';

export default function BankAccountInfo() {
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [bankAccount, setBankAccount] = useState({
    accountNumber: '********7890',
    ifscCode: 'SBIN0001234',
    accountHolder: 'Ananta Dhungana',
    bankName: 'State Bank of India'
  });
  
  const [formData, setFormData] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolder: '',
    bankName: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleAddAccount = () => {
    setIsAddingAccount(true);
  };
  
  const handleCancel = () => {
    setIsAddingAccount(false);
    setFormData({
      accountNumber: '',
      ifscCode: '',
      accountHolder: '',
      bankName: ''
    });
  };
  
  const handleSave = () => {
    // This would be replaced with actual API call
    const maskedNumber = formData.accountNumber.replace(
      /^(\d{4})(\d+)(\d{4})$/,
      (_, first, middle, last) => first + '*'.repeat(middle.length) + last
    );
    
    setBankAccount({
      accountNumber: maskedNumber.length > 8 ? maskedNumber : '********' + formData.accountNumber.slice(-4),
      ifscCode: formData.ifscCode,
      accountHolder: formData.accountHolder,
      bankName: formData.bankName
    });
    
    setIsAddingAccount(false);
    
    // Reset form
    setFormData({
      accountNumber: '',
      ifscCode: '',
      accountHolder: '',
      bankName: ''
    });
  };
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Bank Account Information</h2>
        {!isAddingAccount && (
          <button 
            onClick={handleAddAccount}
            className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
          >
            {bankAccount.accountNumber ? 'Change Account' : 'Add Account'}
          </button>
        )}
      </div>
      
      {isAddingAccount ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
              <input
                type="text"
                name="bankName"
                id="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="Enter bank name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="accountHolder" className="block text-sm font-medium text-gray-700">Account Holder Name</label>
              <input
                type="text"
                name="accountHolder"
                id="accountHolder"
                value={formData.accountHolder}
                onChange={handleChange}
                placeholder="Enter account holder name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                id="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Enter account number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                id="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                placeholder="Enter IFSC code"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
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
              Save Account
            </button>
          </div>
        </div>
      ) : bankAccount.accountNumber ? (
        <div className="space-y-4 bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Bank Name</p>
              <p className="font-medium">{bankAccount.bankName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Account Holder</p>
              <p className="font-medium">{bankAccount.accountHolder}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Account Number</p>
              <p className="font-medium">{bankAccount.accountNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">IFSC Code</p>
              <p className="font-medium">{bankAccount.ifscCode}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-6 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <p className="text-gray-500 mb-3">No bank account linked yet</p>
          <button 
            onClick={handleAddAccount}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add Bank Account
          </button>
        </div>
      )}
    </div>
  );
}
