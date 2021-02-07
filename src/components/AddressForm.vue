<template lang="pug">
  div
    .loader(v-if="isLoaded")
      Spinner

    form.edit-address(@submit="onSubmit")
      .field.edit-address__field
        .field__title Страна:
        VueSelect(
          @input="onCountryChange"
          v-model="country"
          name="country",
          v-validate="'required'"
          :items='getCountries',
          :placehold='"Укажите страну"'
        )
      .field.edit-address__field
        .field__title Город:
        VueSelect(
          @input="onCityChange"
          v-model="city"
          name="city",
          v-validate="'required'"
          :disabled="!country"
          :items='citiesList',
          :placehold='"Укажите город"'
        )
      .field.edit-address__field
        .field__title Улица:
        .input(:class="{'input_error': errors.has('street'),  'input_success': fields.street ? (fields.street.dirty && fields.street.valid) : false}")
          input.input__input(
            type="text"
            placeholder="Введите название улицы"
            name="street"
            v-model='form.street'
            v-validate="'required'"
            @input="onInput"
          )
          img.input__icn-status(v-show="errors.has('street')" src="../assets/images/icon_error.svg")
          img.input__icn-status(v-show="fields.street ?  (fields.street.dirty && fields.street.valid) : false" src="../assets/images/icon_success.svg")
        .input__error-msg(v-show="errors.has('street')") {{ this.errors.first('street') }}
      .section
        .field.section__field
          .field__title Дом:
          .input(:class="{'input_error': errors.has('house_number'),  'input_success': fields.house_number ? (fields.house_number.dirty && fields.house_number.valid) : false}")
            input.input__input(type="text"
              placeholder="Введите номер дома"
              name="house_number"
              v-model='form.house_number'
              @input="onInput"
              v-validate="'required'"
            )
            img.input__icn-status(v-show="errors.has('house_number')" src="../assets/images/icon_error.svg")
            img.input__icn-status(v-show="fields.house_number ?  (fields.house_number.dirty && fields.house_number.valid) : false" src="../assets/images/icon_success.svg")
          .input__error-msg(v-show="errors.has('house_number')") {{ this.errors.first('house_number') }}
        .field.section__field
          .field__title Квартира/Офис:
            .field__info(rel="Поле не обязательно для заполнения") (опц)
          .input
            input.input__input(type="text"  placeholder="Введите номер"  v-model='form.apartment_number' @input="onInput")
      .section
        .field.section__field
          .field__title Индекс:
          .input(:class="{'input_error': errors.has('index'),  'input_success': fields.index ? (fields.index.dirty && fields.index.valid) : false}")
            input.input__input(
              type="text"
              placeholder="Введите индекс"
              name="index"
              v-model='form.index'
              @input="onInput"
              v-validate="'required'"
            )
            img.input__icn-status(v-show="errors.has('index')" src="../assets/images/icon_error.svg")
            img.input__icn-status(v-show="fields.index ?  (fields.index.dirty && fields.index.valid) : false" src="../assets/images/icon_success.svg")
          .input__error-msg(v-show="errors.has('index')") {{ this.errors.first('index') }}
        .field.section__field
          .field__title Примечание:
            .field__info(rel="Поле не обязательно для заполнения") (опц)
          .input
            input.input__input(type="text"  placeholder="Введите примеч."  v-model='form.comment' @input="onInput")
        Tooltip.note-tooltip(:text="'Вы можете указать короткое примечание, чтобы не забыть, что это за адрес (например, «дом», «работа», «клиент» и т.п.)'")
      button.button.button_default.add-social__submit(:class="disablePoint && 'buttonSubmit_disabled'" :disabled="disablePoint || !city" type="submit" value="Сохранить")
        span Сохранить
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Tooltip from './Tooltip.vue';
  import VueSelect from './VueSelect.vue';
  import Spinner from '@/components/Spinner';

  export default {
    components: {
      Tooltip,
      VueSelect,
      Spinner
    },
    props: {
      item: Object
    },
    data() {
      return {
        country: null,
        city: null,
        form: {
          id: null,
          city_id: null,
          street: '',
          house_number: '',
          apartment_number: '',
          index: '',
          comment: ''
        },
        citiesList: [],
        formTouched: false
      };
    },
    created() {
      this.fetchCountries();
    },
    computed: {
      ...mapGetters({
        getCountries: 'address/getCountries',
        getCities: 'address/getCities',
        isLoaded: 'address/getLoaded'
      }),
      formValid() {
        return this.form.country !== '' &&
          this.form.city_id !== '' &&
          this.form.street !== '' &&
          this.form.house_number !== '' &&
          this.form.index !== '';
      },
      disablePoint() {
        return !this.formValid || !this.formTouched;
      }
    },
    watch: {},
    mounted() {
      if (this.item) {
        this.form = { ...this.item };
        this.country = this.item.country.name;
        if (this.country) {
          this.updateCities(this.item.country.id)
              .then(cities => {
                this.citiesList = cities;
                this.city = this.item.city.name;
                this.form.city_id = this.item.city.id;
              });
        }
      }
    },
    methods: {
      ...mapActions({
        editAddress: 'address/editAddress',
        addAddress: 'address/addAddress',
        fetchCountries: 'address/fetchCountries',
        fetchCities: 'address/fetchCities'
      }),
      onSubmit(e) {
        e.preventDefault();
        if (!this.disablePoint) {
          this.formTouched = false;
          if (this.item) {
            this.editAddress(this.form);
          } else {
            this.addAddress(this.form)
                .then(result => {
                  if (result) {
                    this.$router.push({ path: '/address' });
                  }
                });
          }
        }
      },
      onCountryChange(event) {
        this.formTouched = true;
        this.updateCities(event.id)
            .then(cities => {
              this.citiesList = cities;
              this.city = null;
              this.form.city_id = null;
            });
      },
      updateCities(country) {
        return this
          .fetchCities({ country });
      },
      onCityChange(event) {
        this.formTouched = true;
        this.form.city_id = Number(event.id);
      },
      onInput() {
        this.formTouched = true;
      }
    }
  };
</script>

<style lang="scss">
  .section {
    align-items: flex-start;
  }

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

  .note-tooltip.tooltip {
    top: 35px;
  }
</style>
