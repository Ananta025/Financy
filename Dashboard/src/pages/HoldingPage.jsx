import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { VerticalGraph } from '../components/VerticalGraph.jsx'
import { Box, Typography, CircularProgress, Alert } from '@mui/material'
import { DoughnoutChart } from '../components/DoughnoutChart'
import { holdings } from '../Data/Data' // Import the local data
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function HoldingPage() {
  const [allHoldings, setAllHoldings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  })
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    sector: 'all',
    performance: 'all'
  })

  // Sectors for filter dropdown
  const sectors = useMemo(() => {
    if (!allHoldings.length) return ['All'];
    const uniqueSectors = ['All', ...new Set(allHoldings.map(stock => stock.sector || 'Undefined'))];
    return uniqueSectors;
  }, [allHoldings]);

  useEffect(() => {
    setLoading(true)
    setError(null)
    
    // Try to fetch from API first
    axios.get("http://localhost:3000/allholdings")
      .then((res) => {
        // Add sector data if not present in API response
        const holdingsWithSector = res.data.map((item, index) => ({
          ...item,
          sector: item.sector || ['Technology', 'Finance', 'Healthcare', 'Consumer', 'Energy'][index % 5]
        }));
        setAllHoldings(holdingsWithSector)
        setLoading(false)
      })
      .catch((err) => {
        console.log("API Error:", err)
        // Fallback to local data if API fails, add some sectors for the demo
        const holdingsWithSector = holdings.map((item, index) => ({
          ...item,
          sector: ['Technology', 'Finance', 'Healthcare', 'Consumer', 'Energy'][index % 5]
        }));
        setAllHoldings(holdingsWithSector)
        setLoading(false)
      })
  }, [])

  // Sorting logic
  const requestSort = (key) => {
    let direction = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  // Apply sorting, filtering and search to holdings data
  const processedHoldings = useMemo(() => {
    if (!allHoldings.length) return [];
    
    // Filter first
    let result = [...allHoldings];
    
    // Apply sector filter
    if (filters.sector !== 'all') {
      result = result.filter(stock => stock.sector === filters.sector);
    }
    
    // Apply performance filter
    if (filters.performance === 'profitable') {
      result = result.filter(stock => (stock.price * stock.qty) - (stock.avg * stock.qty) >= 0);
    } else if (filters.performance === 'loss') {
      result = result.filter(stock => (stock.price * stock.qty) - (stock.avg * stock.qty) < 0);
    }
    
    // Apply search
    if (searchTerm) {
      result = result.filter(stock => 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Then sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        let valueA, valueB;
        
        // Define special sort keys
        if (sortConfig.key === 'name') {
          valueA = a.name;
          valueB = b.name;
        } else if (sortConfig.key === 'currentValue') {
          valueA = a.price * a.qty;
          valueB = b.price * b.qty;
        } else if (sortConfig.key === 'investedValue') {
          valueA = a.avg * a.qty;
          valueB = b.avg * b.qty;
        } else if (sortConfig.key === 'pnl') {
          valueA = (a.price * a.qty) - (a.avg * a.qty);
          valueB = (b.price * b.qty) - (b.avg * b.qty);
        } else if (sortConfig.key === 'pnlPercent') {
          const percA = ((a.price - a.avg) / a.avg) * 100;
          const percB = ((b.price - b.avg) / b.avg) * 100;
          valueA = percA;
          valueB = percB;
        } else {
          valueA = a[sortConfig.key];
          valueB = b[sortConfig.key];
        }
        
        if (valueA < valueB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return result;
  }, [allHoldings, sortConfig, filters, searchTerm]);

  // Calculate total portfolio values and metrics
  const portfolioMetrics = useMemo(() => {
    if (!allHoldings.length) return {
      totalInvested: 0,
      currentValue: 0,
      totalPnL: 0,
      pnlPercent: 0,
      dayChange: 0
    };
    
    const totalInvested = allHoldings.reduce((sum, stock) => sum + stock.avg * stock.qty, 0);
    const currentValue = allHoldings.reduce((sum, stock) => sum + stock.price * stock.qty, 0);
    const totalPnL = currentValue - totalInvested;
    const pnlPercent = (totalPnL / totalInvested) * 100;
    
    // Calculate day change if day property exists
    const dayChange = allHoldings.reduce((sum, stock) => {
      if (stock.day) {
        const dayChangeValue = parseFloat(stock.day.replace(/[+%]/g, ''));
        return sum + (isNaN(dayChangeValue) ? 0 : dayChangeValue);
      }
      return sum;
    }, 0);
    
    return {
      totalInvested: totalInvested.toFixed(2),
      currentValue: currentValue.toFixed(2),
      totalPnL: totalPnL.toFixed(2),
      pnlPercent: pnlPercent.toFixed(2),
      dayChange: (dayChange / allHoldings.length).toFixed(2)
    };
  }, [allHoldings]);

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!allHoldings.length) return null;
    
    const labels = allHoldings.map((stock) => stock.name);
    
    // Vertical chart data for stock prices
    const verticalChartData = {
      labels,
      datasets: [
        {
          label: "Current Price",
          data: allHoldings.map((stock) => stock.price),
          backgroundColor: "rgba(99, 102, 241, 0.7)",
          borderColor: "rgb(99, 102, 241)",
          borderWidth: 1,
        },
        {
          label: "Average Buy Price",
          data: allHoldings.map((stock) => stock.avg),
          backgroundColor: "rgba(251, 113, 133, 0.7)",
          borderColor: "rgb(251, 113, 133)",
          borderWidth: 1,
        }
      ]
    };
    
    // Doughnut chart data for portfolio allocation
    const doughnutData = {
      labels,
      datasets: [
        {
          label: 'Portfolio Allocation',
          data: allHoldings.map((stock) => stock.price * stock.qty),
          backgroundColor: [
            'rgba(99, 102, 241, 0.7)',
            'rgba(167, 139, 250, 0.7)',
            'rgba(236, 72, 153, 0.7)',
            'rgba(251, 113, 133, 0.7)',
            'rgba(251, 146, 60, 0.7)',
            'rgba(234, 179, 8, 0.7)',
            'rgba(163, 230, 53, 0.7)',
            'rgba(34, 211, 238, 0.7)',
            'rgba(125, 211, 252, 0.7)',
          ],
          borderColor: [
            'rgb(99, 102, 241)',
            'rgb(167, 139, 250)',
            'rgb(236, 72, 153)',
            'rgb(251, 113, 133)',
            'rgb(251, 146, 60)',
            'rgb(234, 179, 8)',
            'rgb(163, 230, 53)',
            'rgb(34, 211, 238)',
            'rgb(125, 211, 252)',
          ],
          borderWidth: 1,
        },
      ],
    };

    // Additional doughnut chart for sector allocation
    const sectorData = allHoldings.reduce((acc, stock) => {
      const sector = stock.sector || 'Undefined';
      const value = stock.price * stock.qty;
      
      if (!acc[sector]) {
        acc[sector] = value;
      } else {
        acc[sector] += value;
      }
      
      return acc;
    }, {});
    
    const sectorChartData = {
      labels: Object.keys(sectorData),
      datasets: [
        {
          label: 'Sector Allocation',
          data: Object.values(sectorData),
          backgroundColor: [
            'rgba(99, 102, 241, 0.7)',
            'rgba(236, 72, 153, 0.7)',
            'rgba(251, 146, 60, 0.7)',
            'rgba(163, 230, 53, 0.7)',
            'rgba(125, 211, 252, 0.7)',
          ],
          borderColor: [
            'rgb(99, 102, 241)',
            'rgb(236, 72, 153)',
            'rgb(251, 146, 60)',
            'rgb(163, 230, 53)',
            'rgb(125, 211, 252)',
          ],
          borderWidth: 1,
        },
      ],
    };
    
    return { verticalChartData, doughnutData, sectorChartData };
  }, [allHoldings]);

  // Toggle sort direction indicator
  const getSortDirectionIcon = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? 
      <ArrowDropUpIcon className="inline-block ml-1" /> : 
      <ArrowDropDownIcon className="inline-block ml-1" />;
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 md:px-8 lg:px-22 xl:px-26">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Your Holdings</h1>
        <div className="text-sm text-gray-500">
          {!loading && `${processedHoldings.length} stocks`}
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress size={60} />
        </div>
      ) : error ? (
        <Alert severity="error" className="mb-6">{error}</Alert>
      ) : (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-5 border-l-4 border-indigo-500">
              <p className="text-sm text-gray-500 mb-1">Total Invested</p>
              <h3 className="text-xl font-bold">₹{portfolioMetrics.totalInvested}</h3>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5 border-l-4 border-indigo-500">
              <p className="text-sm text-gray-500 mb-1">Current Value</p>
              <h3 className="text-xl font-bold">₹{portfolioMetrics.currentValue}</h3>
            </div>
            
            <div className={`bg-white rounded-lg shadow p-5 border-l-4 ${parseFloat(portfolioMetrics.totalPnL) >= 0 ? 'border-green-500' : 'border-red-500'}`}>
              <p className="text-sm text-gray-500 mb-1">Total P&L</p>
              <h3 className={`text-xl font-bold ${parseFloat(portfolioMetrics.totalPnL) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{portfolioMetrics.totalPnL} ({portfolioMetrics.pnlPercent}%)
              </h3>
            </div>
            
            <div className={`bg-white rounded-lg shadow p-5 border-l-4 ${parseFloat(portfolioMetrics.dayChange) >= 0 ? 'border-green-500' : 'border-red-500'}`}>
              <p className="text-sm text-gray-500 mb-1">Today's Change</p>
              <h3 className={`text-xl font-bold ${parseFloat(portfolioMetrics.dayChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {parseFloat(portfolioMetrics.dayChange) >= 0 ? '+' : ''}{portfolioMetrics.dayChange}%
              </h3>
            </div>
          </div>
          
          {/* Filters & Search Bar */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchIcon className="text-gray-400" fontSize="small" />
                </div>
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                >
                  <FilterAltIcon className="mr-2" fontSize="small" />
                  Filter
                </button>
                
                <select
                  value={filters.sector}
                  onChange={(e) => setFilters(prev => ({ ...prev, sector: e.target.value }))}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Sectors</option>
                  {sectors.filter(s => s !== 'All').map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
                
                <select
                  value={filters.performance}
                  onChange={(e) => setFilters(prev => ({ ...prev, performance: e.target.value }))}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Performance</option>
                  <option value="profitable">Profitable</option>
                  <option value="loss">Loss Making</option>
                </select>
              </div>
            </div>
            
            {filterOpen && (
              <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <select
                      value={sortConfig.key || ''}
                      onChange={(e) => requestSort(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Default</option>
                      <option value="name">Name</option>
                      <option value="currentValue">Current Value</option>
                      <option value="investedValue">Invested Value</option>
                      <option value="pnl">P&L Value</option>
                      <option value="pnlPercent">P&L %</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
                    <select
                      value={sortConfig.direction}
                      onChange={(e) => setSortConfig(prev => ({ ...prev, direction: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="ascending">Ascending</option>
                      <option value="descending">Descending</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="text-lg font-semibold mb-4">Portfolio Allocation</h3>
              <div className="h-64 md:h-80">
                {chartData && <DoughnoutChart data={chartData.doughnutData} />}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="text-lg font-semibold mb-4">Sector Allocation</h3>
              <div className="h-64 md:h-80">
                {chartData && <DoughnoutChart data={chartData.sectorChartData} />}
              </div>
            </div>
          </div>
          
          {/* Stock Price Comparison */}
          <div className="bg-white rounded-lg shadow p-5 mb-6">
            <h3 className="text-lg font-semibold mb-4">Price Comparison</h3>
            <div className="h-64 md:h-80">
              {chartData && <VerticalGraph data={chartData.verticalChartData} />}
            </div>
          </div>
          
          {/* Detailed Holdings Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('name')}
                    >
                      <span className="flex items-center">
                        Stock {getSortDirectionIcon('name')}
                      </span>
                    </th>
                    <th 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('qty')}
                    >
                      <span className="flex items-center justify-end">
                        Quantity {getSortDirectionIcon('qty')}
                      </span>
                    </th>
                    <th 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('avg')}
                    >
                      <span className="flex items-center justify-end">
                        Avg. Buy {getSortDirectionIcon('avg')}
                      </span>
                    </th>
                    <th 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('price')}
                    >
                      <span className="flex items-center justify-end">
                        LTP {getSortDirectionIcon('price')}
                      </span>
                    </th>
                    <th 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('investedValue')}
                    >
                      <span className="flex items-center justify-end">
                        Invested {getSortDirectionIcon('investedValue')}
                      </span>
                    </th>
                    <th 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('currentValue')}
                    >
                      <span className="flex items-center justify-end">
                        Current {getSortDirectionIcon('currentValue')}
                      </span>
                    </th>
                    <th 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('pnl')}
                    >
                      <span className="flex items-center justify-end">
                        P&L {getSortDirectionIcon('pnl')}
                      </span>
                    </th>
                    <th 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('pnlPercent')}
                    >
                      <span className="flex items-center justify-end">
                        P&L % {getSortDirectionIcon('pnlPercent')}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {processedHoldings.map((stock, index) => {
                    const currValue = stock.price * stock.qty;
                    const investedValue = stock.avg * stock.qty;
                    const pnl = currValue - investedValue;
                    const pnlPercent = ((stock.price - stock.avg) / stock.avg) * 100;
                    const isProfit = pnl >= 0;
                    
                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{stock.name}</div>
                              <div className="text-xs text-gray-500">{stock.sector}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          {stock.qty}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          ₹{stock.avg}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 font-medium">
                          ₹{stock.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          ₹{investedValue.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 font-medium">
                          ₹{currValue.toFixed(2)}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                          {isProfit ? '+' : ''}₹{pnl.toFixed(2)}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                          {isProfit ? '+' : ''}{pnlPercent.toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {processedHoldings.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No holdings found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}