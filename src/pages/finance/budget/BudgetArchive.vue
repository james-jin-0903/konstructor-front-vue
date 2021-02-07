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
      <template v-slot:toolbar-data>
        <span></span>
      </template>
      <template v-slot:default>
        <span></span>
      </template>
    </FinancesPageToolBar>

    <BudgetDataTable :tableInfo="archiveTableInfo">
      <template v-slot:increase>
        <span></span>
      </template>
      <template v-slot:tools-dropdown>
        <span></span>
      </template>
    </BudgetDataTable>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import BudgetDataTable from '@/components/finances-page/BudgetDataTable.vue';

const PAGE_NAME = 'Архив';

export default {
  name: 'BudgetArchive',
  components: {
    Breadcrumbs,
    FinancesPageToolBar,
    BudgetDataTable
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
      archiveTableInfo: [
        {
          name: 'Название бюджета 1',
          'consumption Fact': '$1000',
          'income Fact': '$1000',
          'consumption Plan': '$1000',
          'income Plan': '$1000',
          'last Change': '10 ноя 2017, 13:50'
        },
        {
          name: 'Название бюджета 2',
          'consumption Fact': '$100"000',
          'income Fact': '$100"000',
          'consumption Plan': '$100"000',
          'income Plan': '$100"000',
          'last Change': '10 ноя 2017, 13:50'
        },
        {
          name: 'Название бюджета 3',
          'consumption Fact': '$100"000"000',
          'income Fact': '$100"000"000',
          'consumption Plan': '$100"000"000',
          'income Plan': '$100"000"000',
          'last Change': '10 ноя 2017, 13:50'
        }
      ]
    };
  }
};
</script>

<style>
</style>