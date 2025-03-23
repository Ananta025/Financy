import React from 'react'

export default function Dashboard() {
  return (
    <div>
    <div className='flex justify-between items-center gap-4 py-5 px-36 '>
      <h1 className='text-2xl font-medium py-5'>Hello Ananta!</h1>
      <div className='flex justify-end gap-4'>
      <div className='flex border-2 border-gray-200 rounded-lg gap-2 px-2 py-1'>
        <a href="" className='border-r-2 border-gray-300 px-1 active:text-blue-500 '>This month</a>
        <a href="" className='border-r-2 border-gray-300 px-1'>Last month</a>
        <a href="" className='border-r-2 border-gray-300 px-1'>This year</a>
        <a href="">Last 12 months</a>
      </div>
      <a href="" className='border-2 border-gray-300 flex gap-2 items-center px-2 py-1 rounded-lg'> <i className="fa-regular fa-calendar-days"></i>Select period</a>
      </div>
    </div>


    <div className="components gap-12 py-5 px-40 flex justify-between">
        <div className="elements bg-white rounded-lg p-3 border-2 border-gray-300 w-1/3">
            <h5 className='mb-3'>Balance</h5>
            <div className='flex justify-between items-center gap-4 '>
                <h1 className='text-3xl font-medium'>$2,562.00</h1>
                <p>+$5.00 Today</p>
            </div>
        </div>
        <div className="elements bg-white rounded-lg p-3 border-2 border-gray-300 w-1/3">
            <h5 className='mb-3'>Holdings</h5>
            <div className='flex justify-between items-center gap-4 '>
                <h1 className='text-3xl font-medium'>$2,562.00</h1>
                <p>+$5.00 Today</p>
            </div>
        </div>
        <div className="elements bg-white rounded-lg p-3 border-2 border-gray-300 w-1/3">
            <h5 className='mb-3'>Mutual Funds</h5>
            <div className='flex justify-between items-center gap-4 '>
                <h1 className='text-3xl font-medium'>$2,562.00</h1>
                <p>+$5.00 Today</p>
            </div>
        </div>
    </div>


    <div className='flex justify-between items-center gap-12 py-3 px-40 '>
        <div className='flex  items-center gap-6 border-2 border-gray-300 rounded-lg p-3 w-1/3'>
            <h5 className='p-2 bg-green-300 rounded-md cursor-pointer'><i className="fa-solid fa-plus text-lg"></i></h5>
            <div className="paragraph">
                <p className='text-lg font-medium'>Recent Transections</p>
                <p>Invest Money on trades</p>
            </div>
        </div>
        <div className='flex items-center gap-6 border-2 border-gray-300 rounded-lg p-3 w-1/3'>
            <h5 className='p-2 bg-red-300 rounded-md cursor-pointer'><i className="fa-solid fa-minus"></i></h5>
            <div className="paragraph">
                <p className='text-lg font-medium'>Add expences</p>
                <p>Create an expence manually</p>
            </div>
        </div>
        <div className='flex items-center gap-6 border-2 border-gray-300 rounded-lg p-3 w-1/3'>
            <h5 className='p-2 bg-blue-300 rounded-md cursor-pointer'><i className="fa-solid fa-arrow-right-arrow-left"></i></h5>
            <div className="paragraph">
                <p className='text-lg font-medium'>Transfer money</p>
                <p className='text-sm'>Select the amount and make a transfer</p>
            </div>
        </div>
    </div>


    <div className='flex px-40 gap-4 py-5'>
        <div className='w-1/3 border-2 border-gray-300 rounded-lg flex flex-col items-center p-3'>
        <h4 className='text-lg font-medium mb-5'>Expences by catagory</h4>
        <img className='w-50' src="\images\Pie Chart.svg" alt="" />
        <div className='flex justify-between gap-4 items-center bg-white p-2 border-b-2 border-gray-300 w-full'>
            <div className='flex gap-2'>
                <p className='bg-green-400 text-white p-1 rounded-full w-8 h-8 text-center'><i className="fa-solid fa-house"></i></p>  
                <h5 className='text-lg font-medium'>House</h5>
            </div>  
            <p>41.35%</p>
        </div>
        <div className='flex justify-between gap-4 items-center bg-white p-2 border-b-2 border-gray-300 w-full'>
            <div className='flex gap-2'>
                <p className='bg-green-400 text-white p-1 rounded-full w-8 h-8 text-center'><i className="fa-solid fa-house"></i></p>  
                <h5 className='text-lg font-medium'>House</h5>
            </div>  
            <p>41.35%</p>
        </div>
        <div className='flex justify-between gap-4 items-center bg-white p-2 border-b-2 border-gray-300 w-full'>
            <div className='flex gap-2'>
                <p className='bg-green-400 text-white p-1 rounded-full w-8 h-8 text-center'><i className="fa-solid fa-house"></i></p>  
                <h5 className='text-lg font-medium'>House</h5>
            </div>  
            <p>41.35%</p>
        </div>
        <div className='flex justify-between gap-4 items-center bg-white p-2 border-b-2 border-gray-300 w-full'>
            <div className='flex gap-2'>
                <p className='bg-green-400 text-white p-1 rounded-full w-8 h-8 text-center'><i className="fa-solid fa-house"></i></p>  
                <h5 className='text-lg font-medium'>House</h5>
            </div>  
            <p>41.35%</p>
        </div>
        <div className='flex justify-between gap-4 items-center bg-white p-2 w-full'>
            <div className='flex gap-2'>
                <p className='bg-green-400 text-white p-1 rounded-full w-8 h-8 text-center'><i className="fa-solid fa-house"></i></p>  
                <h5 className='text-lg font-medium'>House</h5>
            </div>  
            <p>41.35%</p>
        </div>
        </div>


        <div className='w-2/3 '>
            <div className="border-2 border-gray-300 rounded-lg p-3">
                <h4 className="mb-3">Transaction History</h4>
                <table className="w-full">
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
                            <td className="py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Completed</span></td>
                        </tr>
                        <tr className="border-b-2 border-gray-200">
                            <td className="py-2">10 Apr 2023</td>
                            <td className="py-2">Dividend Payment</td>
                            <td className="py-2">Income</td>
                            <td className="py-2 text-green-500">+$125.50</td>
                            <td className="py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Completed</span></td>
                        </tr>
                        <tr className="border-b-2 border-gray-200">
                            <td className="py-2">05 Apr 2023</td>
                            <td className="py-2">Mutual Fund</td>
                            <td className="py-2">Investment</td>
                            <td className="py-2 text-red-500">-$750.00</td>
                            <td className="py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Completed</span></td>
                        </tr>
                        <tr className="border-b-2 border-gray-200">
                            <td className="py-2">01 Apr 2023</td>
                            <td className="py-2">Stock Sale</td>
                            <td className="py-2">Income</td>
                            <td className="py-2 text-green-500">+$320.75</td>
                            <td className="py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Completed</span></td>
                        </tr>
                        <tr className="border-b-2 border-gray-200">
                            <td className="py-2">28 Mar 2023</td>
                            <td className="py-2">ETF Purchase</td>
                            <td className="py-2">Investment</td>
                            <td className="py-2 text-red-500">-$425.00</td>
                            <td className="py-2"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">Pending</span></td>
                        </tr>
                        <tr className="border-b-2 border-gray-200">
                            <td className="py-2">25 Mar 2023</td>
                            <td className="py-2">Deposit</td>
                            <td className="py-2">Transfer</td>
                            <td className="py-2 text-green-500">+$1000.00</td>
                            <td className="py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Completed</span></td>
                        </tr>
                        <tr>
                            <td className="py-2">20 Mar 2023</td>
                            <td className="py-2">Bond Interest</td>
                            <td className="py-2">Income</td>
                            <td className="py-2 text-green-500">+$85.25</td>
                            <td className="py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Completed</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>




    </div>
  )
}
