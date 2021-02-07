<template lang="pug">
  div
    .loader(v-if="isLoaded")
      Spinner

    form.email-form(@submit="onSubmit")
      .field.email-form__field
        .field__title Электронная почта:
        .input(:class="{'input_error': formTouched && errors.has('email'),  'input_success': fields.email ? fields.email.valid : false}")
          input.input__input(
            v-validate="{ regex: emailRegexp, required: true }"
            v-model='form.email'
            @input="onMailInput"
            type="text"
            placeholder="Введите адрес электронной почты"
            name='email'
          )
          img.input__icn-status(v-show="formTouched && errors.has('email')" src="../assets/images/icon_error.svg")
          img.input__icn-status(v-show="fields.email ? fields.email.valid : false" src="../assets/images/icon_success.svg")
        .input__errorMsg(v-show="formTouched && errors.has('email')") {{ this.errors.first('email') }}
      .confirm
        .confirm__wrapper
          .checkbox-wrapper
            input(
              v-model="form.checkConfirm"
              :id="'checkbox_confirm'"
              :name="'checkbox_confirm'"
              :disabled="item && item.is_main"
              type="checkbox"
            )
            label(:for="'checkbox_confirm'") Привязать мой аккаунт к этому адресу
          Tooltip(:text="'Ваш аккаунт на Конструкторе может быть привязан только к одному адресу электронной почты. Он же является логином для входа на сайт. Если Вы выбрали привязку к новому адресу, то на него придет письмо с дальнейшими инструкциями для подтверждения действия.'")
        .confirm__info(v-if="form.checkConfirm && edited") Внимание! Вы выбрали привязку Вашего аккаунта к новому адресу электронной почты. На новый адрес будет отправлено письмо с дальнейшими указаниями для подтверждения этого действия.

      button.button.button_default.email-form__submit(:class="{'buttonSubmit_disabled': fields.email ? !fields.email.valid : true }" :disabled="fields.email ? !fields.email.valid : true" type="submit" value="Сохранить")
        span Сохранить
</template>

<script>
  import Tooltip from './Tooltip.vue';
  import { mapGetters, mapActions } from 'vuex';
  import Spinner from '@/components/Spinner';
  import { EMAIL_REGEXP } from '@/utils/constants';

  export default {
    components: { Tooltip, Spinner },
    props: {
      item: Object
    },
    data() {
      return {
        emailRegexp: EMAIL_REGEXP,
        form: {
          checkConfirm: false,
          email: ''
        },
        formTouched: false
      };
    },
    computed: {
      ...mapGetters({
        getList: 'emails/getList',
        isLoaded: 'emails/getLoaded'
      }),
      disablePoint() {
        const rex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
        return rex.test(this.newEmail);
      },
      edited() {
        return !(this.item &&
          this.item.is_main &&
          this.item.email === this.form.email &&
          this.item.is_main === this.form.checkConfirm);
      }
    },
    mounted() {
      if (this.item) {
        this.form.email = this.item.email;
        this.form.checkConfirm = this.item.is_main;
      }
      this.$validator.validate();
    },
    methods: {
      ...mapActions({
        addEmail: 'emails/addEmail',
        editEmail: 'emails/editEmail'
      }),
      onMailInput() {
        this.formTouched = true;
        this.$validator.validate();
      },
      onSubmit(e) {
        e.preventDefault();
        this.$validator
            .validate()
            .then(valid => {
              if (!valid) {
                return;
              }
              this.formTouched = false;
              const data = {
                id: this.item && this.item.id,
                email: this.form.email,
                is_main: this.form.checkConfirm ? 1 : 0
              };
              if (this.item) {
                this.editEmail(data);
              } else {
                this.addEmail(data)
                    .then(result => {
                      if (result) {
                        this.$router.push({ path: '/emails' });
                      }
                    });
              }
            });
      }
    }
  };
</script>

<style lang="scss">
  .email-form {
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
