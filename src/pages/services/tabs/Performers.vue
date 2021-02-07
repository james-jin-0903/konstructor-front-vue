<template lang="pug">
  .performers
    .toolbar.navigation-tabs__toolbar
      .toolbar__main
        .toolbar__item
          ViewToggle(@change="changeView" :has-dropdown="true")
        a(href="#").toolbar__item
          img(:src="images.icons.earth")
        a(href="#").toolbar__item.ideas-page__link
          img(:src="images.icons.analytics")
        .toolbar__item.field.ideas-page__date
          TextInput(
            placeholder="Все время"
            :validate="false"
            :range="true"
            :time="true"
            :value="null"
            name="date_of_birth"
            :disabled-date="null"
            :max-date="null"
            isDate
            @input="() => null"
          ).ideas-page__date
        .toolbar__item
          Checkbox(text="Мои идеи")
        .toolbar__item
          ToolsDropdown(:tools="tools" @select="() => null")
      .toolbar__aside
        button(type="button").button.button_medium.button_neutral Заказы моих услуг
        .toolbar__flower
          ToolsDropdown(:tools="flowerTools" :placeOnLeft="true").tools-dropdown_flower
    .services
      EventItem(
        v-for="service in services"
        :item="service"
        :key="service.id"
        :small="isSmall"
      )
</template>

<script>
  import images from '@/components/images';
  import Checkbox from '@/components/forms/Checkbox';
  import ToolsDropdown from '@/components/ToolsDropdown';
  import TextInput from '@/components/forms/TextInput';
  import ViewToggle from '@/components/ViewToggle';
  import EventItem from '@/components/EventItem';
  import { ViewTypes } from '@/utils/constants.ts';
  import { SERVICES_ITEMS } from '../mock';


  export default {
    name: 'PerformersTab',
    components: {
      Checkbox,
      EventItem,
      TextInput,
      ToolsDropdown,
      ViewToggle
    },
    data() {
      return {
        images,
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
        services: SERVICES_ITEMS,
        viewType: ViewTypes.BLOCK,
      }
    },
    computed: {
      isSmall() {
        return this.viewType === ViewTypes.LIST;
      }
    },
    methods: {
      changeView(view) {
        this.viewType = view;
      }
    }
  };
</script>

<style lang="scss" scoped>
.toolbar {
  margin-bottom: 50px;

  &__flower {
    margin-left: 20px;
  }
}
</style>