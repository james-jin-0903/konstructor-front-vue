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
          .toolbar__item
            Select(
              :small="select.small",
              :icon="select.icon"
              :text="select.text"
              :options="select.options"
              :defaultValue="select.defaultValue"
            ).toolbar__select
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

        .toolbar__aside
          .toolbar__flower
            ToolsDropdown(:tools="flowerTools" :placeOnLeft="true").tools-dropdown_flower


    .ideas-page__inner.container.page
      .loader(v-if="isLoaded")
        Spinner

      .ideas-page__content
        EventItem(:item="ideaItem" :key="ideaItem.id" v-for="ideaItem of items"  :small="isListView")
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
  import Select from '@/components/forms/Select';
  import { ViewTypes } from '@/utils/constants';

  const PAGE_NAME = 'Архив';

  const IDEAS_ITEMS = [
    {
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
        action: '',
        disabled: true
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
        action: '',
        disabled: true
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
        action: '',
        disabled: true
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
    }
  ];
  export default {
    name: 'ideas',
    components: {
      Select,
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
        socialsLoaded: false,
        currentView: ViewTypes.BLOCK,
        breadcrumbs: {
          links: [
            { label: 'Идеи', href: '/ideas' }
          ],
          current: PAGE_NAME
        },
        select: {
          text: 'Алфавит',
          defaultValue: 'Алфавит',
          options: [
            {
              icon: images.icons.sortDown,
              text: 'Алфавит',
              val: 'Алфавит'
            }
          ]
        },
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
        ]
      };
    },
    mounted() {
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
      },
      handleToolSelect(event) {
        const toolType = event.type;
        switch (toolType) {
          case 'draft' : {
            router.push({ path: `ideas/${toolType}` });
            break;
          }
          case 'archive' : {
            router.push({ path: `ideas/${toolType}` });
            break;
          }
          case 'history' : {
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
