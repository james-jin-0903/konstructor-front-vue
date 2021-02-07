<template lang="pug">
  mixin loader
    input.media-loader__input(v-if="type !== 'video'" type="file", accept="image/*" name="uploadImage" @change="handleInputChange")
    input.media-loader__input(v-if="type === 'video'" type="file", accept="video/*" name="uploadImage" @change="handleInputChange")
    .media-loader__label(v-bind:class="{ 'media-loader__label_filled': loadedImage }" @click="handleRemove")
      .media-loader__img-box
        img.media-loader__img(v-if="!loadedImage" :src="images.icons.plusDark")
        img.media-loader__img.media-loader__preview(v-if="loadedImage && type !== 'video'" :src="imagePreview")
        video.uploadVideo__video(v-if="loadedImage && type === 'video'" :src="imagePreview")
    .media-loader__name {{fileText}}

  .media-loader(v-bind:class="{'media-loader_video': type === 'video'}" @click="handleClick")
    label.media-loader__inner(v-if="!preventOpen")
      +loader()
    .media-loader__inner(v-if="preventOpen")
      +loader()
    Tooltip(v-if='tooltip' :text='tooltip')


</template>

<script>
  import '../scss/style.scss';
  import images from '@/components/images';
  import Tooltip from '@/components/Tooltip';

  const DEFAULT_TYPE = 'image';
  const TYPES = {
    image: 'image/*',
    video: 'video/*'
  };
  export default {
    name: 'MediaLoader',
    components: { Tooltip },
    props: {
      tooltip: String,
      label: String,
      type: String,
      value: Object,
      preventOpen: Boolean
    },
    data() {
      return {
        images,
        loadedImage: null,
        imagePreview: '',
        fileText: '',
        fileType: ''
      };
    },
    mounted() {
      this.fileText = this.label;
      this.fileType = this.type ? TYPES[this.type] : TYPES[DEFAULT_TYPE];
      if (this.value) {
        const { image, name, file } = this.value;
        this.imagePreview = image;
        this.fileText = name;
        this.loadedImage = file;
      }
    },
    computed: {},
    methods: {
      handleClick() {
        this.$emit('click');
      },
      handleInputChange(event) {
        if (this.loadedImage) {
          return;
        }
        const target = event.currentTarget;
        const file = target.files[0];
        if (!file.type.match(this.fileType)) {
          return;
        }
        const reader = new FileReader();
        reader.onload = ((file) => {
          this.loadedImage = file;
          return event => {
            const formData = new FormData();
            formData.append('file', file);
            const data = {
              image: event.target.result,
              name: file.name,
              file,
              formData
            };
            this.imagePreview = data.image;
            this.fileText = data.name;
            this.$emit('change', data);
          };
        })(file);
        reader.readAsDataURL(file);
      },
      handleRemove(event) {
        this.$emit('click');
        if (!this.loadedImage) {
          return;
        }
        event.preventDefault();
        const imageInput = this.$el.querySelector('.media-loader__input');
        this.fileText = this.label;
        this.loadedImage = null;
        imageInput.value = '';
        this.$emit('remove');
      }
    }
  };
</script>

<style lang="scss" scoped>

  .media-loader {
    display: flex;
    align-items: center;

    &__inner {
      display: flex;
      align-items: center;
    }

    &__input {
      display: none;
    }

    &__label {
      width: 30px;
      height: 30px;
      box-shadow: 0 0 0 1px $gray2 inset;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: pointer;
      overflow: hidden;

      &::after {
        content: '';
        background: url('../assets/images/rate_track.svg');
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 32px;
        height: 32px;
      }

      &:hover {
        .media-loader__img {
          opacity: 1;
        }
      }

      &_filled {
        &::before {
          content: '';
          position: absolute;
          z-index: 2;
          top: 0;
          width: 30px;
          height: 30px;
          background: rgba(24, 23, 32, 0);
          transition: 0.2s linear;
          background-position: center;
        }

        &:hover {
          &::before {
            background-color: rgba(24, 23, 32, 0.75);
            background-image: url('../assets/images/icon_x.svg');
          }
        }

        .media-loader__img {
          opacity: 1;
        }
      }
    }

    &__img-box {
      width: 24px;
      height: 24px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      position: relative;
      z-index: 1;
      background-color: white;
    }

    &__img {
      max-height: 100%;
      transition: 0.3s;
      opacity: 0.7;
    }

    &__name {
      margin: 0 10px;
    }

    &_style-1 & {
      &__label {
        &:after {
          display: none;
        }
      }
    }
  }

  .media-loader_video,
  .media-loader_style-2 {
    .media-loader__label {
      border: 1px solid $gray2;
      border-radius: 3px;

      &:after {
        display: none;
      }
    }

    .media-loader__img-box {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
</style>
