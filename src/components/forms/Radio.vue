<template lang="pug">
  label.radio
    input(type="radio" :name="name" :value="value" @change="radioChange" :checked="checked")
    span.radio__icon
    | {{text}}
</template>

<script>
  export default {
    name: 'Radio',
    props: {
      text: String,
      name: String,
      value: String,
      checked: Boolean,
    },
    methods: {
      radioChange() {
        this.$emit('change', this.value)
      }
    }
  };
</script>

<style scoped lang="scss">
  .radio {
    white-space: nowrap;
    font-size: 14px;
    line-height: 19px;
    font-family: inherit;
    color: #666666;
    display: flex;
    align-items: normal;

    input {
      display: none;
    }

    &__icon {
      position: relative;
      border: 1px solid #81A6C3;
      box-sizing: border-box;
      width: 16px;
      height: 16px;
      display: block;
      flex-shrink: 0;
      border-radius: 50%;
      margin-right: 10px;
    }
  }

  input:checked + .radio__icon {
    border: 1px solid #4A6C87;

    &:after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      background: #4A6C87;
      display: block;
      transform: translate(-50%, -50%);
    }
  }
</style>
