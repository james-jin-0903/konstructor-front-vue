<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-social__toolbar
        .action
      NavigationTabs(current="Соцсети" :links="links")

    .page-social.container.page
      .social
        SocialForm(v-if="selectedItem" :item="selectedItem")
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue';
import SocialForm from '../components/SocialForm.vue';
import NavigationTabs from '../components/NavigationTabs';
import { mapActions } from 'vuex';

const PAGE_NAME = 'Редактирование';
export default {
  name: 'SocialEdit',
  components: {
    Breadcrumbs,
    SocialForm,
    NavigationTabs
  },
  data() {
    return {
      breadcrumbs: {
        links: [
          { label: 'Настройки', href: '/settings' },
          { label: 'Социальные сети', href: '/social' }
        ],
        current: PAGE_NAME
      },
      itemId: null,
      selectedItem: null,
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
    this.fetchSocial().then(socialsList => {
      this.itemId = Number(this.$route.params.id);
      this.selectedItem = socialsList.find(
        socialItem => socialItem.id === this.itemId
      );
    });
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
