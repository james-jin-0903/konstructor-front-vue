<template lang="pug">
  modal(
    :name="modalName"
    :pivotY="0.1"
    :classes="['popup']"
    width="400px"
    height="auto"
  )
    .popup__close-btn(@click="$modal.hide(modalName)"): CloseIcon
    .popup__body.file-moving-popup
      .popup__title.file-moving-popup__title Перемещение файла
      template(v-if="!subfolders")
        InputField(
          :icon-left="icons.search_blue"
          placeholder="Введите название папки"
        ).file-moving-popup__search-field
        PerfectScrollbar
          .file-moving-popup__folders-list
            .file-moving-popup__folder-item(
              v-for="(folder, i) in folders"
              :key="`fold${i}`"
              @click="showSubfolders(folder)"
            ): Object(:name="folder.name" :custom-icon="icons.folder_outline")
      template(v-else)
        .file-moving-popup__folders-navigation
          img(:src="icons.arrow_left" @click="backToFolders").file-moving-popup__back-btn
          span.upload-label Папка:
          span {{ currentFolder }}
        InputField(
          :icon-left="icons.search_blue"
          placeholder="Введите название папки"
        ).file-moving-popup__search-field
        PerfectScrollbar
          .file-moving-popup__folders-list
            .file-moving-popup__folder-item(
              v-for="(folder, i) in subfolders"
              :key="`fold${i}`"
              @click="showSubfolders(folder)"
            ): Object(:name="folder.name" :custom-icon="icons.folder_outline")
      .file-moving-popup__actions
        button(type="button").button.button_neutral.file-moving-popup__action Отменить
        button(type="button").button.button_default.file-moving-popup__action: span Переместить
</template>

<script>
  import CloseIcon from '@/components/icons/CloseIcon';
  import InputField from '@/components/forms/InputField';
  import images from '@/components/images';
  import Checkbox from '@/components/forms/Checkbox';
  import Avatar from '@/components/Avatar';
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
  import popupList from './popups';
  import Object from '@/components/Object';

  const MODAL_NAME = popupList.FILE_MOVING;

  export default {
    name: 'FileMovingPopup',
    components: {
      Object,
      Avatar,
      Checkbox,
      InputField,
      CloseIcon,
      PerfectScrollbar
    },
    data() {
      return {
        icons: images.icons,
        modalName: MODAL_NAME,
        subfolders: null,
        currentFolder: null,
        folders: [
          {
            name:'Name_of_Folder1',
            subfolders: [
              { name: 'Name_of_subfolder1.1' },
              { name: 'Name_of_subfolder1.2' }
            ]
          },
          {
            name: 'Name_of_Folder2',
            subfolders: [
              { name: 'Name_of_subfolder2.1' }
            ]
          }
        ]
      }
    },
    methods: {
      showSubfolders({ name, subfolders }) {
        if (!subfolders) return;
        this.subfolders = [...subfolders];
        this.currentFolder = name;
      },
      backToFolders() {
        this.subfolders = null;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .file-moving-popup {
    &__title {
      margin-bottom: 30px;
    }
    &__search-field {
      margin-bottom: 25px;
    }
    &__folders-list {
      margin-bottom: 30px;
    }
    &__folder-item {
      padding: 4px;
      margin-bottom: 5px;
      border: 1px solid transparent;
      &:hover {
        border-color: $blue1;
      }
    }
    &__folders-navigation {
      margin-bottom: 20px;
      display: flex;
    }
    &__back-btn {
      margin-right: 20px;
      cursor: pointer;
    }
    &__actions {
      display: flex;
    }
    &__action {
      margin-right: 10px;
    }

    .upload-label {
      margin-right: 10px;
      color: $gray3;
    }
  }
</style>