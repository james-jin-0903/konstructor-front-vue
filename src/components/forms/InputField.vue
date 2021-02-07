<template lang="pug">
  div
    .input(:class="inputClass")
      .input__icon-left
        img.input__icon(v-if="iconLeft" :src="iconLeft")
      input.input__input(
        type="text"
        v-model="fieldValue"
        v-validate="validation"
        :placeholder="placeholder"
        :name="fieldName"
        @blur="handleBlur"
        @input="handleInput"
      )
      img.input__icn-status(v-show="validation && errors.has(fieldName)" :src="icons.error")
      img.input__icn-status(v-show="validation && fields[fieldName] && fields[fieldName].touched && fields[fieldName].valid" :src="icons.success")
      img.input__icon.input__icn(v-if="icon" :src="icon")
      img.input__icon(v-if="emoji" :src="icons.smile")
    .input__error-msg(v-show="validation && errors.has(fieldName)") {{ this.errors.first(fieldName) }}
</template>

<script>
  import images from '@/components/images';

  export default {
    name: 'InputField',
    props: {
      value: String,
      fieldName: String,
      placeholder: String,
      validation: String,
      icon: String,
      iconLeft: String,
      emoji: Boolean
    },
    data() {
      return {
        fieldValue: '',
        icons: images.icons
      };
    },
    mounted() {
      if(this.value) {
        this.fieldValue = this.value;
        this.fields[this.fieldName].touched = true;
        this.$validator.validateAll();
      }
    },
    computed: {
      inputClass() {
        return {
          'input_error': this.validation && this.errors.has(this.fieldName),
          'input_with-icon': this.icon,
          'input_success': (this.validation && this.fields[this.fieldName]) ? (this.fields[this.fieldName].touched && this.fields[this.fieldName].valid) : false
        };
      }
    },
    methods: {
      handleBlur() {
        this.$emit('blur');
      },
      handleInput() {
        this.$emit('input', { name: this.fieldName, value: this.fieldValue });
      }
    }
  };
</script>
