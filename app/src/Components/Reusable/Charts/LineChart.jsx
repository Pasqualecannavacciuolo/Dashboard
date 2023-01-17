import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Totale vendite divise per anno',
      },
    },
  };
  
  function LineChart({ chartData }) {
    return <Line data={chartData} options={options} />;
  }
  
  export default LineChart;