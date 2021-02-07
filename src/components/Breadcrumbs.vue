<template lang="pug">
  .bread-crumbs
    router-link(
      v-if="breadcrumbs"
      v-for="link in breadcrumbs"
      :key="link.label"
      :to="link.href"
    ).bread-crumbs__link  {{link.label}}
    .bread-crumbs__current {{this.current}}
</template>

<script>
  import '../scss/style.scss';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Breadcrumbs',
    components: {},
    props: ['links', 'current'],
    data() {
      return {
        rootEl: {},
        breadcrumbs: null
      };
    },
    created() {
      this.buildBreadcrumbs();
    },
    watch: {
      currentUser() {
        this.buildBreadcrumbs();
      }
    },
    computed: {
      ...mapGetters({
        currentUser: 'user/getUser'
      })
    },
    methods: {
      buildBreadcrumbs() {
        if (this.currentUser) {
          this.rootEl = { label: `${this.currentUser.first_name} ${this.currentUser.last_name}`, href: '/user' };
          this.breadcrumbs = [this.rootEl, ...this.links];
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .bread-crumbs {
    display: flex;
    align-items: baseline;
    padding: 10px 0;

    &__link {
      padding-right: 10px;
      margin-right: 10px;
      position: relative;
      text-decoration: none;
      cursor: pointer;

      font-size: 14px;
      line-height: 19px;

      color: #81A6C3;

      &::before,
      &::after {
        content: '';
        position: absolute;
        right: -4px;
        height: 1px;
        width: 5px;
        background: #b2bcca;
        backface-visibility: hidden;
        transition: width 0.3s, transform 0.3s;
        border-radius: 2px;
      }

      &::before {
        top: calc(50% - 1.5px);
        transform: rotate(45deg);
      }

      &::after {
        top: calc(50% + 1.5px);
        transform: rotate(-45deg);
      }

      &.gray {
        color: $gray3;
      }
    }

    &__current {
      text-decoration: none;
      @include font(24, b, 1.4);
    }
  }

</style>
