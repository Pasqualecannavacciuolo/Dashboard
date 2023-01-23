import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


export const options = {
    responsive: true,
    tension: 0.3,
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: false,
        text: 'Totale vendite divise per anno',
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };
  
  function LineChart({ chartData }) {
    return <Line data={chartData} options={options} />;
  }
  
  export default LineChart;