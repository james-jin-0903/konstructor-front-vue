<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-account__toolbar
        router-link(to="/password").button.button_neutral.button_small.page-account__password Сменить пароль
        .action
      NavigationTabs(current="Аккаунт" :links="links")

    .page-account.container.page
      .loader(v-if="isLoaded")
        Spinner
      form.page-account__form
        .field.page-account__field
          .field__title Страна:
          input(type="text" disabled value="").field__input
        .field.page-account__field
          .field__title Город:
          input(type="text" disabled value="").field__input
        .field.page-account__field
          .field__title Имя пользователя:
          input(type="text" disabled placeholder="Введите Ваше имя" :value="getName()").field__input

        .field.page-account__field
          .field__title Язык интерфейса:
          Select(
            @change="onLangChange"
            :small="select.small",
            :text="select.text",
            :val="select.val",
            :defaultValue="select.val"
            :options="select.options"
          )

        button.page-account__submit.button.button_default(
          @click="onSubmit"
          type="button",
          :disabled="submitDisabled"
        )
          span Сохранить


</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Spinner from '@/components/Spinner';
  import Breadcrumbs from '@/components/Breadcrumbs';
  import Select from '@/components/forms/Select';
  import NavigationTabs from '@/components/NavigationTabs';

  export default {
    name: 'AccountPage',
    components: { Breadcrumbs, Select, NavigationTabs, Spinner },
    data() {
      return {
        lang: '',
        form: { current_lang_slug: '', nickname: '' },
        breadcrumbs: {
          links: [{ label: 'Настройки', href: '/settings' }],
          current: 'Аккаунт'
        },
        formTouched: false,
        select: {},
              links: [
        {
          label: 'Основные',
          href: '/settings'
        },
        {
          label: 'Аккаунт',
          href: '/account'
        },
        {
          label: 'Навыки',
          href: '/skills'
        },
        {
          label: 'Интересы',
          href: '/interest'
        },
        {
          label: 'Соцсети',
          href: '/social'
        },
        {
          label: 'Электронная почта',
          href: '/emails'
        },
        {
          label: 'Коммуникации',
          href: '/communications'
        },
        {
          label: 'Адреса',
          href: '/address'
        },
        {
          label: 'Счета',
          href: '/payment'
        }
      ]
      };
    },
    async created() {
      await this.fetchAccount();
      await this.fetchLocales();
      const selectedLocale = this.locales.find(locale => locale.slug === this.account.current_lang_slug);
      this.form = { ...this.account };
      this.select = {
        small: false,
        text: selectedLocale && selectedLocale.name || '',
        val: selectedLocale && selectedLocale.slug || '',
        options: this.locales.map(locale => {
          return {
            text: locale.name,
            val: locale.slug
          };
        })
      };
    },
    computed: {
      ...mapGetters({
        account: 'account/getAccount',
        locales: 'account/getLocales',
        isLoaded: 'account/getLoaded'
      }),
      formValid() {
        return this.form.current_lang_slug;
        // TODO set line below when backend was ready
        //  return this.form.current_lang_slug && this.form.nickname;
      },
      submitDisabled() {
        return !this.formValid || !this.formTouched;
      }
    },
    methods: {
      ...mapActions({
        fetchAccount: 'account/fetch',
        fetchLocales: 'account/fetchLocales',
        updateAccount: 'account/updateAccount'
      }),
      getName() {
        return this.form.nickname;
      },
      onSubmit() {
        if (this.formValid) {
          this.updateAccount({ current_lang_slug: this.form.current_lang_slug });
          this.formTouched = false;
        }
      },
      onLangChange(event) {
        this.form = {
          ...this.form,
          current_lang_slug: event.value
        };
        this.formTouched = true;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page-account {
    &__form {
      width: 380px;
    }

    &__toolbar {
      justify-content: flex-end;
    }

    &__password {
      margin-right: 10px;
      text-decoration: none;
      &:hover {
        text-decoration: none;
      }
    }

    &__field {
      margin-top: 15px;   
    }

    &__submit {
      margin-top: 35px;
    }
  }

</style>
