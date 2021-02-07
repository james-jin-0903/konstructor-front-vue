<template lang="pug">
  div.ideas-page
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.ideas-page__toolbar
        .toolbar__main
          button(type="button").toolbar__item.toggle
            .toggle__icon
              img(src="../../assets/images/icon_block.svg")
            .toggle__arrows
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

        .toolbar__aside
          .toolbar__flower
            ToolsDropdown(:tools="flowerTools" :placeOnLeft="true").tools-dropdown_flower


    .ideas-page__inner.container.page
      .loader(v-if="isLoaded")
        Spinner

      .ideas-page__content
        Timeline
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

  const PAGE_NAME = 'Черновики';
  export default {
    name: 'ideasDraft',
    components: {
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
        maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 30)),
        todayDate(date) {
          const limit = this.maxDate;
          return date > limit;
        },
        defaultDate: null,
        filterDate: null,
        socialsLoaded: false,
        breadcrumbs: {
          links: [
            { label: 'Идеи', href: '/ideas' }
          ],
          current: PAGE_NAME
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
      })
    },
    methods: {
      ...mapActions({
        fetchSocial: 'social/fetchSocial'
      }),
      dateChange(date) {
        this.filterDate = date.value;
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
