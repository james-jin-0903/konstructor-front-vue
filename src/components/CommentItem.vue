<template lang="pug">
  .comment-item
    .comment-item__header
      Avatar(:name="comment.user.name" :fillLevel="comment.user.level" :initials="comment.user.initials").comment-item__avatar
      .comment-item__aside
        .comment-item__date {{comment.date}}
        .comment-item__tools
          ToolsDropdown(:tools="tools", @click="handleToolClick" :placeOnLeft="true" :noBackground="true")
    .comment-item__content
      button(type="button").comment-item__expand
      .comment-item__inner
        .comment-item__wrapper
          p(v-if="comment.content.text ").comment-item__text
            v-clamp(autoresize :max-lines="4") {{comment.content.text}}
              template(#after='{ toggle, expanded, clamped }')
                button.comment-item__text-toggle(v-if='expanded || clamped' @click='toggle' v-bind:class="{'comment-item__text-toggle_expanded': expanded}") {{ expanded ? 'Свернуть' : 'Читать далее' }}
          .files-list.comment-item__files(v-if="comment.content.files && comment.content.files.length")
            .files-list__inner
              .files-list__item.file-item(v-for="file of comment.content.files" :key="file.id")
                .file-item__image
                  img(:src="file.image")
                .file-item__description {{file.name}}
          .comment-item__events(v-if="comment.content.events && comment.content.events.length")
            EventItem(v-for="event of comment.content.events" :key="event.id" :item="event" :small="true").comment-item__event-item

          span.comment-item__rating
            img(src="../assets/images/icon_star-blue.svg").comment-item__rating-icon
            span {{comment.rating}}
        .comment-item__comments(v-if="comment.content.comments && comment.content.comments.length")
          CommentItem(v-for="comment of comment.content.comments" :key="comment.id" :comment="comment").comment-item__comment

</template>

<script>
  import Avatar from './Avatar';
  import ToolsDropdown from './ToolsDropdown';
  import images from './images';
  import VClamp from 'vue-clamp';
  import EventItem from '@/components/EventItem';

  export default {
    name: 'CommentItem',
    components: { EventItem, ToolsDropdown, Avatar, VClamp },
    props: {
      comment: {
        user: {
          name: String,
          initials: String,
          level: [Number, String]
        },
        date: String
      }
    },
    data() {
      return {
        tools: [
          {
            type: 'answer',
            icon: images.icons.chatBlue,
            text: 'Ответить'
          },
          {
            type: 'reply',
            icon: images.icons.copy,
            text: 'Перевести'
          },
          {
            icon: images.icons.share,
            text: 'Поделиться',
            children: [
              {
                type: 'shareChat',
                icon: images.icons.chatBlue,
                text: 'Чат Konstruktor'
              },
              {
                type: 'shareSocials',
                icon: images.icons.social,
                text: 'Социальные сети'
              }
            ]
          },
          {
            type: 'report',
            icon: images.icons.report,
            text: 'Пожаловаться'
          },
          {
            type: 'remove',
            icon: images.icons.trash,
            text: 'Удалить'
          }
        ],
        slotProps: null
      };
    },
    methods: {
      handleToolClick() {

      }
    }
  };
</script>

<style lang="scss">
  .comment-item {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__aside {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: -6px;
    }

    &__date {
      font-size: 14px;
      line-height: 19px;
      color: #B2BCCA;
    }

    &__inner {
      padding-left: 39px;
    }

    &__wrapper {
      position: relative;
      padding-bottom: 27px;
      padding-top: 5px;
    }

    &__text {
      font-size: 14px;
      line-height: 22px;
      color: #444444;
    }

    &__rating {
      position: absolute;
      bottom: 0;
      right: 0;

      font-size: 14px;
      line-height: 19px;
      color: #444444;

      display: flex;
      align-items: center;

      &-icon {
        margin-right: 6px;
      }
    }

    &__text-toggle {
      bottom: 0;
      left: 0;
      position: absolute;
      font-family: $openSans;
      background: none;
      border: none;
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      cursor: pointer;
      color: #81A6C3;
      padding-right: 20px;

      &:after {
        content: '';
        right: 0;
        top: 5px;
        width: 9px;
        height: 9px;
        position: absolute;
        background: url(../assets/images/icon_arrow-up-blue.svg) no-repeat center;
        background-size: contain;
        transform: rotate(180deg);
        transition: transform;
      }

      &_expanded:after {
        transform: rotate(0);
      }
    }

    &__content {
      position: relative;
    }

    &__expand {
      position: absolute;
      width: 10px;
      height: 10px;
      display: block;
      background-size: cover;
      background: url(../assets/images/icon_arrow-up-blue.svg) no-repeat center;

      top: 14px;
      left: 7px;
      border: none;
    }

    &__events {
      margin-top: 17px;
    }

    &__files {
      margin-top: 18px;
    }

    &__event-item {
      .event-item {
        margin-bottom: 9px;
      }
    }

    &__comments {
      margin-top: 28px;
    }

  }
</style>
