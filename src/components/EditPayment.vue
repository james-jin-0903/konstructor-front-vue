<template lang="pug">
  form.edit-payment(@submit="onSubmit")
    .field.edit-payment__field
      .field__title Платформа:
      InputAuto(v-model="platform", name="platform", :items='getPlatforms', :placehold='"Введите название платежной системы"')
    .section-wallet(v-if="validPlatform")
      .section-wallet__row
        .field.section-wallet__field
          .field__title Номер карты:
          .input(:class="{'input_error': errors.has('numberCard')}")
            input.input__input(type="text" v-validate="'required|digits:16'"  @input="handleInput" name="numberCard" v-model="numberCard" maxlength="16" )
        .field.section-wallet__field
          .field__title Срок действия:
          .section-wallet__field
            .input(:class="{'input_error': errors.has('month')}")
              input.input__input(type="text" v-validate="'required|digits:2'" @input="handleInput" name="month" v-model="month" maxlength="2" )
          .section-wallet__field
            .input(:class="{'input_error': errors.has('year')}")
              input.input__input(type="text" @input="handleInput" v-validate="'required|digits:2'" name="year" v-model="year" maxlength="2" )
      .section-wallet__row
        .field.section-wallet__field
          .section-wallet__field
            .field__title Код CVV2:
            .input(:class="{'input_error': errors.has('cvv')}")
              input.input__input(type="password"  v-validate="'required|digits:3'" @input="handleInput" name="cvv" v-model="cvv" maxlength="3" )
    .sectionUnvalid(v-if="!validPlatform && platform !== ''")
      .sectionUnvalid__info Указанная платежная система не найдена на сайте. Будет создан новый фантом.
        Tooltip.sectionUnvalid__tooltip(:text="'Фантом - профиль или сообщество, у которого нет владельца. Создается сайтом автоматически.'")
      .field.sectionUnvalid__field
        .field__title Реквизиты:
        .input
          input.input__input(type="text" placeholder="Введите ваш e-mail"  v-model='email')
    .confirm
      .confirm__wrapper
        .checkbox-wrapper
          input(:id="'checkbox_confirm'" :name="'checkbox_confirm'" type="checkbox" v-model="checkConfirm")
          label(:for="'checkbox_confirm'") Сделать основным счетом
        Tooltip(:text="'К Вашему аккаунту на Конструкторе должен быть привязан один основной счет. Он является методом оплаты по умолчанию.'")
      .confirm__info(v-if="checkConfirm") Внимание! Вы выбрали новый счет в качестве основного.

    button.button.button_default.edit-payment__submit(:class="!disablePoint && 'buttonSubmit_disabled'" :disabled="!disablePoint" type="submit" value="Сохранить")
      span Сохранить
</template>

<script>
  import Tooltip from './Tooltip.vue';
  import InputAuto from './forms/InputAuto.vue';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    components: {
      Tooltip,
      InputAuto
    },
    props: {
      returnBack: Function,
      item: [Number, String]
    },
    data() {
      return {
        checkConfirm: false,
        platform: '',
        numberCard: '',
        year: '',
        month: '',
        cvv: '',
        email: ''
      };
    },
    computed: {
      ...mapGetters({
        getList: 'payment/getList',
        getPlatforms: 'payment/getPlatforms'
      }),
      disablePoint() {
        if (!this.validPlatform) {
          const rex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
          if (!rex.test(this.email)) {
            return false;
          } else {
            return true;
          }
        } else {
          if (
            String(this.numberCard).length === 16 &&
            String(this.year).length === 2 &&
            String(this.month).length === 2 &&
            String(this.cvv).length === 3
          ) {
            return true;
          } else {
            return false;
          }
        }
      },
      validPlatform() {
        if (this.getPlatforms.indexOf(this.platform) !== -1) {
          return true;
        } else {
          return false;
        }
      }
    },
    watch: {
      getList(newVal) {
        newVal.forEach(el => {
          if (el.id === this.item) {
            this.platform = el.platform;
            this.checkConfirm = el.main;
            if (el.requisites.email) {
              this.email = el.requisites.email;
            } else {
              this.numberCard = el.requisites.number;
              this.year = el.requisites.period.year;
              this.month = el.requisites.period.month;
              this.cvv = el.requisites.cvv;
            }
          }
        });
      }
    },
    mounted() {
      this.getList.forEach(el => {
        if (el.id === this.item) {
          this.platform = el.platform;
          this.checkConfirm = el.main;
          if (el.requisites.email) {
            this.email = el.requisites.email;
          } else {
            this.numberCard = el.requisites.number;
            this.year = el.requisites.period.year;
            this.month = el.requisites.period.month;
            this.cvv = el.requisites.cvv;
          }
        }
      });
    },
    methods: {
      ...mapActions({
        editPayment: 'payment/editPayment'
      }),
      onSubmit(e) {
        e.preventDefault();
        if (this.disablePoint) {
          this.$validator.validate().then(valid => {
            if (!valid) {
              return;
            }
            this.editPayment({
              id: this.item,
              platform: this.platform,
              type: this.validPlatform,
              data: this.validPlatform
                ? {
                  number: this.numberCard,
                  period: {
                    year: this.year,
                    month: this.month
                  },
                  cvv: this.cvv
                }
                : { email: this.email },
              main: this.checkConfirm
            });
            this.returnBack();
          });
        }
      },
      handleInput(e) {
        if (isNaN(parseInt(e.target.value)) || e.data === ' ') {
          this[e.target.name] = String(e.target.value).replace(e.data, '');
        } else {
          this[e.target.name] = String(Math.abs(parseInt(e.target.value)));
        }
      }
    }
  };
</script>

<style lang="scss">
  .edit-payment {
    width: 380px;
    &__submit {
      margin-top: 36px;
    }
  }

  .confirm {
    margin-top: 16px;
    &__wrapper {
      display: flex;
      align-items: center;
    }

    .checkbox-wrapper {
      margin-right: 10px;
    }

    &__info {
      font-size: 16px;
      line-height: 22px;
      margin-top: 20px;
    }
  }
</style>
