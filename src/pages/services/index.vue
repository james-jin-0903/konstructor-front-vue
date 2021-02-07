<template lang="pug">
  .services-page
    .page__nav
      breadcrumbs(:links="servicesLinks.links" :current="servicesLinks.current")
      .navigation-tabs
        a.navigation-tabs__item(
          :class="{ 'active': currentTab === tabNames.PERFORMERS }"
          @click.prevent="changeTab(tabNames.PERFORMERS)"
        ) Исполнители
        a.navigation-tabs__item(
          :class="{ 'active': currentTab === tabNames.TASKS }"
          @click.prevent="changeTab(tabNames.TASKS)"
        ) Задачи
    .services-page__inner.container.page
      .loader(v-if="isLoading")
        spinner
      .services-page__content
        component(:is="currentTab")
</template>

<script>
  import { mapGetters } from 'vuex';

  import Breadcrumbs from '@/components/Breadcrumbs';
  import Spinner from '@/components/Spinner';
  import Tasks from '@/pages/services/tabs/Tasks';
  import Performers from '@/pages/services/tabs/Performers';
  import ViewToggle from '@/components/ViewToggle';
  import ToolsDropdown from '@/components/ToolsDropdown';
  import Checkbox from '@/components/forms/Checkbox';
  import TextInput from '@/components/forms/TextInput';
  import images from '@/components/images';

  const PAGE_NAME = 'Услуги';

  const tabs = {
    TASKS: 'Tasks',
    PERFORMERS: 'Performers'
  }

  export default {
    name: 'ServicesPage',
    components: {
      Breadcrumbs,
      Checkbox,
      Performers,
      Spinner,
      Tasks,
      TextInput,
      ToolsDropdown,
      ViewToggle
    },
    data() {
      return {
        servicesLinks: {
          links: [],
          current: PAGE_NAME
        },
        tabNames: tabs,
        currentTab: tabs.PERFORMERS,
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
      }
    },
    computed: {
      ...mapGetters({
          isLoading: 'social/getLoaded'
      })
    },
    methods: {
      changeTab(tabName) {
        this.currentTab = tabName;
      }
    }
  }
</script>

<style lang="scss" scoped></style>