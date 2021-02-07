<template lang="pug">
  .timeline
    .timeline__section
      router-link(to="#").timeline__title 2019
      .timeline__item
        EventItem(:typeNumber="1")
    .timeline__section
      router-link(to="#").timeline__title 2018
      .timeline__item
        EventItem(:typeNumber="2")
    .timeline__section
      router-link(to="#").timeline__title 2010
      .timeline__item
        EventItem(:typeNumber="3")
    .timeline__section
      router-link(to="#").timeline__title 1985
      .timeline__item
        EventItem(:typeNumber="4")
</template>

<script>
  import '../scss/style.scss';
  import EventItem from './EventItem';

  export default {
    name: 'Timeline',
    components: { EventItem },
    props: {},
    data() {
      return {};
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style lang="scss" scoped>
  .timeline {
    &__title {
      font-size: 12px;
      margin-bottom: 14px;
      color: $blue1;
      font-weight: bold;
      display: block;
      text-decoration: none;
    }

    &__section {
      margin-bottom: 28px;
    }
  }
</style>
