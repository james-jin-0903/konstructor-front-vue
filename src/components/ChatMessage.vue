<template lang="pug">
  div
    .chat-message(v-bind:class="{'messagechat-user_small' : isMinimized }")
      .chat-message__aside
        Avatar(fill-level="20" initials="").chat-message__avatar

      .chat-message__main
        .chat-message__top
          //.chat-message__icon
            img(src="../assets/images/icon_message-rocket.svg")
          .chat-message__name Конструктор
          .chat-message__date
            img(src="../assets/images/icon_hot.svg").chat-message__date-icon
            | 02 янв 2017, 15:00
        .chat-message__message
          .chat-message__text
            pre
              | Здравствуйте, Иван! Добро пожаловать на Конструктор!
              |
              | На основании введенных Вами при регистрации данных мы подобрали Вам наиболее подходящие варианты, которые могут Вас заинтересовать:
              | 1. Новые удивительные знакомства.
              | 2. Интересные публикации.
              | 3. Лучшие инвестпредложения.
              |
              | Если у Вас появятся какие-либо вопросы, Вы всегда можете познакомиться с сайтом подробнее с помощью видеоуроков или написать нам в поддержку.
              |
              | Удачи на пути к Вашей мечте!

    .chat-message(v-bind:class="{ 'chat-message_small' : isMinimized }")
      .chat-message__aside
        Avatar(initials="КК" fill-level="20").chat-message__avatar

      .chat-message__main
        .chat-message__top
          .chat-message__name Константин Константинопольский
          .chat-message__date
            img(src="../assets/images/icon_hot.svg").chat-message__date-icon
            | 31 дек 2017, 15:00
          .chat-message__edit.tip(rel="Опции")
            ToolsDropdown(:tools="tools", @click="handleToolClick" rel="Поле не обязательно для заполнения" :placeOnLeft="true" :noBackground="true")
        .chat-message__message
          .chat-message__text
            pre
              | Фильм интересный, но я не кинокритик и не буду заниматься его обсуждением. А вот суть реальной картины при возможной катастрофе постараюсь раскрыть: меня, как и многих других, это может коснуться.

          .chat-message__action
            img(src="../assets/images/icon_bad-warning.svg").chat-message__action-icon
            span Вы пожаловались на сообщение

    .chat-message(v-bind:class="{ 'chat-message_small' : isMinimized }").chat-message_self
      .chat-message__aside
        Avatar(fill-level="20" initials="ИП").chat-message__avatar

      .chat-message__main
        .chat-message__top
          .chat-message__icon
            img(src="../assets/images/icon_message-rocket.svg")
          .chat-message__name Иван Петров
          .chat-message__date
            img(src="../assets/images/icon_hot.svg").chat-message__date-icon
            | 02 янв 2017, 15:00
          .chat-message__edit
            ToolsDropdown(:tools="tools", @click="handleToolClick")
        .chat-message__message
          .chat-message__text
            pre
              | Фильм интересный, но я не кинокритик и не буду заниматься его обсуждением. А вот суть реальной картины при возможной катастрофе.
              .files-list.chat-message__files
                .files-list__inner
                  .files-list__item.file-item
                    .file-item__image
                      img(src="../assets/images/chat-image.jpg")
                    .file-item__description Name_of_File_1.png
                  .files-list__item.file-item
                    .file-item__image
                      img(src="../assets/images/chat-image.jpg")
                    .file-item__description Name_of_File_2.png
                  .files-list__item.file-item
                    .file-item__image
                      img(src="../assets/images/chat-image.jpg")
                    .file-item__description Name_of_File_3.png
                  .files-list__item.file-item
                    .file-item__image
                      img(src="../assets/images/chat-image.jpg")
                    .file-item__description Name_of_File_4.png
                  .files-list__item.file-item
                    .file-item__image
                      img(src="../assets/images/chat-image.jpg")
                    .file-item__description Name_of_File_5.png
                  .files-list__item.file-item
                    .file-item__image
                      img(src="../assets/images/chat-image.jpg")
                    .file-item__description Name_of_File_6.png
                .files-list__more Показать еще 7 файлов

          .chat-message__action
            img(src="../assets/images/icon_edit.svg").chat-message__action-icon
            span Сообщение отредактировано - 02 янв 2017, 15:03

    .chat-message
      .chat-message__aside
        Avatar(fill-level="20" initials="КК").chat-message__avatar

      .chat-message__main
        .chat-message__top
          .chat-message__name Константин Константинопольский
          .chat-message__date
            img(src="../assets/images/icon_hot.svg").chat-message__date-icon
            | 02 янв 2017, 15:00
          .chat-message__restore.tip(rel="Восстановить")
            img(src="../assets/images/icon_restore.svg")
        .chat-message__message
          .chat-message__text

          .chat-message__action
            img(src="../assets/images/icon_trash.svg").chat-message__action-icon
            span Вы удалили сообщение у себя


    .chat-message(v-bind:class="{ 'chat-message_small' : isMinimized }")
      .chat-message__aside
        Avatar(fill-level="20" initials="КК").chat-message__avatar

      .chat-message__main
        .chat-message__top
          .chat-message__name Константин Константинопольский
          .chat-message__date
            img(src="../assets/images/icon_hot.svg").chat-message__date-icon
            | 31 дек 2017, 15:00
          .chat-message__edit.tip(rel="Опции")
            ToolsDropdown(:tools="tools", @click="handleToolClick" rel="Поле не обязательно для заполнения" :placeOnLeft="true" :noBackground="true")
        .chat-message__message
          .chat-message__text
            pre
              | Фильм интересный, но я не кинокритик и не буду заниматься его обсуждением. А вот суть реальной картины при возможной катастрофе постараюсь раскрыть: меня, как и многих других, это может коснуться.

          .chat-message__action
            img(src="../assets/images/icon_bad-warning.svg").chat-message__action-icon
            span Вы пожаловались на сообщение

    .chat-message(v-bind:class="{ 'chat-message_small' : isMinimized }").chat-message_self
      .chat-message__aside
        Avatar(fill-level="20" initials="ИП").chat-message__avatar

      .chat-message__main
        .chat-message__top
          .chat-message__name Иван Петров
          .chat-message__date
            img(src="../assets/images/icon_hot.svg").chat-message__date-icon
            | 02 янв 2017, 15:00
        .chat-message__message
          .chat-message__text
            pre
              | Фильм интересный, но я не кинокритик и не буду заниматься его обсуждением. А вот суть реальной картины при возможной катастрофе.
          .chat-message__action
            img(src="../assets/images/icon_edit.svg").chat-message__action-icon
            span Сообщение отредактировано - 02 янв 2017, 15:03

    .chat-message(v-bind:class="{ 'chat-message_small' : isMinimized }")
      .chat-message__aside
        Avatar(fill-level="20" initials="КК").chat-message__avatar

      .chat-message__main
        .chat-message__top
          .chat-message__name Константин Константинопольский
          .chat-message__date
            img(src="../assets/images/icon_hot.svg").chat-message__date-icon
            | 02 янв 2017, 15:00
          .chat-message__restore.tip(rel="Восстановить")
            img(src="../assets/images/icon_restore.svg")
        .chat-message__message
          .chat-message__text

          .chat-message__action
            img(src="../assets/images/icon_trash.svg").chat-message__action-icon
            span Вы удалили сообщение у себя

    .chat-message(v-bind:class="{ 'chat-message_small' : isMinimized }").chat-message_self
      .chat-message__aside
        Avatar(fill-level="20" initials="ИП").chat-message__avatar

      .chat-message__main
        .chat-message__top
          .chat-message__name Иван Петров
          .chat-message__date
            img(src="../assets/images/icon_hot.svg").chat-message__date-icon
            | 02 янв 2017, 15:00
        .chat-message__message
          .chat-message__text
            pre
              | Фильм интересный.

          .chat-message__forward
            .chat-message
              .chat-message__aside
                Avatar(fill-level="20" initials="КК").chat-message__avatar

              .chat-message__main
                .chat-message__top
                  .chat-message__name Константин Константинопольский
                  .chat-message__date
                    img(src="../assets/images/icon_hot.svg").chat-message__date-icon
                    | 02 янв 2017, 15:00
                .chat-message__message
                  .chat-message__text
                    pre
                      | Фильм интересный, но я не кинокритик и не буду заниматься его обсуждением. А вот суть реальной картины при возможной катастрофе постараюсь раскрыть: меня, как и многих других, это может коснуться.

          .chat-message__action
            img(src="../assets/images/icon_edit.svg").chat-message__action-icon
            span Сообщение отредактировано - 02 янв 2017, 15:03

    .chat-message(v-bind:class="{ 'chat-message_small' : isMinimized }")
      .chat-message__aside
        Avatar(fill-level="20" initials="КК").chat-message__avatar

      .chat-message__main
        .chat-message__top
          .chat-message__name Константин Константинопольский
          .chat-message__date
            img(src="../assets/images/icon_hot.svg").chat-message__date-icon
            | 02 янв 2017, 15:00
          .chat-message__restore.tip(rel="Восстановить")
            img(src="../assets/images/icon_restore.svg")
        .chat-message__message
          .chat-message__text

          .chat-message__action
            img(src="../assets/images/icon_trash.svg").chat-message__action-icon
            span Вы удалили сообщение у себя


</template>

<script>
  import images from '@/components/images';
  import ToolsDropdown from '@/components/ToolsDropdown';
  import Tooltip from '@/components/Tooltip';
  import Avatar from '@/components/Avatar';

  export default {
    name: 'ChatMessage',
    props: { isMinimized: Boolean },
    components: {
      Avatar,
      Tooltip,
      ToolsDropdown
    },
    data() {
      return {
        isGroup: false,
        tools: [
          {
            type: 'attach',
            icon: images.icons.answer,
            text: 'Ответить'
          },
          {
            type: 'active',
            icon: images.icons.resend,
            text: 'Переслать'
          },
          {
            type: 'markImportant',
            icon: images.icons.hot,
            text: 'Отметить как важное'
          },
          {
            type: 'edit',
            icon: images.icons.edit,
            text: 'Редактировать'
          },
          {
            type: 'remove',
            icon: images.icons.trash,
            text: 'Удалить'
          }
        ]
      };
    },
    methods: {
      handleToolClick(toolType) {
      }
    }
  };
</script>

<style scoped lang="scss">
  .chat-message {
    display: flex;
    max-width: 586px;

    & + & {
      margin-top: 27px;
    }

    .avatar__content {
      font-size: 12px;
      line-height: 16px;
    }

    &_self {
      margin-left: auto;
    }

    &__aside {
      width: 40px;
      flex-shrink: 0;
    }

    &__avatar {
      width: 30px;
      height: 30px;
    }

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 13px;
      height: 20px;
    }

    &__main {
      padding-top: 5px;
      width: 100%;
    }

    &__files {
      margin-top: 15px;
      margin-bottom: 15px;
    }

    &__name {
      font-size: 14px;
      letter-spacing: -0.4px;
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
      margin-top: -3px;
      font-weight: bold;
    }

    &__date {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-left: 10px;
      padding-right: 8px;
    }

    &__date-icon {
      margin-right: 13px;
    }

    &__text {
      padding-right: 5px;

      pre {
        font: inherit;
        white-space: pre-wrap;
      }
    }

    &__action {
      font-style: italic;
      font-size: 14px;
      line-height: 19px;
      color: #B2BCCA;
      display: flex;
      align-items: center;
      margin-top: 11px;

      &-icon {
        margin-right: 10px;
      }
    }

    &__restore {
      opacity: 0.6;
      transition: opacity 0.5s ease;

      img {
        display: block;
      }

      &:hover {
        opacity: 1;
      }
    }

    &__forward {
      margin-top: 16px;
      padding-left: 10px;
      position: relative;

      &:before {
        content: '';
        width: 1px;
        height: 100%;
        border: 1px solid #B2BCCA;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
</style>
