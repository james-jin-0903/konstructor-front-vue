<template>
  <div class="page-analyze">
    <div class="page-analyze__mini-container" v-if="sizeMode === 'mini'">
      <div
        class="page-analyze__element"
        v-for="(chartDataRow,key) in chartDataFromServer"
        :key="'miniChart' + key"
      >
        <pie-chart
          v-if="chartDataRow.type === 'pie'"
          :pieChartData="chartDataRow"
          :arrayIndex="key"
          :size="sizeMode"
          :colorTheme="{r:4, g:56, b:171}"
          @pieChangeSizeMode="pieChangeSizeMode"
        ></pie-chart>
      </div>
    </div>
    <div class="page-analyze__full-container" v-if="sizeMode === 'full'">
      <pie-chart
        v-if="fullChartData.type === 'pie'"
        :pieChartData="fullChartData"
        :arrayIndex="fullChartData.arrayIndex"
        :size="sizeMode"
        :colorTheme="{r:4, g:56, b:171}"
        @pieChangeSizeMode="pieChangeSizeMode"
      ></pie-chart>
    </div>
  </div>
</template>

<script>
import PieChart from '@/components/PieChart';

export default {
  name: 'AnalyzeChart',
  components: {
    PieChart
  },
  data() {
    return {
      chartDataFromServer: [],
      fullChartData: {},
      sizeMode: 'mini'
    };
  },
  created() {
    // TODO fetch data from backend
    let dataFromBackend = [
      {
        type: 'pie',
        previousRate: 420,
        chartHeader: 'This is test header 11 items',
        data: [
          { label: 'attribute1', value: 54 },
          { label: 'attribute2', value: 26 },
          { label: 'attribute3', value: 32 },
          { label: 'attribute4', value: 61 },
          { label: 'attribute5', value: 23 },
          { label: 'attribute6', value: 44 },
          { label: 'attribute7', value: 39 },
          { label: 'attribute8', value: 35 },
          { label: 'attribute9', value: 50 },
          { label: 'attribute10', value: 29 },
          { label: 'attribute11', value: 37 }
        ]
      },
      {
        type: 'pie',
        previousRate: 220,
        chartHeader: 'This is test header 5 items',
        data: [
          { label: 'attribute1', value: 54 },
          { label: 'attribute2', value: 26 },
          { label: 'attribute3', value: 32 },
          { label: 'attribute4', value: 61 },
          { label: 'attribute5', value: 23 }
        ]
      },
      {
        type: 'pie',
        previousRate: 540,
        chartHeader: 'This is test header 16 items',
        data: [
          { label: 'attribute1', value: 54 },
          { label: 'attribute2', value: 26 },
          { label: 'attribute3', value: 32 },
          { label: 'attribute4', value: 61 },
          { label: 'attribute5', value: 23 },
          { label: 'attribute6', value: 44 },
          { label: 'attribute7', value: 39 },
          { label: 'attribute8', value: 35 },
          { label: 'attribute9', value: 50 },
          { label: 'attribute10', value: 29 },
          { label: 'attribute11', value: 37 },
          { label: 'attribute12', value: 42 },
          { label: 'attribute13', value: 30 },
          { label: 'attribute14', value: 43 },
          { label: 'attribute15', value: 23 },
          { label: 'attribute16', value: 39 }
        ]
      },
      {
        type: 'pie',
        previousRate: 250,
        chartHeader: 'This is test header 6 items',
        data: [
          { label: 'attribute1', value: 54 },
          { label: 'attribute2', value: 26 },
          { label: 'attribute3', value: 32 },
          { label: 'attribute4', value: 61 },
          { label: 'attribute5', value: 23 },
          { label: 'attribute6', value: 44 }
        ]
      }
    ];
    this.chartDataFromServer = dataFromBackend;
  },
  methods: {
    pieChangeSizeMode(arrayIndex, currentSizeMode) {
      if (currentSizeMode === 'mini') {
        this.sizeMode = 'full';
        window.scrollTo(0, 0);
        this.fullChartData = {
          ...this.chartDataFromServer[arrayIndex],
          arrayIndex: arrayIndex
        };
      } else {
        this.sizeMode = 'mini';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page-analyze {
  width: 100vw;

  &__mini-container {
    display: flex;
    flex-wrap: wrap;
  }

  &__element {
    width: 600px;
    margin: auto;
  }

  &__full-container {
    width: 100vw;
    height: auto;
  }
}
</style>
