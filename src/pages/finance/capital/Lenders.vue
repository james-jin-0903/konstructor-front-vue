<template>
  <div class="debitors-page container">
    <breadcrumbs
      :links="breadcrumbs.links"
      :current="breadcrumbs.current"
    ></breadcrumbs>
    <NavigationTabs
      :links="tabLinks"
      current="Кредиторы"
      style="margin-top: -10px;"
    />
    <FinancesPageToolBar
      analyticsModeLink="/finances/capital/lenders/analytics"
    >
      <template v-slot:breadcrumbs>
        <span></span>
      </template>
      <template v-slot:default>
        <RouterLink
          to="/finances/capital/lenders/history"
          class="finances-page__link"
        >
          <img src="@/assets/images/icon_history.svg" alt />
        </RouterLink>
      </template>
      <template v-slot:capital-text-inner>
        <span class="finances-page__text">Кредиторская задолженность:</span>
      </template>
      <template v-slot:hourly-row>
        <span></span>
      </template>
      <template v-slot:profit-row>
        <span></span>
      </template>
    </FinancesPageToolBar>
    <h3
      class="finances-page__total-events"
      style="margin-top: -20px; margin-bottom: 20px;"
    >
      <span>{{ debitorsTableInfo.length }} задолженности</span>
    </h3>
    <SecondDataTable :tableInfo="debitorsTableInfo">
      <template v-slot:btn-text>
        <span>Выплатить</span>
      </template>
    </SecondDataTable>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import NavigationTabs from '@/components/NavigationTabs.vue';
import SecondDataTable from '@/components/finances-page/SecondDataTable.vue';

const PAGE_NAME = 'Кредиторы';
export default {
  name: 'Lenders',
  components: {
    Breadcrumbs,
    FinancesPageToolBar,
    NavigationTabs,
    SecondDataTable
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
          }
        ],
        current: PAGE_NAME
      },
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
      ],
      debitorsTableInfo: [
        {
          'community User': 'Константин Константинопольский',
          amount: '$250',
          'maturity Date': '10 ноя 2017, 13:50'
        },
        {
          'community User': 'Константин Константинопольский',
          amount: '$250',
          'maturity Date': '10 ноя 2017, 13:50'
        },
        {
          'community User': 'Spark',
          amount: '$250',
          'maturity Date': '10 ноя 2017, 13:50'
        },
        {
          'community User': 'Дмитрий Дмитриев',
          amount: '$250',
          'maturity Date': '10 ноя 2017, 13:50'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
