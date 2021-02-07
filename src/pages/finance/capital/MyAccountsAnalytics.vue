<template>
  <div class="container">
    <breadcrumbs
      :links="breadcrumbs.links"
      :current="breadcrumbs.current"
    ></breadcrumbs>
    <NavigationTabs
      :links="tabLinks"
      current="Мой счет"
      style="margin-top: -10px;"
    />
    <FinancesPageToolBar
      analyticsModeLink="/finances/capital/my-account/analytics"
    >
      <template v-slot:breadcrumbs>
        <span></span>
      </template>
      <template v-slot:history>
        <RouterLink
          to="/finances/capital/my-account/history"
          class="finances-page__link"
        >
          <img src="@/assets/images/icon_history.svg" alt />
        </RouterLink>
      </template>
      <template v-slot:capital-text-inner>
        <span class="finances-page__text">Средства на счету:</span>
      </template>
      <template v-slot:row-mode>
        <ViewToggle
          class="toolbar__item"
          @change="handleViewChange"
          style="margin-right: 0;"
        ></ViewToggle>
      </template>
      <template v-slot:hourly-row>
        <span></span>
      </template>
      <template v-slot:profit-row>
        <span></span>
      </template>
    </FinancesPageToolBar>
    <h3>Капитал</h3>
    <SingleLineChart :width="1100" :seriesData="capitalData" />
    <h3 class="finances-page__total-events">
      Рекомендации для увеличения капитала
      <span>Еще {{ items.length }} рекомендаций</span>
    </h3>
    <div class="page">
      <div>
        <EventItem
          :item="ideaItem"
          :key="ideaItem.id"
          v-for="ideaItem of items"
          :small="isListView"
          route="/finances/capital/my-account/item"
        ></EventItem>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import NavigationTabs from '@/components/NavigationTabs.vue';
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import SingleLineChart from '@/components/Charts/LineChart/SingleLineChart.vue';
import images from '@/components/images';
import ViewToggle from '@/components/ViewToggle';
import EventItem from '@/components/EventItem';
import { ViewTypes } from '@/utils/constants';

const PAGE_NAME = 'Analytics';

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
  name: 'MyAccountsAnalytics',
  components: {
    Breadcrumbs,
    NavigationTabs,
    FinancesPageToolBar,
    SingleLineChart,
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
      tools: [
        {
          type: 'draft',
          icon: images.icons.draft,
          text: 'Перейти к черновикам'
        },
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
      breadcrumbs: {
        links: [
          {
            label: 'Финансы',
            href: '/finances'
          },
          {
            label: 'Капитал',
            href: '/finances/'
          },
          {
            label: 'Мой счет',
            href: '/finances/capital/my-account'
          }
        ],
        current: PAGE_NAME
      },
      tabLinks: [
        {
          label: 'Мой счет',
          href: '/finances/capital/my-account'
        },
        {
          label: 'Дебеторы',
          href: '/finances/capital/debitors'
        },
        {
          label: 'Кредиторы',
          href: '/finances/capital/lenders'
        },
        {
          label: 'Доли сообществ',
          href: '/finances/capital/share-communities'
        },
        {
          label: 'Инвесторам',
          href: '/finances/capital/investors'
        },
        {
          label: 'Вкладчики',
          href: '/finances/capital/savers'
        }
      ],
      capitalData: [
        {
          name: 'Capital',
          type: 'line',
          data: [16, 12, 10, 8, 7, 13, 12, 13, 12, 11, 10, 12]
        }
      ]
    };
  },
  mounted() {},
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
    },
    handleToolSelect(event) {
      const toolType = event.type;
      switch (toolType) {
        case 'draft': {
          router.push({ path: `ideas/${toolType}` });
          break;
        }
        case 'archive': {
          router.push({ path: `ideas/${toolType}` });
          break;
        }
        case 'history': {
          break;
        }
      }
    }
  }
};
</script>

<style>
</style>