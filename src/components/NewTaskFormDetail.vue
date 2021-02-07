-<template lang="pug">
  form.new-task-form(@submit="onSubmit")
    .new-task-form__title Подробная информация
      .new-task-form__title-dope (шаг 2 из 3)
    .field.new-task-form__field
      .field__title Описание
        .field__info(rel="Поле не обязательно для заполнения") (опционально)
      Textarea(placeholder="" v-model='describtion' :icon="images.icons.attach")
      .field__tooltip
        Tooltip(:text="'Здесь будет размещен информационный текст'")
    .field.new-task-form__field
      .field__title Теги
        .field__info(rel="Поле не обязательно для заполнения") (опционально)
      VueTagsInput(
        v-model="tag"
        :tags="tags"
        @tags-changed="newTags => tags = newTags"
        :autocomplete-items="filteredItems"
        :add-on-key="[13, ',']"
        placeholder=""
      )
      .field__tooltip
        Tooltip(:text="'Здесь будет размещен информационный текст'")

    .field.new-task-form__field
      .field__title Адрес
        .field__info(rel="Поле не обязательно для заполнения") (опционально)
      .input
        input(type="text" placeholder=""  v-model='address')
        img.input__icn(:src="images.icons.location", alt="location icon")
      .field__tooltip
        Tooltip(:text="'Здесь будет размещен информационный текст'")

    .group-button
      button.button.button_neutral(@click="onBack")
        span Назад
      button.button.button_green(type="submit" value="Сохранить")
        span Далее
</template>

<script>
  import Tooltip from './Tooltip.vue';
  import InputAuto from './forms/InputAuto.vue';
  import TextInput from './forms/TextInput.vue';
  import Checkbox from './forms/Checkbox.vue';
  import Textarea from './Textarea.vue';
  import images from '@/components/images';
  import { mapGetters, mapActions } from 'vuex';
  import VueTagsInput from '@johmun/vue-tags-input';

  export default {
    components: {
      Tooltip,
      InputAuto,
      TextInput,
      Checkbox,
      Textarea,
      VueTagsInput
    },
    props: {
      increaseStep: Function,
      decreaseStep: Function,
      value: Object
    },
    data() {
      return {
        images: images,
        describtion: this.value.describtion,
        tag: '',
        tags: this.value.tags,
        autocompleteItems: [
          {
            text: 'Spain'
          },
          {
            text: 'France'
          },
          {
            text: 'USA'
          },
          {
            text: 'Germany'
          },
          {
            text: 'China'
          }
        ],
        address: this.value.address
      };
    },
    computed: {
      ...mapGetters({}),
      filteredItems() {
        return this.autocompleteItems.filter((i) => {
          return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
        });
      }
    },

    methods: {
      ...mapActions({}),
      onSubmit(e) {
        e.preventDefault();
        this.increaseStep();
        this.onStepChange();
      },
      onBack() {
        this.onStepChange();
        this.decreaseStep();
      },
      onStepChange() {
        this.$emit('input', {
          describtion: this.describtion,
          tags: this.tags,
          address: this.address
        });
      }
    }
  };
</script>

<style lang="scss">
  .vue-tags-input .ti-input {
    border-radius: 3px;
    border: 1px solid #dfe4eb;
    background-color: transparent;
  }

  .vue-tags-input.ti-focus .ti-input {
    border-radius: 3px;
    border: 1px solid #81a6c3;
    background-color: transparent;
  }

  .vue-tags-input .ti-autocomplete {
    background: #ffffff;
    border: 1px solid #81a6c3;
    border-radius: 3px;
    top: calc(100% - 1px);
    color: $black;
  }

  .vue-tags-input .ti-selected-item {
    background: #f1f2f7;
    color: $black;
  }

  .vue-tags-input .ti-tag .ti-actions {
    display: none;
  }

  .vue-tags-input .ti-tag.ti-tag.ti-deletion-mark {
    background-color: transparent;
    color: #81a6c3;
    border: 1px solid #81a6c3;
  }

  .vue-tags-input .ti-tag {
    background: transparent;
    border: 1px solid #b2bcca;
    color: #b2bcca;
    border-radius: 3px;
  }
</style>

<style lang="scss" scoped>
  .group-button {
    display: flex;
    align-items: center;
    margin-top: 40px;

    .button:first-child {
      margin-right: 10px;
    }
  }
</style>
