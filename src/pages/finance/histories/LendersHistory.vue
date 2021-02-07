<template>
  <div class="container">
    <breadcrumbs
      :links="breadcrumbs.links"
      :current="breadcrumbs.current"
    ></breadcrumbs>
    <FinancesPageToolBar>
      <template v-slot:breadcrumbs>
        <span></span>
      </template>
      <template v-slot:capital-text-inner>
        <span class="finances-page__text">Кредиторская задолженность:</span>
      </template>
      <template v-slot:links>
        <span></span>
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
      style="margin-top: -20px; margin-bottom: 10px;"
    >
      <span>{{ historyTableInfo.length }} события</span>
    </h3>
    <DataTable :tableInfo="historyTableInfo" />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import DataTable from '@/components/finances-page/DataTable.vue';

const PAGE_NAME = 'История';

export default {
  name: 'LendersHistory',
  components: {
    Breadcrumbs,
    FinancesPageToolBar,
    DataTable
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
            label: 'Капитал',
            href: '/finances'
          },
          {
            label: 'Кредиторы',
            href: '/finances/capital/lenders'
          }
        ],
        current: PAGE_NAME
      },
      historyTableInfo: [
        {
          event: 'Получена входящая транзакция',
          'community User': 'Константин Константинопольский',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Получена входящая транзакция',
          'community User': 'Константин Константинопольский',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        }
      ]
    };
  }
};
</script>

<style>
</style>