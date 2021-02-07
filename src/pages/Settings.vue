<template lang="pug">
  div(v-if="currentUser")
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar
        .mode
          Select(:small="modeSelect.small", :icon="modeSelect.icon", :text="modeSelect.text", :options="modeSelect.options")
      NavigationTabs(current="Основные" :links="links")

    .page-settings.container.page
      .loader(v-if="isUserLoaded")
        Spinner
      form(action="/").page-settings__form.page-content
        MediaLoader(
          label='Вы можете добавить свое фото'
          tooltip='Ваше настоящее фото позволит повысить доверие пользователей к Вашему профилю.'
          @change="handleImageChange"
          @remove="handleImageDelete"
        ).page-settings__upload-img
        MediaLoader(
          label='Вы можете добавить короткое видео о себе'
          tooltip='Ваше видео позволит повысить доверие пользователей к Вашему профилю.'
          type='video'
          @change="handleVideoChange"
          @remove="handleVideoDelete"
        ).page-settings__upload-img

        .field.page-settings__field
          .field__title Имя:
          .input(:class="{'input_error': errors.has('first_name'),  'input_success': fields.first_name ? (fields.first_name.touched && fields.first_name.valid) : false}")
            input.input__input(
              type="text"
              v-model='form.first_name'
              v-validate="'required'"
              placeholder="Введите Ваше имя"
              name="first_name"
              @blur="changeValue"
            )
            img.input__icn-status(v-show="errors.has('first_name')" src="../assets/images/icon_error.svg")
            img.input__icn-status(v-show="fields.first_name && fields.first_name.touched && fields.first_name.valid" src="../assets/images/icon_success.svg")
          .input__error-msg(v-show="errors.has('first_name')") {{ this.errors.first('first_name') }}

        .field.page-settings__field
          .field__title Фамилия:
          .input(:class="{'input_error': errors.has('last_name'),  'input_success': fields.last_name ? (fields.last_name.touched && fields.last_name.valid) : false}")
            input.input__input(
              type="text"
              v-model='form.last_name'
              v-validate="'required'"
              placeholder="Введите Вашу фамилию"
              name="last_name"
              @blur="changeValue"
            )
            img.input__icn-status(v-show="errors.has('last_name')" src="../assets/images/icon_error.svg")
            img.input__icn-status(v-show="fields.last_name ? (fields.last_name.touched && fields.last_name.valid) : false" src="../assets/images/icon_success.svg")
          .input__error-msg(v-show="errors.has('last_name')") {{ this.errors.first('last_name') }}

        .field.page-settings__field
          .field__title Отчество:
            .field__info(rel="Поле не обязательно для заполнения") (опционально)
          input(
            type="text"
            placeholder="Введите Ваше отчество"
            name="patronymic"
            v-validate=""
            v-model="form.patronymic"
            @change="changeValue"
          ).field__input

        .field.page-settings__field
          .field__title Пол:
            .field__info(rel="Поле не обязательно для заполнения") (опционально)
          Select(
            @change="changeSelect"
            :small="genderSelect.small"
            :text="genderSelect.text"
            :placeholder="genderSelect.placeholder"
            :options="genderSelect.options"
            :defaultValue="form.gender"
            v-validate=""
            name="gender"
          )
        .field.page-settings__field
          .field__title Дата рождения:
            .field__info(rel="Поле не обязательно для заполнения") (опционально)
          .field__wrap
            TextInput(
              @input="dateChange"
              placeholder="Укажите Вашу дату рождения"
              :validate="false"
              readonly
              isDate
              name="date_of_birth"
              v-validate=""
              :disabled-date="birthRange"
              :maxDate="new Date(birthLimit())"
              :value="birthDate"
              :defaultDate="defaultDate"
            )

        button.page-settings__submit.button.button_default(type="submit" @click="onSubmit" :disabled="!isDisableActive")
          span Сохранить

</template>

<script>
import map from '../utils/map';
import Breadcrumbs from '../components/Breadcrumbs';
import Select from '../components/forms/Select';
import Tooltip from '../components/Tooltip';
import TextInput from '../components/forms/TextInput';
import images from '../components/images';
import NavigationTabs from '../components/NavigationTabs';
import Spinner from '../components/Spinner';
import { mapActions, mapState, mapGetters } from 'vuex';
import { format } from 'date-fns';
import MediaLoader from '@/components/MediaLoader';

export default {
  name: 'SettingsPage',
  computed: {
    ...mapState(['user']),
    ...mapGetters({
      currentUser: 'user/getUser',
      isUserLoaded: 'user/getUserLoaded'
    }),
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
  components: {
    MediaLoader,
    Breadcrumbs,
    Select,
    Tooltip,
    TextInput,
    NavigationTabs,
    Spinner
  },
  data() {
    return {
      images,
      form: {},
      breadcrumbs: {
        links: [],
        current: 'Настройки'
      },
      modeSelect: {
        small: true,
        icon: images.icons.menu,
        text: 'Текст',
        options: [
          {
            icon: images.icons.earth,
            text: 'Карта',
            class: 'page-settings__selectMap',
            val: 'Карта'
          }
        ]
      },
      genderSelect: {
        small: false,
        text: 'Укажите Ваш пол',
        placeholder: true,
        options: [
          {
            text: 'Не выбрано',
            val: null
          },
          {
            text: 'Мужской',
            val: 'man'
          },
          {
            text: 'Женский',
            val: 'woman'
          }
        ]
      },
      disableSubmit: true,
      userImage: null,
      userVideo: null,
      birthDate: '',
      defaultDate: null,
      formTouched: false,
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
  mounted() {
    map();
    this.form = {
      ...this.currentUser
    };
    const userBirthday = this.form.date_of_birth
      ? new Date(this.form.date_of_birth)
      : null;
    const limit = this.birthLimit();
    if (userBirthday) {
      if (userBirthday > limit) {
        this.defaultDate = new Date(limit);
      } else {
        this.birthDate = format(userBirthday, 'dd-MM-yyyy');
        this.defaultDate = new Date(userBirthday);
      }
    } else {
      this.defaultDate = new Date(limit);
    }
  },
  watch: {
    currentUser: function(newVal) {
      if (newVal) {
        this.form = {
          ...this.form,
          ...newVal
        };
      }
    }
  },
  methods: {
    ...mapActions({
      updateUser: 'user/updateUser',
      updateImage: 'user/updateImage',
      deleteImage: 'user/deleteImage',
      updateVideo: 'user/updateVideo',
      deleteVideo: 'user/deleteVideo'
    }),
    changeSelect(event) {
      this.fields[event.name].dirty = true;
      this.form[event.name] = event.value;
      this.$validator.validate();
    },
    changeValue() {
      this.$validator.validate();
    },
    dateChange(date) {
      this.form.date_of_birth = date.value;
      this.changeValue();
    },
    onSubmit(e) {
      e.preventDefault();
      e.stopPropagation();
      this.$validator.reset();
      this.updateUser(this.form);
    },
    handleImageChange(event) {
      this.updateImage(event.formData);
    },
    handleImageDelete() {
      this.deleteImage();
    },
    handleVideoChange(event) {
      this.updateVideo(event.formData);
    },
    handleVideoDelete() {
      this.deleteVideo();
    },
    birthLimit() {
      const yearLimit = 14;
      const today = new Date();
      const currentYear = today.getFullYear();
      return new Date().setFullYear(currentYear - yearLimit);
    },
    birthRange(date) {
      const limit = this.birthLimit();
      return date > limit;
    }
  }
};
</script>
<style lang="scss" scoped>
.page-settings {
  padding-bottom: 70px;

  &__form {
    width: 380px;
  }

  &__field {
    margin-top: 15px;
  }

  &__submit {
    margin-top: 34px;
  }
  &__upload-img + &__upload-img {
    margin-top: 10px;
  }
}

.field-link {
  display: flex;
  align-items: center;
  margin-top: 28px;

  &_first {
    margin-top: 34px;
  }

  &__link {
    display: block;
    @include font(18, b, 25px);
    margin-right: 9px;

    &:hover {
      color: $color_hover;
    }
  }
}
</style>
