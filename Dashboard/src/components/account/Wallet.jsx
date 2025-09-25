import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Wallet() {
  const { user } = useAuth();
  const [walletData, setWalletData] = useState(null);
  const [isAddingFunds, setIsAddingFunds] = useState(false);
  const [addFundAmount, setAddFundAmount] = useState('');

  // Load user's wallet data
  useEffect(() => {
    const savedWalletData = localStorage.getItem(`walletData_${user?.id}`);
    if (savedWalletData) {
      setWalletData(JSON.parse(savedWalletData));
    } else if (user?.id) {
      // Initialize empty wallet for new users
      const initialWalletData = {
        balance: 0,
        currency: 'INR',
        transactions: []
      };
      setWalletData(initialWalletData);
      localStorage.setItem(`walletData_${user?.id}`, JSON.stringify(initialWalletData));
    }
  }, [user?.id]);

  const handleAddFunds = () => {
    setIsAddingFunds(true);
  };

  const handleCancelAddFunds = () => {
    setIsAddingFunds(false);
    setAddFundAmount('');
  };

  const handleSubmitAddFunds = () => {
    const amount = parseFloat(addFundAmount);
    if (amount && amount > 0) {
      const newTransaction = {
        id: Date.now(),
        type: 'credit',
        amount: amount,
        description: 'Funds Added',
        date: new Date().toISOString(),
        status: 'completed'
      };

      const updatedWalletData = {
        ...walletData,
        balance: walletData.balance + amount,
        transactions: [newTransaction, ...walletData.transactions.slice(0, 4)] // Keep only 5 recent transactions
      };

      setWalletData(updatedWalletData);
      localStorage.setItem(`walletData_${user?.id}`, JSON.stringify(updatedWalletData));
      
      setIsAddingFunds(false);
      setAddFundAmount('');
      alert(`₹${amount} added successfully to your wallet!`);
    } else {
      alert('Please enter a valid amount');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (!walletData) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Wallet</h2>
        {!isAddingFunds && (
          <button 
            onClick={handleAddFunds}
            className="text-sm px-3 py-1 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
          >
            Add Funds
          </button>
        )}
      </div>

      {/* Wallet Balance */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-blue-100 text-sm">Available Balance</p>
            <p className="text-3xl font-bold">{formatCurrency(walletData.balance)}</p>
          </div>
          <div className="text-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
      </div>

      {/* Add Funds Section */}
      {isAddingFunds && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-medium mb-3">Add Funds to Wallet</h3>
          <div className="flex gap-3">
            <input
              type="number"
              value={addFundAmount}
              onChange={(e) => setAddFundAmount(e.target.value)}
              placeholder="Enter amount"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min="1"
              step="0.01"
            />
            <button
              onClick={handleSubmitAddFunds}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add
            </button>
            <button
              onClick={handleCancelAddFunds}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div>
        <h3 className="text-lg font-medium mb-3">Recent Transactions</h3>
        {walletData.transactions && walletData.transactions.length > 0 ? (
          <div className="space-y-3">
            {walletData.transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(transaction.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <p className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-sm">No transactions yet</p>
            <p className="text-gray-400 text-xs">Your transaction history will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}