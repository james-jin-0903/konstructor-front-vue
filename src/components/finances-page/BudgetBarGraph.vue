<template lang="pug">
div
  FinancesPageToolBar
    template(v-slot:capital-row='')
      span
    template(v-slot:hourly-row='')
      span
    template(v-slot:profit-row='')
      span
  MultiBarChart
</template>

<script>
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import MultiBarChart from '@/components/Charts/BarChart/MultiBarChart.vue';

export default {
  name: 'BudgetBarGraph',
  components: {
    MultiBarChart,
    FinancesPageToolBar
  }
};
</script>

<style>
</style>