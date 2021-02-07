<template>
  <div>
    <apexchart :width='width' :height="510" :options='options' :series='series'></apexchart>
  </div>
</template>

<script>
export default {
  name: 'SingleBarChart',
  data() {
    return {
      // Chart width
      width: window.innerWidth - 40,
      // Chart options
      options: {
        // Chart configs
        chart: {
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          }
        },
        // Line colors
        colors: ['#f5a635', '#1474f5'],

        dataLabels: {
          enabled: false
        },
        // Width Of Line
        stroke: {
          width: 3
        },
        // Data Values displayed on the bottom horizontal line of the chart
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        },
        // Data Values and vertical line displayed on the vertical left of the chart
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
      // Data values of the indicators in the Chart
      series: [
        {
          name: 'Revenue',
          type: 'line',
          data: [1.1, 2.8, 2.2, 3.8, 3.2, 4.5, 6.2, 8.2]
        },
        {
          name: 'Cashflow',
          type: 'column',
          data: [1.1, 3, 2.5, 4, 3.5, 4.9, 6.5, 8.5]
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
  },
};
</script>

<style>
</style>