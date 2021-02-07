<template lang="pug">
  form.add-address(@submit="onSubmit")
    .field.add-address__field
      .field__title Страна:
      VueSelect(v-model="country", :alternate="true", name="country", :items='countriesList', :placehold='"Укажите страну"')
    .field.add-address__field
      .field__title Город:
      VueSelect(v-model="city", name="city", :alternate="true", :disabled="country !== '' ? false : true" :items='citiesList', :placehold='"Укажите город"')
    .field.add-address__field
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
    button.button.button_default.add-address__submit(:class="!disablePoint && 'buttonSubmit_disabled'" :disabled="!disablePoint" type="submit" value="Сохранить")
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
      returnBack: Function
    },
    data() {
      return {
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
    methods: {
      ...mapActions({
        addAddress: 'address/addAddress'
      }),
      onSubmit(e) {
        e.preventDefault();
        if (this.disablePoint) {
          this.addAddress(this._data);
          this.returnBack();
        }
      }
    }
  };
</script>

<style lang="scss">
  .add-address {
    width: 380px;
    &__submit {
      margin-top: 26px;  
    }
    &__field {
      margin-bottom: 15px;
    }
  }

  .section {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    position: relative;
    &__field {
      width: calc(50% - 10px);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }

  .note-tooltip {
    position: absolute;
    bottom: 10px;
    left: calc(100% + 10px);
  }
</style>
