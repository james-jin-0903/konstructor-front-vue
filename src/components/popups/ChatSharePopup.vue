<template lang="pug">
  modal(
    :name="modalName"
    :pivotY="0.1"
    :classes="['popup']"
    width="400px"
    height="auto"
  )
    .popup__close-btn(@click="$modal.hide(modalName)"): CloseIcon
    .popup__body.chat-share-popup
      .popup__title.chat-share-popup__title Поделиться в чат
      InputField(
        :icon-left="icons.search_blue"
        placeholder="Введите имя или название чата"
      ).chat-share-popup__search-field
      PerfectScrollbar
        .chat-share-popup__social-list
          Checkbox(
            v-for="(chat, i) in chats"
            :key="`chat${i}`"
            composable
          ).chat-share-popup__social-item
            template(#content)
              Avatar(:name="chat.name" :initials="chat.initials")
      .chat-share-popup__actions
        button(type="button").button.button_neutral.chat-share-popup__action Отменить
        button(type="button").button.button_default.chat-share-popup__action: span Поделиться

      .chat-share-popup__info
        span
          | Пользователя еще нет на Konstruktor? Вы можете
          a(href="#").link  приглаить его по электронной почте!
</template>

<script>
  import CloseIcon from '@/components/icons/CloseIcon';
  import InputField from '@/components/forms/InputField';
  import images from '@/components/images';
  import Checkbox from '@/components/forms/Checkbox';
  import Avatar from '@/components/Avatar';
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
  import popupList from './popups';

  const MODAL_NAME = popupList.CHAT_SHARE;

  export default {
    name: 'ChatSharePopup',
    components: {
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
        chats: [
          {
            name: 'Артем Артемов',
            initials: 'AA',
          },
          {
            name: 'Борис Борисов',
            initials: 'ББ',
          },
          {
            name: 'Владимир Владимирский',
            initials: '14',
          },
          {
            name: 'Галина Галинова',
            initials: 'ГГ',
          },
          {
            name: 'Артем Артемов',
            initials: 'AA',
          },
          {
            name: 'Борис Борисов',
            initials: 'ББ',
          },
          {
            name: 'Владимир Владимирский',
            initials: '14',
            fill: 0
          },
          {
            name: 'Галина Галинова',
            initials: 'ГГ',
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chat-share-popup {
    &__title {
      margin-bottom: 30px;
    }
    &__search-field {
      margin-bottom: 25px;
    }
    &__social-list {
      height: 190px;
    }
    &__social-item {
      margin-bottom: 20px;
    }
    &__actions {
      display: flex;
      margin-bottom: 30px;
      margin-top: 35px;
    }
    &__action {
      margin-right: 20px;
    }
  }
</style>