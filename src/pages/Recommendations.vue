<template>
  <div class="container">
    <FinancesPageToolBar
      :crumbLinks="breadcrumbs.links"
      :crumbCurrent="breadcrumbs.current"
    >
      <template #toolbar-data>
        <span></span>
      </template>
      <template v-slot:row-mode>
        <ViewToggle
          class="toolbar__item"
          @change="handleViewChange"
          style="margin-right: 0;"
        ></ViewToggle>
      </template>
      <template #default>
        <span></span>
      </template>
      <template #analytics-mode>
        <span></span>
      </template>
    </FinancesPageToolBar>
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
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import images from '@/components/images';
import ViewToggle from '@/components/ViewToggle';
import EventItem from '@/components/EventItem';
import { ViewTypes } from '@/utils/constants';
import { mapActions, mapGetters } from 'vuex';

const PAGE_NAME = 'Рекомендации';

const RECOMMENDATIONS = [
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
      label: '$9.99',
      class: 'button',
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
      label: '$9.99',
      class: 'button',
      action: ''
    }
  }
];

export default {
  name: 'Recommendations',
  components: {
    FinancesPageToolBar,
    EventItem,
    ViewToggle
  },
  data() {
    return {
      breadcrumbs: {
        links: [
          {
            label: 'Финансы',
            href: '/finances'
          }
        ],
        current: PAGE_NAME
      },
      items: RECOMMENDATIONS,
      maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 30)),
      todayDate(date) {
        const limit = this.maxDate;
        return date > limit;
      },
      defaultDate: null,
      filterDate: null,
      views: ViewTypes,
      currentView: ViewTypes.BLOCK
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