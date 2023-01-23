import React, { Component } from "react";
import Chart from "react-apexcharts";

class ApeDonutChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ['#7E78D2', '#2892D7', '#E84855'],
        chart: {
          id: "basic-donut"
        },
        labels: props.chartData.labels
      },
      series: props.chartData.datasets[0].data.map(data => data)
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
              type="donut"
              width="100%"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ApeDonutChart;