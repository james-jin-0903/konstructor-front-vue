<template lang="pug">
  .media-item(@click="handleClick")
    .media-item__image(v-bind:class="{'media-item__image_folder': item.isFolder}")
      img(v-if='!item.isFolder' :src="item.url")
    .media-item__description(v-bind:class="{'tip': tip}" v-bind:rel="item.text") {{getTrimmedText}}

</template>

<script>
  import images from '../components/images';

  const TEXT_MAX_LENGTH = 20;

  export default {
    name: 'MediaItem',
    props: {
      item: {
        id: String || Number,
        isFolder: Boolean,
        text: String,
        url: String
      }
    },
    mounted() {
      this.tip = this.item.text.length > TEXT_MAX_LENGTH;
    },
    data() {
      return {
        tip: false,
        icons: images.icons
      };
    },
    computed: {
      getTrimmedText() {
        const text = this.item.text;
        const textOverflow = text.length > TEXT_MAX_LENGTH;
        return textOverflow ? `${text.substr(0, TEXT_MAX_LENGTH)}...` : text;
      }
    },
    methods: {
      handleClick() {
        this.$emit('click', this.item);
      }
    }
  };
</script>

<style scoped lang="scss">
  .media-item {
    padding: 5px;
    border: 1px solid transparent;
    box-sizing: border-box;
    border-radius: 3px;

    &_active {
      border-color: #81A6C3;
    }

    &__image {
      min-height: 80px;
      width: 100%;
      background: #DFE4EB no-repeat center;
      border-radius: 3px;
      overflow: hidden;
      max-width: 100%;

      &_folder {
        background-image: url(../assets/images/icon_folder.svg);
      }

      img {
        display: block;
      }
    }

    &__description {
      font-size: 13px;
      margin-top: 4px;
      word-break: break-word;
      letter-spacing: -0.5px;
      position: relative;

      &:after {
        top: calc(100% + 12px)
      }
    }
  }
</style>
