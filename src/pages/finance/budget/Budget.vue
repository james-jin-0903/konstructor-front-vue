<template>
  <div class="container">
    <breadcrumbs
      :links="breadcrumbs.links"
      :current="breadcrumbs.current"
    ></breadcrumbs>
    <FinancesPageToolBar analyticsModeLink="/finances/budget/analytics">
      <template v-slot:breadcrumbs>
        <span></span>
      </template>
      <template v-slot:row-mode>
        <ViewToggle
          class="toolbar__item"
          @change="handleViewChange"
          style="margin-right: 0;"
        ></ViewToggle>
      </template>
      <template v-slot:toolbar-data>
        <span></span>
      </template>
      <template v-slot:default>
        <ToolsDropdown
          :tools="tools"
          class="finances-page__link"
          style="width: 50%;"
        ></ToolsDropdown>
      </template>
    </FinancesPageToolBar>

    <BudgetDataTable :tableInfo="budgetTableInfo" />

    <div class="page">
      <div>
        <EventItem
          :item="ideaItem"
          :key="ideaItem.id"
          v-for="ideaItem of items"
          :small="isListView"
          route="/finances/recommendations"
        ></EventItem>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import ToolsDropdown from '@/components/ToolsDropdown.vue';
import images from '@/components/images.ts';
import BudgetDataTable from '@/components/finances-page/BudgetDataTable.vue';
import ViewToggle from '@/components/ViewToggle';
import { ViewTypes } from '@/utils/constants';
import EventItem from '@/components/EventItem';

const PAGE_NAME = 'Бюджет';

const IDEAS_ITEMS = [
  {
    id: 1,
    image: 'idea_01.png',
    isVideo: true,
    icon: 'feather',
    title: 'Название интересной идеи',
    tags: ['Наука'],
    category: {
      title: 'Сообщество',
      text: 'Публицисты',
      url: '/'
    },
    subcategory: {
      title: 'Тип',
      text: 'Публикация',
      url: '/'
    },
    popularity: '999К',
    button: {
      label: 'Создать проект',
      class: 'button_default',
      action: ''
    },
    tools: [
      {
        type: 'newObject',
        icon: images.icons.newEvent,
        text: 'Объекты на базе идеи'
      },
      {
        type: 'report',
        icon: images.icons.report,
        text: 'Пожаловаться'
      }
    ]
  },
  {
    id: 2,
    image: 'idea_02.png',
    isVideo: false,
    icon: 'feather',
    title: 'Короткое',
    tags: ['Автомобили'],
    category: {
      title: 'Сообщество',
      text: 'Технологии и жизнь',
      url: '/'
    },
    subcategory: {
      title: 'Тип',
      text: 'Опыт реализации',
      url: '/'
    },
    popularity: '999К',
    button: {
      label: 'Вступить в проект',
      class: 'button_default',
      action: ''
    }
  }
];

export default {
  name: 'Budget',
  components: {
    Breadcrumbs,
    FinancesPageToolBar,
    ToolsDropdown,
    BudgetDataTable,
    EventItem,
    ViewToggle
  },
  data() {
    return {
      items: IDEAS_ITEMS,
      maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 30)),
      todayDate(date) {
        const limit = this.maxDate;
        return date > limit;
      },
      defaultDate: null,
      filterDate: null,
      breadcrumbs: {
        links: [
          {
            label: 'Финансы',
            href: '/finances'
          }
        ],
        current: PAGE_NAME
      },
      tools: [
        {
          type: 'archive',
          icon: images.icons.archive,
          text: 'Перейти к архиву'
        },
        {
          type: 'history',
          icon: images.icons.history,
          text: 'Перейти к истории',
          count: 99
        }
      ],
      flowerTools: [
        {
          type: 'newEvent',
          icon: images.icons.newEvent,
          text: 'Новое событие'
        },
        {
          type: 'newEmail',
          icon: images.icons.newEmail,
          text: 'Новое письмо'
        },
        {
          type: 'newTransaction',
          icon: images.icons.newTransaction,
          text: 'Новая транзакция'
        },
        {
          type: 'newDocument',
          icon: images.icons.newDocument,
          text: 'Новый документ'
        },
        {
          type: 'newTable',
          icon: images.icons.newTable,
          text: 'Новая таблица'
        }
      ],
      views: ViewTypes,
      currentView: ViewTypes.BLOCK,
      budgetTableInfo: [
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
  },
  computed: {
    ...mapGetters({
      isLoaded: 'social/getLoaded'
    }),
    isListView() {
      return this.currentView === ViewTypes.LIST;
    }
  },
  methods: {
    ...mapActions({
      fetchSocial: 'social/fetchSocial'
    }),
    dateChange(date) {
      this.filterDate = date.value;
    },
    handleViewChange(viewType) {
      this.currentView = viewType;
    }
  }
};
</script>

<style>
</style>