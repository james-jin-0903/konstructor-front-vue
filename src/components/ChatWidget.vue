<template lang="pug">
  .chat
    .chat__toggle(@click="toggle")
      img.chat__img(src="../assets/images/icon_chat.png")
    .chat__container(v-if="isOpen")
      .chat__header
        button(v-if="!isList" type="button" @click="toggleList").chat__back
          <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 6.44687C15.7761 6.44687 16 6.69449 16 6.99994C16 7.30539 15.7761 7.55301 15.5 7.55301L0.5 7.55301C0.223858 7.55301 -3.1933e-07 7.30539 -3.05978e-07 6.99994C-2.92627e-07 6.69449 0.223858 6.44687 0.5 6.44687L15.5 6.44687Z" fill="#81A6C3"/><path d="M6.68197 13.0558C6.87723 13.2718 6.87723 13.622 6.68197 13.838C6.48671 14.054 6.17012 14.054 5.97486 13.838L0.318008 7.58074C0.122746 7.36475 0.122746 7.01457 0.318008 6.79858C0.51327 6.58259 0.829853 6.58259 1.02511 6.79858L6.68197 13.0558Z" fill="#81A6C3"/><path d="M1.02512 7.20136C0.829861 7.41734 0.513278 7.41734 0.318016 7.20136C0.122754 6.98537 0.122754 6.63519 0.318016 6.4192L5.97487 0.161959C6.17013 -0.0540274 6.48672 -0.0540276 6.68198 0.161959C6.87724 0.377945 6.87724 0.728128 6.68198 0.944114L1.02512 7.20136Z" fill="#81A6C3"/></svg>

        .chat__title(v-if="isList") Список диалогов
        .chat__title(v-if="!isList") {{userName}}
        .chat__actions
          button.chat__action(type="button" v-if="!isList")
            img(src="../assets/images/icon_options.svg")
          button.chat__action(type="button")
            img(src="../assets/images/icon_stack.svg")
          button.chat__action(type="button" @click="toggle")
            span.remove-icon
      .chat__inner
        .chat__list(v-if="isList" @click="toggleList")
          PerfectScrollbar
            ChatUser(:isMinimized="true").chat__user
        .chat__chat(v-if="!isList")
          .chat__name
            .chat__name-icon
              img(src="../assets/images/icon_rocket-content.svg")
            .chat__name-text Очень длинное название задачи длинное название задачи

          .chat__interactions
            button(type="button").chat__interaction
              img(src="../assets/images/icon_camera.svg")
            button(type="button").chat__interaction
              img(src="../assets/images/icon_call.svg")
          .chat__messages
            .chat__messages-inner
              PerfectScrollbar
                ChatMessage(:isMinimized="true")
          ChatInput(:isMinimized="true").chat__input


</template>

<script>
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
  import ChatUser from '@/components/ChatUser';
  import ChatMessage from '@/components/ChatMessage';
  import ChatInput from '@/components/ChatInput';

  export default {
    name: 'ChatWidget',
    components: {
      ChatInput,
      ChatMessage,
      ChatUser,
      PerfectScrollbar
    },
    mounted() {
    },
    watch: {
      isList() {
        if (!this.isList) {
          setTimeout(() => {
            const messagesContainer = this.$el.querySelector('.chat__messages-inner .ps');
            const messagesInner = messagesContainer.querySelector('.chat__messages-inner .ps > div');
            messagesContainer.scrollTop = messagesInner.offsetHeight;
          });
        }
      }
    },
    data() {
      return {
        isOpen: false,
        isList: true,
        userName: 'Константин Константинович'
      };
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
      },
      toggleList() {
        this.isList = !this.isList;
      }
    }
  };
</script>

<style lang="scss">
  .ps__rail-y,
  .ps__thumb-y {
    width: 4px;
  }
</style>
<style lang="scss" scoped>
  $headerHeight: 31px;

  .chat {
    z-index: 99;
    position: fixed;
    bottom: 100px;
    right: 50px;

    .ps {
      height: 100%;
    }


    &__toggle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #252525;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      img {
        opacity: 0.5;
      }
    }

    &__toggle:hover img {
      opacity: 1;
    }


    &__title {
      font-weight: bold;
      font-size: 14px;
      line-height: 19px;
      color: #444444;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__back {
      border: none;
      margin-right: 10px
    }

    &__header {
      height: $headerHeight;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      border-bottom: 1px solid #D8E0E6;
      padding-left: 9px;
      padding-right: 10px;
    }

    &__container {
      position: absolute;
      right: 50px;
      bottom: 0;
      width: 280px;
      height: 360px;
      background: #FFFFFF;
      border: 1px solid #D8E0E6;
      box-sizing: border-box;
      border-radius: 3px;
      display: flex;
      flex-direction: column;
    }

    &__inner {
      height: calc(100% - #{$headerHeight});
      flex: 1;
      display: flex;
      width: 100%;
    }

    &__messages {
      position: relative;
      flex: 1;

      &-inner {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
      }
    }

    &__chat {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    &__list {
      width: 100%;
    }

    &__actions {
      display: flex;
      align-items: center;
    }

    &__action {
      cursor: pointer;
      border: none;
      padding: 0;
      margin-left: 20px;
      display: flex;
      align-items: center;

      img {
        display: block;
      }
    }

    &__interactions {
      display: flex;
      justify-content: flex-end;
      height: 40px;
      background: #F1F2F7;
      flex-shrink: 0;
      padding: 0 10px;
    }

    &__interaction {
      border: none;
      background: none;
      margin-left: 20px;
    }

    &__name {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 19px;
      color: #81A6C3;
      padding: 5px 10px;

      &-icon {
        margin-right: 10px;

        img {
          display: block;
        }
      }

      &-text {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    &__input {
      margin: -1px;
    }
  }
</style>
