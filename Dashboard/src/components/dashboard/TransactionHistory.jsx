import React from 'react'

export default function TransactionHistory() {
  return (
    <div className='w-full lg:w-2/3'>
      <div className="border-2 border-gray-300 rounded-lg p-3">
          <h4 className="mb-3 font-medium">Transaction History</h4>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
                <tbody>
                    <tr className="border-b-2 border-gray-200">
                        <td colSpan="5" className="py-2"></td>
                    </tr>
                    <tr className="border-b-2 border-gray-200">
                        <td className="py-2 font-medium">Date</td>
                        <td className="py-2 font-medium">Description</td>
                        <td className="py-2 font-medium">Category</td>
                        <td className="py-2 font-medium">Amount</td>
                        <td className="py-2 font-medium">Status</td>
                    </tr>
                    <tr className="border-b-2 border-gray-200">
                        <td className="py-2">12 Apr 2023</td>
                        <td className="py-2">Stock Purchase</td>
                        <td className="py-2">Investment</td>
                        <td className="py-2 text-red-500">-$500.00</td>
                        <td className="py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs md:text-sm">Completed</span></td>
                    </tr>
                    <tr className="border-b-2 border-gray-200">
                        <td className="py-2">10 Apr 2023</td>
                        <td className="py-2">Dividend Payment</td>
                        <td className="py-2">Income</td>
                        <td className="py-2 text-green-500">+$125.50</td>
                        <td className="py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs md:text-sm">Completed</span></td>
                    </tr>
                    <tr className="border-b-2 border-gray-200">
                        <td className="py-2">05 Apr 2023</td>
                        <td className="py-2">Mutual Fund</td>
                        <td className="py-2">Investment</td>
                        <td className="py-2 text-red-500">-$750.00</td>
                        <td className="py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs md:text-sm">Completed</span></td>
                    </tr>
                    <tr className="border-b-2 border-gray-200">
                        <td className="py-2">01 Apr 2023</td>
                        <td className="py-2">Stock Sale</td>
                        <td className="py-2">Income</td>
                        <td className="py-2 text-green-500">+$320.75</td>
                        <td className="py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs md:text-sm">Completed</span></td>
                    </tr>
                    <tr className="border-b-2 border-gray-200">
                        <td className="py-2">28 Mar 2023</td>
                        <td className="py-2">ETF Purchase</td>
                        <td className="py-2">Investment</td>
                        <td className="py-2 text-red-500">-$425.00</td>
                        <td className="py-2"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs md:text-sm">Pending</span></td>
                    </tr>
                    <tr className="border-b-2 border-gray-200">
                        <td className="py-2">25 Mar 2023</td>
                        <td className="py-2">Deposit</td>
                        <td className="py-2">Transfer</td>
                        <td className="py-2 text-green-500">+$1000.00</td>
                        <td className="py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs md:text-sm">Completed</span></td>
                    </tr>
                    <tr>
                        <td className="py-2">20 Mar 2023</td>
                        <td className="py-2">Bond Interest</td>
                        <td className="py-2">Income</td>
                        <td className="py-2 text-green-500">+$85.25</td>
                        <td className="py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs md:text-sm">Completed</span></td>
                    </tr>
                </tbody>
            </table>
          </div>
      </div>
    </div>
  )
}
