<template>
  <div>
    <FinancesPageToolBar>
      <template v-slot:capital-row>
        <span></span>
      </template>
      <template v-slot:hourly-row>
        <span></span>
      </template>
      <template v-slot:profit-row>
        <span></span>
      </template>
    </FinancesPageToolBar>
    <DataTable :tableInfo="capitalTableInfo" />
  </div>
</template>

<script>
import DataTable from '@/components/finances-page/DataTable.vue';
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';

export default {
  name: 'CapitalDataTable',
  components: {
    DataTable,
    FinancesPageToolBar
  },
  data() {
    return {
      capitalTableInfo: [
        {
          event: 'Погашена дебеторская задолженность',
          groupUser: 'Константин Константинопольск...',
          author: 'Иван Петров',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Приобретена дебеторская задолженн...',
          groupUser: 'Константин Константинопольск...',
          author: 'Иван Петров',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Выведены средства (в обработке)',
          groupUser: '-',
          author: 'Иван Петров',
          amount: '$500',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Получена входящая транзакция',
          groupUser: 'Константин Константинопольск...',
          author: '-',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        }
      ]
    };
  }
};
</script>

<style lang="scss">
</style>