<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-social__toolbar
        .action
      NavigationTabs(current="Соцсети" :links="links")

    .page-social.container.page
      .loader(v-if="isLoaded")
        Spinner
      .social
        SocialTable(v-if="socialsLoaded")
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Spinner from '@/components/Spinner';
import Breadcrumbs from '../components/Breadcrumbs.vue';
import SocialTable from '../components/SocialTable.vue';
import AddSocial from '../components/SocialForm.vue';
import NavigationTabs from '../components/NavigationTabs';

const PAGE_NAME = 'Социальные сети';
export default {
  name: 'Social',
  components: {
    Breadcrumbs,
    SocialTable,
    AddSocial,
    NavigationTabs,
    Spinner
  },
  data() {
    return {
      socialsLoaded: false,
      breadcrumbs: {
        links: [{ label: 'Настройки', href: '/settings' }],
        current: PAGE_NAME
      },
      select: {
        small: true,
        icon: require('../assets/images/icon_menu.png'),
        text: 'Текст',
        options: [
          {
            icon: require('../assets/images/icon_earth.png'),
            text: 'Карта',
            class: 'pageSettings__selectMap',
            val: 'Карта'
          }
        ]
      },
      links: [
        {
          label: 'Основные',
          href: '/settings'
        },
        {
          label: 'Аккаунт',
          href: '/account'
        },
        {
          label: 'Навыки',
          href: '/skills'
        },
        {
          label: 'Интересы',
          href: '/interest'
        },
        {
          label: 'Соцсети',
          href: '/social'
        },
        {
          label: 'Электронная почта',
          href: '/emails'
        },
        {
          label: 'Коммуникации',
          href: '/communications'
        },
        {
          label: 'Адреса',
          href: '/address'
        },
        {
          label: 'Счета',
          href: '/payment'
        }
      ]
    };
  },
  created() {
    this.fetchSocial().then(result => {
      if (result) {
        this.socialsLoaded = true;
      }
    });
  },
  computed: {
    ...mapGetters({
      isLoaded: 'social/getLoaded'
    })
  },
  methods: {
    ...mapActions({
      fetchSocial: 'social/fetchSocial'
    })
  }
};
</script>

<style lang="scss" scoped>
.page-social {
  &__form {
    width: 380px;
  }

  &__toolbar {
    justify-content: flex-end;
  }

  &__field {
    margin-top: 15px;
  }

  &__submit {
    margin-top: 35px;
  }
}
</style>
