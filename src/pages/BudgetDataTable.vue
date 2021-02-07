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
    <DataTable :tableInfo="budgetTableInfo" />
  </div>
</template>

<script>
import DataTable from '@/components/finances-page/DataTable.vue';
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';

export default {
  name: 'BudgetDataTable',

  components: {
    DataTable,
    FinancesPageToolBar
  },

  data() {
    return {
      budgetTableInfo: [
        {
          event: 'Изменен доход план бюджета',
          object: 'Название бюджета 1',
          author: 'Иван Петров',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Изменен расход план статьи бюджета',
          object: 'Название статьи бюджета 1',
          author: 'Иван Петров',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Создана исходящая транзакция',
          object: 'Название транзакции 1',
          author: 'Иван Петров',
          amount: '$50',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Получена входящая транзакция',
          object: 'Название транзакции 2',
          author: 'Иван Петров',
          amount: '$50',
          date: '10 ноя 2017, 13:50'
        }
      ]
    };
  }
};
</script>

<style>
</style>