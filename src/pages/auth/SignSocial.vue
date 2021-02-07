<template lang="pug">
  main.layoutMain__main.layoutMain__main_hovered.layoutMain--auth
    .container.container_centered.auth-container
      .signIn.app__wrapper
        router-link(to="/")
          img.logo(src="~@/assets/images/auth/logo.png")

        .signIn__form
          RingLoader(:color="'#f6ae32'")
        Footer

</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex';
  import { RingLoader } from 'vue-spinners-css';
  import { social, authRoutesMap } from '../../config';
  import Footer from './Footer';

  export default {
    props: ['type', 'social'],
    components: {
      Footer,
      RingLoader
    },
    data() {
      return {};
    },
    computed: {
      ...mapGetters({})
    },
    created() {
      if (this.social === social.pinterest.redirect) {
        this.signPinterest({
          token: this.$route.query.access_token,
          type: this.type
        });
      }
      if (this.social === social.facebook.redirect) {
        this.signFacebook({
          code: this.$route.query.code,
          type: this.type
        }).then(res => {
          if (res) {
            if (this.type === 'up') {
              this.$router.push(authRoutesMap.signUpPath);
            } else {
              this.auth({ social: 'byFacebook' });
            }
          } else {
            this.$router.push(authRoutesMap.signIn);
          }
        });
      }
    },

    methods: {
      ...mapActions({
        signPinterest: 'socialAuth/signPinterest',
        signFacebook: 'socialAuth/signFacebook',
        auth: 'signIn/auth'
      }),
      ...mapMutations({
        setSocial: 'social/SET_SOCIAL'
      })
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../scss/auth/shared';

  .signIn__form {
    width: 360px;
    display: flex;
    justify-content: center;
    padding-top: 100px;
  }
</style>
