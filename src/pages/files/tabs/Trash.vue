<template lang="pug">
  .trash-tab
    .trash-tab__toolbar
      CommonToolBar
        template(#left)
          .toolbar__main
            .toolbar__item
              ViewToggle(@change="onViewChange")
            a(href="#").toolbar__item
              img(:src="icons.analytics")
            .toolbar__item
              Select(
                :small="select.small",
                :icon="select.icon"
                :text="select.text"
                :options="select.options"
                :defaultValue="select.defaultValue"
              ).toolbar__select
            .toolbar__item
              ToolsDropdown(:tools="tools" @select="handleToolSelect")
    .trash-tab__content
      .trash-tab__list(
        :class="{ 'trash-tab__list--of-blocks': !isListView }"
      )
        UploadedItem(
          v-for="(file, i) in files"
          :key="`fi${i}`"
          :item="file"
          :tools="tools"
          :class="{ 'trash-tab__list-item--block': !isListView}"
          :is-list-item="isListView"
        ).trash-tab__list-item
</template>

<script>
  import CommonToolBar from '@/components/files-page/CommonToolBar';
  import ViewToggle from '@/components/ViewToggle';
  import Select from '@/components/forms/Select';
  import ToolsDropdown from '@/components/ToolsDropdown';
  import images from '@/components/images';
  import { UPLOADS } from '@/pages/files/tabs/mock';
  import UploadedItem from '@/components/files-page/UploadedItem';

  export default {
    name: 'Trash',
    components: {
      ToolsDropdown,
      Select,
      ViewToggle,
      CommonToolBar,
      UploadedItem
    },
    data() {
      return {
        icons: images.icons,
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
        tools: [
          {
            type: 'recover_all',
            icon: images.icons.restore,
            text: 'Восстановить все'
          },
          {
            type: 'history',
            icon: images.icons.history,
            text: 'Перейти к истории',
          },
          {
            type: 'clear',
            icon: images.icons.remove,
            text: 'Очистить корзину'
          }
        ],
        files: UPLOADS,
        isListView: false
      }
    },
    methods: {
      handleToolSelect() {},
      onViewChange(view) {
        this.isListView = view === 'List';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .trash-tab {
    &__toolbar {
      margin-bottom: 50px;
    }
    &__list {
      &--of-blocks {
        display: flex;
        flex-wrap: wrap;
      }
    }
    &__list-item {
      margin-bottom: 10px;

      &--block {
        margin-right: 10px;
      }
    }
  }
</style>