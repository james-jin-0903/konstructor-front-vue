<template lang="pug">
  .my-files-tab
    .my-files-tab__toolbar
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
              ToolsDropdown(
                :tools="tools"
                @select="handleToolSelect"
                :badge-count="99"
              )
    .my-files-tab__content
      .my-files-tab__list(
        :class="{ 'my-files-tab__list--of-blocks': !isListView }"
      )
        UploadedItem(
          v-for="(file, i) in files"
          :key="`fi${i}`"
          :item="file"
          :tools="file.uploadType === 'File' ? uploadedFileItemTools : uploadedFolderItemTools"
          :class="{ 'my-files-tab__list-item--block': !isListView}"
          :is-list-item="isListView"
        ).my-files-tab__list-item
</template>

<script>
  import CommonToolBar from '@/components/files-page/CommonToolBar';
  import ViewToggle from '@/components/ViewToggle';
  import images from '@/components/images';
  import Select from '@/components/forms/Select';
  import ToolsDropdown from '@/components/ToolsDropdown';
  import UploadedItem from '@/components/files-page/UploadedItem';
  import { UPLOADS } from './mock';

  export default {
    name: 'MyFilesTab',
    components: {
      UploadedItem,
      ToolsDropdown,
      CommonToolBar,
      Select,
      ViewToggle
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
            type: 'upload_folder',
            icon: images.icons.folder_upload,
            text: 'Загрузить папку'
          },
          {
            type: 'upload_file',
            icon: images.icons.file_upload,
            text: 'Загрузить файлы'
          },
          {
            type: 'history',
            icon: images.icons.history,
            text: 'Перейти к истории',
            count: 99
          }
        ],
        files: UPLOADS,
        isListView: false,
        uploadedFileItemTools: [
          {
            type: 'edit',
            icon: images.icons.edit,
            text: 'Редактировать'
          },
          {
            type: 'rename',
            icon: images.icons.rename,
            text: 'Переименовать'
          },
          {
            type: 'move',
            icon: images.icons.move,
            text: 'Переместить'
          },
          {
            type: 'copy',
            icon: images.icons.copy,
            text: 'Копировать',
          },
          {
            type: 'download',
            icon: images.icons.download,
            text: 'Скачать',
          },
          {
            type: 'setup_access',
            icon: images.icons.account_plus,
            text: 'Настроить доступ',
          },
          {
            type: 'print',
            icon: images.icons.printer,
            text: 'Распечатать',
          },
          {
            type: 'add_bookmark',
            icon: images.icons.bookmarkBlue,
            text: 'Добавить в закладки',
          },
          {
            type: 'share',
            icon: images.icons.share,
            text: 'Поделиться',
            children: [
              {
                type: 'share.chat',
                icon: images.icons.chatBlue,
                text: 'Чат Konstruktor',
              },
              {
                type: 'share.social',
                icon: images.icons.social,
                text: 'Социальные сети',
              },
            ]
          },
          {
            type: 'history',
            icon: images.icons.history,
            text: 'Перейти к истории',
            count: 99
          },
          {
            type: 'delete',
            icon: images.icons.trash,
            text: 'Удалить',
          },
        ],
        uploadedFolderItemTools: [
          {
            type: 'rename',
            icon: images.icons.rename,
            text: 'Переименовать'
          },
          {
            type: 'move',
            icon: images.icons.move,
            text: 'Переместить'
          },
          {
            type: 'copy',
            icon: images.icons.copy,
            text: 'Копировать',
          },
          {
            type: 'download',
            icon: images.icons.download,
            text: 'Скачать',
          },
          {
            type: 'setup_access',
            icon: images.icons.account_plus,
            text: 'Настроить доступ',
          },
          {
            type: 'add_bookmark',
            icon: images.icons.bookmarkBlue,
            text: 'Добавить в закладки',
          },
          {
            type: 'share',
            icon: images.icons.share,
            text: 'Поделиться',
            children: [
              {
                type: 'dream',
                icon: images.icons.chatBlue,
                text: 'Чат Konstruktor',
              },
              {
                type: 'dream',
                icon: images.icons.social,
                text: 'Социальные сети',
              },
            ]
          },
          {
            type: 'history',
            icon: images.icons.history,
            text: 'Перейти к истории',
            count: 99
          },
          {
            type: 'delete',
            icon: images.icons.trash,
            text: 'Удалить',
          },
        ],
      }
    },
    created() {
      this.files.sort((first, _) => first.uploadType === 'Folder' ? -1 : 1);
    },
    methods: {
      handleToolSelect({ type }) {},
      onViewChange(view) {
        this.isListView = view === 'List';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-files-tab {
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