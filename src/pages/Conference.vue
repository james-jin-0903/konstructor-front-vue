<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
    .conference-settings.container.page
      form.conference-settings__form.pageContent
        MediaLoader(
          label='Вы можете добавить изображение'
          @change="handleImageChange"
          @remove="handleImageDelete"
        ).conference-settings__uploadImg.media-loader_style-1

        .field.conference-settings__field
          .field__title Название:
          .input(:class="{'input_error': errors.has('name'),  'input_success': fields.name ? (fields.name.touched && fields.name.valid) : false}")
            input.input__input(
              type="text"
              v-validate="'required'"
              placeholder="Введите название конференции"
              name="name"
            )
            img.input__icnStatus(v-show="errors.has('name')" src="../assets/images/icon_error.svg")
            img.input__icnStatus(v-show="fields.name && fields.name.touched && fields.name.valid" src="../assets/images/icon_success.svg")
          .input__errorMsg(v-show="errors.has('name')") {{ this.errors.first('name') }}

      .table-component
        .table-component__header
          .table-component__title Участники
          .table-component__counter 5 пользователей
          img.table-component__add(src='../assets/images/icon_plus.svg')

        .table-component__table
          .table-component__thead(v-if="true")
            .table-component__col
              .sort-link.sort-link_active Пользователь
                .sort-link__icon
                  <svg width="10" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#282828" d="M0 0h10v12H0z"/><g clip-path="url(#clip0)"><path fill="#fff" d="M-201-207h1360v700H-201z"/><mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="10" height="12"><path d="M4.605.375C4.605.168 4.782 0 5 0c.218 0 .395.168.395.375v11.25A.385.385 0 0 1 5 12a.385.385 0 0 1-.395-.375V.375z" fill="#81A6C3"/><path d="M9.326 6.989a.41.41 0 0 1 .558 0 .362.362 0 0 1 0 .53l-4.47 4.242a.41.41 0 0 1-.558 0 .362.362 0 0 1 0-.53l4.47-4.242z" fill="#81A6C3"/><path d="M5.144 11.231a.362.362 0 0 1 0 .53.41.41 0 0 1-.559 0L.115 7.52a.362.362 0 0 1 0-.53.41.41 0 0 1 .56 0l4.469 4.242z" fill="#81A6C3"/></mask><g mask="url(#a)"><path fill="currentColor" d="M-1 0h12v12H-1z"/></g></g><defs><clipPath id="clip0"><path fill="#fff" d="M-201-207h1360v700H-201z"/></clipPath></defs></svg>

            .table-component__col
              .sort-link Роль в конференции
                .sort-link__icon
                  <svg width="10" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#282828" d="M0 0h10v12H0z"/><g clip-path="url(#clip0)"><path fill="#fff" d="M-201-207h1360v700H-201z"/><mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="10" height="12"><path d="M4.605.375C4.605.168 4.782 0 5 0c.218 0 .395.168.395.375v11.25A.385.385 0 0 1 5 12a.385.385 0 0 1-.395-.375V.375z" fill="#81A6C3"/><path d="M9.326 6.989a.41.41 0 0 1 .558 0 .362.362 0 0 1 0 .53l-4.47 4.242a.41.41 0 0 1-.558 0 .362.362 0 0 1 0-.53l4.47-4.242z" fill="#81A6C3"/><path d="M5.144 11.231a.362.362 0 0 1 0 .53.41.41 0 0 1-.559 0L.115 7.52a.362.362 0 0 1 0-.53.41.41 0 0 1 .56 0l4.469 4.242z" fill="#81A6C3"/></mask><g mask="url(#a)"><path fill="currentColor" d="M-1 0h12v12H-1z"/></g></g><defs><clipPath id="clip0"><path fill="#fff" d="M-201-207h1360v700H-201z"/></clipPath></defs></svg>

          .table-component__tbody
            .table-component__row
              .table-component__text.table-component__row-item.conference-settings__name
                .user-name
                  Avatar(fill-level="20" initials="ИП").user-name__avatar
                  .user-name__text Иван Петров
              .table-component__row-item.conference-settings__status Создатель

            .table-component__row
              .table-component__text.table-component__row-item.conference-settings__name
                .user-name
                  Avatar(fill-level="20" initials="АА").user-name__avatar
                  .user-name__text Афанасий Афанасьев
              .table-component__row-item.conference-settings__status Администратор

            .table-component__row
              .table-component__text.table-component__row-item.conference-settings__name
                .user-name
                  Avatar(fill-level="20" initials="ББ").user-name__avatar
                  .user-name__text Борис Борисов
              .table-component__row-item.conference-settings__status Участник


            .table-component__row
              .table-component__text.table-component__row-item.conference-settings__name
                .user-name
                  Avatar(fill-level="20" initials="КК").user-name__avatar
                  .user-name__text Константин Константинопольский
              .table-component__row-item.conference-settings__status Участник


            .table-component__row
              .table-component__text.table-component__row-item.conference-settings__name
                .user-name
                  Avatar(fill-level="20" initials="ЕЕ").user-name__avatar
                  .user-name__text Елена Еленова
              .table-component__row-item.conference-settings__status Участник


            .table-component__empty(v-if="false")
              span Вы можете добавить участника, нажав
              img(src="../assets/images/icon_plus.svg")
              span возле заголовка таблицы
            transition( name="fade")
              .table-component__tooltip(v-if="tooltipToggle" ref="tooltip" v-click-outside="closeTooltip")
                .table-component__tooltipItem(@click="onEditEmail()")
                  img.table-component__tooltipIcn.table-component__tooltipIcn_edit(src='../assets/images/icon_edit.png')
                  .table-component__tooltipText Редактировать
                .table-component__tooltipItem(@click="onRemoveEmail()")
                  img.iconDelete.table-component__tooltipIcn(src='../assets/images/icon_remove.svg')
                  .table-component__tooltipText Удалить


        button.button.button_default.table-component__submit
          span Сохранить

</template>

<script>
  import images from '../components/images';
  import { mapGetters } from 'vuex';
  import Spinner from '@/components/Spinner';
  import Breadcrumbs from '@/components/Breadcrumbs.vue';
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
  import Avatar from '@/components/Avatar';

  const PAGE_NAME = 'Настройки конференции';
  export default {
    name: 'Chat',
    components: {
      Avatar,
      Breadcrumbs,
      Spinner,
      PerfectScrollbar
    },
    data() {
      return {
        images,
        userImage: null,
        socialsLoaded: false,
        breadcrumbs: {
          links: [{ label: 'Чат', href: '/chat' }],
          current: PAGE_NAME
        }
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      changeChat({ name, value }) {

      },
      handleToolClick(toolType) {
      },
      handleImageChange() {
      },
      handleImageDelete() {
      }
    }
  };
</script>

<style lang="scss" scoped>
  .conference-settings {
    &__form {
      width: 380px;
      margin-bottom: 23px;
    }

    &__field {
      margin-top: 15px;
    }

    &__status {
      color: #666666;
    }

    .table-component {
      &__title {
        font-size: 16px;
        margin-right: 20px;
      }

      &__counter {
        margin-right: 20px;
      }

      &__table {
        margin-top: 0;
      }

      &__thead {
        margin: 0;
        padding: 12px 0;
      }

      &__row-item {
        width: 48%;
        box-sizing: border-box;
        padding-right: 10px;
      }

      &__row {
        padding-top: 0;
        padding-bottom: 0;
        min-height: 40px;
      }

      &__col {
        width: 48%;
      }

      &__submit {
        margin-top: 40px;
      }
    }
  }
</style>
