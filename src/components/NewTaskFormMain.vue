<template lang="pug">
  form.new-task-form(@submit="onSubmit")
    .new-task-form__title Основная информация
      .new-task-form__title-dope (шаг 1 из 3)
    .field.new-task-form__field
      .field__title Название
      .input
        input(type="text" placeholder=""  v-model='name')
    .field.new-task-form__field
      .field__title Ответственный
      InputAuto(
        v-model="projectResponsible",
        name="platform",
        :items='responsibleList',
        placehold=''
      )
      .field__tooltip
        Tooltip(:text="'Здесь будет размещен информационный текст'")
    .field.new-task-form__field
      .field__title Бюджет
        .field__info(rel="Поле не обязательно для заполнения") (опционально)
      .input
        input(type="text" placeholder=""  v-model='budget')
      .field__tooltip
        Tooltip(:text="'Здесь будет размещен информационный текст'")
    .field.new-task-form__field
      .field__title Дедлайн
        .field__info(rel="Поле не обязательно для заполнения") (опционально)
      .field__wrap
        TextInput(
          placeholder=""
          :validate="false"
          :range="false"
          :time="true"
          :value="deadlineDate"
          name="date_of_deadline"
          :disabled-date="todayDate"
          isDate
          @input="dateChange"
        )
      .field__tooltip
        Tooltip(:text="'Здесь будет размещен информационный текст'")
    
    .field.new-task-form__checkbox
      .checkbox-wrapper
        input(:id="'checkbox_terms'" :name="'checkbox_terms'" :disabled="!disablePoint" type="checkbox" v-model="terms")
        label(:for="'checkbox_terms'") Свои условия
      .field__tooltip
        Tooltip(:text="'Здесь будет размещен информационный текст'")

    button.button.button_green.new-task-form__submit(:class="!disablePoint && 'buttonSubmit_disabled'" :disabled="!disablePoint" type="submit" value="Сохранить")
      span Далее
</template>

<script>
import Tooltip from './Tooltip.vue';
import InputAuto from './forms/InputAuto.vue';
import TextInput from './forms/TextInput.vue';
import Checkbox from './forms/Checkbox.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Tooltip,
    InputAuto,
    TextInput,
    Checkbox,
  },
  props: {
    increaseStep: Function,
    value: Object,
  },
  data() {
    return {
      name: this.value.name,
      budget: this.value.budget,
      projectResponsible: this.value.projectResponsible,
      responsibleList: [],
      deadlineDate: this.value.deadlineDate,
      terms: this.value.terms,
      todayDate(date) {
        const limit = new Date(new Date().setFullYear(new Date().getFullYear() + 30));
        return date > limit;
      },
    };
  },

  computed: {
    ...mapGetters({}),
    disablePoint() {
      if (this.name !== '') {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions({}),
    dateChange(date) {
      this.filterDate = date.value;
    },
    onSubmit(e) {
      e.preventDefault();
      this.increaseStep();
      this.$emit('input', {
        name: this.name,
        budget: this.budget,
        projectResponsible: this.projectResponsible,
        deadlineDate: this.deadlineDate,
        terms: this.terms,
      });
    },
  },
};
</script>
