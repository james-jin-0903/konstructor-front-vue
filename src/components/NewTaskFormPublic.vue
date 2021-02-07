<template lang="pug">
  form.new-task-form(@submit="onSubmit")
    .new-task-form__title Публичность
      .new-task-form__title-dope (шаг 3 из 3)

    .field.new-task-form__radio
      .radio-wrapper
        input(
          :id="'radio_public'"
          :name="'radio_public'"
          type="radio"
          @change="radioChange('public')"
          :checked="publicRadio === 'public'"
        )
        label(:for="'radio_public'") 
          .radio-wrapper__label Задача доступна публично
          .radio-wrapper__desc Задача будет доступна для всех пользователей сайта. Все люди смогут ее просматривать, комментировать и оставлять свои заявки на выполнение, а Вы сможете выбрать подходящих исполнителей.
    .field.new-task-form__radio
      .radio-wrapper
        input(
          :id="'radio_privat'"
          :name="'radio_privat'"
          type="radio"
          @change="radioChange('privat')"
          :checked="publicRadio === 'privat'"
        )
        label(:for="'radio_privat'") 
          .radio-wrapper__label Задача доступна только внутри сообщества
          .radio-wrapper__desc Вы указали конкретного исполнителя, поэтому задача может быть только непубличной. Задача будет доступна только для участников сообщества, в котором она создана.

    .group-button
      button.button.button_neutral(@click="onBack")
        span Назад
      button.button.button_green(type="submit" :class="!disablePoint && 'buttonSubmit_disabled'" :disabled="!disablePoint")
        span Создать
</template>

<script>
import images from '@/components/images';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {},
  props: {
    sendTask: Function,
    decreaseStep: Function,
    value: String,
  },
  data() {
    return {
      publicRadio: this.value,
    };
  },
  computed: {
    ...mapGetters({}),
    disablePoint() {
      if (this.publicRadio !== 'filler') {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    ...mapActions({}),
    onSubmit(e) {
      e.preventDefault();
      this.onStepChange();
    },
    onBack() {
      this.onStepChange();
      this.decreaseStep();
    },
    onStepChange() {
      this.$emit('input', this.publicRadio);
    },
    radioChange(value) {
      this.publicRadio = value;
    },
  },
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
