<template lang="pug">
  nav.navigation-tabs
    ul.navigation-tabs__list
      li(v-for="link in links" :key="link.label")
        span(v-if="link.label === current").navigation-tabs__item.navigation-tabs__item_active  {{link.label}}
        router-link(:to="link.href" v-if="link.label !== current").navigation-tabs__item  {{link.label}}
</template>

<script>
import '../scss/style.scss';

export default {
  name: 'NavigationTabs',
  components: {},
  props: {
    current: {
      type: String
    },
    links: {
      type: Array
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.navigation-tabs {
  margin-top: 25px;

  &__list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: nowrap;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
  }

  &__item {
    display: inline-block;
    margin-right: 40px;
    padding-bottom: 7px;
    position: relative;
    &_active {
      color: $blue2;
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: $blue2;
      }
    }
  }
}

a.navigation-tabs__item {
  color: $blue1;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
}
</style>
