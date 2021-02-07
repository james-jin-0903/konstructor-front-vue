<template>
  <div class="mini-line-chart">
    <h3>Funds in your account</h3>
    <apexchart width="600" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: 'SingleMiniLineChart',
  data() {
    return {
      // Options of the chart
      options: {
        // Chart configuration
        chart: {
          type: 'line',
          stacked: false,
          // events: {
          //   // Going to a new page with the click chart
          //   click: (event, chartContext, config) => {
          //     if (event.target.nodeName == 'svg') {
          //       this.$router.push('/charts/single-line-chart');
          //     }
          //   }
          // },

          toolbar: {
            show: false
          }
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
                colors: '#B2BCCA'
              }
            },
            tooltip: {
              enabled: true
            }
          }
        ]
      },
      series: [
        {
          name: 'Revenue',
          type: 'line',
          data: [1.1, 3, 2.5, 4, 3.5, 4.9, 6.5, 8.5]
        }
      ]
    };
  }
};
</script>

<style>
</style>