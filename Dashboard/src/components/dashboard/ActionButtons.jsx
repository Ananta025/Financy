import React from 'react'

export default function ActionButtons() {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 lg:gap-12 py-3 px-4 md:px-8 lg:px-16'>
      <div className='flex items-center gap-4 md:gap-6 border-2 border-gray-300 rounded-lg p-3 w-full md:w-1/3 mb-4 md:mb-0'>
          <h5 className='p-2 bg-green-300 rounded-md cursor-pointer'><i className="fa-solid fa-plus text-lg"></i></h5>
          <div className="paragraph">
              <p className='text-base md:text-lg font-medium'>Recent Transections</p>
              <p className='text-sm'>Invest Money on trades</p>
          </div>
      </div>
      <div className='flex items-center gap-4 md:gap-6 border-2 border-gray-300 rounded-lg p-3 w-full md:w-1/3 mb-4 md:mb-0'>
          <h5 className='p-2 bg-red-300 rounded-md cursor-pointer'><i className="fa-solid fa-minus"></i></h5>
          <div className="paragraph">
              <p className='text-base md:text-lg font-medium'>Add expences</p>
              <p className='text-sm'>Create an expence manually</p>
          </div>
      </div>
      <div className='flex items-center gap-4 md:gap-6 border-2 border-gray-300 rounded-lg p-3 w-full md:w-1/3'>
          <h5 className='p-2 bg-blue-300 rounded-md cursor-pointer'><i className="fa-solid fa-arrow-right-arrow-left"></i></h5>
          <div className="paragraph">
              <p className='text-base md:text-lg font-medium'>Transfer money</p>
              <p className='text-sm'>Select the amount and make a transfer</p>
          </div>
      </div>
    </div>
  )
}
