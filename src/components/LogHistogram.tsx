// src/components/LogHistogram.tsx
'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Log {
  timeUnixNano: string;
}

interface LogHistogramProps {
  logs: Log[];
}

const LogHistogram: React.FC<LogHistogramProps> = ({ logs }) => {
  // Process logs to get counts per hour
  const logCountsByHour: Record<string, number> = {};

  logs.forEach((log) => {
    const date = new Date(Number(log.timeUnixNano) / 1e6); // Convert nanoseconds to milliseconds
    const hour = date.getHours();
    const label = `${hour}:00`;

    if (!logCountsByHour[label]) {
      logCountsByHour[label] = 0;
    }
    logCountsByHour[label]++;
  });

  const labels = Object.keys(logCountsByHour).sort((a, b) => parseInt(a) - parseInt(b));
  const data = labels.map((label) => logCountsByHour[label]);

  // Set up data for the chart
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Log Count',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Log Distribution by Hour',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (Hour)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Log Count',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default LogHistogram;
