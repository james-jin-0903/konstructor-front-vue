<template lang="pug">
  div
    .chat-user(v-bind:class="{ 'chat-user_small' : isMinimized }").chat-user_active
      .chat-user__icon
        Avatar(fill-level="80" initials="").chat-user__avatar

      .chat-user__main
        .chat-user__top
          .chat-user__icon
            img(src="../assets/images/icon_message-rocket.svg")
          .chat-user__name Конструктор КонструкторКонструктор
          .chat-user__date 02 янв 2017, 15:00
        .chat-user__message
          .chat-user__text Здравствуйте, Иван! Добро пожаловать к нам


    .chat-user(v-bind:class="{ 'chat-user_small' : isMinimized }")
      .chat-user__icon
        .chat-user__count 4
      .chat-user__main
        .chat-user__top
          .chat-user__name Вадим Вадимов, Иван Петров
          .chat-user__date 04 янв 2017, 15:00
        .chat-user__message
          .chat-user__text Здравствуйте, Иван! Добро пожаловать к нам
          .chat-user__message-count.counter 99


    .chat-user(v-bind:class="{ 'chat-user_small' : isMinimized }")
      .chat-user__icon
        .chat-user__count 4
      .chat-user__main
        .chat-user__top
          .chat-user__icon
            img(src="../assets/images/icon_message-rocket.svg")
          .chat-user__name Глеб Глебов, Иван Иванович
          .chat-user__date 04 янв 2017, 15:00
        .chat-user__message
          .chat-user__text Здравствуйте, Иван! Добро пожаловать к нам
          .chat-user__message-count.counter 9


    .chat-user(v-bind:class="{ 'chat-user_small' : isMinimized }")
      .chat-user__icon
        Avatar(fill-level="80" initials="ММ").chat-user__avatar
      .chat-user__main
        .chat-user__top
          .chat-user__name Михаил Михайленко
          .chat-user__date 04 янв 2017, 15:00
        .chat-user__message
          .chat-user__text Здравствуйте, Иван! Добро пожаловать к нам
          .chat-user__message-count.counter 9

    .chat-user(v-bind:class="{ 'chat-user_small' : isMinimized }")
      .chat-user__icon
        Avatar(fill-level="20" initials="КК").chat-user__avatar
      .chat-user__main
        .chat-user__top
          .chat-user__name Михаил Михайленко
          .chat-user__date 04 янв 2017, 15:00
        .chat-user__message
          .chat-user__text.chat-user__text_action Вы удалили сообщение у себя
          .chat-user__message-count.counter 9

    .chat-user(v-bind:class="{ 'chat-user_small' : isMinimized }")
      .chat-user__icon
        .chat-user__count 99
      .chat-user__main
        .chat-user__top
          .chat-user__name Совещание
          .chat-user__date 04 янв 2017, 15:00
        .chat-user__message
          .chat-user__text.chat-user__text_italic Файлы прикреплены


    .chat-user(v-bind:class="{ 'chat-user_small' : isMinimized }")
      .chat-user__icon
        Avatar(fill-level="80" initials="ВВ").chat-user__avatar
      .chat-user__main
        .chat-user__top
          .chat-user__name Василий Васильев
          .chat-user__date 04 янв 2017, 15:00
        .chat-user__message
          .chat-user__text Здравствуйте, Иван! Добро пожаловать к нам


    .chat-user(v-bind:class="{ 'chat-user_small' : isMinimized }")
      .chat-user__icon
        Avatar(fill-level="80" initials="ГГ").chat-user__avatar
      .chat-user__main
        .chat-user__top
          .chat-user__name Галина Галинова
          .chat-user__date 04 янв 2017, 15:00
        .chat-user__message
          .chat-user__text Здравствуйте, Иван! Добро пожаловать к нам

    .chat-user(v-bind:class="{ 'chat-user_small' : isMinimized }")
      .chat-user__icon
        Avatar(fill-level="80" initials="ЕЕ").chat-user__avatar
      .chat-user__main
        .chat-user__top
          .chat-user__name Елена Еленова
          .chat-user__date 04 янв 2017, 15:00
        .chat-user__message
          .chat-user__text Здравствуйте, Иван! Добро пожаловать к нам

    .chat-user(v-bind:class="{ 'chat-user_small' : isMinimized }")
      .chat-user__icon
        Avatar(fill-level="20" initials="КК").chat-user__avatar
      .chat-user__main
        .chat-user__top
          .chat-user__icon
            img(src="../assets/images/icon_message-rocket.svg")
          .chat-user__name Михаил Михайленко
          .chat-user__date 04 янв 2017, 15:00
        .chat-user__message
          .chat-user__text.chat-user__text_action Вы удалили сообщение у себя
          .chat-user__message-count.counter 9

    .chat-user(v-bind:class="{ 'chat-user_small' : isMinimized }")
      .chat-user__icon
        .chat-user__count 99
      .chat-user__main
        .chat-user__top
          .chat-user__name Совещание
          .chat-user__date 04 янв 2017, 15:00
        .chat-user__message
          .chat-user__text.chat-user__text_italic Файлы прикреплены


    .chat-user(v-bind:class="{ 'chat-user_small' : isMinimized }")
      .chat-user__icon
        Avatar(fill-level="80" initials="ВВ").chat-user__avatar
      .chat-user__main
        .chat-user__top
          .chat-user__name Василий Васильев
          .chat-user__date 04 янв 2017, 15:00
        .chat-user__message
          .chat-user__text Здравствуйте, Иван! Добро пожаловать к нам


    .chat-user(v-bind:class="{ 'chat-user_small' : isMinimized }")
      .chat-user__icon
        Avatar(fill-level="80" initials="ГГ").chat-user__avatar
      .chat-user__main
        .chat-user__top
          .chat-user__name Галина Галинова
          .chat-user__date 04 янв 2017, 15:00
        .chat-user__message
          .chat-user__text Здравствуйте, Иван! Добро пожаловать к нам

    .chat-user(v-bind:class="{ 'chat-user_small' : isMinimized }")
      .chat-user__icon
        Avatar(fill-level="80" initials="ЕЕ").chat-user__avatar
      .chat-user__main
        .chat-user__top
          .chat-user__name Елена Еленова
          .chat-user__date 04 янв 2017, 15:00
        .chat-user__message
          .chat-user__text Здравствуйте, Иван! Добро пожаловать к нам


</template>

<script>
  import Avatar from '@/components/Avatar';
  export default {
    name: 'ChatUser',
    components: { Avatar },
    props: { isMinimized: Boolean },
    data() {
      return {
        isGroup: false
      };
    },
  };
</script>

<style scoped lang="scss">
  .chat-user {
    border: 1px solid transparent;
    padding: 8px 10px 10px;
    display: flex;
    flex-wrap: nowrap;

    &_active {
      border: 1px solid #4A6C87;
    }

    &_small {
      margin-bottom: 10px;
      padding-bottom: 18px;
      position: relative;

      &:after {
        content: '';
        width: 76%;
        height: 1px;
        background: #D8E0E6;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
      }

      &:last-child {
        margin-bottom: 0;

        &:after {
          display: none;
        }
      }
    }

    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      margin-bottom: 3px;
    }

    &__icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
      flex-shrink: 0;
      position: relative;
    }

    &_small &__icon {
      width: 30px;
      height: 30px;
      margin-right: 9px;
    }

    &__avatar {
      width: 40px;
      height: 40px;
    }

    &_small &__avatar {
      width: 30px;
      height: 30px;
    }

    &__status {
      z-index: 1;
      left: 2px;
      top: 2px;
    }

    &__main {
      display: flex;
      flex-direction: column;
      width: calc(100% - 50px);
    }

    &_small &__main {
      width: calc(100% - 39px);
    }

    &__name {
      color: #222222;
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      margin-right: 13px;
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &_small &__name {
      font-size: 12px;
      line-height: 16px;
    }

    &__date {
      font-size: 12px;
      line-height: 16px;
      color: #B2BCCA;
    }

    &__text {
      font-size: 14px;
      line-height: 19px;
      color: #888888;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: normal;
      padding-right: 30px;

      &_action {
        font-style: italic;
      }
    }

    &_small &__text {
      font-size: 12px;
      line-height: 14px;
    }

    &__message {
      position: relative;

      &-count {
        right: 0;
        bottom: 0;
        padding: 0 4px;
        position: absolute;
      }
    }

    &__count {
      display: flex;
      flex: 1;
      background: #B2BCCA;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      height: 100%;
      width: 100%;
      border-radius: 50%;

      color: #FFFFFF;
    }

    &__abbr {
      margin-top: -2px;
      font-size: 14px;
      line-height: 19px;
      text-align: center;

      color: #B2BCCA;
    }


    &_small &__abbr {
      font-size: 12px;
      line-height: 19px;
    }
  }
</style>
