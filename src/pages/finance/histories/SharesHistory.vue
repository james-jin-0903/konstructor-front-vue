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
        <span class="finances-page__text">Сумма долей:</span>
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
      style="margin-top: -20px; margin-bottom: 15px;"
    >
      <span>{{ sharesHistoryTable.length }} события</span>
    </h3>
    <DataTable :tableInfo="sharesHistoryTable" />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import DataTable from '@/components/finances-page/DataTable.vue';

const PAGE_NAME = 'История';

export default {
  name: 'SharesHistory',
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
            label: 'Доли сообществ',
            href: '/finances/capital/share-communities'
          }
        ],
        current: PAGE_NAME
      },
      sharesHistoryTable: [
        {
          event: 'Выросли активы сообщества',
          'community User': 'Ромашка',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Снизились активы сообщества',
          'community User': 'Ромашка',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Приобретена доля в сообществе',
          'community User': 'Ромашка',
          amount: '$100 (10%)',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Продана доля в сообществе',
          'community User': 'Ромашка',
          amount: '$100 (10%)',
          date: '10 ноя 2017, 13:50'
        }
      ]
    };
  }
};
</script>

<style>
</style>