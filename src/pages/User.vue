<template lang="pug">
  div.user-page
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.user-page__toolbar
        .toolbar__main
          ViewToggle.toolbar__item
          a(href="#").toolbar__item
            img(src="../assets/images/icon_earth.svg")

          a(href="#").toolbar__item.user-page__link
            img(src="../assets/images/icon_analytics.svg")
          .toolbar__item.field.user-page__date
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
            ).user-page__date
          .toolbar__item
            Checkbox(text="Связанные со мной события")
          .toolbar__item
            ToolsDropdown(:tools="tools")

        .toolbar__aside
          .info-item.toolbar__item
            span.info-item__text Подписки:
            router-link(to="#").info-item__description 999К
          .info-item.toolbar__item
            span.info-item__text Подписчики:
            router-link(to="#").info-item__description 999К
          .toolbar__flower
            ToolsDropdown(:tools="flowerTools" :placeOnLeft="true").tools-dropdown_flower


    .user-page__inner.container.page
      .loader(v-if="isLoaded")
        Spinner

      .user-page__header
        div.user-page__links
          .user-page__title Все время
          a(href="#").user-page__back Вернуться ко всей активности
        .user-page__stats.stats
          router-link(to="#").stats__item
            img(src="../assets/images/icon_links.svg").stats__icon
            span.stats__text 999K
          router-link(to="#").stats__item
            img(src="../assets/images/icon_mail-black.svg").stats__icon
            span.stats__text 999K
          router-link(to="#").stats__item
            img(src="../assets/images/icon_draw-black.svg").stats__icon
            span.stats__text 999K
          router-link(to="#").stats__item
            img(src="../assets/images/icon_graph.svg").stats__icon
            span.stats__text 999K
          router-link(to="#").stats__item
            img(src="../assets/images/icon_rocket-black.svg").stats__icon
            span.stats__text 999K
          router-link(to="#").stats__item
            img(src="../assets/images/icon_rocket-yellow.svg").stats__icon
            span.stats__text 999K
          router-link(to="#").stats__item
            img(src="../assets/images/icon_rocket-red.svg").stats__icon
            span.stats__text 999K
      .user-page__text В выбранный период никакой активности нет. Вы можете
        a(href="#").link создать активность
        | с пользователем через меню действий в правом верхнем углу (кнопка с молнией).

      .user-page__content
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
import ViewToggle from '@/components/ViewToggle';

const PAGE_NAME = 'Константин Константинопольский';
export default {
  name: 'User',
  components: {
    ViewToggle,
    Timeline,
    ToolsDropdown,
    Breadcrumbs,
    SocialTable,
    AddSocial,
    NavigationTabs,
    TextInput,
    Spinner,
    Checkbox,
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
        links: [],
        current: PAGE_NAME,
      },
      tools: [
        {
          type: 'plan',
          icon: images.icons.planned,
          text: 'Планировщик',
        },
        {
          type: 'newMessage',
          icon: images.icons.chat,
          text: 'Написать сообщение',
        },
        {
          type: 'report',
          icon: images.icons.report,
          text: 'Пожаловаться',
        },
      ],
      flowerTools: [
        {
          type: 'newEvent',
          icon: images.icons.newEvent,
          text: 'Новое событие',
        },
        {
          type: 'newEmail',
          icon: images.icons.newEmail,
          text: 'Новое письмо',
        },
        {
          type: 'newTransaction',
          icon: images.icons.newTransaction,
          text: 'Новая транзакция',
        },
        {
          type: 'newDocument',
          icon: images.icons.newDocument,
          text: 'Новый документ',
        },
        {
          type: 'newTable',
          icon: images.icons.newTable,
          text: 'Новая таблица',
        },
      ],
    };
  },
  mounted() {},
  computed: {
    ...mapGetters({
      isLoaded: 'social/getLoaded',
    }),
  },
  methods: {
    ...mapActions({
      fetchSocial: 'social/fetchSocial',
    }),
    dateChange(date) {
      this.filterDate = date.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-page {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__toolbar {
    margin-top: 30px;
  }

  &__link {
    margin-left: 8px;
  }

  &__date {
    width: 300px;
    font-size: 14px;

    .mx-input {
      height: 27px;
    }
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

  &__back {
    font-size: 14px;
    line-height: 19px;
    color: #81a6c3 !important;
    cursor: pointer;
    text-decoration: none;
    margin-left: 39px;
  }

  &__links {
    display: flex;
    align-items: center;
  }
}

.stats {
  display: flex;
  align-items: center;

  &__item {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: black;
    text-decoration: none;

    margin-left: 20px;

    img {
      display: block;
    }
  }

  &__icon {
    margin-right: 10px;
  }
}
</style>
