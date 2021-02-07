<template lang="pug">
  Modal(@close="handleClose").media-modal
    template(v-slot:header)
      | Загрузка изображения или видео
    template(v-slot:body)
      TextInput(placeholder="Введите название файла или папки" :icon="icons.searchBlue").input_search
      .media-modal__media-wrapper(v-if="items && items.length")
        PerfectScrollbar
          .media-modal__media
            MediaItem(
              v-for="item of items",
              @click="handleItemSelect(item)",
              :item="item",
              :key="item.id",
              v-bind:class="{'media-item_active':  selectedItem && selectedItem === item.id}"
            )
      .media-modal__additional Файла еще нет в хранилище? Вы можете&nbsp;
        span(@click="handleAdd").link загрузить его с устройства!

    template(v-slot:footer)
      .media-modal__footer
        button(type="button" @click="handleClose").button.button_neutral.button_size-1
          span Отменить
        button(type="button" @click="handleSelect" :disabled="!selectedItem").button.button_default.button_size-1
          span Загрузить
</template>

<script>
  import Modal from '@/components/Modal';
  import TextInput from '@/components/forms/TextInput';
  import images from '../components/images';
  import MediaItem from '@/components/MediaItem';
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar';

  export default {
    name: 'MediaModal',
    components: { MediaItem, TextInput, Modal, PerfectScrollbar },
    props: {
      items: Array
    },
    data() {
      return {
        icons: images.icons,
        selectedItem: null
      };
    },
    methods: {
      handleClose() {
        this.$emit('close');
      },
      handleAdd() {
        this.$emit('add');
      },
      handleSelect() {
        const selectedItem = this.items.find(item => item.id === this.selectedItem);
        const url = selectedItem.url;
        this.$emit('select', { url });
      },
      handleItemSelect(item) {
        if (!item.isFolder) {
          this.selectedItem = item.id;
        }
      }
    }
  };
</script>

<style lang="scss">
  .media-modal {
    .modal-container {
      width: 600px;
    }

    .ps {
      height: 100%;
      max-height: 276px;
    }

    &__media {
      display: flex;
      flex-wrap: wrap;

      &-wrapper {
        margin-top: 19px;
        max-height: 276px;
      }

      .media-item {
        width: 17.5%;
        margin-right: 2.6%;
        margin-bottom: 15px;

        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }

    &__additional {
      font-family: $openSans;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      color: #444444;

      margin-top: 32px;
    }

    &__footer {
      display: flex;
      padding-bottom: 20px;
    }

    .modal-footer {
      padding-top: 11px;
    }

    .button {
      padding: 0 31px;
      margin-right: 6px;
    }
  }


</style>
