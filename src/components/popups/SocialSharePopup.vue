<template lang="pug">
  modal(
    :name="modalName"
    :pivotY="0.1"
    :classes="['popup']"
    width="400px"
    height="auto"
  )
    .popup__close-btn(@click="$modal.hide(modalName)"): CloseIcon
    .popup__body.social-share-popup
      .popup__title.social-share-popup__title Поделиться в социальные сети
      InputField(
        :icon-left="icons.search_blue"
        placeholder="Введите название соцсети"
      ).social-share-popup__search-field
      PerfectScrollbar
        .social-share-popup__social-list
          Checkbox(
            v-for="(social, i) in socialList"
            :key="`soc${i}`"
            composable
          ).social-share-popup__social-item
            template(#content)
              Avatar(:name="social" :initials="social[0]")
      .social-share-popup__actions
        button(type="button").button.button_neutral.social-share-popup__action Отменить
        button(type="button").button.button_default.social-share-popup__action: span Поделиться

      .social-share-popup__info
        span
          | Социальной сети еще нет на Konstruktor? Вы можете
          a(href="#").link  подать заявку на ее добавление!
</template>

<script>
  import CloseIcon from '@/components/icons/CloseIcon';
  import InputField from '@/components/forms/InputField';
  import images from '@/components/images';
  import Checkbox from '@/components/forms/Checkbox';
  import Avatar from '@/components/Avatar';
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
  import popupList from './popups';

  const MODAL_NAME = popupList.SOCIAL_SHARE;

  export default {
    name: 'SocialSharePopup',
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
        socialList: [
          'Facebook',
          'Facemann+',
          'Pinterest',
          'Twitter',
          'Facebook',
          'Facemann+',
          'Pinterest',
          'Twitter'
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .social-share-popup {
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