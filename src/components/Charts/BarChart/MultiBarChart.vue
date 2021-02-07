<template>
  <div>
    <apexchart
      :width="width"
      :height="510"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: 'MultiMiniBarChart',
  data() {
    return {
      // Chart Width

      // Chart options
      options: {
        // Chart configs
        chart: {
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
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
          categories: [
            '03 янв',
            '04 янв',
            '05 янв',
            '06 янв',
            '07 янв',
            '08 янв',
            '09 янв',
            '10 янв',
            '11 янв',
            '12 янв'
          ]
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
          data: [2.5, 1.5, 0.5, 2.2, 2, 2.3, 1.5, 1.4, 2.5, 2]
        },
        {
          name: 'Expenses',
          type: 'column',
          data: [2.2, 1.2, 0.7, 2.8, 1.8, 1.5, 1.3, 1.6, 2.7, 1.5]
        },
        {
          name: 'Surplus / Deficit',
          type: 'line',
          data: [2, 1.1, 0.5, 2.1, 1.8, 1.5, 1.2, 1.4, 2.4, 1.4]
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