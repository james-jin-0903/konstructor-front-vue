<template lang="pug">
  label.checkbox
    input(type="checkbox" @change="handleChange").checkbox__input
    span.checkbox__icon
    template(v-if="text")
      span.checkbox__text {{ text }}
    template(v-else-if="composable")
      slot(name="content")
</template>

<script>
import '../../scss/style.scss';

export default {
  name: 'Checkbox',
  props: {
    text: String,
    composable: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    handleChange(event) {
      const { checked } = event.currentTarget;
      this.$emit('input', checked);
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox {
  font-size: 14px;
  line-height: 19px;
  color: #444444;
  display: flex;
  align-items: center;

  &__input {
    display: none;
  }

  &__text {
    white-space: nowrap;
  }

  &__icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    background: #FFFFFF;
    border: 1px solid #81A6C3;
    box-sizing: border-box;
    border-radius: 3px;
    margin-right: 11px;
  }

  input:checked + span {
    background: #4a6c87 url("../../assets/images/icon_check.svg") no-repeat center;
  }
}
</style>
