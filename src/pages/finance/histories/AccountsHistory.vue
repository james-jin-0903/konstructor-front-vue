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
      <template v-slot:links>
        <span></span>
      </template>
      <template v-slot:hourly-row>
        <span></span>
      </template>
      <template v-slot:profit-row>
        <span></span>
      </template>
      <template v-slot:capital-rate-inner>
        <h2>$0</h2>
      </template>
      <template v-slot:capital-rate-up-inner>
        <h2 class="finances-page__total-events" style="margin-top: 0px">
          <span>- $0</span>
        </h2>
      </template>
    </FinancesPageToolBar>
    <DataTable :tableInfo="historyTableInfo" />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import DataTable from '@/components/finances-page/DataTable.vue';

const PAGE_NAME = 'История';

export default {
  name: 'AccountsHistory',
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
            href: '/finances/'
          },
          {
            label: 'Мой счет',
            href: '/finances/capital/my-account'
          }
        ],
        current: PAGE_NAME
      },
      historyTableInfo: [
        {
          event: 'Выведены средства со счета',
          communityUser: '-',
          amount: '$500',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Выведены средства со счета',
          communityUser: '-',
          amount: '$500',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Получена входящая транзакция',
          communityUser: 'Константин Константинопольский',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Пополнен счет',
          communityUser: '-',
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