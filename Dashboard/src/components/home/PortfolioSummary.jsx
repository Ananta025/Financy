import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { useMediaQuery, useTheme } from '@mui/material';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const PortfolioSummary = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Sample portfolio data
  const [portfolio, setPortfolio] = useState({
    invested: 845000,
    currentValue: 921750,
    todayChange: 12500,
    todayChangePercent: 1.4,
    overallChange: 76750,
    overallChangePercent: 9.08,
  });

  // Sample chart data for portfolio performance
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        fill: true,
        label: 'Portfolio Value',
        data: [800000, 795000, 810000, 825000, 815000, 830000, 850000, 875000, 890000, 900000, 915000, 921750],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.1)',
        tension: 0.4,
        pointRadius: isMobile ? 1 : 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `₹${context.parsed.y.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: isMobile ? 8 : 10
          },
          maxRotation: 0
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: isMobile ? 8 : 10
          },
          callback: function(value) {
            return '₹' + (value / 1000) + 'K';
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  // Format currency numbers
  const formatCurrency = (value) => {
    return '₹' + value.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">Portfolio Summary</h2>
        <div className="flex gap-2">
          <button className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
            1D
          </button>
          <button className="text-xs px-3 py-1 bg-blue-600 text-white rounded-md">
            1M
          </button>
          <button className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
            3M
          </button>
          <button className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
            1Y
          </button>
          <button className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
            ALL
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <p className="text-gray-500 text-sm">Current Value</p>
          <h3 className="text-2xl font-bold text-gray-800">
            {formatCurrency(portfolio.currentValue)}
          </h3>
          <div className={`flex items-center mt-1 ${portfolio.todayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${portfolio.todayChange >= 0 ? '' : 'transform rotate-180'}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">
              {formatCurrency(Math.abs(portfolio.todayChange))} ({Math.abs(portfolio.todayChangePercent)}%) Today
            </span>
          </div>
        </div>
        
        <div>
          <p className="text-gray-500 text-sm">Invested Amount</p>
          <h3 className="text-2xl font-bold text-gray-800">
            {formatCurrency(portfolio.invested)}
          </h3>
          <div className={`flex items-center mt-1 ${portfolio.overallChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${portfolio.overallChange >= 0 ? '' : 'transform rotate-180'}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">
              {formatCurrency(Math.abs(portfolio.overallChange))} ({Math.abs(portfolio.overallChangePercent)}%) Overall
            </span>
          </div>
        </div>
        
        <div className="hidden md:block">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Day's High</p>
              <p className="font-semibold">{formatCurrency(925000)}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Day's Low</p>
              <p className="font-semibold">{formatCurrency(910000)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart area */}
      <div className="h-[200px] mt-4">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PortfolioSummary;
