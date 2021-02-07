<template lang="pug">
  main.layoutMain__main.layoutMain__main_hovered.layoutMain--auth
    .container.container_centered.auth-container
      .recover.app__wrapper
        router-link(to="/")
          img.logo(src="~@/assets/images/auth/logo.png")

        h3.app__title {{$t('recover.title')}}
        .recover__form
          ValidationObserver(ref="form" v-slot="{ valid, validate }" tag="form" @submit.prevent="onSubmit")
            ValidationProvider(name="password" mode="aggressive" rules="required|min:8|haveChar|haveSymbol|haveNumber" v-slot="{ errors, valid }")
              .field.recover__field
                .field__title {{$t('fields.newPassword')}}
                .inputContainer(:class="{'inputContainer_error': errors[0],  'inputContainer_success': valid}")
                  input.inputContainer__input(type="password"  :placeholder="$t('fields.password_placeholder')" name='password'  v-model='password')
                  img.inputContainer__icnStatus(v-show="errors[0]" src="~@/assets/images/auth/icon_error.svg")
                  img.inputContainer__icnStatus(v-show="valid" src="~@/assets/images/auth/icon_success.svg")
                  .field__tooltip
                    Tooltip(text="Пароль должен иметь длину не менее 8 знаков и содержать минимум 1 букву, 1 цифру и 1 специальный символ")
                .inputContainer__errorMsg(v-show="errors[0]") {{ errors[0] }}

            .recover__groupBtns
              button.button.button_bind.recover__btn(type="submit" :disabled="!valid")
                span {{$t('recoverPass.enter')}}


        Footer


</template>

<script>
  import { ValidationProvider, ValidationObserver } from 'vee-validate';
  import { mapActions } from 'vuex';
  import Tooltip from '../../components/Tooltip.vue';
  import Footer from './Footer';

  export default {
    components: {
      Footer,
      ValidationProvider,
      ValidationObserver,
      Tooltip
    },
    props: ['token'],
    data() {
      return {
        password: ''
      };
    },
    created() {
      this.onCreate();
    },
    methods: {
      ...mapActions({
        checkToken: 'recover/checkToken',
        updatePass: 'recover/updatePass'
      }),
      async onCreate() {
        const res = await this.checkToken(this.$props.token);
        if (!res) {
          this.$router.push('/not_found');
        }
      },
      back() {
        this.$router.back();
      },
      async onSubmit() {
        const res = await this.$refs.form.validate();
        if (res) {
          await this.updatePass({
            token: this.$props.token,
            password: this.password
          });
          this.$router.push('/');
        }
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

    .inputContainer {
      position: relative;
    }
  }

  .field__tooltip {
    position: absolute;
    top: 50%;
    left: calc(100% + 10px);
    transform: translateY(-50%);
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
