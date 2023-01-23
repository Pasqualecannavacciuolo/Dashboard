import React, { Component } from "react";
import Chart from "react-apexcharts";

class ApexAreaChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: [props.color],
        stroke: {
            curve: 'smooth'
        },
        dataLabels: {
            enabled: false
        },
        chart: {
          id: "basic-area",
          zoom: {
            enabled: false
          }
        },
        xaxis: {
          categories: props.chartData.labels
        }
      },
      series: [
        {
          name: "Followes totali",
          data: props.chartData.datasets[0].data,
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
              type="area"
              width="100%"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ApexAreaChart;