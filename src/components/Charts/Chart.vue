<template>
  <div>
    <div class="line-chart">
      <div class="line-chart__item">
        <SingleMiniLineChart />
      </div>
      <div class="line-chart__item">
        <MultiMiniLineChart />
      </div>
    </div>
    <div class="bar-chart">
      <div class="bar-chart__item">
        <SingleMiniBarChart />
      </div>
      <div class="bar-chart__item">
        <MultiMiniBarChart />
      </div>
    </div>
  </div>
</template>

<script>
// Mini Charts
import SingleMiniLineChart from './LineChart/SingleMiniLineChart';
import MultiMiniLineChart from './LineChart/MultiMiniLineChart';
import SingleMiniBarChart from './BarChart/SingleMiniBarChart';
import MultiMiniBarChart from './BarChart/MultiMiniBarChart';

export default {
  components: {
    SingleMiniLineChart,
    MultiMiniLineChart,
    SingleMiniBarChart,
    MultiMiniBarChart
  }
};
</script>

<style lang='scss' scoped>
.line-chart {
  display: flex;
  justify-content: space-around;
  &__item {
    padding: 0.7rem 2.5rem;
    border: 1px solid #ccc;
    margin-top: 20px;
    margin-right: 10px;
  }
}

.bar-chart {
  display: flex;
  justify-content: space-around;
  &__item {
    padding: 0.7rem 2.5rem;
    border: 1px solid #ccc;
    margin-top: 20px;
    margin-right: 10px;
  }
}
</style>