<template>
  <div>
    <apexchart :width="width" :height="510" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: 'MultiLineChart',
  data() {
    return {
      // Chart Width
      width: window.innerWidth - 40,

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
          },
          events: {}
        },
        // Line colors
        colors: ['#1474f5', '#f0443d', '#f5a635'],

        dataLabels: {
          enabled: false
        },

        // Values on the bottom horizontal line of the chart
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        },

        // Left Vertical Line data of chart
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: '#008FFB'
            },
            labels: {
              style: {
                colors: '#008FFB'
              }
            },
            tooltip: {
              enabled: true
            }
          }
        ]
      },

      //  The indicators showed in the chart and their values
      series: [
        {
          name: 'Income',
          data: [5, 5.5, 4.7, 5.6, 6.4, 5.9, 6.5, 7.5]
        },
        {
          name: 'Revenue',
          data: [5.5, 4.5, 5, 5.9, 6.7, 5, 5.5, 8.5]
        }
      ]
    };
  },
  // Resizing the chart on window resize
  methods: {
    resizeChart(e) {
      this.width = window.innerWidth - 40;
    }
  },
  created() {
    window.addEventListener('resize', this.resizeChart);
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeChart);
  }
};
</script>

<style>
</style>