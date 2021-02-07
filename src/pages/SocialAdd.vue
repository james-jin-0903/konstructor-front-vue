<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-social__toolbar
        .action
      NavigationTabs(current="Соцсети" :links="links")

    .page-social.container.page
      .social
        SocialForm

</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue';
import SocialForm from '../components/SocialForm.vue';
import NavigationTabs from '../components/NavigationTabs';

const PAGE_NAME = 'Добавить';
export default {
  name: 'SocialAdd',
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
