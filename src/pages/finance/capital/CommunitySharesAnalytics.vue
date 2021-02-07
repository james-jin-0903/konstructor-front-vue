<template>
  <div class="container">
    <breadcrumbs
      :links="breadcrumbs.links"
      :current="breadcrumbs.current"
    ></breadcrumbs>

    <NavigationTabs
      :links="tabLinks"
      current="Доли сообществ"
      style="margin-top: -20px;"
    ></NavigationTabs>

    <FinancesPageToolBar>
      <template v-slot:breadcrumbs>
        <span></span>
      </template>
      <template v-slot:toolbar-data>
        <span></span>
      </template>
      <template v-slot:row-mode>
        <ViewToggle
          class="toolbar__item"
          @change="handleViewChange"
          style="margin-right: 0;"
        ></ViewToggle>
      </template>
      <template v-slot:history>
        <RouterLink
          to="/finances/capital/share-communities/history"
          class="finances-page__link"
        >
          <img src="@/assets/images/icon_history.svg" alt />
        </RouterLink>
      </template>
    </FinancesPageToolBar>

    <div
      v-for="capitalDataRow in capitalStructureData"
      :key="capitalDataRow.id"
      @click="fullScreenStructure"
      style="width: 40%;"
    >
      <pie-chart
        v-if="capitalDataRow.type == 'pie'"
        :pieChartData="capitalDataRow"
        :size="pieSizeMode"
        :colorTheme="{ r: 245, g: 178, b: 164 }"
      ></pie-chart>
    </div>
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
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import PieChart from '@/components/PieChart.vue';
import NavigationTabs from '@/components/NavigationTabs.vue';
import { mapActions, mapGetters } from 'vuex';
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
  name: 'CommunitySharesAnalytics',
  components: {
    Breadcrumbs,
    FinancesPageToolBar,
    PieChart,
    NavigationTabs,
    ViewToggle,
    EventItem
  },
  data() {
    return {
      breadcrumbs: {
        links: [
          {
            label: 'Финансы',
            href: '/finances/'
          },
          {
            label: 'Капитал',
            href: '/finances/'
          },
          {
            label: 'Доли сообществ',
            href: '/finances/capital/share-communities'
          }
        ],
        current: PAGE_NAME
      },
      pieSizeMode: 'full',
      capitalStructureData: [],
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
      currentView: ViewTypes.BLOCK
    };
  },
  created() {
    // TODO: let data of capital structure come from backend
    let capitalPieData = [
      {
        type: 'pie',
        previousRate: 50,
        chartHeader: 'Структура кредиторской задолженности',
        data: [
          { label: 'Сообщество 2', value: 250 },
          { label: 'Сообщество 3', value: 500 },
          { label: 'Сообщество 1', value: 250 }
        ]
      }
    ];

    this.capitalStructureData = capitalPieData;
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
    fullScreenStructure() {
      this.$router.push('/finances/analytics-mode/capital-structure');
    },
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