<template lang="pug">
  .expandable-text
    .expandable-text__content(v-line-clamp:[lineHeight]="lines")
      slot(name="text")
    .expandable-text__toggle-btn(@click="toggle")
      slot(name="toggler")
</template>

<script>
  export default {
    name: 'ExpandableText',
    props: {
      maxLines: {
        type: Number,
        default: () => 1
      },
      lineHeight: {
        type: Number,
        default: () => 20
      }
    },
    data() {
      return {
        isExpanded: false
      }
    },
    computed: {
      lines() {
        return this.isExpanded ? 999 : this.maxLines;
      }
    },
    methods: {
      toggle() {
        this.isExpanded = !this.isExpanded;
        this.$emit('toggle');
      }
    }
  }
</script>

<style lang="scss" scoped>
.expandable-text {
  &__toggle-btn {
    display: inline-block;
  }
}
</style>