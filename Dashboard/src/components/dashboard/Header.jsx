import React from 'react'

export default function Header() {
  return (
    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-3 px-4 md:px-8 lg:px-16'>
      <h1 className='text-xl md:text-2xl font-medium py-3'>Hello Ananta!</h1>
      <div className='flex flex-col sm:flex-row justify-end gap-3'>
        <div className='flex flex-wrap border-2 border-gray-200 rounded-lg gap-1 px-2 py-1'>
          <a href="" className='border-r-2 border-gray-300 px-1 active:text-blue-500 text-sm md:text-base'>This month</a>
          <a href="" className='border-r-2 border-gray-300 px-1 text-sm md:text-base'>Last month</a>
          <a href="" className='border-r-2 border-gray-300 px-1 text-sm md:text-base'>This year</a>
          <a href="" className='text-sm md:text-base'>Last 12 months</a>
        </div>
        <a href="" className='border-2 border-gray-300 flex gap-2 items-center px-2 py-1 rounded-lg text-sm md:text-base'>
          <i className="fa-regular fa-calendar-days"></i>Select period
        </a>
      </div>
    </div>
  )
}
