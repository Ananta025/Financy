import React, { useState } from 'react';

export default function KycStatus() {
  const [documents, setDocuments] = useState({
    pan: { verified: true, filename: "PAN-ABCDE1234F.pdf" },
    aadhar: { verified: false, filename: "" },
    bank: { verified: true, filename: "Bank-Verification.pdf" }
  });
  
  const handleFileUpload = (type) => {
    // This would be replaced with actual file upload logic
    alert(`File upload functionality for ${type} would go here`);
    
    // Simulating upload
    if (type === 'aadhar') {
      setDocuments(prev => ({
        ...prev,
        aadhar: { verified: false, filename: "Aadhar-upload.pdf" }
      }));
    }
  };
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">KYC Verification</h2>
      <div className="space-y-4">
        {/* PAN Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-3 border-b">
          <div className="flex items-center gap-3 mb-2 md:mb-0">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">PAN Card</h3>
              <p className="text-sm text-gray-500">{documents.pan.filename}</p>
            </div>
          </div>
          
          <div className="flex gap-2 items-center">
            {documents.pan.verified ? (
              <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            ) : (
              <button 
                onClick={() => handleFileUpload('pan')} 
                className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              >
                Upload
              </button>
            )}
          </div>
        </div>
        
        {/* Aadhar Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-3 border-b">
          <div className="flex items-center gap-3 mb-2 md:mb-0">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Aadhar Card</h3>
              <p className="text-sm text-gray-500">
                {documents.aadhar.filename || "Not uploaded yet"}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 items-center">
            {documents.aadhar.verified ? (
              <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            ) : (
              documents.aadhar.filename ? (
                <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Pending
                </span>
              ) : (
                <button 
                  onClick={() => handleFileUpload('aadhar')} 
                  className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                >
                  Upload
                </button>
              )
            )}
          </div>
        </div>
        
        {/* Bank Account */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-3">
          <div className="flex items-center gap-3 mb-2 md:mb-0">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Bank Account</h3>
              <p className="text-sm text-gray-500">{documents.bank.filename}</p>
            </div>
          </div>
          
          <div className="flex gap-2 items-center">
            {documents.bank.verified ? (
              <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            ) : (
              <button 
                onClick={() => handleFileUpload('bank')} 
                className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              >
                Upload
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
