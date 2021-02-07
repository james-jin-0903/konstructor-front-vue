<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-location__toolbar
        .mode
          Select(
          :small="select.small",
          :icon="select.icon"
          :text="select.text"
          :options="select.options"
          )
        .action


    .page-location.container.page

</template>

<script>
  import Breadcrumbs from '../components/Breadcrumbs';
  import Select from '../components/forms/Select';

  export default {
    name: 'StyliguidePage',
    components: { Breadcrumbs, Select },
    data() {
      return {
        breadcrumbs: {
          links: [{ label: 'Иван Петров', href: '/' }, { label: 'Настройки', href: '/settings' }],
          current: 'Аккаунт'
        },
        select: {
          small: false,
          text: 'Русский',
          val: 'Русский',
          options: [
            {
              text: 'English',
              val: 'English'
            },
            {
              text: 'Italiano',
              val: 'Italiano'
            },
            {
              text: 'France',
              val: 'France'
            },
            {
              text: 'Bahasa Melayu',
              val: 'Bahasa Melayu'
            },
            {
              text: 'Bahasa Melayu',
              val: 'Bahasa Melayu'
            },
            {
              text: 'Bahasa Melayu',
              val: 'Bahasa Melayu'
            }]
        }
      };
    }
  };
</script>

<style lang="scss" scoped>
.page-account {
  &__form {
    width: 380px;
  }

  &__toolbar {
    justify-content: flex-end;
  }

  &__password {
    margin-right: 10px;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }

  &__field {
    margin-top: 15px;
  }

  &__submit {
    margin-top: 35px;
  }
}
</style>
