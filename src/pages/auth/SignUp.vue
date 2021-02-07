<template lang="pug">
  main.layoutMain__main.layoutMain__main_hovered.layoutMain--auth
    .container.container_centered.auth-container
      .signUp.app__wrapper
        router-link(to="/")
          img.logo(src="~@/assets/images/auth/logo.png")

        h3.app__title {{$t('signUp.title')}}
        RingLoader(v-if="getIsFetch" :color="'#f6ae32'")
        .signUp__form(v-else)
          ValidationObserver( ref="form" v-slot="{ valid, validate }" tag="form" @submit.prevent="onSubmit")
            ValidationProvider(name="name" rules="required|alpha" v-slot="{ errors, valid }")
              .field.signUp__field
                .field__title {{$t('fields.name')}}
                .input(:class="{'input_error': errors[0],  'input_success': valid}")
                  input.input__input(type="text"  :placeholder="$t('fields.name_placeholder')" name='name'  v-model='name')
                  img.input__icn-status(v-show="errors[0]" src="~@/assets/images/auth/icon_error.svg")
                  img.input__icn-status(v-show="valid" src="~@/assets/images/auth/icon_success.svg")
                .input__error-msg(v-show="errors[0]") {{ errors[0] }}
            ValidationProvider(name="surname" rules="required|alpha" v-slot="{ errors, valid }")
              .field.signUp__field
                .field__title {{$t('fields.surname')}}
                .input(:class="{'input_error': errors[0],  'input_success': valid}")
                  input.input__input(type="text"  :placeholder="$t('fields.surname_placeholder')" name='surname'  v-model='surname')
                  img.input__icn-status(v-show="errors[0]" src="~@/assets/images/auth/icon_error.svg")
                  img.input__icn-status(v-show="valid" src="~@/assets/images/auth/icon_success.svg")
                .input__error-msg(v-show="errors[0]") {{ errors[0] }}
            ValidationProvider(name="email" rules="required|uniqEmail|email" v-slot="{ errors, valid }")
              .field.signUp__field
                .field__title {{$t('fields.email')}}
                .input(:class="{'input_error': errors[0],  'input_success': valid}")
                  input.input__input(type="text"  :placeholder="$t('fields.email_placeholder')" name='email'  v-model='email')
                  img.input__icn-status(v-show="errors[0]" src="~@/assets/images/auth/icon_error.svg")
                  img.input__icn-status(v-show="valid" src="~@/assets/images/auth/icon_success.svg")
                .input__error-msg(v-show="errors[0]") {{ errors[0] }}
            ValidationProvider(name="password" ref="password" rules="required|min:8|haveChar|haveNumber" v-slot="{ errors, valid }")
              .field
                .field__title {{$t('fields.password')}}
                .input(:class="{'input_error': errors[0],  'input_success': valid}")
                  input.input__input(type="password"  :placeholder="$t('fields.password_placeholder')" name='password'  v-model='password')
                  img.input__icn-status(v-show="errors[0]" src="~@/assets/images/auth/icon_error.svg")
                  img.input__icn-status(v-show="valid" src="~@/assets/images/auth/icon_success.svg")
                  .field__tooltip
                    Tooltip(:text="$t('signUp.password')")
                .input__error-msg(v-show="errors[0]") {{ errors[0] }}

            .signUp__groupBtns
              .button.signUp__btn(@click="back")
                span {{$t('signUp.back')}}
              button.button.button_next.signUp__btn(type="submit" :disabled="!valid")
                span {{$t('signUp.enter')}}
          Socials
        Footer

</template>

<script>
  import { ValidationProvider, ValidationObserver, Validator } from 'vee-validate';
  import { mapActions, mapGetters } from 'vuex';
  import { RingLoader } from 'vue-spinners-css';
  import Tooltip from '../../components/Tooltip.vue';
  import Socials from './Socials';
  import Footer from './Footer';
  import { addPasswordValidators } from '../../vee-validate';

  export default {
    components: {
      Footer,
      Socials,
      ValidationProvider,
      ValidationObserver,
      Tooltip,
      RingLoader
    },
    data() {
      return {
        name: '',
        surname: '',
        email: '',
        password: '',
      };
    },
    computed: {
      ...mapGetters({
        getMain: 'signUp/getMain',
        getIsFetch: 'signUp/getIsFetch'
      })
    },
    created() {
      this.emailValidation();
      const { name, surname, email, password } = this.getMain;
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.password = password;
    },

    methods: {
      ...mapActions({
        checkEmail: 'signIn/checkEmail',
        firstPart: 'signUp/firstPart'
      }),
      back() {
        this.$router.back();
      },
      emailValidation() {
        addPasswordValidators();
        Validator.extend('uniqEmail', {
          getMessage: () => 'Адрес уже зарегистрирован',
          validate: async value => {
            const res = await this.checkEmail(value);
            return !res;
          }
        });
      },
      async onSubmit() {
        const res = await this.$refs.form.validate();

        if (res) {
          await this.firstPart({
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: this.password
          });
          // this.$router.push(route.signUpPath);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../scss/auth/shared';

  .signUp__form {
    width: 360px;
  }

  .signUp__field {
    margin-bottom: 16px;
  }

  .signUp__link {
    margin-top: 10px;
    display: inline-block;
    @include font(1, 12, r, 16px);
  }

  .signUp__groupBtns {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 36px;
  }

  .signUp__btn {
    width: 130px;
    margin: 0 10px;
  }
</style>
