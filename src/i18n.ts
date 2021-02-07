import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ru from './lang/ru.json';
import vee_ru from './lang/vee_ru.json';
import vee_en from 'vee-validate/dist/locale/en.js';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'ru',
  messages: {
    ru: {
      ...ru,
      validation: vee_ru.messages
    },
    en: {
      fields: {
        email: 'E-mail',
        password: 'Password'
      },
      validation: vee_en.messages
    }
  }
});

export { i18n };
