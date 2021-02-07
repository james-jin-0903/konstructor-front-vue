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
            :defaultValue="select.defaultValue"
          )
        .action


    .page-location.container.page
      form.page-location__form.pageContent
        .field.page-location__field
          .field__title Страна:
          input(type="text" disabled placeholder="Введите Вашу страну" value="Украина").field__input

        .field.page-location__field
          .field__title Город:
          input(type="text" disabled placeholder="Введите Ваш город" value="Киев").field__input
    #map.map
</template>

<script>
  import Breadcrumbs from '../components/Breadcrumbs.vue';
  import Select from '../components/forms/Select.vue';

  const PAGE_NAME = 'Местоположение';
  export default {
    name: 'Location',
    components: {
      Breadcrumbs,
      Select
    },
    data() {
      return {
        breadcrumbs: {
          links: [
            { label: 'Иван Петров', href: '/' },
            { label: 'Настройки', href: '/settings' }
          ],
          current: PAGE_NAME
        },
        select: {
          small: true,
          icon: require('../assets/images/icon_menu.png'),
          text: 'Текст',
          defaultValue: 'Текст',
          options: [
            {
              icon: require('../assets/images/icon_earth.png'),
              text: 'Карта',
              class: 'pageSettings__selectMap',
              val: 'Карта'
            },
            {
              icon: require('../assets/images/icon_menu.png'),
              text: 'Текст',
              class: 'pageSettings__selectMap',
              val: 'Текст',
            }
          ]
        },
        windowAdd: false,
        windowEdit: false,
        changed: false,
        item: {}
      };
    },
    methods: {}
  };
</script>

<style lang="scss" scoped>
.page-location {
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
