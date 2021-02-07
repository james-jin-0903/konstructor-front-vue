<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-password__toolbar
        .action
    .page-password.container.page
      .loader(v-if="loaded")
        Spinner
      form.page-password__form
        .field.page-password__field
          .field__title Текущий пароль:
          .input(:class="{'input_error': errors.has('currentPass'),  'input_success': fields.currentPass ? fields.currentPass.valid : false}")
            input.input__input(
              type="password"
              v-validate="'required|min:8|one_symbol|custom_password|unique'"
              placeholder="Введите текущий пароль"
              name="currentPass"
              v-model='currentPass'
            )
            img.input__icnStatus(v-show="errors.has('currentPass')" src="../assets/images/icon_error.svg")
            img.input__icnStatus(v-show="fields.currentPass ? fields.currentPass.valid : false" src="../assets/images/icon_success.svg")
          .input__errorMsg(v-show="errors.has('currentPass')") {{ this.errors.first('currentPass') }}

        .field.page-password__field
          .field__title Новый пароль:
          .input(:class="{'input_error': errors.has('newPass'),  'input_success': fields.newPass ? fields.newPass.valid : false}")
            input.input__input(
              type="password"
              v-validate="'required|min:8|one_symbol|custom_password'"
              placeholder="Введите новый пароль"
              ref="newPass"
              name="newPass"
              v-model='newPass'
            )
            img.input__icnStatus(v-show="errors.has('newPass')" src="../assets/images/icon_error.svg")
            img.input__icnStatus(v-show="fields.newPass ? fields.newPass.valid : false" src="../assets/images/icon_success.svg")
            .page-password__tooltip
              Tooltip(:text="'Пароль должен иметь длину не менее 8 знаков и содержать минимум 1 букву, 1 цифру и 1 специальный символ'")
          .input__errorMsg(v-show="errors.has('newPass')") {{ this.errors.first('newPass') }}
        .field.page-password__field
          .field__title Новый пароль (повтор):
          .input(:class="{'input_error': errors.has('newPassRep'),  'input_success': fields.newPassRep ? fields.newPassRep.valid : false}")
            input.input__input(type="password"  v-validate="'required|confirmed:newPass'"  placeholder="Введите новый пароль" name="newPassRep" v-model='newPassRep')
            img.input__icnStatus(v-show="errors.has('newPassRep')" src="../assets/images/icon_error.svg")
            img.input__icnStatus(v-show="fields.newPassRep ? fields.newPassRep.valid : false" src="../assets/images/icon_success.svg")
          .input__errorMsg(v-show="errors.has('newPassRep')") {{ this.errors.first('newPassRep') }}
        button.button.button_default.page-password__submit(:disabled="!isDisableActive" type="button" @click="onSubmit")
          span Сохранить
</template>

<script>
  import { Validator } from 'vee-validate';
  import VeeValidate from 'vee-validate';
  import Tooltip from '../components/Tooltip.vue';
  import Breadcrumbs from '../components/Breadcrumbs.vue';
  import axios from 'axios';
  import { getCookie } from '@/utils/cookies';
  import { createAuthRequest } from '@/services/http.service';

  const emailsDB = ['password1@', '@password1', '@1password'];

  export default {
    name: 'PasswordPage',
    components: { Breadcrumbs, Tooltip },
    data() {
      return {
        breadcrumbs: {
          links: [
            { label: 'Настройки', href: '/settings' },
            { label: 'Аккаунт', href: '/account' }
          ],
          current: 'Пароль'
        },

        changed: false,
        loaded: false,
        item: {},
        currentPass: '',
        newPass: '',
        newPassRep: ''
      };
    },

    computed: {
      isFormDirty() {
        return Object.keys(this.fields).some(key => this.fields[key].dirty);
      },
      isFormValid() {
        return Object.keys(this.fields).every(key => {
          if (!this.fields[key].dirty && this.fields[key].valid) {
            return true;
          } else {
            return this.fields[key].valid;
          }
        });
      },
      isDisableActive() {
        return this.isFormDirty && this.isFormValid;
      }
    },
    mounted() {
      VeeValidate
        .Validator
        .extend('custom_password', {
          getMessage: () => {
            return 'Пароль должен содержать как минимум: 1 букву, 1 цифру и 1 специальный символ';
          },

          validate: value => {
            let strongRegex = new RegExp(
              /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}/g
            );
            return strongRegex.test(value);
          }
        });

      VeeValidate
        .Validator.extend('one_symbol', {
        getMessage: () => {
          return 'Пароль не содержит цифру';
        },

        validate: value => {
          let strongRegex = new RegExp(/(?=.*[0-9])/g);
          return strongRegex.test(value);
        }
      });

      const isUnique = value =>
        new Promise(resolve => {
          setTimeout(() => {
            if (emailsDB.indexOf(value) === -1) {
              return resolve({
                valid: false,
                data: {
                  message: 'Неправильный пароль'
                }
              });
            }

            return resolve({
              valid: true
            });
          }, 200);
        });

      Validator.extend('unique', {
        validate: isUnique,
        getMessage: (field, params, data) => data.message
      });
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        if (this.isFormDirty && this.isFormValid) {
          this.loaded = true;
          const data = { passwordOld: this.passwordOld, passwordNew: this.newPass };
          const url = 'api/v1/user/change-password';
          createAuthRequest('post', url, data)
            .then(res => {
              this.currentPass = '';
              this.newPass = '';
              this.newPassRep = '';
            })
            .finally(() => this.loaded = false);

        }
      }
    }
  };
</script>

<style lang="scss" scoped>
.page-password {
  &__form {
    width: 380px;
  }

  &__toolbar {
    justify-content: flex-end;
  }

  &__field {
    margin-top: 15px;
    position: relative;
  }

  &__tooltip {
    position: absolute;
    top: 11px;
    left: calc(100% + 10px);
  }

  &__submit {
    margin-top: 35px;
  }
}
</style>
