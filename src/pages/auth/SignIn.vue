<template lang="pug">
  main.layoutMain__main.layoutMain__main_hovered.layoutMain--auth
    .container.container_centered.auth-container
      .signIn.app__wrapper
        router-link(to="/")
          img.logo(src="~@/assets/images/auth/logo.png")

        h3.app__title.page-subitle {{$t('signIn.title')}}
        .signIn__form
          ValidationObserver(ref="form" v-slot="{ valid, validate }" tag="form" @submit.prevent="onSubmit")
            ValidationProvider(name="email" rules="required|email|uniqEmail" v-slot="{ errors, valid }")
              .field.signIn__field
                .field__title.field__title--middle {{$t('fields.email')}}
                .input(:class="{'input_error': errors[0],  'input_success': valid}")
                  input.input__input(type="text"  :placeholder="$t('fields.email_placeholder')" name='email'  v-model='email')
                  img.input__icn-status(v-show="errors[0]" src="~@/assets/images/auth/icon_error.svg")
                  img.input__icn-status(v-show="valid" src="~@/assets/images/auth/icon_success.svg")
                .input__error-msg(v-show="errors[0]") {{ errors[0] }}

            ValidationProvider(name="password" ref="password" rules="required" v-slot="{ errors, valid }")
              .field
                .field__title.field__title--middle {{$t('fields.password')}}
                .input(:class="{'input_error': errors[0],  'input_success': valid}")
                  input.input__input(type="password"  :placeholder="$t('fields.password_placeholder')" name='password'  v-model='password')
                  img.input__icn-status(v-show="errors[0]" src="~@/assets/images/auth/icon_error.svg")
                  img.input__icn-status(v-show="valid" src="~@/assets/images/auth/icon_success.svg")
                .input__error-msg(v-show="errors[0]") {{ errors[0] }}

            router-link.signIn__link.link(to="/recover") {{$t('signIn.recover')}}

            .signIn__groupBtns
              .button.signUpPath__btn(@click="back")
                span {{$t('signUpPath.back')}}
              button(type="submit" :disabled="!valid || getIsFetch").button.button_bind.signIn__btn
                span {{$t('signIn.enter')}}

          Socials
        Footer

</template>

<script>
  import {
    ValidationProvider,
    ValidationObserver,
    Validator
  } from 'vee-validate';
  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import Footer from './Footer';
  import Socials from './Socials';
  export default {
    components: {
      Socials,
      Footer,
      ValidationProvider,
      ValidationObserver
    },
    data() {
      return {
        email: '',
        password: ''
      };
    },
    computed: {
      ...mapGetters({
        getRef: 'global/getRef',
        getIsFetch: 'signIn/getIsFetch'
      })
    },
    created() {
      this.emailValidation();
    },

    methods: {
      ...mapActions({
        checkEmail: 'signIn/checkEmail',
        auth: 'signIn/auth',
        setCookie: 'global/setCookie'
      }),
      ...mapMutations({
        setIsFetch: 'signIn/SET_ISFETCH'
      }),
      ...mapGetters({
        currentUser: 'user/getUser',
        isUserLoaded: 'user/getUserLoaded'
      }),
      back() {
        this.$router.back();
      },
      emailValidation() {
        Validator.extend('uniqEmail', {
          getMessage: () => {
            return 'Адрес не зарегистрирован';
          },

          validate: async value => {
            const res = await this.checkEmail(value);
            return res;
          }
        });

        Validator.extend('checkPass', {
          getMessage: () => {
            return 'Неправильный пароль';
          },

          validate: async value => {
            const res = await this.auth({
              type: 'byEmail',
              email: this.email,
              password: value
            });
            return res;
          }
        });
      },
      async onSubmit() {
        const v = new Validator();
        this.setIsFetch(true);
        const res = await this.$refs.form.validate();
        if (!res) {
          this.setIsFetch(false);
          return;
        }
        const pass = await v.verify(this.password, 'checkPass', {
          name: 'password'
        });
        if (!pass.valid) {
          this.$refs.password.applyResult({
            errors: [...pass.errors],
            valid: false
          });
        }
        this.setIsFetch(false);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../scss/auth/shared';
  @import '../../scss/components/socials';

  .signIn__form {
    width: 360px;
  }

  .signIn__field {
    margin-bottom: 16px;
  }

  .signIn__link {
    margin-top: 10px;
    display: inline-block;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    text-transform: unset;
    letter-spacing: 0;
  }

  .signIn__groupBtns {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 36px;
  }

  .signIn__btn {
    width: 130px;
    margin: 0 10px;
  }
</style>
