<template lang="pug">
  .textarea
    textarea(type="text" @input="onInput" :value='value' :placeholder="placeholder").textarea__field
    .textarea__buttons
      button(type="button").textarea__action
        img(:src="icon")

</template>

<script>
import autosize from 'autosize';
import { PerfectScrollbar } from 'vue2-perfect-scrollbar';

export default {
  name: 'Textarea',
  props: {
    placeholder: String,
    icon: String,
    value: String,
  },
  components: {},
  data() {
    return {};
  },
  mounted() {
    const textarea = this.$el.querySelector('textarea');
    autosize(textarea);
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
.textarea {
  position: relative;
  &__buttons {
    position: absolute;
    right: 11px;
    bottom: 12px;
    display: flex;
    align-items: center;
  }

  &__field {
    border: 1px solid #dfe4eb;
    border-radius: 3px;
    width: 100%;
    box-sizing: border-box;
    height: 36px;
    padding: 7px 35px 7px 10px;
    resize: none;
    font-size: 16px;
    max-height: 200px;
    margin-bottom: -4px;
    &:focus {
      border: 1px solid #81a6c3;
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
}
</style>
