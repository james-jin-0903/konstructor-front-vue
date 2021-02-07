<template>
  <div class="multi-bar-chart">
    <apexchart width="600" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: 'MultiMiniBarChart',
  data() {
    return {
      // Chart options
      options: {
        // Chart configs
        chart: {
          stacked: false,
          zoom: {
            enabled: true,
            type: 'x',
            autoScaleYaxis: false
          },
          // events: {
          //   click: event => {
          //     if (event.target.nodeName == 'foreignObject') {
          //       this.$router.push('/charts/multi-bar-chart');
          //     }
          //   }
          // },

          // Toolbar Settings
          toolbar: {
            show: false
          }
        },
        // Line colors
        colors: ['#567ADB', '#DA6A60', '#EB892B'],

        dataLabels: {
          enabled: false
        },
        // Width Of Line
        stroke: {
          width: 3
        },
        // Data Values displayed on the bottom horizontal line of the chart
        xaxis: {
          categories: ['03 янв', '04 янв', '05 янв', '06 янв', '07 янв']
        },
        // Data Values and line displayed on the vertical left of the chart
        yaxis: [
          {
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
      // Data values of the indicators in the Chart
      series: [
        {
          name: 'Income',
          type: 'column',
          data: [2, 2.2, 1.2, 0.2, 1.5]
        },
        {
          name: 'Expenses',
          type: 'column',
          data: [1.7, 1.9, 1.5, 0.4, 1.8]
        },
        {
          name: 'Surplus / Deficit',
          type: 'line',
          data: [1.5, 1.8, 1.2, 0.1, 1.2]
        }
      ]
    };
  }
};
</script>

<style>
</style>