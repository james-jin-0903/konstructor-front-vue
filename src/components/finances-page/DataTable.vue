<template lang="pug">
.container
  slot(name='heading')
  .data-table
    table.data-table__container
      thead.data-table__heading
        tr.data-table__header-row
          th.data-table__table-heading(v-for='col in columns', :key='col.id', @click='sortTable(col)')
            | {{ col }}
            img.data-table__heading-arrow(src='@/assets/images/icon_arrow-sort.svg')
      tbody.data-table__body
        tr.data-table__body-row(v-for='data in tableInfo', :key='data.id')
          td.data-table__table-text.data-table__table-event(v-if='data.event')
            | {{ data.event }}
          td.data-table__table-text.data-table__table-group-user(v-if="data['group User']")
            Avatar(:fontweight='400', initials='KK')
            span {{ data[&apos;group User&apos;] }}
          td.data-table__table-text.data-table__table-community-user(v-if="data['community User']")
            Avatar(:fontweight='400', initials='KK')
            span {{ data[&apos;community User&apos;] }}
          td.data-table__table-text.data-table__table-user(v-if='data.user')
            Avatar(:fontweight='400', initials='KK')
            span {{ data.user }}
          td.data-table__table-text.data-table__table-object(v-if='data.object')
            | {{ data.object }}
          td.data-table__table-text.data-table__table-initiater(v-if='data.initiater')
            Avatar(:fontweight='400', initials='KK')
            span {{ data.initiater }}
          td.data-table__table-text.data-table__table-author(v-if='data.author')
            Avatar(:name='data.author', :fontweight='400', initials='KK')
          td.data-table__table-text.data-table__table-share(v-if='data.share')
            span {{ data.share }}
          td#table-amount.data-table__table-text.data-table__table-amount(v-if='data.amount')
            span {{ data.amount }}
          td.data-table__table-text.data-table__table-date(v-if='data.date')
            | {{ data.date }}
</template>

<script>
import Avatar from '@/components/Avatar.vue';

export default {
  name: 'DataTable',
  props: {
    tableInfo: Array
  },
  components: {
    Avatar
  },
  computed: {
    columns: function columns() {
      if (this.tableInfo.length == 0) {
        return [];
      }
      return Object.keys(this.tableInfo[0]);
    }
  },
  methods: {
    sortTable: function sortTable(col) {
      this.tableInfo.sort(function(a, b) {
        if (a[col] > b[col]) {
          return 1;
        } else if (a[col] < b[col]) {
          return -1;
        }
        return 0;
      });
    }
  }
};
</script>

<style lang="scss">
@import '@/scss/components/datatable';
</style>