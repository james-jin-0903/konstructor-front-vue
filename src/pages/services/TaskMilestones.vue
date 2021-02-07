<template lang="pug">
  .task-milestones-page
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
    .container.page
      .task-milestones-page__counter
        span 8 этапов
        Tooltip(text="Подсказка об этапах").task-milestones-page__tooltip
      MilestonesTable
</template>

<script>
  import Breadcrumbs from '@/components/Breadcrumbs';
  import Tooltip from '@/components/Tooltip';
  import MilestonesTable from '@/components/MilestonesTable';

  const PAGE_NAME = 'Этапы';

  export default {
    name: 'TaskMilestonesPage',
    components: {
      MilestonesTable,
      Tooltip,
      Breadcrumbs
    },
    data(){
      return {
        sortByIndex: 0,
        numberSortOrder: 1,
        breadcrumbs: {
          links: [
            { label: 'Услуги', href: '/services' },
            { label: 'Задачи', href: '' },
            { label: 'Название задачи', href: '/services/task/12' }
          ],
          current: PAGE_NAME
        },
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
  .task-milestones-page {
    &__counter {
      display: flex;
      align-items: center;
      @include font(16, r, 22px);
      color: $gray3;
      margin-bottom: 20px;

      span {
        margin-right: 10px;
      }
    }

  }
</style>