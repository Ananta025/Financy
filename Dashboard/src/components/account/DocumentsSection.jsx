import React, { useState } from 'react';

export default function DocumentsSection() {
  const [documents] = useState([
    {
      id: 1,
      name: 'Tax Report FY 2023-24',
      type: 'PDF',
      size: '1.2 MB',
      date: 'Apr 15, 2023',
    },
    {
      id: 2,
      name: 'Monthly Statement - Mar 2023',
      type: 'PDF',
      size: '850 KB',
      date: 'Apr 02, 2023',
    },
    {
      id: 3,
      name: 'Contract Notes - Q1 2023',
      type: 'PDF',
      size: '1.5 MB',
      date: 'Mar 31, 2023',
    },
    {
      id: 4,
      name: 'Monthly Statement - Feb 2023',
      type: 'PDF',
      size: '820 KB',
      date: 'Mar 03, 2023',
    },
    {
      id: 5,
      name: 'Portfolio Performance Report',
      type: 'PDF',
      size: '2.1 MB',
      date: 'Feb 15, 2023',
    }
  ]);
  
  const handleDownload = (document) => {
    // This would be replaced with actual download functionality
    alert(`Downloading ${document.name}`);
  };
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Documents & Reports</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((document) => (
              <tr key={document.id} className="hover:bg-gray-50">
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {document.name}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {document.type}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {document.size}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {document.date}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-right text-sm">
                  <button 
                    onClick={() => handleDownload(document)}
                    className="text-blue-600 hover:text-blue-900 flex items-center justify-end gap-1"
                  >
                    <span>Download</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {documents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No documents available</p>
        </div>
      )}
    </div>
  );
}
