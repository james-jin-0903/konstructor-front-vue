<template lang="pug">
div
    //.event-item(
    .event-item(v-if="!typeNumber" v-bind:class="{'event-item_small': small}")
      router-link(:to="{ path: `${route}/${item.id}` }").event-item__inner
        .event-item__media(v-bind:class="{'video': item.isVideo, 'event-item__media_empty': !item.image }")
          button(type="button" v-if="item.isVideo").video__button
          img(v-if="item.image" :src="require('@/assets/images/' + item.image + '')")
        .event-item__main
          .event-item__title
            span.event-item__title-icon
              img(:src="getIcon(item.icon)")
            span.event-item__title-text {{item.title}}
          .event-item__tags.tags(v-if="item.tags && item.tags.length && !small")
            .tags__inner
              .tags__item(v-for="(tag, index) of item.tags" v-if="index < maxTagsLength - 1" :key="index") {{tag}}
            .tags__more(v-if="item.tags.length > maxTagsLength") Еще {{item.tags.length - maxTagsLength}} навыка
              <svg width="9" height="5" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#282828" d="M0 0h9v5H0z"/><path fill="#fff" d="M-137-323h1360v1668H-137z"/><path d="M4.5 0L.603 4.5h7.794L4.5 0z" fill="currentColor"/><path d="M4.5 2L.603 6.5h7.794L4.5 2z" fill="#fff"/></svg>

        .event-item__aside
          .event-item__info
            .event-item__info-item(v-if="item.category")
              .event-item__subtitle {{item.category.title}}
              router-link(v-if="item.category.url" :to="item.category.url").event-item__text.event-item__text_blue {{item.category.text}}
              .event-item__text(v-if="!item.category.url") {{item.category.text}}

            .event-item__info-item(v-if="item.subcategory && !small")
              .event-item__subtitle {{item.subcategory.title}}
              router-link(v-if="item.subcategory.url" :to="item.subcategory.url").event-item__text.event-item__text_blue {{item.subcategory.text}}
              .event-item__text.event-item__text_blue(v-if="!item.subcategory.url") {{item.subcategory.text}}

          .event-item__info.event-item__info_end(v-if="item.workTime")
            .event-item__info-item
              .event-item__subtitle Срок работы
              .event-item__text {{item.workTime}} 8 мес, 20 дн

          .event-item__info
            .event-item__info-item(v-if="item.popularity")
              .event-item__subtitle Популярность
              .event-item__text
                router-link(to="#").event-item__link-popular
                  img(src="../assets/images/icon_star-blue.svg").event-item__text-icon
                  | {{item.popularity}}

            .event-item__info-item(v-if="item.rate")
              .event-item__subtitle Ставка
              .event-item__text {{item.rate}} $5/ч

            .event-item__info-item(v-if="item.price")
              .event-item__subtitle Ставка
              .event-item__text {{item.price}} $100 тыс.

            .event-item__info-item(v-if="item.onSite")
              .event-item__subtitle На сайте
              .event-item__text {{item.onSite.period}} 3 г, 8 мес, 15 дн
                span.event-item__text-flex
                  span.event-item__text-inner  (
                  img(src="../assets/images/icon_star-gray.svg").event-item__text-icon
                  | {{item.onSite.rating}}) 999К

          .event-item__actions
            .event-item__actions-top
              button.button.button_medium.event-item__button(
                v-if="item.button"
                :class="item.button.class"
                :disabled="item.button.disabled"
                @click="handleAction(item.button.action)"
              )
                span {{item.button.label}}
            .event-item__actions-bottom(v-if="!small")
              button(type="button").event-item__action
                img(src="../assets/images/icon_share.svg")
              button(type="button").event-item__action
                img(src="../assets/images/icon_crown.svg")
              button(type="button").event-item__action
                img(src="../assets/images/icon_fav.svg")
      ToolsDropdown(
        v-if="item.tools && item.tools.length"
        :tools="item.tools"
        @select="handleToolSelect"
        @open="handleToolsOpen"
        @close="handleToolsClose"
        :placeOnLeft="true"
        :noBackground="true"
      ).event-item__tools

    div(v-if="typeNumber===1")
      .event-item
        .event-item__media.video
          button(type="button").video__button
          img(src="../assets/images/profile-9.jpg")
        .event-item__main
          .event-item__title
            span.event-item__title-icon
              img(src="../assets/images/icon_user.svg")
            span Информация о пользователе
          .event-item__tags.tags
            .tags__inner
              .tags__item Автомобили
              .tags__item Сельское хозяйство
              .tags__item Пение
            .tags__more Еще 3 навыка
              <svg width="9" height="5" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#282828" d="M0 0h9v5H0z"/><path fill="#fff" d="M-137-323h1360v1668H-137z"/><path d="M4.5 0L.603 4.5h7.794L4.5 0z" fill="currentColor"/><path d="M4.5 2L.603 6.5h7.794L4.5 2z" fill="#fff"/></svg>

        .event-item__aside
          .event-item__info
            .event-item__info-item
              .event-item__subtitle Занятость
              .event-item__text Свободен
            .event-item__info-item
              .event-item__subtitle Локация
              router-link(to="#").event-item__text.event-item__text_blue Австралия, Сидней
          .event-item__info
            .event-item__info-item
              .event-item__subtitle Ставка
              .event-item__text $5/ч
            .event-item__info-item
              .event-item__subtitle На сайте
              .event-item__text 3 г, 8 мес, 15 дн
                span.event-item__text-flex
                  span.event-item__text-inner  (
                  img(src="../assets/images/icon_star-gray.svg").event-item__text-icon
                  | 999К)
          .event-item__actions
            .event-item__actions-top
              button.button.button_medium.button_neutral
                span Подписаться
            .event-item__actions-bottom
              button(type="button").event-item__action
                img(src="../assets/images/icon_share.svg")
              button(type="button").event-item__action
                img(src="../assets/images/icon_crown.svg")
              button(type="button").event-item__action
                img(src="../assets/images/icon_fav.svg")


      .event-item
        .event-item__media.event-item__media_empty
        .event-item__main
          .event-item__title
            span.event-item__title-icon
              img(src="../assets/images/icon_user-bussiness.svg")
            span CEO
          .event-item__link Еще 2 должности

        .event-item__aside
          .event-item__info
            .event-item__info-item
              .event-item__subtitle Сообщество
              router-link(to="#").event-item__text.event-item__text_blue ООО Атлантида
            .event-item__info-item
              .event-item__subtitle Локация
              router-link(to="#").event-item__text.event-item__text_blue Австралия, Сидней
          .event-item__info.event-item__info_end
            .event-item__info-item
              .event-item__subtitle Срок работы
              .event-item__text 8 мес, 20 дн

      .event-item
        .event-item__media.event-item__media_icon.event-item__media_orange
          img(src="../assets/images/icon_favorite-big.svg")
        .event-item__main
          .event-item__title
            span.event-item__title-icon
              img(src="../assets/images/icon_medal.svg")
            span Меценат года
          .event-item__link Еще 14 достижений
        .event-item__aside
          .event-item__info
            .event-item__info-item
              .event-item__subtitle Сообщество
              .event-item__text
                router-link(to="#").event-item__text.event-item__text_blue ООО Атлантида
                span и еще 5
          .event-item__info
            .event-item__info-item
              .event-item__subtitle Сумма
              .event-item__text $100 тыс.

      .event-item
        .event-item__media.video
          button(type="button").video__button
          img(src="../assets/images/profile-1.jpg")
        .event-item__main
          .event-item__title
            span.event-item__title-icon
              img(src="../assets/images/icon_rocket.svg")
            span Сдана задача «Масштабная и интересная разработка 4»
          .event-item__tags.tags
            .tags__inner
              .tags__item ИТ
        .event-item__aside
          .event-item__info
            .event-item__info-item
              .event-item__subtitle Сообщество
              router-link(to="#").event-item__text.event-item__text_blue Ромашка
          .event-item__info
            .event-item__info-item
              .event-item__subtitle Популярность
              .event-item__text
                router-link(to="#").event-item__link-popular
                  img(src="../assets/images/icon_star-blue.svg").event-item__text-icon
                  |  999К

          .event-item__actions
            .event-item__actions-top
            .event-item__actions-bottom
              button(type="button").event-item__action
                img(src="../assets/images/icon_share.svg")
              button(type="button").event-item__action
                img(src="../assets/images/icon_crown.svg")
              button(type="button").event-item__action
                img(src="../assets/images/icon_fav.svg")

      .event-item
        .event-item__media.video
          button(type="button").video__button
          img(src="../assets/images/profile-4.jpg")
        .event-item__main
          .event-item__title
            span.event-item__title-icon
              img(src="../assets/images/icon_rocket.svg")
            span Сдана задача «Масштабная и интересная разработка 3»
          .event-item__tags.tags
            .tags__inner
              .tags__item ИТ
        .event-item__aside
          .event-item__edit-toggle
            <svg width="16" height="4" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 1.6a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0zM9.6 1.6a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0zM3.2 1.6a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0z" fill="currentColor"/></svg>
          .event-item__info
            .event-item__info-item
              .event-item__subtitle Сообщество
              router-link(to="#").event-item__text.event-item__text_blue Ромашка
          .event-item__info
            .event-item__info-item
              .event-item__subtitle Популярность
              .event-item__text
                router-link(to="#").event-item__link-popular
                  img(src="../assets/images/icon_star-blue.svg").event-item__text-icon
                  | 999К

      .event-item
        .event-item__media.video
          button(type="button").video__button
          img(src="../assets/images/profile-7.jpg")
        .event-item__main
          .event-item__title
            span.event-item__title-icon
              img(src="../assets/images/icon_rocket.svg")
            span Сдана задача «Масштабная и интересная разработка 2»
          .event-item__tags.tags
            .tags__inner
              .tags__item ИТ
        .event-item__aside
          .event-item__edit-toggle
            <svg width="16" height="4" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 1.6a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0zM9.6 1.6a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0zM3.2 1.6a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0z" fill="currentColor"/></svg>

          .event-item__info
            .event-item__info-item
              .event-item__subtitle Сообщество
              router-link(to="#").event-item__text.event-item__text_blue Ромашка
          .event-item__info
            .event-item__info-item
              .event-item__subtitle Популярность
              .event-item__text
                router-link(to="#").event-item__link-popular
                  img(src="../assets/images/icon_star-blue.svg").event-item__text-icon
                  |  999К

          .event-item__actions
            .event-item__actions-top.edit-actions
              button(type="button").edit-actions__button.edit-actions__button_black
                img(src="../assets/images/icon_bad.svg")
              button(type="button").edit-actions__button.edit-actions__button_red
                img(src="../assets/images/icon_delete.svg")
              button(type="button").edit-actions__button.edit-actions__button_green
                img(src="../assets/images/icon_check-big.svg")
            .event-item__actions-bottom
              button(type="button").event-item__action
                img(src="../assets/images/icon_share.svg")
              button(type="button").event-item__action
                img(src="../assets/images/icon_crown.svg")
              button(type="button").event-item__action
                img(src="../assets/images/icon_fav.svg")

      .event-item
        .event-item__media.video
          button(type="button").video__button
          img(src="../assets/images/profile-5.jpg")
        .event-item__main
          .event-item__title
            span.event-item__title-icon
              img(src="../assets/images/icon_rocket.svg")
            span Сдана задача «Масштабная и интересная разработка 1»
          .event-item__tags.tags
            .tags__inner
              .tags__item ИТ
        .event-item__aside
          .event-item__edit-toggle
            <svg width="16" height="4" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 1.6a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0zM9.6 1.6a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0zM3.2 1.6a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0z" fill="currentColor"/></svg>

          .event-item__info
            .event-item__info-item
              .event-item__subtitle Сообщество
              router-link(to="#").event-item__text.event-item__text_blue Ромашка
          .event-item__info
            .event-item__info-item
              .event-item__subtitle Популярность
              .event-item__text
                router-link(to="#").event-item__link-popular
                  img(src="../assets/images/icon_star-blue.svg").event-item__text-icon
                  |  999К

          .event-item__actions
            .event-item__actions-top
            .event-item__actions-bottom
              button(type="button").event-item__action
                img(src="../assets/images/icon_share.svg")
              button(type="button").event-item__action
                img(src="../assets/images/icon_crown.svg")
              button(type="button").event-item__action
                img(src="../assets/images/icon_fav.svg")

    div(v-if="typeNumber===2")
      .event-item
        .event-item__media.video
          button(type="button").video__button
          img(src="../assets/images/profile-2.jpg")
          // TODO put video here
        .event-item__main
          .event-item__title
            span.event-item__title-icon
              img(src="../assets/images/icon_bird.svg")
            span Товар «Вязаный свитер «Бабушкины сказки» стал бестселлером
          .event-item__tags.tags
            .tags__inner
              .tags__item Одежда

        .event-item__aside
          .event-item__edit-toggle
            <svg width="16" height="4" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 1.6a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0zM9.6 1.6a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0zM3.2 1.6a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0z" fill="currentColor"/></svg>

          .event-item__info
            .event-item__info-item
              .event-item__subtitle Сообщество
              router-link(to="#").event-item__text.event-item__text_blue Ромашка

          .event-item__info
            .event-item__info-item
              .event-item__subtitle Популярность
              .event-item__text
                router-link(to="#").event-item__link-popular
                  img(src="../assets/images/icon_star-blue.svg").event-item__text-icon
                  |  999К
            .event-item__info-item
              .event-item__subtitle В наличии
              .event-item__text 12

          .event-item__actions
            .event-item__actions-top
              button.button.button_medium.button_default.event-item__button
                span $99.99
            .event-item__actions-bottom
              button(type="button").event-item__action
                img(src="../assets/images/icon_share.svg")
              button(type="button").event-item__action
                img(src="../assets/images/icon_crown.svg")
              button(type="button").event-item__action
                img(src="../assets/images/icon_fav.svg")

    div(v-if="typeNumber===3")
      .event-item
        .event-item__media.video
          button(type="button").video__button
          img(src="../assets/images/profile-8.jpg")
        .event-item__main
          .event-item__title
            span.event-item__title-icon
              img(src="../assets/images/icon_book.svg")
            span Закончено высшее учебное заведение
          .event-item__tags.tags
            .tags__inner
              .tags__item Антропология
        .event-item__aside
          .event-item__info
            .event-item__info-item
              .event-item__subtitle Учебное заведение
              router-link(to="#").event-item__text.event-item__text_blue Гарвардский университет

    div(v-if="typeNumber===4")
      .event-item
        .event-item__media.event-item__media_empty
        .event-item__main
          .event-item__title
            span.event-item__title-icon
              img(src="../assets/images/icon_birthday.svg")
            span Рождение
          .event-item__tags.tags
            .tags__inner
              .tags__item ИТ
        .event-item__aside
          .event-item__edit-toggle
            <svg width="16" height="4" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 1.6a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0zM9.6 1.6a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0zM3.2 1.6a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0z" fill="currentColor"/></svg>

          .event-item__info
            .event-item__info-item
              .event-item__subtitle Роддом
              router-link(to="#").event-item__text.event-item__text_blue Частный роддом «Аист»
          .event-item__info
            .event-item__info-item
              .event-item__subtitle Локация
              router-link(to="#").event-item__text.event-item__text_blue Австралия, Сидней
</template>

<script>
import '../scss/style.scss';
import images from '@/components/images';
import ToolsDropdown from '@/components/ToolsDropdown';

const MAX_TAGS_LENGTH = 3;
export default {
  name: 'EventItem',
  components: { ToolsDropdown },
  props: {
    typeNumber: Number,
    item: Object,
    small: Boolean,
    route: {
      type: String,
      default: '/ideas'
    }
  },
  data() {
    return {
      icons: images.icons,
      maxTagsLength: MAX_TAGS_LENGTH
    };
  },
  mounted() {},
  methods: {
    getIcon(icon) {
      return this.icons[icon];
    },
    handleAction(action) {},
    handleToolSelect() {},
    handleToolsOpen() {
      const item = this.$el.querySelector('.event-item');
      // TODO change to this.$el after connect to backend
      item.classList.add('event-item_active');
    },
    handleToolsClose() {
      const item = this.$el.querySelector('.event-item');
      // TODO change  change to this.$el after connect to backend
      item.classList.remove('event-item_active');
    }
  }
};
</script>

<style lang="scss" scoped>
.event-item {
  text-decoration: none;
  color: black;
  /* TODO move to timeline after backend integration */
  margin-bottom: 20px;

  border: 1px solid transparent;
  display: flex;
  padding-left: 4px;

  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 3px;
  position: relative;

  &__inner {
    display: flex;
    width: 100%;
  }

  &_small {
    height: 42px;

    .event-item__media {
      height: 30px;
      width: 30px;
    }

    .event-item__main {
      flex-direction: row;
      align-items: center;
    }

    .event-item__title-text {
      white-space: nowrap;
      padding-right: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .event-item__media_empty {
      background-size: 16px;
    }

    .event-item__title-icon {
      margin-top: 3px;
    }

    .event-item__subtitle {
      line-height: 14px;
    }
  }

  &:hover {
    border-color: #81a6c3;

    .event-item__edit-toggle {
      display: flex;
    }
  }

  &__media {
    border-radius: 3px;
    height: 80px;
    width: 80px;
    overflow: hidden;
    margin-right: 10px;

    &_empty {
      background: #dfe4eb url('../assets/images/icon_konstruktor.png') no-repeat
        center;
    }

    &_icon {
      border: 2px solid;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &_orange {
      border-color: #f2c695;
    }

    img {
      max-width: 100%;
    }
  }

  &__main {
    width: 43%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__title {
    display: flex;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    margin-top: -2px;
    width: 100%;
    color: #222222;

    &-icon {
      margin-right: 10px;
      width: 16px;

      img {
        display: block;
      }
    }
  }

  &__aside {
    padding-right: 31px;
    display: flex;
    flex: 1;
  }

  &__info {
    width: 34.4%;
    box-sizing: border-box;
    padding-right: 15px;

    &_end {
      display: flex;
      flex-direction: column-reverse;
    }

    &-item {
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }

      &-top {
        min-width: 70%;

        button {
          width: 100%;
        }
      }
    }
  }

  &__subtitle {
    font-size: 12px;
    line-height: 16px;
    color: #b2bcca;
  }

  &__text {
    font-size: 12px;
    text-decoration: none;

    &_blue {
      color: #81a6c3;
    }

    &-icon {
      margin-left: 1px;
      margin-right: 4px;
    }

    &-inner {
      margin-left: 10px;
    }

    &-flex {
      display: inline-flex;
      align-items: center;
    }
  }

  &__actions {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &-bottom {
      display: flex;
      align-items: center;
    }
  }

  &__action {
    background: none;
    border: none;
    border-right: 0;
    margin-right: 23px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    img {
      display: block;
    }
  }

  &__link {
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;

    color: #81a6c3;
  }

  &__link-popular {
    font-weight: 400;
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;

    .event-item__text-icon {
      margin-top: -3px;
    }
  }

  &__button {
    margin-left: auto;
    min-width: 138px;
  }

  &__edit-toggle {
    top: 0;
    right: 7px;
    cursor: pointer;
    position: absolute;
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    color: #81a6c3;
    display: none;
    transition: color 0.5s ease;

    &:hover {
      color: #4a6c87;
    }

    svg {
      display: block;
    }
  }

  &__tools {
    position: absolute;
    right: 8px;
    top: 6px;
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 10;
  }

  &:hover &__tools {
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  &_active:hover &__tools,
  &_active &__tools {
    opacity: 1;
  }
}

.edit-actions {
  display: flex;
  align-items: center;

  &__button {
    background: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-right: 10px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    img {
      display: block;
    }

    &_red {
      border: 1px solid #f26671;
    }

    &_green {
      border: 1px solid #4daf7c;

      img {
        margin-top: -3px;
      }
    }
  }
}
</style>
