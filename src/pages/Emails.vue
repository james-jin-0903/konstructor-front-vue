<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-emails__toolbar
        .action
      NavigationTabs(current="Электронная почта" :links="links")

    .page-emails.container.page
      .loader(v-if="isLoaded && !emailsLoaded")
        Spinner
      .emails
        EmailsTable(v-if="emailsLoaded")
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue';
import EmailsTable from '../components/EmailsTable.vue';
import NavigationTabs from '../components/NavigationTabs';
import { mapActions, mapGetters } from 'vuex';
import Spinner from '@/components/Spinner';

const PAGE_NAME = 'Электронная почта';
export default {
  name: 'Payment',
  components: {
    Breadcrumbs,
    EmailsTable,
    NavigationTabs,
    Spinner
  },
  data() {
    return {
      emailsLoaded: false,
      breadcrumbs: {
        links: [{ label: 'Настройки', href: '/settings' }],
        current: PAGE_NAME
      },
      item: {},
      deletedItems: [],
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
    this.fetchEmails().then(result => {
      if (result) {
        this.emailsLoaded = true;
      }
    });
  },
  methods: {
    ...mapActions({
      fetchEmails: 'emails/fetchEmails'
    })
  },
  computed: {
    ...mapGetters({
      isLoaded: 'emails/getLoaded'
    })
  }
};
</script>

<style lang="scss" scoped>
.page-emails {
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
