<template lang="pug">
  .textarea
    .textarea__inner
      .textarea__input.input(
        contenteditable="true"
        @input="onInput"
      )
      .textarea__icon
        input(type="file", accept="image/*" name="uploadImage" @change="handleInputChange")
        img(src="@/assets/images/icon_attach.svg")
    PerfectScrollbar
      .textarea__attachment-preview(v-if="isPreviewOpened")
        .attachment-preview__item(v-for="preview in imagePreview")
          .image
            img(:src="preview.img" width="80")
          .name {{ preview.name }}
</template>

<script>
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar';

  const DEFAULT_TYPE = 'image';
  const TYPES = {
      image: 'image/*'
  };

  export default {
    name: 'TextArea',
    components: { PerfectScrollbar },
    props: {
      propValue: Object
    },
    data() {
      return {
        value: '',
        loadedImages: [],
        fileText: '',
        fileType: '',
        imagePreview: []
      }
    },
    computed: {
      isPreviewOpened() {
        return this.imagePreview.length;
      }
    },
    methods: {
      onInput($event) {
        this.value = $event.target.innerText;
      },
      handleInputChange(event) {
        if (this.loadedImages.length > 10) {
          return;
        }
        const target = event.currentTarget;
        const file = target.files[0];
        if (!file.type.match(this.fileType)) {
          return;
        }
        const reader = new FileReader();
        reader.onload = ((file) => {
          this.loadedImages.push(file);
          return event => {
            const formData = new FormData();
            formData.append('file', file);
            const data = {
              image: event.target.result,
              name: file.name,
              file,
              formData
            };
            this.imagePreview.push({
              img: data.image,
              name: data.name
            })
            this.$emit('change', data);
          };
        })(file);
        reader.readAsDataURL(file);
      },
    },
    mounted() {
      this.fileText = this.label;
      this.fileType = this.type ? TYPES[this.type] : TYPES[DEFAULT_TYPE];
      if (this.propValue) {
        const { image, name, file } = this.value;
        this.imagePreview = image;
        this.fileText = name;
        this.loadedImage = file;
      }
    },
  }
</script>

<style lang="scss" scoped>
.textarea {
  &__inner {
    position: relative;
    margin-bottom: 10px;
  }

  &__input {
    min-height: 40px;
    padding: 7px 30px 7px 9px;
    border-radius: 3px;
    word-break: break-all;
  }

  &__icon {
    position: absolute;
    bottom: 0;
    right: 0;
    padding-right: 10px;
    padding-bottom: 6px;
    cursor: pointer;

    input {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }

  &__attachment-preview {
    display: flex;
    flex-wrap: wrap;
    max-height: 118px;
    &__item {
      display: flex;
      flex-direction: column;
      margin-right: 10px;
      margin-bottom: 15px;
      width: 80px;

      .image {
        width: 80px;
        overflow: hidden;
        border-radius: 3px;
        margin-bottom: 10px;
        max-height: 80px;
      }

      .name {
        word-break: break-all;
      }
    }
  }
}
</style>