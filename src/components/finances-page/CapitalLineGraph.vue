<template lang="pug">
div
  FinancesPageToolBar
    template(v-slot:capital-row='')
      span
    template(v-slot:hourly-row='')
      span
    template(v-slot:profit-row='')
      span
  singlelinechart(:width='1200', :seriesdata='capitalData')
</template>

<script>
import SingleLineChart from '@/components/Charts/LineChart/SingleLineChart.vue';
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';

export default {
  name: 'Capital-Line-Graph',
  components: {
    SingleLineChart,
    FinancesPageToolBar
  },
  data() {
    return {
      capitalData: [
        {
          name: 'Capital',
          type: 'line',
          data: [16, 12, 10, 8, 7, 13, 12, 13, 12, 11, 10, 12]
        }
      ]
    };
  }
};
</script>

<style>
</style>