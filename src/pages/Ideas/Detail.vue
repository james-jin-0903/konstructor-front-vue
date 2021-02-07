<template lang="pug">
  div.ideas-page
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.ideas-page__toolbar
        .toolbar__main
          a(href="#").toolbar__item.ideas-page__link
            img(:src="icons.analytics")
          .toolbar__item.field.ideas-page__date
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
            ).ideas-page__date
          .toolbar__item
            ToolsDropdown(:tools="tools")

        .toolbar__aside
          .info-item.toolbar__item
            button.button.button_size-1(type="button")
              span Продвигать
          .toolbar__flower.toolbar__flower_small-offset
            ToolsDropdown(:tools="flowerTools" :placeOnLeft="true").tools-dropdown_flower




      .ideas-page__header
        CreationInfo(:creationInfo="creationInfo")
        ActionsBar()
    .ideas-page__inner.container.page
      .loader(v-if="isLoaded")
        Spinner

      .ideas-page__content.article
        .article__row
          .article__inner(v-if="editorData && editorData.blocks && editorData.blocks.length")
            .article__content
              .article__block
                img(:src="articleImage").article__image

              div(v-for="(block, index) of editorData.blocks" :key="index" :class="`article__block_${block.type}`").article__block
                // TODO set image here when backend was ready
                // img(src="../../assets/article-content.jpg").article__image

                // paragraph
                p(v-if="block.type === 'paragraph'" v-html="block.data.text").article__text

                // header
                h3(v-if="block.type === 'header'" v-html="block.data.text").article__header

                // delimiter
                hr(v-if="block.type === 'delimiter'").article__hr

                // quote
                blockquote(v-if="block.type === 'quote'").article__quote.quote
                  p(v-html="block.data.text").quote__text
                  footer(v-html="block.data.caption").quote__author

                // list ul
                ul(v-if="block.type === 'list' && block.data && block.data.style === 'unordered' && block.data.items && block.data.items.length").article__list.list
                  li(v-for="(item, index) of block.data.items" v-html="item" :key="index").list__item

                // list ol
                ol(v-if="block.type === 'list' && block.data && block.data.style === 'ordered' && block.data.items && block.data.items.length").article__list.list
                  li(v-for="(item, index) of block.data.items" v-html="item" :key="index").list__item

                // code
                div(v-if="block.type === 'code'" v-html="block.data.code").article__code.code

                // table
                table(v-if="block.type === 'table' && block.data.content && block.data.content.length").article__table.table
                  tbody
                    tr(v-for="tableRow in block.data.content")
                      td(v-for="(cell, index) in tableRow" :key="index") {{cell}}

            .article__tags.tags(v-if="articleTags && articleTags.length")
              .tags__inner
                .tags__item(v-for="(tag, index) of articleTags" :key="index") {{tag}}

          .article__aside
            table.article__info
              tr
                td Тип:
                td
                  router-link(to="#").link.link_default-hover Публикация
              tr
                td Проект:
                td
                  router-link(to="#").link.link_default-hover Название проекта
              tr
                td Локация:
                td
                  router-link(to="#").link.link_default-hover Австарлия, Сидней
                  | , Оушн Драйв 27/345
            .article__actions
              button(type="button").button
                span Создать проект на базе идеи
              button(type="button").button.button_neutral
                span Создать сообщество на базе идеи
              button(type="button").button.button_neutral
                span Подписаться на сообщество

      .article__events
        h3.article__subtitle.page-subitle Похожие объекты
        EventItem(:item="item" :key="item.id"  v-for="item of events"  :small="false")
      .article__comments
        Comments()
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Spinner from '@/components/Spinner';
  import Breadcrumbs from '@/components/Breadcrumbs.vue';
  import SocialTable from '@/components/SocialTable.vue';
  import AddSocial from '@/components/SocialForm.vue';
  import NavigationTabs from '@/components/NavigationTabs';
  import TextInput from '@/components/forms/TextInput';
  import Checkbox from '@/components/forms/Checkbox';
  import ToolsDropdown from '@/components/ToolsDropdown';
  import images from '@/components/images';
  import Timeline from '@/components/Timeline';
  import CreationInfo from '@/components/CreationInfo';
  import ActionsBar from '@/components/ActionsBar';
  import EventItem from '@/components/EventItem';
  import Comments from '@/components/Comments';

  const PAGE_NAME = 'Название идеи';

  const EVENT_ITEMS = [
    {
      id: 1,
      image: 'idea_01.png',
      icon: 'feather',
      title: 'Короткое',
      tags: ['ИТ'],
      category: {
        title: 'Сообщество',
        text: 'Технологии и жизнь',
        url: '/'
      },
      subcategory: {
        title: 'Тип',
        text: 'Публикация',
        url: '/'
      },
      popularity: '999К',
      button: {
        label: 'Создать проект',
        class: '',
        action: ''
      },
      tools: [
        {
          type: 'newObject',
          icon: images.icons.newEvent,
          text: 'Объекты на базе идеи'
        },
        {
          type: 'report',
          icon: images.icons.report,
          text: 'Пожаловаться'
        }
      ]
    },
    {
      id: 2,
      icon: 'feather',
      title: 'Длинное название интересной идеи, состоящее из нескольких разных слов',
      tags: ['Автомобили'],
      category: {
        title: 'Сообщество',
        text: 'Автомир',
        url: '/'
      },
      subcategory: {
        title: 'Тип',
        text: 'Публикация',
        url: '/'
      },
      popularity: '999К',
      button: {
        label: 'Создать проект',
        class: '',
        action: ''
      }
    }];

  export default {
    name: 'Idea',
    components: {
      Comments,
      EventItem,
      ActionsBar,
      CreationInfo,
      Timeline,
      ToolsDropdown,
      Breadcrumbs,
      SocialTable,
      AddSocial,
      NavigationTabs,
      TextInput,
      Spinner,
      Checkbox
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
        socialsLoaded: false,
        breadcrumbs: {
          links: [
            { label: 'Идеи', href: '/ideas' }
          ],
          current: PAGE_NAME
        },
        events: EVENT_ITEMS,
        icons: images.icons,
        tools: [
          {
            type: 'edit',
            icon: images.icons.edit,
            text: 'Редактировать'
          },
          {
            type: 'copy',
            icon: images.icons.copy,
            text: 'Копировать'
          },
          {
            type: 'report',
            icon: images.icons.history,
            text: 'Перейти к истории',
            count: 99
          },
          {
            type: 'newObject',
            icon: images.icons.cube,
            text: 'Объекты на базе идеи'
          },
          {
            type: 'sendToArchive',
            icon: images.icons.off,
            text: 'Отправить в архив'
          }
        ],
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
        creationInfo: {
          date: '15 ноября 2017, 15:00',
          userFrom: {
            initials: 'К',
            name: 'Konstruktor',
            fillLevel: 80
          },
          userTo: {
            initials: 'КК',
            name: 'Константин Константинопольский',
            fillLevel: 50
          }
        },
        editorData: null,
        articleTags: ['Автомобиль', 'Сельское хозяйство', 'Бинарная классификация', 'ДНК', 'Программирование'],
        articleImage: require('../../assets/images/article-content.jpg')
      };
    },
    mounted() {
      const editorData = window.localStorage.getItem('editorData');
      if (editorData) {
        try {
          const parsedData = JSON.parse(editorData);
          this.editorData = parsedData;
        } catch (e) {
          this.editorData = {};
        }
      } else {
        this.editorData = {};
      }

      document.addEventListener('editor:imageClick', this.openModal);
    },
    computed: {
      ...mapGetters({
        isLoaded: 'social/getLoaded'
      })
    },
    methods: {
      ...mapActions({
        fetchSocial: 'social/fetchSocial'
      }),
      dateChange(date) {
        this.filterDate = date.value;
      }
    }
  };
</script>

<style lang="scss">
  .ideas-page {
    &__toolbar {
      margin-top: 38px;
    }

    &__header {
      margin-top: 21px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .article {
    padding-top: 34px;

    &__row {
      display: flex;
    }

    &__inner {
      width: 800px;
      margin-right: 20px;
    }

    &__block {
      margin-bottom: 49px;

      &_header {
        margin-bottom: 25px;
      }
    }

    &__header {
      font-size: 24px;
    }

    &__aside {
      flex: 1;
    }

    &__image {
      border-radius: 3px;
    }

    &__hr {
      border: none;
      width: 100%;
      display: block;
      text-align: center;
      height: 30px;

      &:after {
        content: '•••';
        font-family: Arial, sans-serif;
        height: 30px;
        letter-spacing: 0.5em;
        font-size: 35px;
        line-height: 57px;
        margin-left: 18px;
        position: relative;
        top: -12px;
      }
    }

    &__text {
      font-size: 20px;
      line-height: 32px;
      color: #444444;

      a {
        text-decoration: none;
        color: #81A6C3;
      }
    }

    &__subtitle {
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 22px;
      color: #444444;
      margin-bottom: 26px;
    }

    &__events {
      margin-top: 60px;
    }

    &__comments {
      margin-top: 57px;
    }

    &__info {
      td {
        padding: 0;
        padding-bottom: 20px;

        &:first-child {
          width: 85px;
        }
      }
    }

    &__actions {
      margin-top: 40px;
      width: 315px;

      .button {
        width: 100%;
        margin-bottom: 18px;
        padding-left: 5px;
        padding-right: 5px;
      }
    }
  }

  .quote {
    background: #F1F2F7 url(../../assets/images/icon_quote.svg) no-repeat 20px 20px;
    border-radius: 3px;
    color: #444444;
    padding-top: 20px;
    padding-left: 60px;
    padding-right: 20px;
    padding-bottom: 20px;

    &__text {
      font-size: 24px;
      line-height: 38px;
      margin-bottom: 20px;
    }

    &__author {
      font-size: 16px;
      line-height: 22px;
    }
  }

  .code {
    font-size: 14px;
    line-height: 22px;
    color: #444444;

    background: #F1F2F7;
    border-radius: 3px;
    white-space: pre;

    padding: 20px 20px;
  }

  .table {
    border-radius: 3px;
    overflow: hidden;

    td {
      border: 1px solid #DFE4EB;
    }
  }

  .list {
    font-size: 20px;
    line-height: 32px;
    padding-left: 53px;
    color: #444444;
  }

</style>
