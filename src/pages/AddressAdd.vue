<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-address__toolbar
        .mode
          Select(
            :small="select.small",
            :icon="select.icon"
            :text="select.text"
            :options="select.options"
          )
        .action
      NavigationTabs(current="Адреса" :links="links")

    .page-address.container.page
      .address
        AddressForm
    #map.map

</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue';
import Select from '../components/forms/Select.vue';
import AddressTable from '../components/AddressTable.vue';
import NavigationTabs from '../components/NavigationTabs';
import { mapActions } from 'vuex';
import map from '../utils/map';
import AddressForm from '../components/AddressForm';

export default {
  name: 'AddressPage',
  components: {
    AddressForm,
    Breadcrumbs,
    Select,
    AddressTable,
    NavigationTabs
  },
  data() {
    return {
      breadcrumbs: {
        links: [
          { label: 'Настройки', href: '/settings' },
          { label: 'Адреса', href: '/address' }
        ],
        current: 'Добавить'
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
  created() {},
  mounted() {
    // TODO set map when backend was ready
    //  map();
  },
  methods: {
    // TODO get data backend was ready
    ...mapActions({
      // fetchAddress: 'address/fetchAddress',
      // fetchCountries: 'address/fetchCountries'
    })
  }
};
</script>

<style lang="scss" scoped>
.page-address {
  &__form {
    width: 380px;
  }

  &__field {
    margin-top: 15px;
  }

  &__submit {
    margin-top: 35px;
  }
}
</style>
