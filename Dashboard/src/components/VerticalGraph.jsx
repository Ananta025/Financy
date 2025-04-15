import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useMediaQuery, useTheme } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function VerticalGraph({ data }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: isMobile ? 10 : 12,
          padding: isMobile ? 8 : 12,
          font: {
            size: isMobile ? 10 : 12
          }
        },
        display: !isMobile
      },
      title: {
        display: false,
      },
      tooltip: {
        bodyFont: {
          size: isMobile ? 10 : 12
        },
        titleFont: {
          size: isMobile ? 11 : 13
        },
        padding: isMobile ? 6 : 10,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `Price: ₹${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: isMobile ? 8 : isTablet ? 10 : 11
          },
          maxRotation: isMobile ? 90 : 45,
          minRotation: isMobile ? 90 : 45,
          autoSkip: true,
          maxTicksLimit: isMobile ? 6 : isTablet ? 8 : 10
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          font: {
            size: isMobile ? 9 : 11
          },
          callback: function(value) {
            return '₹' + value;
          }
        },
        beginAtZero: true
      }
    },
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 0,
        bottom: 0
      }
    },
    barPercentage: isMobile ? 0.7 : 0.8,
    categoryPercentage: 0.8
  };

  return <Bar options={options} data={data} />;
}
