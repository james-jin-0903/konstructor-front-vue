<template lang="pug">
  #app
    div(v-if="isAuthComplete")
      .layoutMain
        .layoutMain__header
          AppHeader
        main.layoutMain__main.ps.ps--active-y.layoutMain__main_hovered
          .loader(v-if="isUserLoaded && !currentUser")
            Spinner
          transition(name='fade')
            router-view(v-if="currentUser")
        footer.layoutMain__footer.footer
          ChatWidget
    router-view(v-if="!isAuthComplete")


</template>

<script>
  import AppHeader from './Header.vue';
  import { mapGetters } from 'vuex';
  import Spinner from '@/components/Spinner';
  import ChatWidget from '@/components/ChatWidget';

  export default {
    name: 'AppLayout',
    components: {
      ChatWidget,
      AppHeader,
      Spinner
    },
    computed: {
      ...mapGetters({
        currentUser: 'user/getUser',
        isAuthComplete: 'global/isAuthComplete',
        isUserLoaded: 'user/getUserLoaded'
      })
    }
  };
</script>

<style lang="scss">
  .layoutMain {
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-width: 320px;
  }

  .layoutMain__main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-width: 320px;
    flex: 1;
    transition: height 0.2s linear;
    position: relative;
  }

  .layoutMain__main > div:not(.auth-container) {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  body {
    min-width: 1180px;
  }

  .layoutMain--auth {
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .container {
    margin: 0 auto;
    width: 1180px;

    @include media-t {
      width: 100%;
    }

    @include media-m {
      width: 100%;
    }

    @include media-sm {
      width: 100%;
    }

    &_centered {
      display: flex;
      justify-content: center;
    }
  }

  .page {
    padding-bottom: 150px;
    padding-top: 25px;
  }

  .page__nav {
    width: 1180px;
    margin: 0 auto;
    background: white;
    z-index: 4;
    transition: 0.3s;
  }

  .map {
    display: none;
    width: 100%;
    height: calc(100% - 95px);
  }

  .map_open {
    display: block;
  }

  .pageContent {
    &_hide {
      display: none;
    }
  }

  .mode {
    width: 140px;
  }

  .footer {
  }

  .app__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .app__title {
    margin-top: 34px;
    margin-bottom: 32px;
  }

  .app__groupBtns {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 36px;
  }

  .app__tooltip {
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
    font-weight: 400;
  }


  .ct {
    display: none !important;
  }


  .auth-footer {
    font-size: 14px;
    line-height: 19px;
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;

    a {
      margin: 0 5px;
    }
  }

</style>
