<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-payment__toolbar
        .action
      NavigationTabs(current="Счета" :links="links")

    .page-payment.container.page
      .payment
        PaymentTable(v-if="!windowAdd && !windowEdit" :changed="changed")
        AddPayment(v-if="windowAdd" :returnBack="onReturnBack")
        EditPayment(v-if="windowEdit" :returnBack="onReturnBack" :item="item")
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue';
import PaymentTable from '../components/PaymentTable.vue';
import AddPayment from '../components/AddPayment.vue';
import EditPayment from '../components/EditPayment.vue';
import NavigationTabs from '../components/NavigationTabs';
import { mapActions } from 'vuex';

const PAGE_NAME = 'Счета';
const PAGE_HREF = 'payments';
export default {
  name: 'Payment',
  components: {
    Breadcrumbs,
    PaymentTable,
    AddPayment,
    EditPayment,
    NavigationTabs
  },
  data() {
    return {
      breadcrumbs: {
        links: [
          { label: 'Иван Петров', href: '/' },
          { label: 'Настройки', href: '/settings' }
        ],
        current: 'Счета'
      },
      windowAdd: false,
      windowEdit: false,
      changed: false,
      item: {},
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
    this.fetchPayment();
    this.fetchPlatforms();
    this.newPayment();
  },
  methods: {
    ...mapActions({
      fetchPayment: 'payment/fetchPayment',
      fetchPlatforms: 'payment/fetchPlatforms'
    }),
    newPayment() {
      this.$root.$on('windowAdd', obj => {
        if (obj.toggle) {
          this.windowAdd = true;
          this.changeBreadcrumbs('Добавление счета');
        }
      });
      this.$root.$on('windowEdit', obj => {
        if (obj.toggle) {
          this.windowEdit = true;
          this.item = obj.item;
          this.changeBreadcrumbs('Редактирование счета');
        }
      });
    },

    changeBreadcrumbs(tab) {
      const old = document.querySelector('.breadcrumbs__current');
      old.addEventListener('click', this.onReturnBack);
      this.breadcrumbs.links.push({ label: PAGE_NAME, href: `/${PAGE_HREF}` });
      this.breadcrumbs.current = tab;
    },

    onReturnBack() {
      const old = document.querySelector('.breadcrumbs__current');
      old.removeEventListener('click', this.onReturnBack);
      const currentLinks = this.breadcrumbs.links;
      this.breadcrumbs.links = currentLinks.slice(0, currentLinks.length - 1);
      this.breadcrumbs.current = PAGE_NAME;

      this.windowAdd = false;
      this.windowEdit = false;
      this.changed = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.page-payment {
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
