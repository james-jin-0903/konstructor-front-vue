<template lang="pug">
  modal(
    :name="modalName"
    :pivotY="0.1"
    :classes="['popup']"
    width="600px"
    height="auto"
  )
    .popup__close-btn(@click="$modal.hide(modalName)"): CloseIcon
    .popup__body.access-settings-popup
      .popup__title.access-settings-popup__title Настройки доступа
      InputField(
        :icon-left="icons.search_blue"
        placeholder="Введите имя пользователя"
      ).access-settings-popup__search-field

      PerfectScrollbar
        .access-settings-popup__contact-list
          .access-settings-popup__contact(
            v-for="(contact, i) in contacts"
            :key="`contact${i}`"
          )
            Checkbox(composable)
              template(#content)
                Avatar(:name="contact.name" :initials="contact.initials")
            Select(
              :options="contact.accessOptions"
              :defaultValue="contact.access"
            )

      .access-settings-popup__setting-item.access-settings-popup__link-setting
        .access-settings-popup__setting-title
          Checkbox(text="Доступ по ссылке" v-model="accessByLink").access-settings-popup__checkbox
          Tooltip(text="Подсказка о доступе по ссылке")
        .access-settings-popup__setting-inputs(v-if="accessByLink")
          InputField(v-model="link").access-settings-popup__setting-input.grow
          Select(
            :small="linkSelectOptions.small",
            :text="linkSelectOptions.text"
            :options="linkSelectOptions.options"
            :defaultValue="linkSelectOptions.defaultValue"
          )

      template(v-if="isAdvancedSettingsOpened")
        .access-settings-popup__advanced-settings
          .access-settings-popup__setting-item.access-settings-popup__time-limit
            .access-settings-popup__setting-title
              Checkbox(text="Ограничение по времени" v-model="timeLimitation").access-settings-popup__checkbox
              Tooltip(text="Подсказка об ограничении по времени")
            .access-settings-popup__setting-inputs(v-if="timeLimitation")
              TextInput(
                placeholder="Все время"
                :validate="false"
                :range="true"
                :time="true"
                :value="filterDate"
                name="date_of_birth"
                :disabled-date="todayDate"
                :max-date="maxDate"
                isDate
                @input="dateChange"
              ).access-settings-popup__setting-input.grow
          .access-settings-popup__setting-item
            .access-settings-popup__setting-title
              Checkbox(text="Запрет на копирование, скачивание и распечатывание файлов" v-model="isCopyingForbidden").access-settings-popup__checkbox
              Tooltip(text="Подсказка о запрете на копирование")
          .access-settings-popup__setting-item
            .access-settings-popup__setting-title
              Checkbox(text="Запрет на изменение настроек доступа" v-model="isEditingForbidden").access-settings-popup__checkbox
              Tooltip(text="Подсказка о настройках доступа")



          span.link.access-settings-popup__expand-btn(@click="isAdvancedSettingsOpened = false")
            span Скрыть дополнительные настройки
            img(src="@/assets/images/icon_arrow-up-blue.svg" width="9" height="6")
      template(v-else)
        span.link.access-settings-popup__expand-btn(@click="isAdvancedSettingsOpened = true")
          span Показать дополнительные настройки
          img(src="@/assets/images/icon_arrow-up-blue.svg" width="9" height="6").down

      .access-settings-popup__actions
        button(type="button").button.button_neutral.access-settings-popup__action Отменить
        button(type="button").button.button_default.access-settings-popup__action: span Поделиться

      .access-settings-popup__info
        span
          | Пользователя еще нет на Konstruktor? Вы можете
          a(href="#").link  приглаить его по электронной почте!
</template>

<script>
  import CloseIcon from '@/components/icons/CloseIcon';
  import InputField from '@/components/forms/InputField';
  import images from '@/components/images';
  import Checkbox from '@/components/forms/Checkbox';
  import Avatar from '@/components/Avatar';
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
  import popupList from './popups';
  import Select from '@/components/forms/Select';
  import Tooltip from '@/components/Tooltip';
  import TextInput from '@/components/forms/TextInput';

  const MODAL_NAME = popupList.ACCESS_SETTINGS;

  export default {
    name: 'AccessSettingsPopup',
    components: {
      TextInput,
      Tooltip,
      Select,
      Avatar,
      Checkbox,
      InputField,
      CloseIcon,
      PerfectScrollbar
    },
    data() {
      return {
        maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 30)),
        todayDate(date) {
          const limit = this.maxDate;
          return date > limit;
        },
        defaultDate: null,
        filterDate: null,

        icons: images.icons,
        modalName: MODAL_NAME,
        contacts: [
          {
            name: 'Артем Артемов',
            initials: 'AA',
            access: 'Только просмотр',
            accessOptions: [
              {
                text: 'Только просмотр',
                val: 'Только просмотр'
              },
              {
                text: 'Просмотр и редактирование',
                val: 'Просмотр и редактирование'
              }
            ]
          },
          {
            name: 'Борис Борисов',
            initials: 'ББ',
            access: 'Только просмотр',
            accessOptions: [
              {
                text: 'Только просмотр',
                val: 'Только просмотр'
              },
              {
                text: 'Просмотр и редактирование',
                val: 'Просмотр и редактирование'
              }
            ]
          },
          {
            name: 'Владимир Владимирский',
            initials: 'ВВ',
            access: 'Только просмотр',
            accessOptions: [
              {
                text: 'Только просмотр',
                val: 'Только просмотр'
              },
              {
                text: 'Просмотр и редактирование',
                val: 'Просмотр и редактирование'
              }
            ]
          }
        ],
        isAdvancedSettingsOpened: false,

        accessByLink: false,
        link: 'konstruktor.com/files/hsudHjhsd8KKnnd',
        linkSelectOptions: {
          text: 'Только просмотр',
          defaultValue: 'Только просмотр',
          options: [
            {
              text: 'Только просмотр',
              val: 'Только просмотр'
            }
          ]
        },
        timeLimitation: false,
        timeLimitationValue: null,
        isCopyingForbidden: false,
        isEditingForbidden: false,
      }
    },
    methods: {
      dateChange(date) {
        this.filterDate = date.value;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .access-settings-popup {
    &__title {
      margin-bottom: 30px;
    }
    &__search-field {
      margin-bottom: 25px;
    }
    &__contact-list {
      max-height: 190px;
      margin-bottom: 35px;
    }
    &__contact {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 20px;
    }
    &__setting-title {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    &__setting-inputs {
      display: flex;
    }
    &__setting-input {
      margin-right: 10px;
      &.grow {
        flex-grow: 1;
      }
    }
    &__link-setting {
      margin-bottom: 20px;
    }

    &__time-limit {
      margin-bottom: 10px;
    }
    &__advanced-settings {
      margin-bottom: 20px;
    }
    &__expand-btn {
      display: flex;
      align-items: center;
      cursor: pointer;
      img {
        margin-left: 10px;
        &.down {
          transform: rotateX(180deg);
        }
      }
    }
    &__checkbox {
      margin-right: 10px;
    }
    &__actions {
      display: flex;
      margin: 30px 0;
    }
    &__action {
      margin-right: 10px;
    }
  }
</style>