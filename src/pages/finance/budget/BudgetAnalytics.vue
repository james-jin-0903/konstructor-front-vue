<template>
  <div class="container">
    <FinancesPageToolBar
      :crumbLinks="breadcrumbs.links"
      :crumbCurrent="breadcrumbs.current"
    >
      <template v-slot:toolbar-data>
        <span></span>
      </template>
      <template v-slot:tools-dropdown>
        <ToolsDropdown
          :tools="toolsDropdown"
          class="finances-page__link"
        ></ToolsDropdown>
      </template>
    </FinancesPageToolBar>

    <h2>Бюджет (факт)</h2>
    <MultiBarChart style="margin-bottom: 2rem;" />

    <div class="finances-page__row">
      <div
        class="finances-page__col-6"
        v-for="capitalDataRow in capitalStructureData"
        :key="capitalDataRow.id"
        @click="fullScreenStructure"
      >
        <pie-chart
          v-if="capitalDataRow.type == 'pie'"
          :pieChartData="capitalDataRow"
          :size="pieSizeMode"
          :colorTheme="capitalDataRow.colorTheme"
        ></pie-chart>
      </div>
    </div>
  </div>
</template>

<script>
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import ToolsDropdown from '@/components/ToolsDropdown.vue';
import images from '@/components/images.ts';
import MultiBarChart from '@/components/Charts/BarChart/MultiBarChart.vue';
import PieChart from '@/components/PieChart.vue';

const PAGE_NAME = 'Analytics';

export default {
  name: 'BudgetAnalytics',
  components: {
    FinancesPageToolBar,
    ToolsDropdown,
    MultiBarChart,
    PieChart
  },
  data() {
    return {
      breadcrumbs: {
        links: [
          {
            label: 'Финансы',
            href: '/finances'
          },
          {
            label: 'Бюджет',
            href: '/finances/budget'
          }
        ],
        current: PAGE_NAME
      },
      toolsDropdown: [
        {
          type: 'archive',
          icon: images.icons.archive,
          text: 'Перейти к архиву'
        },
        {
          type: 'history',
          icon: images.icons.history,
          text: 'Перейти к истории',
          count: 99
        }
      ],
      pieSizeMode: 'mini',
      capitalStructureData: []
    };
  },
  created() {
    // TODO: let data of capital structure come from backend
    let capitalPieData = [
      {
        type: 'pie',
        previousRate: 50,
        chartHeader: 'Генеральный бюджет (расход по статьям факт)',
        data: [
          { label: 'Статья бюджета 1', value: 625 },
          { label: 'Статья бюджета 2', value: 625 },
          { label: 'Статья бюджета 3', value: 625 },
          { label: 'Статья бюджета 4', value: 625 },
          { label: 'Статья бюджета 5', value: 1250 },
          { label: 'Статья бюджета 6', value: 1250 }
        ],
        colorTheme: { r: 237, g: 154, b: 61 }
      },
      {
        type: 'pie',
        previousRate: 50,
        chartHeader: 'Генеральный бюджет (доход по статьям факт)',
        data: [
          { label: 'Статья бюджета 1', value: 625 },
          { label: 'Статья бюджета 2', value: 625 },
          { label: 'Статья бюджета 3', value: 625 },
          { label: 'Статья бюджета 4', value: 625 },
          { label: 'Статья бюджета 5', value: 1250 },
          { label: 'Статья бюджета 6', value: 1250 }
        ],
        colorTheme: { r: 87, g: 140, b: 160 }
      },
      {
        type: 'pie',
        previousRate: 50,
        chartHeader: 'Генеральный бюджет (расход по бюджетам факт)',
        data: [
          { label: 'Бюжет 1', value: 625 },
          { label: 'Бюжет 2', value: 625 },
          { label: 'Бюжет 3', value: 625 },
          { label: 'Бюжет 4', value: 625 },
          { label: 'Бюжет 5', value: 1250 },
          { label: 'Бюжет 6', value: 1250 }
        ],
        colorTheme: { r: 185, g: 151, b: 216 }
      },
      {
        type: 'pie',
        previousRate: 50,
        chartHeader: 'Генеральный бюджет (доход по бюджетам факт)',
        data: [
          { label: 'Бюжет 1', value: 625 },
          { label: 'Бюжет 2', value: 625 },
          { label: 'Бюжет 3', value: 625 },
          { label: 'Бюжет 4', value: 625 },
          { label: 'Бюжет 5', value: 1250 },
          { label: 'Бюжет 6', value: 1250 }
        ],
        colorTheme: { r: 121, g: 151, b: 76 }
      }
    ];

    this.capitalStructureData = capitalPieData;
  },
  methods: {
    fullScreenStructure() {
      this.$router.push('/finances/analytics-mode/capital-structure');
    }
  }
};
</script>

<style>
</style>