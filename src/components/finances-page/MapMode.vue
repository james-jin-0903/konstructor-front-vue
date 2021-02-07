<template lang="pug">
  .container
    FinancesPageToolBar
    h2 This is the Map mode of the finances page
</template>

<script>
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';

export default {
  name: 'Map-Mode',
  components: {
    FinancesPageToolBar
  }
};
</script>

<style lang="scss">
@import '@/scss/pages/finances-page';
</style>