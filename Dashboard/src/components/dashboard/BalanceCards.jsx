import React from 'react'

export default function BalanceCards() {
  return (
    <div className="components gap-4 md:gap-6 lg:gap-12 py-4 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row justify-between">
      <div className="elements bg-white rounded-lg p-3 border-2 border-gray-300 w-full md:w-1/3 mb-4 md:mb-0">
          <h5 className='mb-3'>Balance</h5>
          <div className='flex justify-between items-center gap-2 md:gap-4'>
              <h1 className='text-xl md:text-3xl font-medium'>$2,562.00</h1>
              <p className='text-sm md:text-base'>+$5.00 Today</p>
          </div>
      </div>
      <div className="elements bg-white rounded-lg p-3 border-2 border-gray-300 w-full md:w-1/3 mb-4 md:mb-0">
          <h5 className='mb-3'>Holdings</h5>
          <div className='flex justify-between items-center gap-2 md:gap-4'>
              <h1 className='text-xl md:text-3xl font-medium'>$2,562.00</h1>
              <p className='text-sm md:text-base'>+$5.00 Today</p>
          </div>
      </div>
      <div className="elements bg-white rounded-lg p-3 border-2 border-gray-300 w-full md:w-1/3">
          <h5 className='mb-3'>Mutual Funds</h5>
          <div className='flex justify-between items-center gap-2 md:gap-4'>
              <h1 className='text-xl md:text-3xl font-medium'>$2,562.00</h1>
              <p className='text-sm md:text-base'>+$5.00 Today</p>
          </div>
      </div>
    </div>
  )
}
