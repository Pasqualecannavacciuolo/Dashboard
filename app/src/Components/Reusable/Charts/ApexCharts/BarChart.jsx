import React, { Component } from "react";
import Chart from "react-apexcharts";

class ApexBarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ['#1A936F', '#CA3C25'],
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: props.chartData.map((data) => data.year)
        }
      },
      series: [
        {
          name: "Utenti ottenuti",
          data: props.chartData.map((data) => data.userGain),
        },
        {
            name: "Utenti persi",
            data: props.chartData.map((data) => data.userLost)
          }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="100%"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ApexBarChart;