<template lang="pug">
  .dream-page
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
    .container.page
      h1 Мечты

</template>

<script>
  import Breadcrumbs from '@/components/Breadcrumbs.vue';

  const PAGE_NAME = 'Мечта';
  export default {
    name: 'Dream',
    components: {
      Breadcrumbs
    },
    data() {
      return {
        breadcrumbs: {
          links: [],
          current: PAGE_NAME
        }
      };
    }
  };
</script>

<style lang="scss" scoped>
  .dream-page {
  }
</style>
