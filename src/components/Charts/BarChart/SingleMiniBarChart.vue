<template>
  <div>
    <h2>Single Mini Bar Chart</h2>
    <apexchart width='600' :options='options' :series='series'></apexchart>
  </div>
</template>

<script>
export default {
  name: 'SingleMiniBarChart',
  data() {
    return {
      // Chart options
      options: {
        // Chart configs
        chart: {
          stacked: false,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          events: {
            click: (event) => {
              if (event.target.nodeName == 'foreignObject') {
                this.$router.push('/charts/single-bar-chart');
              }
            }
          },
          // Toolbar Settings
          toolbar: {
            offsetX: -420
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
        // Data Values and line displayed on the vertical left of the chart
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
              radius: 12,
          },
          itemMargin: {
              horizontal: 10,
          },
        }
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
  }
};
</script>

<style>
</style>