<template lang="pug">
  main.layoutMain__main.layoutMain__main_hovered.layoutMain--auth
    .container.container_centered.auth-container
      .recover.app__wrapper(v-if="!complete")
        router-link(to="/")
          img.logo(src="~@/assets/images/auth/logo.png")

        h3.app__title {{$t('recover.title')}}
        .recover__form
          ValidationObserver(ref="form" v-slot="{ valid, validate }" tag="form" @submit.prevent="onSubmit")
            ValidationProvider(name="email" rules="required|email|uniqEmail" v-slot="{ errors, valid }")
              .field.recover__field
                .field__title {{$t('fields.email')}}
                .input(:class="{'input_error': errors[0],  'input_success': valid}")
                  input.input__input(type="text"  :placeholder="$t('fields.email_placeholder')" name='email'  v-model='email')
                  img.input__icn-status(v-show="errors[0]" src="~@/assets/images/auth/icon_error.svg")
                  img.input__icn-status(v-show="valid" src="~@/assets/images/auth/icon_success.svg")
                .input__error-msg(v-show="errors[0]") {{ errors[0] }}
            .recover__desc {{$t('recover.desc')}}
            .recover__groupBtns
              .button.recover__btn(@click="back")
                span {{$t('recover.back')}}
              button.button.button_bind.recover__btn(type="submit" :disabled="!valid")
                span {{$t('recover.enter')}}

          Socials
        Footer

      .recover.app__wrapper(v-else)
        router-link(to="/")
          img.logo(src="~@/assets/images/auth/logo.png")

        h3.app__title {{$t('recover.title')}}
        .recover__form.recover__form_complete
          .recover__desc {{$t('recoverComplete.desc')}}
          router-link.button.button_bind.recover__btn_complete(to="/")
            span {{$t('recoverComplete.enter')}}

</template>

<script>
  import axios from 'axios';
  import {
    ValidationProvider,
    ValidationObserver,
    Validator
  } from 'vee-validate';
  import { mapActions } from 'vuex';
  import { api } from '../../config';
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
        complete: false
      };
    },
    created() {
      this.emailValidation();
    },
    methods: {
      ...mapActions({
        checkEmail: 'signIn/checkEmail',
        startRecover: 'recover/startRecover'
      }),
      emailValidation() {
        Validator.extend('uniqEmail', {
          getMessage: () => 'Адрес не зарегистрирован',
          validate: async value => await this.checkEmail(value)
        });
      },
      back() {
        this.$router.back();
      },
      async onSubmit() {
        const res = await this.$refs.form.validate();
        if (!res) {
          return;
        }

        await this.startRecover(this.email);
        this.complete = true;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../scss/auth/shared';

  .recover__form {
    width: 380px;

    &_complete {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .recover__field {
    margin-bottom: 25px;
  }

  .recover__desc {
    text-align: center;
  }

  .recover__groupBtns {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 36px;
  }

  .recover__btn {
    width: 130px;
    margin: 0 10px;

    &_complete {
      margin-top: 35px;
    }
  }
</style>
