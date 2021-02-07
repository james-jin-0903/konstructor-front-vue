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
      .loader(v-if="isLoaded")
        Spinner
      .address
        AddressTable(v-if="addressesLoaded")
    #map.map


</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue';
import Select from '../components/forms/Select.vue';
import AddressTable from '../components/AddressTable.vue';
import NavigationTabs from '../components/NavigationTabs';
import { mapActions, mapGetters } from 'vuex';
import Spinner from '@/components/Spinner';

export default {
  name: 'AddressPage',
  components: {
    Spinner,
    Breadcrumbs,
    Select,
    AddressTable,
    NavigationTabs
  },
  data() {
    return {
      breadcrumbs: {
        links: [{ label: 'Настройки', href: '/settings' }],
        current: 'Адреса'
      },
      addressesLoaded: false,
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
    this.fetchAddress().then(result => {
      if (result) {
        this.addressesLoaded = true;
      }
    });
  },
  methods: {
    ...mapActions({
      fetchAddress: 'address/fetchAddress'
    })
  },
  computed: {
    ...mapGetters({
      isLoaded: 'address/getLoaded'
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
