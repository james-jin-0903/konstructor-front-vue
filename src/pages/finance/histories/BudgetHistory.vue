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
      <template v-slot:toolbar-data>
        <span></span>
      </template>
    </FinancesPageToolBar>
    <h3
      class="finances-page__total-events"
      style="margin-top: -20px;margin-left: -25px;"
    >
      <span>{{ historyTableInfo.length }} событий</span>
    </h3>
    <DataTable :tableInfo="historyTableInfo" style="margin-left: -25px;" />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import DataTable from '@/components/finances-page/DataTable.vue';

const PAGE_NAME = 'История';

export default {
  name: 'BudgetHistory',
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
            label: 'Бюджет',
            href: '/finances/budget'
          }
        ],
        current: PAGE_NAME
      },
      historyTableInfo: [
        {
          event: 'Изменен доход план бюджета',
          object: 'Название бюджета 1',
          initiater: 'Иван Петров',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Изменен расход план статьи бюджета',
          object: 'Название статьи бюджета 1',
          initiater: 'Иван Петров',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Создана исходящая транзакция',
          object: 'Название транзакции 1',
          initiater: 'Иван Петров',
          amount: '$50',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Получена входящая транзакция',
          object: 'Название транзакции 2',
          initiater: 'Иван Петров',
          amount: '$50',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Переименован бюджет',
          object: 'Название бюджета 1 Старое название бюджета 1',
          initiater: 'Иван Петров',
          amount: '-',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Активирован из архива бюджет',
          object: 'Название бюджета 2',
          initiater: 'Иван Петров',
          amount: '-',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Отправлен в архив бюджет',
          object: 'Название бюджета 2',
          initiater: 'Иван Петров',
          amount: '-',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Создана копия бюджета',
          object: 'Название бюджета 1 копия',
          initiater: 'Иван Петров',
          amount: '-',
          date: '10 ноя 2017, 13:50'
        }
      ]
    };
  }
};
</script>

<style>
</style>