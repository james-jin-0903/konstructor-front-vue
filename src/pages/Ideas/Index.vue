<template lang="pug">
  div.ideas-page
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.ideas-page__toolbar
        .toolbar__main
          ViewToggle(@change="handleViewChange").toolbar__item
          a(href="#").toolbar__item
            img(src="../../assets/images/icon_earth.svg")

          a(href="#").toolbar__item.ideas-page__link
            img(src="../../assets/images/icon_analytics.svg")
          .toolbar__item.field.ideas-page__date
            TextInput(
              placeholder="Все время"
              :validate="false"
              :range="true"
              :time="true"
              :value="filterDate"
              name="date_of_birth"
              :disabled-date="todayDate"
              :max-date="maxDate"
              isDate
              @input="dateChange"
            ).ideas-page__date
          .toolbar__item
            Checkbox(text="Мои идеи")
          .toolbar__item
            ToolsDropdown(:tools="tools" @select="handleToolSelect")

        .toolbar__aside
          .toolbar__flower
            ToolsDropdown(:tools="flowerTools" :placeOnLeft="true").tools-dropdown_flower

    .ideas-page__inner.container.page
      .loader(v-if="isLoaded")
        Spinner

      .ideas-page__content
        EventItem(:item="ideaItem" :key="ideaItem.id"  v-for="ideaItem of items"  :small="isListView")
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Spinner from '@/components/Spinner';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SocialTable from '@/components/SocialTable.vue';
import AddSocial from '@/components/SocialForm.vue';
import NavigationTabs from '@/components/NavigationTabs';
import TextInput from '@/components/forms/TextInput';
import Checkbox from '@/components/forms/Checkbox';
import ToolsDropdown from '@/components/ToolsDropdown';
import images from '@/components/images';
import Timeline from '@/components/Timeline';
import router from '@/router';
import ViewToggle from '@/components/ViewToggle';
import EventItem from '@/components/EventItem';
import { ViewTypes } from '@/utils/constants';

const PAGE_NAME = 'Идеи';

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
    tags: ['ИТ'],
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
  },
  {
    id: 3,
    isVideo: false,
    icon: 'feather',
    title:
      'Длинное название интересной идеи, состоящее из нескольких разных слов',
    tags: ['Автомобили'],
    category: {
      title: 'Сообщество',
      text: 'Автомир',
      url: '/'
    },
    subcategory: {
      title: 'Тип',
      text: 'Научная гипотеза',
      url: '/'
    },
    popularity: '999К',
    button: {
      label: 'Дать решение',
      class: 'button_default',
      action: ''
    }
  },
  {
    id: 4,
    image: 'idea_03.png',
    isVideo: false,
    icon: 'feather',
    title: 'Название моей интересной идеи',
    tags: ['Юриспруденция'],
    category: {
      title: 'Сообщество',
      text: 'Омега',
      url: '/'
    },
    subcategory: {
      title: 'Тип',
      text: 'Голосование',
      url: '/'
    },
    popularity: '999К',
    button: {
      label: 'Голосование',
      class: 'button_default',
      action: ''
    },
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
        type: 'history',
        icon: images.icons.history,
        text: 'Перейти к истории',
        count: 99
      },
      {
        type: 'newObject',
        icon: images.icons.cube,
        text: 'Объекты на базе идеи'
      },
      {
        type: 'dream',
        icon: images.icons.crownBlue,
        text: 'Добавить к мечте'
      },
      {
        icon: images.icons.share,
        text: 'Поделиться',
        children: [
          {
            type: 'dream',
            icon: images.icons.chatBlue,
            text: 'Чат Konstruktor'
          },
          {
            type: 'dream',
            icon: images.icons.social,
            text: 'Социальные сети'
          }
        ]
      },
      {
        type: 'addToArchive',
        icon: images.icons.off,
        text: 'Отправить в архив'
      }
    ]
  },
  {
    id: 5,
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
    id: 6,
    image: 'idea_02.png',
    isVideo: false,
    icon: 'feather',
    title: 'Короткое',
    tags: ['ИТ'],
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
  },
  {
    id: 7,
    isVideo: false,
    icon: 'feather',
    title:
      'Длинное название интересной идеи, состоящее из нескольких разных слов',
    tags: ['Автомобили'],
    category: {
      title: 'Сообщество',
      text: 'Автомир',
      url: '/'
    },
    subcategory: {
      title: 'Тип',
      text: 'Научная гипотеза',
      url: '/'
    },
    popularity: '999К',
    button: {
      label: 'Дать решение',
      class: 'button_default',
      action: ''
    }
  },
  {
    id: 8,
    image: 'idea_03.png',
    isVideo: false,
    icon: 'feather',
    title: 'Название моей интересной идеи',
    tags: ['Юриспруденция'],
    category: {
      title: 'Сообщество',
      text: 'Омега',
      url: '/'
    },
    subcategory: {
      title: 'Тип',
      text: 'Голосование',
      url: '/'
    },
    popularity: '999К',
    button: {
      label: 'Голосование',
      class: 'button_default',
      action: ''
    },
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
        type: 'history',
        icon: images.icons.history,
        text: 'Перейти к истории',
        count: 99
      },
      {
        type: 'newObject',
        icon: images.icons.cube,
        text: 'Объекты на базе идеи'
      },
      {
        type: 'addToArchive',
        icon: images.icons.off,
        text: 'Отправить в архив'
      }
    ]
  }
];
export default {
  name: 'ideas',
  components: {
    EventItem,
    ViewToggle,
    Timeline,
    ToolsDropdown,
    Breadcrumbs,
    SocialTable,
    AddSocial,
    NavigationTabs,
    TextInput,
    Spinner,
    Checkbox
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
        links: [],
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
      currentView: ViewTypes.BLOCK
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

<style lang="scss" scoped>
.ideas-page {
  &__toolbar {
    margin-top: 30px;
  }

  &__inner {
    padding-top: 47px;
  }

  &__title {
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    color: #444444;
  }

  &__text {
    font-size: 14px;
    line-height: 19px;
  }

  &__header {
    margin-bottom: 25px;
  }

  &__content {
    padding-top: 5px;
  }
}
</style>
