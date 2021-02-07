<template lang="pug">
  form.edit-address(@submit="onSubmit")
    .field.edit-address__field
      .field__title Страна:
      VueSelect(v-model="country", name="country", :items='countriesList', :placehold='"Укажите страну"')
    .field.edit-address__field
      .field__title Город:
      VueSelect(v-model="city", name="city", :disabled="country !== '' ? false : true" :items='citiesList', :placehold='"Укажите город"')
    .field.edit-address__field
      .field__title Улица:
      .input
        input.input__input(type="text" placeholder="Введите название улицы"  v-model='street')
    .section
      .field.section__field
        .field__title Дом:
        .input
          input.input__input(type="text" placeholder="Введите номер дома"  v-model='house')
      .field.section__field
        .field__title Квартира/Офис:
          .field__info(rel="Поле не обязательно для заполнения") (опц)
        .input
          input.input__input(type="text"  placeholder="Введите номер"  v-model='apartment')
    .section
      .field.section__field
        .field__title Индекс:
        .input
          input.input__input(type="text" placeholder="Введите индекс"  v-model='index')
      .field.section__field
        .field__title Примечание:
          .field__info(rel="Поле не обязательно для заполнения") (опц)
        .input
          input.input__input(type="text"  placeholder="Введите примеч."  v-model='note')
      Tooltip.note-tooltip(:text="'Вы можете указать короткое примечание, чтобы не забыть, что это за адрес (например, «дом», «работа», «клиент» и т.п.)'")
    button.button.button_default.add-social__submit(:class="!disablePoint && 'buttonSubmit_disabled'" :disabled="!disablePoint" type="submit" value="Сохранить")
      span Сохранить
</template>

<script>
  import Tooltip from './Tooltip.vue';
  import VueSelect from './VueSelect.vue';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    components: {
      Tooltip,
      VueSelect
    },
    props: {
      returnBack: Function,
      item: [Number, String]
    },
    data() {
      return {
        id: 0,
        country: '',
        city: '',
        street: '',
        house: '',
        apartment: '',
        index: '',
        note: ''
      };
    },
    computed: {
      ...mapGetters({
        getList: 'address/getList',
        getCountries: 'address/getCountries'
      }),
      disablePoint() {
        if (
          this.country !== '' &&
          this.city !== '' &&
          this.street !== '' &&
          this.house !== '' &&
          this.index !== ''
        ) {
          return true;
        } else {
          return false;
        }
      },
      countriesList() {
        return this.getCountries.map(el => {
          return el.name;
        });
      },
      citiesList() {
        let result = [];
        this.getCountries.forEach(el => {
          if (el.name === this.country) {
            result = el.cities;
          }
        });
        return result;
      }
    },
    watch: {
      getList(newVal) {
        newVal.forEach(el => {
          if (el.id === this.item) {
            this.id = el.id;
            this.country = el.country;
            this.city = el.city;
            this.street = el.street;
            this.house = el.house;
            this.apartment = el.apartment;
            this.index = el.index;
            this.note = el.note;
          }
        });
      }
    },
    mounted() {
      this.getList.forEach(el => {
        if (el.id === this.item) {
          this.id = el.id;
          this.country = el.country;
          this.city = el.city;
          this.street = el.street;
          this.house = el.house;
          this.apartment = el.apartment;
          this.index = el.index;
          this.note = el.note;
        }
      });
    },
    methods: {
      ...mapActions({
        editAddress: 'address/editAddress'
      }),
      onSubmit(e) {
        e.preventDefault();
        if (this.disablePoint) {
          this.editAddress(this._data);
          this.returnBack();
        }
      }
    }
  };
</script>

<style lang="scss">
  .edit-address {
    width: 380px;

    &__submit {
      margin-top: 36px;
    }

    &__field {
      margin-bottom: 15px;
    }
  }


  .section {
    position: relative;
  }

  .note-tooltip.tooltip {
    position: absolute;
    bottom: 10px;
    left: calc(100% + 10px);
  }

  .add-social__submit {
    margin-top: 26px;
  }
</style>
