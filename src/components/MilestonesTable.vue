<template lang="pug">
  .table-component.task-milestones-table
    .table-component__thead
      .table-component__col.number
        | Номер
        .table-component__arrow-icon(
          :class="{ 'table-component__arrow-icon_active': sortByIndex === 0 }"
        ) {{ !numberSortOrder ? '↑' : '↓' }}
      .table-component__col.title
        | Название
        .table-component__arrow-icon(
          :class="{ 'table-component__arrow-icon_active': sortByIndex === 0 }"
        ) {{ !numberSortOrder ? '↑' : '↓' }}
      .table-component__col.budget
        | Бюджет
        .table-component__arrow-icon(
          :class="{ 'table-component__arrow-icon_active': sortByIndex === 0 }"
        ) {{ !numberSortOrder ? '↑' : '↓' }}
      .table-component__col.milestone-status
        | Статус
        .table-component__arrow-icon(
          :class="{ 'table-component__arrow-icon_active': sortByIndex === 0 }"
        ) {{ !numberSortOrder ? '↑' : '↓' }}
    PerfectScrollbar
      .task-milestones-table__rows(:style="{ maxHeight: `${maxHeight}px` }")
        .table-component__row(v-for="item in milestones")
          .table-component__row-item.task-milestones-table__col.number {{ item.number }}
          .table-component__row-item.title {{ item.title }}
          .table-component__row-item.task-milestones-table__col.budget {{ item.budget }}
          .table-component__row-item.milestone-status {{ item.status }}
</template>

<script>
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar';

  export default {
    name: 'MilestonesTable',
    components: {
      PerfectScrollbar
    },
    props: {
      maxHeight: Number
    },
    data(){
      return {
        sortByIndex: 0,
        numberSortOrder: 1,
        milestones: null
      }
    },
    mounted() {
      this.milestones = [...new Array(10)].map((el, i) => {
        return {
          number: i,
          title: 'Этап номер ' + i,
          budget: '$10',
          status: 'В процессе'
        };
      })
    }
  }
</script>

<style lang="scss" scoped>
  .task-milestones-table {
    .number {
      width: 70px;
    }
    .milestone-status {
      width: 80px;
    }
    .title {
      width: 40%;
    }
    .budget {
      width: 30%;
    }
    &__col {
      &.number, &.budget {
        padding-left: 20px;
      }
    }
  }
</style>
