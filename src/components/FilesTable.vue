<template lang="pug">
  .files-table
    .files-table__row
      .files-table__col
        .files-table__file
          .files-table__image
            img(src="../assets/images/attachments.jpg")
          .files-table__name Name_of_File_1.png
      .files-table__col
        .files-table__info
          .files-table__title Автор
          .files-table__text.files-table__text_blue Константин Константиновский
      .files-table__col
        .files-table__info
          .files-table__title Дата прикрепления
          .files-table__text 21 ноя 2018, 12:00
      .files-table__col
        .files-table__info
          .files-table__title Размер
          .files-table__text 2 Мб
      button(type="button" @click="handleRemove").files-table__remove.remove-icon


    .files-table__row
      .files-table__col
        .files-table__file
          .files-table__image
            img(src="../assets/images/attachments.jpg")
          .files-table__name Name_of_File_1.png
      .files-table__col
        .files-table__info
          .files-table__title Автор
          .files-table__text.files-table__text_blue Константин Константиновский
      .files-table__col
        .files-table__info
          .files-table__title Дата прикрепления
          .files-table__text 21 ноя 2018, 12:00
      .files-table__col
        .files-table__info
          .files-table__title Размер
          .files-table__text 2 Мб
      button(type="button" @click="handleRemove").files-table__remove.remove-icon


    .files-table__row
      .files-table__col
        .files-table__file
          .files-table__image
            img(src="../assets/images/attachments.jpg")
          .files-table__name Name_of_File_1.png
      .files-table__col
        .files-table__info
          .files-table__title Автор
          .files-table__text.files-table__text_blue Константин Константиновский
      .files-table__col
        .files-table__info
          .files-table__title Дата прикрепления
          .files-table__text 21 ноя 2018, 12:00
      .files-table__col
        .files-table__info
          .files-table__title Размер
          .files-table__text 2 Мб
      button(type="button" @click="handleRemove").files-table__remove.remove-icon


    .files-table__row
      .files-table__col
        .files-table__file
          .files-table__image
            img(src="../assets/images/attachments.jpg")
          .files-table__name Name_of_File_1.png
      .files-table__col
        .files-table__info
          .files-table__title Автор
          .files-table__text.files-table__text_blue Константин Константиновский
      .files-table__col
        .files-table__info
          .files-table__title Дата прикрепления
          .files-table__text 21 ноя 2018, 12:00
      .files-table__col
        .files-table__info
          .files-table__title Размер
          .files-table__text 2 Мб
      button(type="button" @click="handleRemove").files-table__remove.remove-icon


    .files-table__row
      .files-table__col
        .files-table__file
          .files-table__image
            img(src="../assets/images/attachments.jpg")
          .files-table__name Name_of_File_1.png
      .files-table__col
        .files-table__info
          .files-table__title Автор
          .files-table__text.files-table__text_blue Константин Константиновский
      .files-table__col
        .files-table__info
          .files-table__title Дата прикрепления
          .files-table__text 21 ноя 2018, 12:00
      .files-table__col
        .files-table__info
          .files-table__title Размер
          .files-table__text 2 Мб
      button(type="button" @click="handleRemove").files-table__remove.remove-icon


    .files-table__row
      .files-table__col
        .files-table__file
          .files-table__image
            img(src="../assets/images/attachments.jpg")
          .files-table__name Name_of_File_1.png
      .files-table__col
        .files-table__info
          .files-table__title Автор
          .files-table__text.files-table__text_blue Константин Константиновский
      .files-table__col
        .files-table__info
          .files-table__title Дата прикрепления
          .files-table__text 21 ноя 2018, 12:00
      .files-table__col
        .files-table__info
          .files-table__title Размер
          .files-table__text 2 Мб
      button(type="button" @click="handleRemove").files-table__remove.remove-icon


</template>

<script>
  export default {
    components: {},
    props: {
      changed: Boolean
    },
    data() {
      return {};
    },
    computed: {},
    methods: {
      handleRemove() {

      }
    }
  };
</script>

<style lang="scss" scoped>
  .files-table {
    position: relative;

    &__row {
      display: flex;
      align-items: center;
      position: relative;
      border: 1px solid transparent;
      margin-bottom: 9px;
      padding: 1px 4px;

      padding-right: 40px;

      &:hover {
        border-color: #81A6C3;
      }
    }

    &__file {
      display: flex;
      align-items: center;
    }

    &__image {
      width: 30px;
      height: 30px;
      border-radius: 5px;
      overflow: hidden;
      margin-right: 11px;

      img {
        max-width: 100%;
        display: block;
      }
    }

    &__col {
      width: 17.6%;
      box-sizing: border-box;
      padding-right: 20px;

      &:first-child {
        width: 52.6%;
      }

      &:nth-child(4) {
        width: 6%;
      }
    }

    &__name {
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #222222;
    }

    &__title {
      font-size: 12px;
      line-height: 16px;
      color: #B2BCCA;
      margin-bottom: 2px;
    }

    &__text {
      font-size: 14px;
      line-height: 19px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      color: #666666;

      &_blue {
        color: #81A6C3;
      }
    }

    &__remove {
      position: absolute;
      right: 13px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      display: none;
    }

    &__row:hover &__remove {
      display: block;
    }
  }
</style>

