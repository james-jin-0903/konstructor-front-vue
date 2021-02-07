<template lang="pug">
  .auth-footer
    span {{$t('footer[0]')}}
    a(href="").link  {{$t('footer[1]')}}
    span  {{$t('footer[2]')}}
    a(href="").link  {{$t('footer[3]')}}

</template>

<script>
  export default {
    components: {},
    data() {
      return {};
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../scss/auth/shared';

</style>
