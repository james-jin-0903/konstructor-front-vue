<template>
  <div class="container" style="margin-bottom: 2rem;">
    <FinancesPageToolBar analyticsIcon="@/assets/images/icon_analytics-1.svg" />
    <div class="finances-page__capital">
      <div class="finances-page__capital-link">
        <div class="finances-page__col">
          <RouterLink to="/finances/analytics-mode/capital-line-graph">
            <h2 class="capital-link-text">Capital</h2>
            <img
              src="@/assets/images/icon_arrow-right.svg"
              class="finances-page__link-arrow"
            />
          </RouterLink>
        </div>
      </div>
    </div>
    <SingleLineChart :width="1100" :seriesData="capitalData" />
    <div class="container capital-structure" style="padding-left: 80px;">
      <div
        v-for="capitalDataRow in capitalStructureData"
        :key="capitalDataRow.id"
        @click="fullScreenStructure"
      >
        <pie-chart
          v-if="capitalDataRow.type == 'pie'"
          :pieChartData="capitalDataRow"
          :size="pieSizeMode"
          :colorTheme="{ r: 50, g: 205, b: 50 }"
        ></pie-chart>
      </div>
    </div>
    <div id="capital-recom" class="finances-page__recommendation-block">
      <h3>Мы подобрали для Вас 8 рекомендаций по увеличению капитала!</h3>
      <a hred="#" class="finances-page__add-funds">learn more</a>
      <button class="cross" @click="removeCapitalRecomm">
        <img src="@/assets/images/icon_cross.svg" />
      </button>
    </div>
    <div class="finances-page__row mb">
      <div class="finances-page__col-12">
        <div class="finances-page__budget">
          <div class="finances-page__budget-link">
            <div
              class="finances-page__col"
              style="margin-left: 1.5rem; margin-top: .5rem;"
            >
              <RouterLink to="/finances/analytics-mode/budget-bar-graph">
                <h2 class="budget-link-text">Budget</h2>
                <img
                  src="@/assets/images/icon_arrow-right.svg"
                  class="finances-page__link-arrow"
                />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="finances-page__col-6">
        <MultiMiniBarChart />
      </div>
      <div class="finances-page__col-6">
        <SingleMiniLineChart />
      </div>
      <div
        id="budget-recom"
        class="finances-page__recommendation-block container"
      >
        <h3>Мы подобрали для Вас 8 рекомендаций по оптимизации бюджета!</h3>
        <a hred="#" class="finances-page__add-funds">learn more</a>
        <button class="cross" @click="removeBudgetRecomm">
          <img src="@/assets/images/icon_cross.svg" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import SingleLineChart from '@/components/Charts/LineChart/SingleLineChart.vue';
import PieChart from '@/components/PieChart.vue';
import MultiMiniBarChart from '@/components/Charts/BarChart/MultiMiniBarChart.vue';
import SingleMiniLineChart from '@/components/Charts/LineChart/SingleMiniLineChart.vue';

export default {
  name: 'AnalyticsMode',
  components: {
    FinancesPageToolBar,
    SingleLineChart,
    PieChart,
    MultiMiniBarChart,
    SingleMiniLineChart
  },
  data() {
    return {
      message: 'This is the analytics mode for the finances page',
      capitalData: [
        {
          name: 'Capital',
          type: 'line',
          data: [16, 12, 10, 8, 7, 13, 12, 13, 12, 11, 10, 12]
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
        chartHeader: 'Capital Structure',
        data: [
          { label: 'Funds in your account', value: 500 },
          { label: 'Community shares', value: 250 },
          { label: 'Receivables', value: 250 }
        ]
      }
    ];

    this.capitalStructureData = capitalPieData;
  },
  methods: {
    removeCapitalRecomm() {
      let capitalRecomBlock = document.getElementById('capital-recom');
      capitalRecomBlock.innerHTML = '';
    },
    removeBudgetRecomm() {
      let budgetRecomBlock = document.getElementById('budget-recom');
      budgetRecomBlock.innerHTML = '';
    },
    fullScreenStructure() {
      this.$router.push('/finances/analytics-mode/capital-structure');
    }
  }
};
</script>

<style lang="scss">
@import '@/scss/pages/finances-page';

.capital-structure {
  h3 {
    margin: 2rem auto;
  }
}
</style>