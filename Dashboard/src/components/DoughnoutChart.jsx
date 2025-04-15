import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useMediaQuery, useTheme } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnoutChart({ data }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'right',
        align: isMobile ? 'center' : 'center',
        labels: {
          boxWidth: isMobile ? 10 : 12,
          padding: isMobile ? 10 : 15,
          font: {
            size: isMobile ? 9 : 11
          }
        },
        maxHeight: isMobile ? 60 : undefined,
        maxWidth: isMobile ? undefined : 120
      },
      tooltip: {
        bodyFont: {
          size: isMobile ? 10 : 12
        },
        titleFont: {
          size: isMobile ? 11 : 13
        },
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = `₹${Number(context.raw).toFixed(2)}`;
            const dataset = context.dataset;
            const total = dataset.data.reduce((acc, data) => acc + data, 0);
            const percentage = Math.round((context.raw / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: isMobile ? '65%' : '70%',
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  };

  return <Doughnut data={data} options={options} />;
}
