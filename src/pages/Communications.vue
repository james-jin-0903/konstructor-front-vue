<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-comm__toolbar
        .action
      NavigationTabs(current="Коммуникации" :links="links")

    .page-comm.container.page
      .loader(v-if="isLoaded")
        Spinner
      .comm
        CommTable(v-if="communicationsLoaded")
</template>

<script>
import Tooltip from '../components/Tooltip.vue';
import Breadcrumbs from '../components/Breadcrumbs.vue';
import CommTable from '../components/CommTable.vue';
import NavigationTabs from '../components/NavigationTabs';
import { mapActions, mapGetters } from 'vuex';
import Spinner from '@/components/Spinner';

const PAGE_NAME = 'Коммуникации';
const PAGE_HREF = 'communications';
export default {
  name: 'CommunicationsPage',
  components: {
    Breadcrumbs,
    Tooltip,
    CommTable,
    NavigationTabs,
    Spinner
  },
  data() {
    return {
      breadcrumbs: {
        links: [{ label: 'Настройки', href: `/${PAGE_HREF}` }],
        current: PAGE_NAME
      },
      communicationsLoaded: false,
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
    this.fetchCommunications().then(result => {
      if (result) {
        this.communicationsLoaded = true;
      }
    });
  },
  methods: {
    ...mapActions({
      fetchCommunications: 'communications/fetch'
    })
  },
  computed: {
    ...mapGetters({
      isLoaded: 'communications/getLoaded'
    })
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
