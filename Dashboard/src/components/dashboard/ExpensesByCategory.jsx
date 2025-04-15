import React from 'react'
import { DoughnoutChart } from '../DoughnoutChart'

export default function ExpensesByCategory() {
  // Define categories with their data
  const categories = [
    { name: 'House', percentage: 41.35, color: '#4ade80', icon: 'fa-house', background: 'bg-green-400' },
    { name: 'Transport', percentage: 25.18, color: '#60a5fa', icon: 'fa-car', background: 'bg-blue-400' },
    { name: 'Food', percentage: 18.29, color: '#facc15', icon: 'fa-utensils', background: 'bg-yellow-400' },
    { name: 'Health', percentage: 10.72, color: '#f87171', icon: 'fa-heart-pulse', background: 'bg-red-400' },
    { name: 'Entertainment', percentage: 4.46, color: '#c084fc', icon: 'fa-gamepad', background: 'bg-purple-400' }
  ];

  // Format data for the chart
  const chartData = {
    labels: categories.map(cat => cat.name),
    datasets: [
      {
        data: categories.map(cat => cat.percentage),
        backgroundColor: categories.map(cat => cat.color),
        borderColor: categories.map(cat => cat.color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='w-full lg:w-1/3 border-2 border-gray-300 rounded-lg flex flex-col items-center p-3 mb-4 lg:mb-0'>
      <h4 className='text-lg font-medium mb-5'>Expences by catagory</h4>
      <div className='w-full max-w-[250px] h-[250px] mb-4'>
        <DoughnoutChart data={chartData} />
      </div>
      
      {/* Generate category items dynamically */}
      {categories.map((category, index) => (
        <div key={index} className={`flex justify-between gap-4 items-center bg-white p-2 w-full ${
          index !== categories.length - 1 ? 'border-b-2 border-gray-300' : ''
        }`}>
          <div className='flex gap-2 items-center'>
            <p className={`${category.background} text-white p-1 rounded-full w-8 h-8 text-center flex items-center justify-center`}>
              <i className={`fa-solid ${category.icon}`}></i>
            </p>  
            <h5 className='text-base md:text-lg font-medium'>{category.name}</h5>
          </div>  
          <p>{category.percentage}%</p>
        </div>
      ))}
    </div>
  )
}
