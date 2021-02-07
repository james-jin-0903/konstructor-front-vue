<template>
  <div class="pie-chart" :style="{width: size==='mini'?'600px':'100vw'}">
    <div class="pie-chart__header">{{chartHeader}}</div>
    <div class="pie-chart__chart">
      <div
        class="pie-chart__center"
        :style="{left: size==='mini'?'calc(50% - 140px)':'calc(50% - 420px)'}"
      >
        <span class="pie-chart__total">{{totalValue}}</span>
        <span class="pie-chart__arrow" v-html="arrowText" :style="{color: rateColor}"></span>
        <span
          class="pie-chart__difference"
          :style="{color: rateColor}"
        >{{Math.abs(totalValue - previousRate)}}</span>
      </div>
      <apexchart
        type="donut"
        :height="height"
        :options="chartOptions"
        :series="series"
        @click="pieChangeSizeMode"
        :width="width"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'PieChart',
  components: {
    apexchart: VueApexCharts
  },
  props: {
    size: {
      type: String,
      required: true
    },
    arrayIndex: {
      type: Number
    },
    pieChartData: {
      type: Object,
      required: true
    },
    colorTheme: {
      type: Object,
      required: true
    },
    width: Number
  },
  data() {
    return {
      series: [],
      height: 0,
      chartOptions: {},
      chartHeader: '',
      totalValue: 0,
      previousRate: 0,
      arrowText: '',
      rateColor: ''
    };
  },
  created() {
    let preparedPieData = this.piePrepareChartData(
      this.pieChartData,
      this.size
    );
    this.height = this.size === 'mini' ? 300 : 400;
    this.series = preparedPieData.series;
    this.chartHeader = preparedPieData.chartHeader;
    this.totalValue = preparedPieData.totalValue;
    this.previousRate = preparedPieData.previousRate;
    this.pieChangeRateTextAndColor(
      preparedPieData.totalValue,
      preparedPieData.previousRate
    );
    this.chartOptions = {
      labels: [...preparedPieData.labels],
      chart: { type: 'donut' },
      colors: [...preparedPieData.colors],
      legend: {
        show: true,
        position: 'right',
        fontSize: '18px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        offsetX: this.size === 'mini' ? 30 : 200,
        itemMargin: {
          horizontal: 10,
          vertical: 2
        }
      },
      plotOptions: {
        pie: { offsetX: this.size === 'mini' ? -20 : -300 }
      }
    };
  },
  methods: {
    pieChangeSizeMode(event, chartContext, config) {
      if (
        event.target.nodeName === 'foreignObject' ||
        event.target.nodeName === 'DIV'
      ) {
        this.$emit('pieChangeSizeMode', this.arrayIndex, this.size);
      }
    },

    pieChangeRateTextAndColor(total, previous) {
      if (parseInt(total) - parseInt(previous) > 0) {
        this.arrowText = '&#8593;';
        this.rateColor = 'green';
      } else if (parseInt(total) - parseInt(previous) === 0) {
        this.arrowText = '&#8722;';
        this.rateColor = 'grey';
      } else {
        this.arrowText = '&#8595;';
        this.rateColor = 'red';
      }
    },

    pieOrderData(data, size) {
      let dataArray = [...data];
      let series = [];
      let labels = [];
      let splicePosition = this.pieGetSplicePosition(dataArray, size);

      dataArray.sort((a, b) => {
        return parseInt(b.value) - parseInt(a.value);
      });

      let others = dataArray.splice(splicePosition);
      let othersSum = this.pieGetValueSum(others);

      dataArray.map(row => {
        series.push(parseInt(row.value));
        labels.push(row.label + ' - ' + row.value);
      });
      if (others.length > 0) {
        series.push(othersSum);
        labels.push('other - ' + othersSum);
      }

      return {
        series: series,
        labels: labels
      };
    },

    pieGetSplicePosition(data, size) {
      if (data.length <= 6) {
        return 6;
      }
      if (data.length > 6 && data.length < 13) {
        return 5;
      }
      if (data.length === 13) {
        return size === 'mini' ? 5 : 13;
      }
      if (data.length > 13) {
        return size === 'mini' ? 5 : 12;
      }
    },

    pieGetValueSum(data) {
      let dataArray = [...data];
      let sum = 0;
      dataArray.map(row => {
        sum += parseInt(row.value);
      });
      return sum;
    },

    pieGetColorArray(r, g, b, count) {
      let res = [];
      for (let i = 0; i < count; i++) {
        res.push(
          'rgba(' + r + ',' + g + ',' + b + ',' + (1 - (0.75 / count) * i) + ')'
        );
      }
      return res;
    },

    piePrepareChartData(chartData, size) {
      let sortResult = this.pieOrderData(chartData.data, size);
      let totalValue = this.pieGetValueSum(chartData.data);
      let colors = this.pieGetColorArray(
        this.colorTheme.r,
        this.colorTheme.g,
        this.colorTheme.b,
        sortResult.series.length
      );
      return {
        type: 'pie',
        series: [...sortResult.series],
        labels: [...sortResult.labels],
        size: size,
        previousRate: parseInt(chartData.previousRate),
        chartHeader: chartData.chartHeader,
        totalValue: totalValue,
        colors: [...colors]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.pie-chart {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  margin-left: -4.5rem;

  &__header {
    font-weight: bold;
    font-size: 20px;
    margin: 3px 5px 20px 5px;
  }

  &__chart {
    box-shadow: 0px 0px 7px 1px #e8e8e8;
    border-radius: 4px;
  }

  &__center {
    position: absolute;
    top: calc(50% - 10px);
    margin-left: -65px;
  }

  &__total {
    font-weight: 800;
    font-size: 19px;
  }

  &__difference {
    font-weight: 400;
    font-size: 16px;
    margin-left: 5px;
  }

  &__arrow {
    font-weight: 800;
    font-size: 20px;
    margin-left: 10px;
  }
}
</style>
