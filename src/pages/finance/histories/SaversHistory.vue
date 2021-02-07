<template>
  <div class="container">
    <breadcrumbs
      :links="breadcrumbs.links"
      :current="breadcrumbs.current"
    ></breadcrumbs>
    <FinancesPageToolBar>
      <template v-slot:links>
        <span></span>
      </template>
      <template v-slot:breadcrumbs>
        <span></span>
      </template>
      <template v-slot:hourly-row>
        <span></span>
      </template>
      <template v-slot:profit-row>
        <span></span>
      </template>
      <template v-slot:capital-text-inner>
        <span class="finances-page__text">Капитал:</span>
      </template>
    </FinancesPageToolBar>
    <DataTable :tableInfo="saversHistory" />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import DataTable from '@/components/finances-page/DataTable.vue';

const PAGE_NAME = 'История';

export default {
  name: 'SaversHistory',
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
            label: 'Сообщества',
            href: '/'
          },
          {
            label: 'Konstruktor',
            href: '/'
          },
          {
            label: 'Финансы',
            href: '/finances/'
          },
          {
            label: 'Капитал',
            href: '/finances/'
          },
          {
            label: 'Вкладчики',
            href: '/finances/capital/savers'
          }
        ],
        current: PAGE_NAME
      },
      saversHistory: [
        {
          event: 'Приобретена доля в сообществе',
          user: 'Артем Артемов',
          share: '25%',
          amount: '$250',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Продана доля в сообществе',
          user: 'Борис Борисов',
          share: '25%',
          amount: '$250',
          date: '10 ноя 2017, 13:50'
        }
      ]
    };
  }
};
</script>

<style>
</style>