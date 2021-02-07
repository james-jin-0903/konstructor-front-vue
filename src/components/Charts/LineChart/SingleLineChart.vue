<template>
  <div class="line-chart">
    <apexchart
      :width="width"
      :height="510"
      :options="options"
      :series="seriesData"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: 'SingleLineChart',
  props: {
    width: Number,
    seriesData: Array
  },
  data() {
    return {
      // Options of the chart
      options: {
        // Chart configuration
        chart: {
          type: 'line',
          stacked: false,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          }
        },
        // Line colors
        colors: ['#efa259', '#f0443d', '#f5a635'],

        dataLabels: {
          enabled: false
        },
        // Values on the bottom horizontal line of the chart
        xaxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          labels: {
            style: {
              color: '#cccccc'
            }
          }
        },
        // Left Vertical Line data and configs of chart
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: false
            },
            labels: {
              style: {
                colors: '#cccccc'
              }
            },
            tooltip: {
              enabled: true
            }
          }
        ]
      },
      series: this.seriesData
    };
  }
};
</script>

<style>
.line-chart {
  margin: 1rem auto;
  border: 1px solid #cccccc;
  padding: 2rem;
}
</style>