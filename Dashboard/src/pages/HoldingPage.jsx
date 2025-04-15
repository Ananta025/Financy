import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { VerticalGraph } from '../components/VerticalGraph'
import { Box, Typography, useMediaQuery, useTheme, CircularProgress, Alert, Paper } from '@mui/material'
import { DoughnoutChart } from '../components/DoughnoutChart'
import { holdings } from '../Data/Data' // Import the local data

export default function HoldingPage() {
  const [allHoldings, setAllHoldings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    setLoading(true)
    setError(null)
    
    // Try to fetch from API first
    axios.get("http://localhost:3000/allholdings")
      .then((res) => {
        setAllHoldings(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log("API Error:", err)
        // Fallback to local data if API fails
        console.log("Using local holdings data as fallback")
        setAllHoldings(holdings)
        setLoading(false)
      })
  }, [])

  // Only prepare chart data if holdings are available
  const chartData = React.useMemo(() => {
    if (!allHoldings.length) return null;
    
    const labels = allHoldings.map((stock) => stock.name);
    
    // Vertical chart data
    const verticalChartData = {
      labels,
      datasets: [
        {
          label: "Stock price",
          data: allHoldings.map((stock) => stock.price),
          backgroundColor: "rgba(255, 99, 132, 0.7)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
        }
      ]
    };
    
    // Doughnut chart data
    const doughnutData = {
      labels,
      datasets: [
        {
          label: 'Portfolio Distribution',
          data: allHoldings.map((stock) => stock.price * stock.qty),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(201, 203, 207, 0.7)',
            'rgba(255, 138, 101, 0.7)',
            'rgba(121, 85, 72, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(201, 203, 207, 1)',
            'rgba(255, 138, 101, 1)',
            'rgba(121, 85, 72, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    
    return { verticalChartData, doughnutData };
  }, [allHoldings]);

  // Calculate total portfolio value
  const totalPortfolioValue = allHoldings.reduce(
    (sum, stock) => sum + stock.price * stock.qty, 0
  ).toFixed(2);

  return (
    <Box 
      id="holding-page"
      sx={{ 
        padding: { xs: '12px', sm: '20px', md: '32px' },
        maxWidth: '100%'
      }}
    >
      <Typography 
        variant={isMobile ? 'h5' : 'h4'} 
        component="h3" 
        sx={{ 
          fontWeight: 'bold', 
          mb: { xs: 2, sm: 3, md: 4 } 
        }}
      >
        Your holdings {!loading && `(${allHoldings.length})`}
      </Typography>
      
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress size={isMobile ? 40 : 60} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      ) : (
        <Box className="holding-area">
          {/* Responsive Table Section */}
          <Paper 
            elevation={2}
            sx={{ 
              overflowX: 'auto',
              mb: 4,
              borderRadius: '8px'
            }} 
            className="holdings"
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '500px' : '100%' }}>
              <thead>
                <tr style={{ backgroundColor: theme.palette.grey[100] }}>
                  <th style={{ padding: '10px 16px', textAlign: 'left', whiteSpace: 'nowrap' }}>Stock</th>
                  {!isMobile && <th style={{ padding: '10px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>Qty</th>}
                  {!isMobile && <th style={{ padding: '10px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>Avg.</th>}
                  <th style={{ padding: '10px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>LTP</th>
                  <th style={{ padding: '10px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>Curr. Val</th>
                  <th style={{ padding: '10px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>P & L</th>
                  {!isTablet && <th style={{ padding: '10px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>Net chg.</th>}
                  {!isMobile && <th style={{ padding: '10px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>Day chg.</th>}
                </tr>
              </thead>
              <tbody>
                {allHoldings.map((stock, index) => {
                  const currPrice = stock.price * stock.qty;
                  const isProfit = currPrice - stock.avg * stock.qty >= 0.0;
                  const profitClass = isProfit ? "text-green-600" : "text-red-600";
                  const dayClass = stock.day && stock.day[0] === "+" ? "text-green-600" : "text-red-600";

                  return (
                    <tr 
                      key={index} 
                      style={{ 
                        borderBottom: `1px solid ${theme.palette.grey[200]}`,
                        backgroundColor: index % 2 === 0 ? 'white' : theme.palette.grey[50]
                      }}
                    >
                      <td style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 500 }}>{stock.name}</td>
                      {!isMobile && <td style={{ padding: '12px 16px', textAlign: 'right' }}>{stock.qty}</td>}
                      {!isMobile && <td style={{ padding: '12px 16px', textAlign: 'right' }}>{stock.avg}</td>}
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>{stock.price}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>{currPrice.toFixed(2)}</td>
                      <td style={{ 
                        padding: '12px 16px', 
                        textAlign: 'right', 
                        color: isProfit ? theme.palette.success.main : theme.palette.error.main,
                        fontWeight: 500
                      }}>
                        {(currPrice - stock.avg * stock.qty).toFixed(2)}
                      </td>
                      {!isTablet && (
                        <td style={{ 
                          padding: '12px 16px', 
                          textAlign: 'right',
                          color: isProfit ? theme.palette.success.main : theme.palette.error.main
                        }}>
                          {stock.net}
                        </td>
                      )}
                      {!isMobile && (
                        <td style={{ 
                          padding: '12px 16px', 
                          textAlign: 'right',
                          color: stock.day && stock.day[0] === "+" ? theme.palette.success.main : theme.palette.error.main
                        }}>
                          {stock.day}
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Paper>

          {/* Portfolio Summary and Charts */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr',
              md: '1fr 1fr'
            },
            gap: { xs: 3, md: 4 },
          }}>
            {/* Portfolio Summary */}
            <Paper elevation={2} sx={{
              padding: { xs: 2, sm: 3 },
              borderRadius: '8px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Portfolio Summary</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Total Value: <strong>₹{totalPortfolioValue}</strong>
              </Typography>
              <Box sx={{ 
                flexGrow: 1, 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: { xs: '200px', sm: '250px', md: '280px' } 
              }}>
                {chartData && <DoughnoutChart data={chartData.doughnutData} />}
              </Box>
            </Paper>

            {/* Stock Price Chart */}
            <Paper elevation={2} sx={{
              padding: { xs: 2, sm: 3 },
              borderRadius: '8px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Stock Prices</Typography>
              <Box sx={{ 
                flexGrow: 1, 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: { xs: '200px', sm: '250px', md: '280px' } 
              }}>
                {chartData && <VerticalGraph data={chartData.verticalChartData} />}
              </Box>
            </Paper>
          </Box>
        </Box>
      )}
    </Box>
  );
}