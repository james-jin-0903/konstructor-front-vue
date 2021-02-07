<template lang="pug">
  .files-page
    .page__nav
      Breadcrumbs(:links="filesPageLinks.links" :current="filesPageLinks.current")
      .navigation-tabs
        a.navigation-tabs__item(
          :class="{ 'active': currentTab === tabNames.MY_FILES }"
          @click.prevent="changeTab(tabNames.MY_FILES)"
        ) Мои файлы
        a.navigation-tabs__item(
          :class="{ 'active': currentTab === tabNames.AVAILABLE_FILES }"
          @click.prevent="changeTab(tabNames.AVAILABLE_FILES)"
        ) Доступные мне
        a.navigation-tabs__item(
          :class="{ 'active': currentTab === tabNames.TRASH }"
          @click.prevent="changeTab(tabNames.TRASH)"
        ) Корзина
    .files-page__inner.container.page
      .loader(v-if="isLoading")
        Spinner
      .services-page__content
        component(:is="currentTab")
    SocialSharePopup
    ChatSharePopup
    FileMovingPopup
    ImagePopup
    AccessSettingsPopup
</template>

<script>
  import { mapGetters } from 'vuex';
  import Breadcrumbs from '@/components/Breadcrumbs';
  import AvailableFiles from '@/pages/files/tabs/AvailableFiles';
  import MyFiles from '@/pages/files/tabs/MyFiles';
  import Trash from '@/pages/files/tabs/Trash';
  import CloseIcon from '@/components/icons/CloseIcon';
  import SocialSharePopup from '@/components/popups/SocialSharePopup';
  import ChatSharePopup from '@/components/popups/ChatSharePopup';
  import FileMovingPopup from '@/components/popups/FileMovingPopup';
  import ImagePopup from '@/components/popups/ImagePopup';
  import AccessSettingsPopup from '@/components/popups/AccessSettingsPopup';

  const PAGE_NAME = 'Файлы';

  const tabs = {
    MY_FILES: 'MyFiles',
    AVAILABLE_FILES: 'AvailableFiles',
    TRASH: 'Trash'
  }

  export default {
    name: 'FilesPage',
    components: {
      AccessSettingsPopup,
      ImagePopup,
      FileMovingPopup,
      ChatSharePopup,
      SocialSharePopup,
      CloseIcon,
      AvailableFiles,
      Breadcrumbs,
      MyFiles,
      Trash
    },
    data() {
      return {
        filesPageLinks: {
          links: [],
          current: PAGE_NAME
        },
        tabNames: tabs,
        currentTab: tabs.MY_FILES,
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
