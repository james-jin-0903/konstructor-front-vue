<template lang="pug">
.data-table
  table.data-table__second-container
    thead.data-table__heading
      tr.data-table__header-row
        th.data-table__table-heading(v-for='col in columns', :key='col.id', @click='sortTable(col)')
          | {{ col }}
          img.data-table__heading-arrow(src='@/assets/images/icon_arrow-sort.svg')
    tbody.data-table__body
      tr.data-table__body-row(v-for='data in tableInfo', :key='data.id')
        td.data-table__table-text.data-table__table-event(v-if='data.event')
          | {{ data.event }}
        td.data-table__table-text.data-table__table-event(v-if='data.user')
          | {{ data.user }}
        td.data-table__table-text.data-table__table-community-user(v-if="data['community User']")
          Avatar(:fontweight='400', initials='KK')
          span {{ data[&apos;community User&apos;] }}
        td.data-table__table-text.data-table__table-community-user(v-if='data.community')
          Avatar(:fontweight='400', initials='KK')
          span {{ data.community }}
        td.data-table__table-text.data-table__table-community-user(v-if='data.investor')
          Avatar(:fontweight='400', initials='KK')
          span {{ data.investor }}
        td.data-table__table-text.data-table__table-amount(v-if='data.assets')
          span {{ data.assets }}
        td.data-table__table-text.data-table__table-amount(v-if='data.share')
          span {{ data.share }}
        td.data-table__table-text.data-table__table-amount(v-if='data.amount')
          span {{ data.amount }}
        td.data-table__table-text.data-table__table-date(v-if="data['maturity Date']")
          | {{ data[&apos;maturity Date&apos;] }}
        slot(name='table-btn')
          td.data-table__table-text
            button.data-table__btn
              slot(name='btn-text') &Zcy;&acy;&pcy;&rcy;&ocy;&scy;&icy;&tcy;&softcy;
</template>

<script>
import Avatar from '@/components/Avatar.vue';

export default {
  name: 'SecondDataTable',
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