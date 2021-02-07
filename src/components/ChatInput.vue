<template lang="pug">
  .chat-input(v-bind:class="{ 'chat-input_small' : isMinimized }")
    .chat-input__message
      .chat-input__inner
        .chat-input__forward
          .chat-input__quote
            img(src="../assets/images/icon_answer.svg").chat-input__quote-icon
            .chat-input__quote-text Фильм интересный, но я не кинокритик и не буду заниматься его обсуждением. А вот суть реальной картины при возможной катастрофе постараюсь раскрыть: меня, как и многих других, это может коснуться. Так как я работаю в Силиконовой долине, буду писать непосредственно об этом районе. Здесь располагаются более 7 тысяч софтверных и хардварных.
          .chat-input__time Иван Петров, 01 янв 2017, 15:00
            .chat-input__remove.remove-icon

        .chat-input__wrapper
          picker(:data="emojiIndex" @select="addEmoji" v-if="emojiIndex" v-bind:class="{'chat-input__emoji-picker_hidden': !pickerVisible }").ps__child--consume.chat-input__emoji-picker

          textarea(type="text" :placeholder="placeholder" @input="onInput" ref="$input").chat-input__field
          .chat-input__buttons
            button(type="button").chat-input__action
              img(src="../assets/images/icon_attach.svg")
            button(type="button" @click="toggleEmojiPicker").chat-input__action
              img(src="../assets/images/icon_smile.svg")
      button(type="button" v-if="!isMinimized").chat-input__enter
    .chat-input__attachments
      PerfectScrollbar
        .chat-input__files
          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png

          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png

          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png

          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png

          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png

          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png

          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png

          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png

          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png

          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png

          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png

          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png

          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png

          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png

          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png

          .chat-input__image.file-item
            .file-item__image
              img(src="../assets/images/chat-image.jpg")
            .file-item__description Name_of_File_1.png


</template>

<script>
  import autosize from 'autosize';
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
  import emojiesData from 'emoji-mart-vue-fast/data/all.json';
  import { Picker, EmojiIndex } from 'emoji-mart-vue-fast';
  import 'emoji-mart-vue-fast/css/emoji-mart.css';

  export default {
    name: 'ChatInput',
    components: {
      PerfectScrollbar,
      Picker
    },
    props: {
      isMinimized: Boolean,
      placeholder: {
        type: String,
        default: 'Введите сообщение',
        required: false
      }
    },
    mounted() {
      const textarea = this.$el.querySelector('textarea');
      autosize(textarea);
      this.emojiIndex = new EmojiIndex(emojiesData);
    },
    data() {
      return {
        pickerVisible: false,
        emojiIndex: null
      };
    },
    methods: {
      onInput() {
        const messagesContainer = document.querySelector('.chat-page__main .ps');
        if (messagesContainer) {
          setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.offsetHeight;
          }, 20);
        }
      },
      addEmoji(e) {
        const nativeValue = e.native;
        const input = this.$refs.$input;
        input.value += nativeValue;
        this.pickerVisible = false;
      },
      handleToolClick() {

      },
      toggleEmojiPicker() {
        this.pickerVisible = !this.pickerVisible;
      }
    }
  };
</script>

<style lang="scss">
  .ps {
    height: 100%;
  }

  .chat-input {
    &__message {
      display: flex;
      align-items: center;
    }

    &__inner {
      flex: 1;
      position: relative;
    }

    &__buttons {
      position: absolute;
      right: 11px;
      bottom: 10px;
      display: flex;
      align-items: center;
    }

    &__field {
      border: 1px solid #DFE4EB;
      border-radius: 3px;
      width: 100%;
      box-sizing: border-box;
      height: 36px;
      padding: 6px 60px 6px 10px;
      resize: none;
      font-size: 16px;
      max-height: 200px;
      margin-bottom: -4px;
      line-height: 1.5em;
    }

    &_small &__field {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }

    &__enter {
      opacity: 0.6;
      cursor: pointer;
      flex-shrink: 0;
      border: none;
      margin-left: 10px;
      height: 36px;
      width: 36px;
      border-radius: 50%;
      background: #F1F2F7 url("../assets/images/icon_enter.svg") no-repeat center;
      transition: opacity 0.5s ease;
      margin-top: -4px;

      &:hover {
        opacity: 1;
      }
    }

    &__action {
      cursor: pointer;
      background: none;
      border: none;
      box-shadow: none;
      padding: 0;
      margin-left: 10px;

      img {
        display: block;
      }
    }

    &__forward {
      background: #F1F2F7;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid #DFE4EB;
      border-bottom: none;
      border-radius: 3px 3px 0 0;
      margin-bottom: -3px;
      position: relative;
      z-index: 1;
      padding: 5px 10px;
    }

    &__remove {
      margin-left: 11px;
    }

    &__quote {
      display: flex;
      align-items: center;

      &-icon {
        margin-right: 10px;
      }

      &-text {
        font-style: italic;
        font-size: 14px;
        line-height: 19px;
        color: #B2BCCA;
        max-width: 323px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;

        &:before {
          content: '«';
        }

        &:after {
          content: '»';
          position: absolute;
          right: 0;
        }
      }

    }

    &__time {
      font-size: 12px;
      line-height: 16px;
      text-align: right;
      color: #888888;
      display: flex;
      align-items: center;
    }

    &__attachments {
      height: 123px;
      margin-top: 15px;
    }

    &__files {
      display: flex;
      flex-wrap: wrap;

      .file-item {
        margin-bottom: 5px;
      }
    }

    &__emoji-picker {
      position: absolute;
      right: 0;
      bottom: calc(100% + 20px);
      z-index: 100;

      &_hidden {
        opacity: 0;
        z-index: -1;
      }
    }
  }
</style>
