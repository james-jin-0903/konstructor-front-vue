<template lang="pug">
  main.layoutMain__main.layoutMain__main_hovered.layoutMain--auth
    .container.container_centered.auth-container
      .notFound.app__wrapper
        router-link(to="/")
          img.logo(src="~@/assets/images/auth/logo.png")

        h3.app__title {{$t('notFound')}}
        .notFound__form
          router-link.button.button_bind.notFound__btn(to="/")
            span {{$t('recoverComplete.enter')}}

</template>

<script>
  import { ValidationProvider, ValidationObserver } from 'vee-validate';

  export default {
    components: {
      ValidationProvider,
      ValidationObserver
    },
    data() {
      return {};
    },
    methods: {}
  };
</script>

<style lang="scss" scoped>
  @import '../../scss/auth/shared';

  .notFound__form {
    width: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .recover__field {
    margin-bottom: 25px;
  }

  .recover__desc {
    text-align: center;
  }

  .notFound__btn {
    display: inline-block;
    margin-top: 30px;
  }
</style>
