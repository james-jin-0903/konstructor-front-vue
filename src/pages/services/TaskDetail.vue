<template lang="pug">
  .detail-page
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.detail-page__toolbar
        .toolbar__main
          a(href="#").toolbar__item
            img(src="../../assets/images/icon_earth.svg")
          a(href="#" title="Пожаловаться").toolbar__item.detail-page__toolbar-item
            WarningIcon(icon-color="#81A6C3" icon-name="WarningIcon" title="Пожаловаться")

        .toolbar__aside
          .toolbar__flower
            ToolsDropdown(:tools="flowerTools" :placeOnLeft="true").tools-dropdown_flower

      .header-object-page.detail-page__header
        .header-object-page__left
          .header-object-page__creation-date Создана 15 ноября 2017, 15:00
          .header-object-page__info для
          Avatar(initials="K" name="Konstructor")
        .header-object-page__right
          .header-object-page__actions
            .header-object-page__action
              img(src="@/assets/images/icon_star-blue.svg")
              | 999K
            .header-object-page__action
              img(src="@/assets/images/icon_eye.svg")
              | 999K
            .header-object-page__action: img(src="@/assets/images/icon_crown.svg")
            .header-object-page__action: img(src="@/assets/images/icon_share.svg")
            .header-object-page__action: img(src="@/assets/images/icon_bookmark-blue.png")
    .detail-page__inner.container.page
      .loader(v-if="isLoaded")
        Spinner
      .detail-page__content
        .detail-page__main-info
          .detail-page__main-info-left
            .detail-page__main-image
              img(src="@/assets/images/main_service_media.png")
            .detail-page__other-media-list
              .detail-page__other-media-item.video
                button.play-btn.video__button
                img(src="@/assets/images/profile-8.jpg")
              .detail-page__other-media-item
                img(src="@/assets/images/profile-8.jpg")
              .detail-page__other-media-item
                img(src="@/assets/images/profile-8.jpg")
            .detail-page__description
              ExpandableText(
                :max-lines="4"
                :line-height="22"
                @toggle="isDescriptionExpanded = !isDescriptionExpanded"
              )
                template(#text)
                  p.detail-page__description-text
                    | Фильм интересный, но я не кинокритик и не буду заниматься его обсуждением.
                    | А вот суть реальной картины при возможной катастрофе постараюсь раскрыть: меня, как и многих
                    | других, это может коснуться. Так как я работаю в Силиконовой долине, буду писать непосредственно
                    | об этом районе.
                    | Фильм интересный, но я не кинокритик и не буду заниматься его обсуждением.
                    | А вот суть реальной картины при возможной катастрофе постараюсь раскрыть: меня, как и многих
                    | других, это может коснуться. Так как я работаю в Силиконовой долине, буду писать непосредственно
                    | об этом районе.
                template(#toggler)
                  a.detail-page__expand-toggler(:class="{ 'down': !isDescriptionExpanded }")
                    span Читать далее
                    img(src="@/assets/images/icon_arrow-up-blue.svg" width="9" height="6")
          .detail-page__main-info-right
            .detail-page__stats
              .detail-page__stats-list
                .detail-page__stats-list-item
                  .stats-name Бюджет:
                  .stats-value.stats-value--big.stats-value--discount $1000
                .detail-page__stats-list-item
                  .stats-name Локация:
                  .stats-value(v-line-clamp:22="1") Австралия, Сидней, Оушн Драйв 277 длинная локация
                .detail-page__stats-list-item
                  .stats-name Дедлайн:
                  .stats-value.stats-value--extra-info 27 дек 2025, 00:00
              .detail-page__stats-actions
                button.button: span Оставить заявку
                button.button.button_neutral: span Свои условия

        .tags.detail-page__tags
          .tags__item Автомобиль
          .tags__item Сельское хозяйство
          .tags__item Бинарная классификация
          .tags__item ДНК
          .tags__item Программирование

        .detail-page__milestones
          .detail-page__milestones-header
            .title
              span Этапы
              Tooltip(text="Подсказка об этапах")
            .milestones-counter 50 этапов
            .action
              span Свернуть
              img(src="@/assets/images/icon_arrow-up-blue.svg" width="9" height="6")
          .detail-page__milestones-table
            MilestonesTable(:max-height="175")

        .detail-page__similar-services
          h2.detail-page__title-2 Похожие услуги
          EventItem(
            v-for="service of similarServices"
            :item="service"
            :key="service.id"
          )
        .detail-page__comments
          .comments-block
            .comments-block__header
              .comments-block__title
                h2.detail-page__title-2 Комментарии
              .comments-block__text 54 993 комментария
            .comments-block__input-fields
              .comments-block__text-input
                InputField(:icon="icons.attach" emoji)
              .comments-block__send-btn
                .button.button_disabled: img(src="@/assets/images/icon_enter.svg" width="16" height="14")
            .comments-block__comments-list
              Comment(v-for="(comment, i) in comments" :key="`comm${i}`" :comment="comment")
</template>

<script>
  import { mapGetters } from 'vuex';
  import Spinner from '@/components/Spinner';
  import Breadcrumbs from '@/components/Breadcrumbs.vue';
  import TextInput from '@/components/forms/TextInput';
  import ToolsDropdown from '@/components/ToolsDropdown';
  import ViewToggle from '@/components/ViewToggle';
  import Select from '@/components/forms/Select';
  import EventItem from '@/components/EventItem';
  import WarningIcon from '@/components/icons/WarningIcon';
  import Avatar from '@/components/Avatar';
  import { SERVICES_ITEMS } from './mock';
  import InputField from '@/components/forms/InputField';
  import images from '@/components/images';
  import Comment from '@/components/Comment';
  import ExpandableText from '@/components/ExpandableText';
  import MilestonesTable from '@/components/MilestonesTable';
  import Tooltip from '@/components/Tooltip';

  const PAGE_NAME = 'Название задачи';

  export default {
    name: 'TaskDetail',
    components: {
      Tooltip,
      MilestonesTable,
      ExpandableText,
      InputField,
      Avatar,
      Comment,
      WarningIcon,
      EventItem,
      ToolsDropdown,
      Breadcrumbs,
      Select,
      Spinner,
      TextInput,
      ViewToggle
    },
    data() {
      return {
        similarServices: SERVICES_ITEMS.splice(0, 2),
        icons: images.icons,
        breadcrumbs: {
          links: [
            { label: 'Услуги', href: '/services' },
            { label: 'Задачи', href: '' }
          ],
          current: PAGE_NAME
        },
        flowerTools: [
          {
            type: 'newEvent',
            icon: images.icons.newEvent,
            text: 'Новое событие'
          },
          {
            type: 'newEmail',
            icon: images.icons.newEmail,
            text: 'Новое письмо'
          },
          {
            type: 'newTransaction',
            icon: images.icons.newTransaction,
            text: 'Новая транзакция'
          },
          {
            type: 'newDocument',
            icon: images.icons.newDocument,
            text: 'Новый документ'
          },
          {
            type: 'newTable',
            icon: images.icons.newTable,
            text: 'Новая таблица'
          }
        ],
        comments: [
          {
            name: 'Иван Петров',
            initials: 'ИП',
            date: '01 янв 2017, 15:00',
            message: 'Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит коммент в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментв развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк.'
          },
          {
            name: 'Анастасия Анстасиенко',
            initials: 'АА',
            date: '01 янв 2017, 15:00',
            message: 'Вот это товар!',
            object: SERVICES_ITEMS[5]
          }
        ],
        isDescriptionExpanded: false
      };
    },
    computed: {
      ...mapGetters({
        isLoaded: 'social/getLoaded'
      })
    }
  };
</script>
