import { alpha, required, email, min } from 'vee-validate/dist/rules.esm';
import { Validator } from 'vee-validate';

// Install required rule and message.
Validator.extend('required', required);
Validator.extend('alpha', alpha);

// Install email rule and message.
Validator.extend('email', email);

// Install min rule and message.
Validator.extend('min', min);

export const addPasswordValidators = () => {
  Validator.extend('haveChar', {
    getMessage: () => 'Пароль должен содержать минимум 1 букву',
    validate: value => {
      let strongRegex = new RegExp(/(?=.*[a-zA-Zа-яёА-ЯЁ])/g);
      return strongRegex.test(value);
    }
  });

  Validator.extend('haveNumber', {
    getMessage: () => {
      return 'Пароль должен содержать минимум 1 цифру';
    },

    validate: value => {
      let strongRegex = new RegExp(/(?=.*[0-9])/g);
      return strongRegex.test(value);
    }
  });

  Validator.extend('haveSymbol', {
    getMessage: () => {
      return 'Пароль должен содержать минимум 1 специальный символ';
    },

    validate: value => {
      let strongRegex = new RegExp(/(?=.*[!@#$%^&*])/g);
      return strongRegex.test(value);
    }
  });
};

addPasswordValidators();
