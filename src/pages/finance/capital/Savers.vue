<template>
  <div class="my-accounts container">
    <breadcrumbs
      :links="breadcrumbs.links"
      :current="breadcrumbs.current"
    ></breadcrumbs>
    <NavigationTabs
      :links="tabLinks"
      current="Вкладчики"
      style="margin-top: -10px;"
    />
    <FinancesPageToolBar analyticsModeLink="/finances/capital/savers/analytics">
      <template v-slot:breadcrumbs>
        <span></span>
      </template>
      <template v-slot:capital-text-inner>
        <span class="finances-page__text">Капитал:</span>
      </template>
      <template v-slot:row-mode>
        <ViewToggle
          class="toolbar__item"
          @change="handleViewChange"
          style="margin-right: 0;"
        ></ViewToggle>
      </template>
      <template v-slot:default>
        <RouterLink
          to="/finances/capital/savers/history"
          class="finances-page__link"
        >
          <img src="@/assets/images/icon_history.svg" alt />
        </RouterLink>
      </template>
      <template v-slot:hourly-row>
        <span></span>
      </template>
      <template v-slot:profit-row>
        <span></span>
      </template>
    </FinancesPageToolBar>
    <SecondDataTable :tableInfo="sharesTableInfo">
      <template v-slot:table-btn>
        <span></span>
      </template>
    </SecondDataTable>
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
import NavigationTabs from '@/components/NavigationTabs';
import images from '@/components/images';
import ViewToggle from '@/components/ViewToggle';
import EventItem from '@/components/EventItem';
import { ViewTypes } from '@/utils/constants';
import SecondDataTable from '@/components/finances-page/SecondDataTable.vue';

const PAGE_NAME = 'Вкладчики';

const IDEAS_ITEMS = [
  {
    id: 1,
    image: 'idea_02.png',
    isVideo: false,
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
  name: 'ShareCommunities',
  components: {
    EventItem,
    ViewToggle,
    Breadcrumbs,
    FinancesPageToolBar,
    NavigationTabs,
    SecondDataTable
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
            label: 'Сообщества',
            href: '/'
          },
          {
            label: 'Konstruktor',
            href: '/'
          },
          {
            label: 'Финансы',
            href: '/finances/'
          },
          {
            label: 'Капитал',
            href: '/finances/'
          }
        ],
        current: PAGE_NAME
      },
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
      sharesTableInfo: [
        {
          user: 'Артем Артемов',
          share: '25%',
          amount: '$250'
        },
        {
          user: 'Борис Борисов',
          share: '25%',
          amount: '$250'
        },
        {
          user: 'Вадим Вадимов',
          share: '25%',
          amount: '$250'
        },
        {
          user: 'Иван Петров',
          share: '25%',
          amount: '$250'
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

<style lang="scss" scoped>
</style>
