<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-comm__toolbar
        .action
      NavigationTabs(:links="links")

    .page-comm.container.page
      .comm
        CommunicationForm

</template>

<script>
import Tooltip from '../components/Tooltip.vue';
import Breadcrumbs from '../components/Breadcrumbs.vue';
import NavigationTabs from '../components/NavigationTabs';
import CommunicationForm from '@/components/CommunicationForm';

const PAGE_NAME = 'Добавить';
export default {
  name: 'CommunicationsPage',
  components: {
    Breadcrumbs,
    Tooltip,
    CommunicationForm,
    NavigationTabs
  },
  data() {
    return {
      breadcrumbs: {
        links: [
          { label: 'Настройки', href: '/settings' },
          { label: 'Коммуникации', href: '/communications' }
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
.page-comm {
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
