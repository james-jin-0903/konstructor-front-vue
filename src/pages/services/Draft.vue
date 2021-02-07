<template lang="pug">
  .services-draft-page
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.services-draft-page__toolbar
        .toolbar__main
          .toolbar__item
            ViewToggle(@change="changeView" :has-dropdown="true")
          a(href="#").toolbar__item
            img(src="../../assets/images/icon_earth.svg")
          a(href="#").toolbar__item.services-draft-page__link
            img(src="../../assets/images/icon_analytics.svg")
          .toolbar__item
            Select(
              :small="select.small",
              :icon="select.icon"
              :text="select.text"
              :options="select.options"
              :defaultValue="select.defaultValue"
            ).toolbar__select
          .toolbar__item.field.services-draft-page__date
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
            ).services-draft-page__date
        .toolbar__aside
          .toolbar__flower
            ToolsDropdown(:tools="flowerTools" :placeOnLeft="true").tools-dropdown_flower
    .services-draft-page__inner.container.page
      .loader(v-if="isLoaded")
        Spinner
      .services-draft-page__content
        .services-draft-page__counter {{ draftCount }} услуги
        EventItem(
          v-for="draft of drafts"
          :item="draft"
          :key="draft.id"
          :small="isSmall"
        )
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Spinner from '@/components/Spinner';
  import Breadcrumbs from '@/components/Breadcrumbs.vue';
  import TextInput from '@/components/forms/TextInput';
  import ToolsDropdown from '@/components/ToolsDropdown';
  import images from '@/components/images';
  import ViewToggle from '@/components/ViewToggle';
  import Select from '@/components/forms/Select';
  import EventItem from '@/components/EventItem';

  import { SERVICES_DRAFT_ITEMS } from './mock.ts';

  const PAGE_NAME = 'Черновики';

  export default {
    name: 'ServicesDrafts',
    components: {
      EventItem,
      ToolsDropdown,
      Breadcrumbs,
      Select,
      Spinner,
      TextInput,
      ViewToggle,
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
        drafts: SERVICES_DRAFT_ITEMS,
        draftCount: SERVICES_DRAFT_ITEMS.length,
        breadcrumbs: {
          links: [
            { label: 'Услуги', href: '/services' },
            { label: 'Исполнители', href: '' }
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
        ],
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
        isSmall: false
      };
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
      },
      changeView(view) {
        this.isSmall = view === 'List';
      }
    }
  };
</script>

<style lang="scss" scoped>
.services-draft-page {
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

  &__counter {
    padding-left: 5px;
    margin-bottom: 25px;
    @include font(16, r, 22px);
    color: $gray3;
  }
}
</style>
