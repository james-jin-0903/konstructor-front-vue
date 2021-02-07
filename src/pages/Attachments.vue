<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-address__toolbar
        .mode
          Select(
            :small="select.small",
            :icon="select.icon"
            :text="select.text"
            :options="select.options"
          )
        .action

    .attachments.container.page
      FilesTable
</template>

<script>
  import images from '../components/images';
  import { mapGetters } from 'vuex';
  import Spinner from '@/components/Spinner';
  import Breadcrumbs from '@/components/Breadcrumbs.vue';
  import Select from '../components/forms/Select.vue';
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
  import FilesTable from '@/components/FilesTable';

  const PAGE_NAME = 'Прикрепленные файлы';
  export default {
    name: 'Chat',
    components: {
      FilesTable,
      Breadcrumbs,
      Select,
      Spinner,
      PerfectScrollbar
    },
    data() {
      return {
        images,
        userImage: null,
        socialsLoaded: false,
        breadcrumbs: {
          links: [{ label: 'Чат', href: '/chat' }],
          current: PAGE_NAME
        },
        select: {
          small: true,
          icon: require('../assets/images/icon_menu.png'),
          text: 'Список',
          options: [{
            icon: require('../assets/images/icon_earth.png'),
            text: 'Карта',
            class: 'pageSettings__selectMap',
            val: 'Карта'
          }]
        }
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      handleToolClick(toolType) {
      }
    }
  };
</script>

<style lang="scss" scoped>
  .conference-settings {
    &__form {
      width: 380px;
      margin-bottom: 23px;
    }

    &__field {
      margin-top: 15px;
    }

    &__status {
      color: #666666;
    }

    .table-component {
      &__title {
        font-size: 16px;
        margin-right: 20px;
      }

      &__counter {
        margin-right: 20px;   
      }

      &__table {
        margin-top: 0;
      }

      &__thead {
        margin: 0;
        padding: 12px 0;
      }

      &__row-item {
        width: 48%;
        box-sizing: border-box;
        padding-right: 10px;
      }

      &__row {
        padding-top: 0;
        padding-bottom: 0;
        min-height: 40px;
      }

      &__col {
        width: 48%;
      }
      
      &__submit {
        margin-top: 40px;
      }
    }
  }
</style>
