<template lang="pug">
  .comment
    .comment__header
      .comment__header-left
        Avatar(:name="comment.name" :initials="comment.initials")
      .comment__header-right
        .comment__date {{ comment.date }}
        ToolsDropdown
    .comment__data
      .comment__data-left
        img(src="@/assets/images/icon_arrow-up-blue.svg" width="9" height="6")
      .comment__data-right
        template(v-if="!isExpanded")
          .comment__message(v-line-clamp:22="4") {{ comment.message }}
        template(v-else)
          .comment__message(v-line-clamp:22="10") {{ comment.message }}
          .comment__attachment-list
            .comment__attachment
              img(src="@/assets/images/chat-image.jpg" width="80" height="86")
              | 67874y32.jpg
            .comment__attachment
              img(src="@/assets/images/chat-image.jpg" width="80" height="86")
              | 6787dffd4y32.jpg
            .comment__attachment
              img(src="@/assets/images/chat-image.jpg" width="80" height="86")
              | 67874ydsf32.jpg
        template(v-if="comment.object")
          EventItem(:item="comment.object" small)
    .comment__footer(:class="{ 'no-actions': !isExpandable }")
      a.comment__expand-btn(
        v-if="isExpandable"
        @click="isExpanded = !isExpanded"
        :class="{ 'down': !isExpanded }"
      )
        span Читать далее
        img(src="@/assets/images/icon_arrow-up-blue.svg" width="9" height="6")
      .comment__rating
        img(src="@/assets/images/icon_star-blue.svg")
        | 999K
</template>

<script>
  import Avatar from '@/components/Avatar';
  import ToolsDropdown from '@/components/ToolsDropdown';
  import EventItem from '@/components/EventItem';

  export default {
    name: 'Comment',
    components: {
      EventItem,
      ToolsDropdown,
      Avatar
    },
    props: {
      comment: Object
    },
    data() {
      return {
        isExpanded: false,
      }
    },
    computed: {
      isExpandable() {
        return this.comment.message.length >= 625;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comment {
    margin-bottom: 30px;

    &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    &__header-right {
      display: flex;
      align-items: center;
    }

    &__date {
      @include font(14, r, 19px);
      color: $gray3;
      margin-right: 10px;
    }

    &__data {
      display: flex;
    }

    &__data-left {
      min-width: 30px;
      display: flex;
      justify-content: center;
      align-items: self-start;
      margin-right: 10px;
    }
    &__data-right {
      width: 100%;
    }

    &__message {
      margin-bottom: 10px;
    }

    &__attachment-list {
      display: flex;
      margin-bottom: 10px;
    }

    &__attachment {
      width: 80px;
      border-radius: 3px;
      overflow: hidden;
      margin-right: 10px;
      word-break: break-all;
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      padding-left: 40px;

      &.no-actions {
        justify-content: flex-end;
      }
    }

    &__expand-btn {
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        margin-right: 10px;
        @include font(14, s, 19px);
        color: $blue1;
      }

      &.down {
        img {
          transform: rotateX(180deg);
        }
      }
    }

    &__rating {
      display: flex;
      align-items: center;
      img {
        margin-right: 5px;
      }
    }

  }
</style>