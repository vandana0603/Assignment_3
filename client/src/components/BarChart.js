import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.range),
    datasets: [
      {
        label: 'Number of Items in Price Range',
        data: data.map(item => item.count),
        backgroundColor: '#42a5f5',
        borderColor: '#1e88e5',
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h2>Price Range Distribution</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
