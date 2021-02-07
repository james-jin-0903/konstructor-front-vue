<template lang="pug">
  modal(
    :name="modalName"
    :pivotY="0.2"
    :classes="['popup']"
    width="880px"
    height="auto"
  )
    .popup__close-btn(@click="$modal.hide(modalName)"): CloseIcon
    PerfectScrollbar
      .popup__body.image-popup
        .popup__title.image-popup__title My_Picture_Title_02-01-2017.jpg
        ToolsDropdown(
          :tools="tools"
          @select="handleToolSelect"
          :badge-count="99"
        )
        .header-object-page.image-popup__stat
          .header-object-page__left
            .header-object-page__creation-date Изменена 15 ноября 2017, 15:00
          .header-object-page__right
            .header-object-page__actions
              .header-object-page__action
                img(src="@/assets/images/icon_eye.svg")
                | 999K
              .header-object-page__action
                img(src="@/assets/images/icon_star-blue.svg")
                | 999K
              .header-object-page__action: img(src="@/assets/images/icon_crown.svg")
              .header-object-page__action: img(src="@/assets/images/icon_share.svg")
              .header-object-page__action: img(src="@/assets/images/icon_bookmark-blue.png")
        img(src="@/assets/images/flowers-big.png").image-popup__image
        .image-popup__comments
          .comments-block
            .comments-block__header
              .comments-block__title
                h2.image-popup__comment-title Комментарии
              .comments-block__text 54 993 комментария
            .comments-block__input-fields
              .comments-block__text-input
                InputField(:icon="icons.attach" placeholder="Введите сообщение" emoji)
              .comments-block__send-btn
                .button.button_disabled: img(src="@/assets/images/icon_enter.svg" width="16" height="14")
            .comments-block__comments-list
              Comment(v-for="(comment, i) in comments" :key="`comm${i}`" :comment="comment")
</template>

<script>
  import CloseIcon from '@/components/icons/CloseIcon';
  import InputField from '@/components/forms/InputField';
  import images from '@/components/images';
  import Checkbox from '@/components/forms/Checkbox';
  import Avatar from '@/components/Avatar';
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
  import popupList from './popups';
  import ToolsDropdown from '@/components/ToolsDropdown';
  import Comment from '@/components/Comment';
  import { SERVICES_ITEMS } from '@/pages/services/mock';

  const MODAL_NAME = popupList.IMAGE;

  export default {
    name: 'ImagePopup',
    components: {
      Comment,
      Avatar,
      Checkbox,
      InputField,
      CloseIcon,
      PerfectScrollbar,
      ToolsDropdown
    },
    data() {
      return {
        icons: images.icons,
        modalName: MODAL_NAME,
        tools: [],
        comments: [
          {
            name: 'Иван Петров',
            initials: 'ИП',
            date: '01 янв 2017, 15:00',
            message: 'Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит коммент в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментв развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк.'
          },
          {
            name: 'Анастасия Анстасиенко',
            initials: 'АА',
            date: '01 янв 2017, 15:00',
            message: 'Вот это товар!',
            object: SERVICES_ITEMS[5]
          }
        ],
      }
    },
    methods: {
      handleToolSelect() {}
    }
  }
</script>

<style lang="scss" scoped>
  .image-popup {
    height: 800px;

    &__title {
      margin-bottom: 35px;
    }
    &__stat {
      margin: 20px 0;
    }
    &__image {
      margin-bottom: 30px;
    }
    &__comment-title {
      @include font(16, b, 22px);
      color: gray7;
    }
  }
</style>