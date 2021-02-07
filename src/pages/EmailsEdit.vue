<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-emails__toolbar
        .action
      NavigationTabs(:links="links")

    .page-emails.container.page
      .emails
        EmailForm(v-if="selectedItem" :item="selectedItem")
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Breadcrumbs from '../components/Breadcrumbs.vue';
import NavigationTabs from '../components/NavigationTabs';
import EmailForm from '@/components/EmailForm';

const PAGE_NAME = 'Редактировать';
export default {
  name: 'EmailsEdit',
  components: {
    EmailForm,
    Breadcrumbs,
    NavigationTabs
  },
  data() {
    return {
      breadcrumbs: {
        links: [
          { label: 'Настройки', href: '/settings' },
          { label: 'Электронная почта', href: '/emails' }
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
    this.fetchEmails().then(emailsList => {
      this.itemId = Number(this.$route.params.id);
      this.selectedItem = emailsList.find(
        socialItem => socialItem.id === this.itemId
      );
    });
  },
  computed: {
    ...mapGetters({
      socials: 'emails/getList'
    })
  },
  methods: {
    ...mapActions({
      fetchEmails: 'emails/fetchEmails'
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
