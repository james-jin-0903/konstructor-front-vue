<template lang="pug">
  .input(v-bind:class="{ 'input_with-icon' : icon, 'input_small': small }")
    input(
      v-if="!isDate"
      type="text"
      :placeholder="placeholder"
      :data-validate="validate"
      :name="name"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
    ).input__input

    Calendar(
      v-if="isDate"
      :value="value"
      :defaultDate="defaultDate"
      :placeholder="placeholder"
      :data-validate="validate"
      :name="name"
      :disabled-date="disabledDate"
      :max-date="maxDate"
      :range="range"
      :time="time"
      @input="onDateChange"
    )
    img(v-if="icon" :src="icon").input__icon
    img.input__icn-status.input__icn-status_error(v-if="!isDate" src="../../assets/images/icon_error.svg")
    img.input__icn-status.input__icn-status_suc(v-if="!isDate" src="../../assets/images/icon_success.svg")

</template>

<script>
import Calendar from '../Calendar';

export default {
  name: 'TextInput',
  components: { Calendar },
  props: {
    defaultDate: Date,
    maxDate: Date,
    value: [Array, String],
    name: String,
    placeholder: String,
    validate: Boolean,
    readonly: Boolean,
    isDate: Boolean,
    range: Boolean,
    time: Boolean,
    small: Boolean,
    disabledDate: Function,
    icon: String
  },
  watch: {
    value: function(newVal) {
      if (newVal) {
        if (!this.isDate) {
          this.$el.querySelector('input').value = newVal;
        }
      }
    }
  },
  data() {
    return {
      dateValue: null
    };
  },
  mounted() {
    const input = this.$el;
    if (this.readonly) {
      input.readOnly = true;
    }
  },
  methods: {
    onFocus(event) {
      const field = event.currentTarget;
      const container = field.parentElement;
      if (container.classList.contains('input')) {
        container.classList.add('input_focus');
      }
    },
    onBlur(event) {
      const field = event.currentTarget;
      const container = field.parentElement;
      container.classList.remove('input_focus');
    },
    onInput() {
      const container = this.$el;
      const input = this.$el.querySelector('input');
      container.classList.remove('input_error');
      container.classList.remove('input_success');

      this.$emit('input', { name: this.name, value: input.value });
    },
    validationField() {
      const input = this.$el.querySelector('input');
      const value = input.value && input.value.replace(/\s/g, '');
      const container = input.closest('.input');
      container.classList.remove('input_focus');
      if (value && value !== '') {
        container.classList.remove('input_error');
        container.classList.add('input_success');
        return true;
      } else {
        container.classList.add('input_error');
        container.classList.remove('input_success');
        return false;
      }
    },
    onDateChange(dateValue) {
      const hasDate = this.range
        ? dateValue.every(d => Boolean(d))
        : Boolean(dateValue);
      if (!hasDate) {
        this.$emit('input', { name: this.name, value: '' });
        return;
      }
      let value;
      if (this.range) {
        value = dateValue.map(dateItem => {
          if (this.time) {
            const dateArray = dateItem.split(' ');
            dateArray[0] = dateArray[0]
              .replace(',', '')
              .split('-')
              .reverse()
              .join('-');
            return dateArray.join(' ');
          } else {
            return dateItem
              .replace(',', '')
              .split('-')
              .reverse()
              .join('-');
          }
        });
      } else {
        if (this.time) {
          const dateArray = dateValue.split(' ');
          dateArray[0] = dateArray[0]
            .replace(',', '')
            .split('-')
            .reverse()
            .join('-');
          value = dateArray.join(' ');
        } else {
          value = dateValue
            .replace(',', '')
            .split('-')
            .reverse()
            .join('-');
        }
      }
      this.$emit('input', { name: this.name, value });
    }
  }
};
</script>

<style scoped></style>
