<template lang="pug">
  .common-toolbar.toolbar__main
    .common-toolbar__left
      slot(name="left")
    .common-toolbar__aside
      span.common-toolbar__message.gray Свободное пространство:
      span.common-toolbar__message 250 МБ
      a.button.button_default.button_medium
        span Расширить хранилище
      .common-toolbar__flower
        ToolsDropdown(:tools="flowerTools" :placeOnLeft="true").tools-dropdown_flower
</template>

<script>
  import ToolsDropdown from '@/components/ToolsDropdown';
  import images from '@/components/images';

  export default {
    name: 'CommonToolBar',
    components: {
      ToolsDropdown
    },
    data() {
      return {
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
    }
  }
</script>

<style lang="scss" scoped>
  .common-toolbar {
    display: flex;
    justify-content: space-between;

    &__left {}
    &__aside {
      display: flex;
      align-items: center;
    }
    &__message {
      margin-right: 10px;
      &.gray {
        color: $gray3;
      }
    }
    &__flower {
      margin-left: 20px;
    }
  }
</style>