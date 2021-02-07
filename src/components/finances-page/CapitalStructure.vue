<template lang="pug">
div
  finances-page-tool-bar(:crumblinks='breadcrumbs.links', :crumbcurrent='breadcrumbs.current')
    template(v-slot:capital-row='')
      span
    template(v-slot:hourly-row='')
      span
    template(v-slot:profit-row='')
      span
  .container
    div(v-for='capitalDataRow in capitalStructureData', :key='capitalDataRow.id')
      pie-chart(
        v-if="capitalDataRow.type == 'pie'",
        :piechartdata='capitalDataRow',
        :size='pieSizeMode',
        :arrayindex='key',
        :colortheme='{ r: 50, g: 205, b: 50 }'
      )
</template>

<script>
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import PieChart from '@/components/PieChart.vue';

const PAGE_NAME = 'Capital structure';

export default {
  name: 'CapitalStructure',
  components: {
    FinancesPageToolBar,
    PieChart
  },
  data() {
    return {
      pieSizeMode: 'full',
      capitalStructureData: [],
      breadcrumbs: {
        links: [
          {
            label: 'Финансы',
            href: '/finances'
          }
        ],
        current: PAGE_NAME
      }
    };
  },
  created() {
    let capitalPieData = [
      {
        type: 'pie',
        previousRate: 50,
        chartHeader: 'Capital Structure',
        data: [
          { label: 'Funds in your account', value: 500 },
          { label: 'Community shares', value: 250 },
          { label: 'Receivables', value: 250 }
        ]
      }
    ];

    this.capitalStructureData = capitalPieData;
  }
};
</script>

<style>
</style>