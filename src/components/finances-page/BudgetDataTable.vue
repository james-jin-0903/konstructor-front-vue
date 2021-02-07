<template lang="pug">
.data-table(style='margin-left: -25px;')
  table.data-table__container
    thead.data-table__heading
      tr.data-table__header-row
        th.data-table__table-heading(v-for='col in columns', :key='col.id', @click='sortTable(col)')
          | {{ col }}
    tbody.data-table__body
      tr.data-table__body-row(v-for='data in tableInfo', :key='data.id')
        td.data-table__table-text.data-table__table-name(v-if='data.name')
          img(src='@/assets/images/icon_arrow-down.svg', alt='', style='margin-right: 10px;')
          span {{ data.name }}
        td.data-table__table-text.data-table__consumption-fact(v-if="data['consumption Fact']")
          | {{ data[&apos;consumption Fact&apos;] }}
          slot(name='increase')
            span(style='color: #4DAF7C; margin-left: 10px;')
              img(src='@/assets/images/icon_arrow.svg', alt='', width='7')
              |                 $100
        td.data-table__table-text.data-table__income-fact(v-if="data['income Fact']")
          | {{ data[&apos;income Fact&apos;] }}
          slot(name='increase')
            span(style='color: #4DAF7C; margin-left: 10px;')
              img(src='@/assets/images/icon_arrow.svg', alt='', width='7')
              |                 $100
        td.data-table__table-text.data-table__consumption-plan(v-if="data['consumption Plan']")
          | {{ data[&apos;consumption Plan&apos;] }}
          slot(name='increase')
            span(style='color: #4DAF7C; margin-left: 10px;')
              img(src='@/assets/images/icon_arrow.svg', alt='', width='7')
              |                 $100
        td.data-table__table-text.data-table__income-plan(v-if="data['income Plan']")
          | {{ data[&apos;income Plan&apos;] }}
          slot(name='increase')
            span(style='color: #4DAF7C; margin-left: 10px;')
              img(src='@/assets/images/icon_arrow.svg', alt='', width='7')
              |                 $100
        td.data-table__table-text.data-table__last-change(v-if="data['last Change']")
          | {{ data[&apos;last Change&apos;] }}
        slot(name='tools-dropdown')
          td.data-table__table-text
            ToolsDropdown(:tools='tools', :placeonleft='true')
    tbody.data-table__body
      tr.data-table__table-row
        td.data-table__table-text &Icy;&tcy;&ocy;&gcy;
        td.data-table__table-text $100&quot;100&quot;100
        td.data-table__table-text $100&quot;100&quot;100
        td.data-table__table-text $100&quot;100&quot;100
        td.data-table__table-text $100&quot;100&quot;100
        td.data-table__table-text 10 &ncy;&ocy;&yacy; 2017, 13:50
</template>

<script>
import ToolsDropdown from '@/components/ToolsDropdown.vue';
import images from '@/components/images.ts';

export default {
  name: 'BudgetDataTable',
  props: {
    tableInfo: Array
  },
  components: {
    ToolsDropdown
  },
  data() {
    return {
      tools: [
        {
          type: 'edit',
          icon: images.icons.pencil,
          text: 'Редактировать'
        },
        {
          type: 'copy',
          icon: images.icons.copy,
          text: 'Копировать'
        },
        {
          type: 'archive',
          icon: images.icons.archive,
          text: 'Перейти к архиву',
          count: 99
        },
        {
          type: 'history',
          icon: images.icons.history,
          text: 'Перейти к истории',
          count: 99
        },
        {
          type: 'project',
          icon: images.icons.subcube,
          text: 'Перейти к проекту'
        },
        {
          type: 'time',
          icon: images.icons.clock,
          text: 'Перейти к тайм-менеджменту'
        },
        {
          type: 'share',
          icon: images.icons.share,
          text: 'Поделиться',
          children: [
            {
              type: 'chat',
              icon: images.icons.chatBlue,
              text: 'Чат Konstruktor'
            },
            {
              type: 'social',
              icon: images.icons.social,
              text: 'Социальные сети'
            },
            {
              type: 'messenger',
              icon: images.icons.menu,
              text: 'Мессенджеры'
            },
            {
              type: 'email',
              icon: images.icons.newEmail,
              text: 'Электронная почта'
            },
            {
              type: 'bulk',
              icon: images.icons.settingsBlue,
              text: 'Массовая рассылка'
            }
          ]
        },
        {
          type: 'bookmark',
          icon: images.icons.bookmarkBlue,
          text: 'Добавить в закладки'
        },
        {
          type: 'archive',
          icon: images.icons.powerOff,
          text: 'Отправить в архив'
        }
      ]
    };
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
  },
  mounted() {
    const tableBody = document.querySelector('.data-table__body');
    const ps = new PerfectScrollBar(tableBody);
  }
};
</script>

<style lang="scss">
@import '@/scss/components/datatable';
</style>