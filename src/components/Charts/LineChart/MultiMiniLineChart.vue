<template>
  <div>
    <h2>Multi Mini Line Chart</h2>
    <apexchart width="600" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: 'MultiMiniLineChart',
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
          },
          events: {
            // Going to a new page with the click on empty area of chart
            click: (event, chartContext, config) => {
              if (event.target.nodeName == 'foreignObject') {
                this.$router.push('/charts/multi-line-chart');
              }
            }
          },
          toolbar: {
            offsetX: -420
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
        ],
        // Legend settings
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          markers: {
            width: 12,
            height: 12,
            radius: 12
          },
          itemMargin: {
            horizontal: 10
          }
        }
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
  }
};
</script>

<style>
</style>