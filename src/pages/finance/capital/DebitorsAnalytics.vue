<template>
  <div class="container">
    <breadcrumbs
      :links="breadcrumbs.links"
      :current="breadcrumbs.current"
    ></breadcrumbs>

    <NavigationTabs
      :links="tabLinks"
      current="Дебеторы"
      style="margin-top: -10px;"
    />

    <FinancesPageToolBar>
      <template v-slot:breadcrumbs>
        <span></span>
      </template>
      <template v-slot:toolbar-data>
        <span></span>
      </template>
      <template v-slot:history>
        <RouterLink
          to="/finances/capital/debitors/history"
          class="finances-page__link"
        >
          <img src="@/assets/images/icon_history.svg" alt />
        </RouterLink>
      </template>
    </FinancesPageToolBar>

    <div
      v-for="capitalDataRow in capitalStructureData"
      :key="capitalDataRow.id"
      @click="fullScreenStructure"
      style="width: 40%;"
    >
      <pie-chart
        v-if="capitalDataRow.type == 'pie'"
        :pieChartData="capitalDataRow"
        :size="pieSizeMode"
        :colorTheme="{ r: 247, g: 200, b: 119 }"
      ></pie-chart>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import PieChart from '@/components/PieChart.vue';
import NavigationTabs from '@/components/NavigationTabs.vue';

const PAGE_NAME = 'Analytics';

export default {
  name: 'DebitorsAnalytics',
  components: {
    Breadcrumbs,
    FinancesPageToolBar,
    PieChart,
    NavigationTabs
  },
  data() {
    return {
      breadcrumbs: {
        links: [
          {
            label: 'Финансы',
            href: '/finances/'
          },
          {
            label: 'Капитал',
            href: '/finances/'
          },
          {
            label: 'Дебеторы',
            href: '/finances/capital/debitors'
          }
        ],
        current: PAGE_NAME
      },
      pieSizeMode: 'full',
      capitalStructureData: [],
      tabLinks: [
        {
          label: 'Мой счет',
          href: '/finances/capital/my-account'
        },
        {
          label: 'Дебеторы',
          href: '/finances/capital/debitors'
        },
        {
          label: 'Кредиторы',
          href: '/finances/capital/lenders'
        },
        {
          label: 'Доли сообществ',
          href: '/finances/capital/share-communities'
        },
        {
          label: 'Инвесторам',
          href: '/finances/capital/investors'
        },
        {
          label: 'Вкладчики',
          href: '/finances/capital/savers'
        }
      ]
    };
  },
  created() {
    // TODO: let data of capital structure come from backend
    let capitalPieData = [
      {
        type: 'pie',
        previousRate: 50,
        chartHeader: 'Структура дебеторской задолженности',
        data: [
          { label: 'Sparks', value: 500 },
          { label: 'Константин Константин...', value: 250 },
          { label: 'Елена Еленина', value: 250 }
        ]
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

<style lang="scss">
</style>