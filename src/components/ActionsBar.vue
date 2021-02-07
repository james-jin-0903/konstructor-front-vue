<template lang="pug">
  .actions-bar
    .actions-bar__info
      .actions-bar__item
        img(:src="icons.star")
        span.actions-bar__count {{stars || 0}}
      .actions-bar__item
        img(:src="icons.eye")
        span.actions-bar__count {{views || 0}}
    .actions-bar__actions
      button(type="button" @click="handleActionClick(action.type)" v-for="action of actions" :key="action.type").actions-bar__action
        img(:src="action.icon")
</template>

<script>
  import images from '@/components/images';

  export default {
    name: 'ActionsBar',
    props: {
      stars: [Number, String],
      views: [Number, String]
    },
    data() {
      return {
        icons: images.icons,
        actions: []
      };
    },
    mounted() {
      this.actions = [
        {
          type: 'raise',
          icon: this.icons.crownBlue
        },
        {
          type: 'share',
          icon: this.icons.share
        },
        {
          type: 'fav',
          icon: this.icons.fav
        }
      ];
    },
    methods: {
      handleActionClick(type) {

      }
    }
  };
</script>

<style lang="scss" scoped>
  .actions-bar {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      display: block;
    }

    &__info,
    &__actions,
    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__item {
      margin-right: 43px;
    }

    &__count {
      margin-left: 5px;
      font-size: 14px;
      line-height: 19px;
      color: #444444;
    }

    &__action {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      margin-right: 23px;

      &:last-child {
        margin-right: 0;
      }

    }
  }
</style>

