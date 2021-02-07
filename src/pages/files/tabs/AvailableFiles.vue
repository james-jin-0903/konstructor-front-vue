<template lang="pug">
  .available-files-tab
    .available-files-tab__toolbar
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
              .icon-button.icon-button--rounded(data-title="Перейти к истории")
                img(:src="icons.history")
                span.icon-button__badge 99
    .available-files-tab__content
      .available-files-tab__list(
        :class="{ 'available-files-tab__list--of-blocks': !isListView }"
      )
        UploadedItem(
          v-for="(file, i) in files"
          :key="`fi${i}`"
          :item="file"
          :tools="uploadedItemTools"
          :class="{ 'available-files-tab__list-item--block': !isListView}"
          :is-list-item="isListView"
        ).available-files-tab__list-item
</template>

<script>
  import images from '@/components/images';
  import ViewToggle from '@/components/ViewToggle';
  import Select from '@/components/forms/Select';
  import CommonToolBar from '@/components/files-page/CommonToolBar';
  import { UPLOADS } from '@/pages/files/tabs/mock';
  import UploadedItem from '@/components/files-page/UploadedItem';

  export default {
    name: 'AvailableFilesTab',
    components: {
      CommonToolBar,
      Select,
      ViewToggle,
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
        files: UPLOADS,
        isListView: false,
        uploadedItemTools: [
          {
            type: 'add_bookmark',
            icon: images.icons.bookmarkBlue,
            text: 'Добавить в закладки',
          },
          {
            type: 'history',
            icon: images.icons.history,
            text: 'Перейти к истории',
            count: 99
          },
          {
            type: 'report',
            icon: images.icons.report,
            text: 'Пожаловаться',
          },
          {
            type: 'delete',
            icon: images.icons.trash,
            text: 'Удалить из доступных мне',
          },
        ]
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
  .available-files-tab {
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