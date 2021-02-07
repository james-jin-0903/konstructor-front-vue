<template lang="pug">
  .object
    .object__inner
      .object__main-icon
        template(v-if="image")
          img(:src="image" width="30" height="30")
        template(v-else)
          img(src="@/assets/images/icon_konstruktor.svg" width="14" height="16")
      template(v-if="customIcon")
        img(:src="customIcon" width="16").object__second-icon
      template(v-else)
        IconCube(:size="20").object__second-icon
      .object__name {{ name }}
</template>

<script>
  import IconCube from './icons/IconCube';

  export default {
    name: 'Object',
    components: { IconCube },
    props: {
      name: String,
      image: String,
      customIcon: String
    }
  };
</script>

<style lang="scss" scoped>
.object {
  &__inner {
    display: flex;
    align-items: center;
  }

  &__main-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $gray2;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    margin-right: 10px;
    overflow: hidden;
  }

  &__second-icon {
    margin-right: 10px;
  }

  &__name {
    @include font(14, w, 18px);
    font-weight: 600;
  }
}
</style>
