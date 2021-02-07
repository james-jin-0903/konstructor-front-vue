<template lang="pug">
  .avatar
    .avatar__inner
      .avatar__filler(:style="getFillLevel")
      .avatar__wrapper
        .avatar__content {{ initials }}
        img.avatar__content(v-if="!initials && image" :src="image")
    .avatar__name(v-if="name" :style="getFontWeight") {{ name }}
</template>

<script>
  export default {
    name: 'Avatar',
    props: {
      name: String,
      initials: String,
      image: String,
      link: String,
      fillLevel: [Number, String],
      fontWeight: [Number, String]
    },
    computed: {
      getFillLevel() {
        return `height: ${this.fillLevel}%`;
      },
      getFontWeight() {
        return `font-weight: ${this.fontWeight} !important`;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .avatar {
    display: flex;
    align-items: center;
    position: relative;
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      text-decoration: none;
    }

    &__inner {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
      border-radius: 50%;
      box-shadow: 0 0 0 1px $gray2 inset;

      &::after {
        content: '';
        position: absolute;
        z-index: 1;
        top: 20px;
        left: -1px;
        width: 32px;
        height: 32px;
        background: $green5;
      }
    }

    &__status {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 3;
      width: 11px;
      height: 11px;
    }


    &_medium &__inner {
      background: white;
      width: 40px;
      height: 40px;

      &::after {
        display: none;
      }

      .avatar__content {
        @include font(14, r, 19px);
      }
    }

    &_big-font {
      .avatar__content {
        @include font(12, r, 16px);
      }

      .avatar__wrapper {
        width: calc(100% - 4px);
        height: calc(100% - 4px);
      }
    }

    &_big &__inner {
      width: 60px;
      height: 60px;
      background: white;

      &::after {
        display: none;
      }

      .avatar__content {
        max-height: 100%;
        height: 100%;
      }
    }

    &__filler {
      position: absolute;
      z-index: 1;
      width: calc(100% + 2px);
      height: 25%;
      left: -1px;
      bottom: 0;
      background: $green5;
    }

    &__wrapper {
      width: calc(100% - 6px);
      height: calc(100% - 6px);
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      position: relative;
      z-index: 2;
      background-color: white;
    }


    &__content {
      @include font(10, r, 14px);
      max-height: 80%;
      transition: 0.3s;
      color: #b2bcca;
      text-transform: uppercase;
      text-decoration: none;

      &:hover {
        text-decoration: none;
      }
    }

    &__name {
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;

      color: #222222;
      margin-left: 10px;
    }
  }


</style>
