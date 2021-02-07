<template lang="pug">
  .main-home-wrapper
    .screenWrapper
      section.screen.screen_first
        .header
          .container.header__container
            .lang
              .lang__title Язык
              Select(
                :small="select.small",
                :icon="select.icon"
                :text="select.text"
                :options="select.options"
              )
            img.logo(src="~@/assets/images/auth/home/logo.png", alt="logo")
            router-link(to="/signIn").button.button_small.button_default.signInBtn
              span.button__text Войти
        .mainContent
          h1.mainContent__title Построй свою мечту
          .mainContent__desc Присоединяйся к сообществу <br/> креативных людей со всей планеты. <br/> Созидай и сотрудничай!
          router-link(to="/signUp").button.button_bind
            span.button__text Реализовать мечту
        .screen__footer
          .users-counter
            .users-counter__num 1,234,345
            .users-counter__text Реализованные мечты на сайте
          img.moveNext(src="~@/assets/images/auth/home/arrow.svg", alt="")

      section.screen
        .container
          .tabs
            .tabs__nav
              .tabs__navItem.text_spec2.active(data-nav=1) Заработали денег
              .tabs__navItem.text_spec2(data-nav=2) Реализовали идею
              .tabs__navItem.text_spec2(data-nav=3) Нашли вдохновение
            .tabs__wrapper.active(data-tab=1)
              .tabBlock
                .tabBlock__mainCol
                  .tabBlock__thumbnail(data-title="My_Picture_Title_02-01-2017" :data-img="this.getThumbPath('auth/home/temp_ph3_high.png')")
                    img.tabBlock__thumbPreview(src="~@/assets/images/auth/home/temp_ph1.png" alt="")
                  h4.tabBlock__title
                    a.tabBlock__link(href="") Иван Петров 22
                    span добился своей мечты «Купить автомобиль Tesla»
                .tabBlock__col
                  .tabBlock__colTitle Задач выполнено
                  .text_3 999K
                .tabBlock__col
                  .tabBlock__colTitle Денег заработано
                  .text_3 $99999
              .tabBlock
                .tabBlock__mainCol
                  .tabBlock__thumbnail.tabBlock__thumbnail_video(data-title="My_Picture_Title_02-01-2017")
                    video.tabBlock__thumbPreview(src="~@/assets/images/auth/home/video.mp4" alt="")
                  h4.tabBlock__title
                    a.tabBlock__link(href="") Иван Петров
                    span добился своей мечты «Купить виллу в Испании с прилегающим виноградником»
                .tabBlock__col
                  .tabBlock__colTitle Задач выполнено
                  .text_3 999K
                .tabBlock__col
                  .tabBlock__colTitle Денег заработано
                  .text_3 $99999
              .tabBlock
                .tabBlock__mainCol
                  .tabBlock__thumbnail.tabBlock__thumbnail_imgMore(data-title="My_Picture_Title_02-01-2017", data-count="3",
                    :data-array='getThumbsArray(["auth/home/temp_ph3.png", "auth/home/temp_ph2.png", "auth/home/temp_ph1.png"])'
                  )
                    img.tabBlock__thumbPreview(src="~@/assets/images/auth/home/temp_ph3.png", alt="")
                  h4.tabBlock__title
                    a.tabBlock__link(href="") Иван Петров
                    span добился своей мечты «Купить автомобиль Tesla»
                .tabBlock__col
                  .tabBlock__colTitle Задач выполнено
                  .text_3 999K
                .tabBlock__col
                  .tabBlock__colTitle Денег заработано
                  .text_3 $99999
              router-link(to="/signUp").tabBtn.button.button_bind
                span.button__text Заработать денег

            .tabs__wrapper(data-tab=2)
              .tabBlock
                .tabBlock__mainCol
                  .tabBlock__thumbnail(data-title="My_Picture_Title_02-01-2017" :data-img="this.getThumbPath('auth/home/temp_ph3_high.png')")
                    img.tabBlock__thumbPreview(src="~@/assets/images/auth/home/temp_ph1.png", alt="")
                  h4.tabBlock__title
                    a.tabBlock__link(href="") Иван Петров
                    span добился своей мечты «Купить автомобиль Tesla»
                .tabBlock__col
                  .tabBlock__colTitle Инвестиций привлечено
                  .text_3 $99999
              .tabBlock
                .tabBlock__mainCol
                  .tabBlock__thumbnail(data-title="My_Picture_Title_02-01-2017" :data-img="this.getThumbPath('auth/home/temp_ph3_high.png')")
                    img.tabBlock__thumbPreview(src="~@/assets/images/auth/home/temp_ph2.png", alt="")
                  h4.tabBlock__title
                    a.tabBlock__link(href="") Иван Петров
                    span добился своей мечты «Купить виллу в Испании с прилегающим виноградником»
                .tabBlock__col
                  .tabBlock__colTitle Инвестиций привлечено
                  .text_3 $99999
              .tabBlock
                .tabBlock__mainCol
                  .tabBlock__thumbnail(data-title="My_Picture_Title_02-01-2017" :data-img="this.getThumbPath('auth/home/temp_ph3_high.png')")
                    img.tabBlock__thumbPreview(src="~@/assets/images/auth/home/temp_ph3.png", alt="")
                  h4.tabBlock__title
                    a.tabBlock__link(href="") Иван Петров
                    span добился своей мечты «Купить автомобиль Tesla»
                .tabBlock__col
                  .tabBlock__colTitle Инвестиций привлечено
                  .text_3 $99999
              router-link(to="/signUp").tabBtn.button.button_bind
                span.button__text Реализовать идею

            .tabs__wrapper(data-tab=3)
              .tabBlock
                .tabBlock__mainCol
                  .tabBlock__thumbnail(data-title="My_Picture_Title_02-01-2017" :data-img="this.getThumbPath('auth/home/temp_ph3_high.png')")
                    img.tabBlock__thumbPreview(src="~@/assets/images/auth/home/temp_ph1.png", alt="")
                  h4.tabBlock__title
                    a.tabBlock__link(href="") Иван Петров
                    span добился своей мечты «Купить автомобиль Tesla»
                .tabBlock__col
                  .tabBlock__colTitle Идей изучено
                  .text_3 999K
                .tabBlock__col
                  .tabBlock__colTitle Единомышленников найдено
                  .text_3 999K
              .tabBlock
                .tabBlock__mainCol
                  .tabBlock__thumbnail(data-title="My_Picture_Title_02-01-2017" :data-img="this.getThumbPath('auth/home/temp_ph3_high.png')")
                    img.tabBlock__thumbPreview(src="~@/assets/images/auth/home/temp_ph2.png", alt="")
                  h4.tabBlock__title
                    a.tabBlock__link(href="") Иван Петров
                    span добился своей мечты «Купить виллу в Испании с прилегающим виноградником»
                .tabBlock__col
                  .tabBlock__colTitle Идей изучено
                  .text_3 999K
                .tabBlock__col
                  .tabBlock__colTitle Единомышленников найдено
                  .text_3 999K
              .tabBlock
                .tabBlock__mainCol
                  .tabBlock__thumbnail(data-title="My_Picture_Title_02-01-2017" :data-img="this.getThumbPath('auth/home/temp_ph3_high.png')")
                    img.tabBlock__thumbPreview(src="~@/assets/images/auth/home/temp_ph3.png", alt="")
                  h4.tabBlock__title
                    a.tabBlock__link(href="") Иван Петров
                    span добился своей мечты «Купить автомобиль Tesla»
                .tabBlock__col
                  .tabBlock__colTitle Идей изучено
                  .text_3 999K
                .tabBlock__col
                  .tabBlock__colTitle Единомышленников найдено
                  .text_3 999K
              router-link(to="/signUp").tabBtn.button.button_bind
                span.button__text Найти вдохновение

        .screen__footer.secondFooter
          .secondFooter__top
            .secondFooter__topWrap.container
              .secondFooter__col
                h5.secondFooter__title Konstruktor
                a.secondFooter__topLink(href="") О нас
                a.secondFooter__topLink(href="") Konstruktor Home
                a.secondFooter__topLink(href="") Вакансии
                a.secondFooter__topLink(href="") Контакты
              .secondFooter__col
                h5.secondFooter__title Люди о нас
                a.secondFooter__topLink(href="") Идеи
              .secondFooter__col
                h5.secondFooter__title Пользование сайтом
                a.secondFooter__topLink(href="") Поддержка
                a.secondFooter__topLink(href="") Видео
              .secondFooter__col
                h5.secondFooter__title Учетная запись
                a.secondFooter__topLink(href="") Войти
                a.secondFooter__topLink(href="") Реализовать мечту
          .secondFooter__bottom
            .secondFooter__botWrap.container
              .secondFooter__botGroup
                a.secondFooter__botLink(href="") Правила пользования
                a.secondFooter__botLink(href="") Политика конфиденциальности
              .secondFooter__botGroup
                a.secondFooter__social(href="")
                  img.secondFooter__socialImg(src="~@/assets/images/auth/home/icon_facebook.svg", alt="facebook")
                a.secondFooter__social(href="")
                  img.secondFooter__socialImg(src="~@/assets/images/auth/home/icon_twitter.png", alt="twitter")
                a.secondFooter__social(href="")
                  img.secondFooter__socialImg(src="~@/assets/images/auth/home/icon_instagram.svg", alt="instagram")
                a.secondFooter__social(href="")
                  img.secondFooter__socialImg(src="~@/assets/images/auth/home/icon_pinterest.svg", alt="pinterest")
              .secondFooter__botGroup © Konstruktor Inc.  2018

    .backgroundModals
    .modal#mediaModal
      img.modal__close(src="~@/assets/images/auth/home/icon_close.svg", alt="")
      h3.modal__title
      .modal__content
    .preview

</template>

<script>
  import Select from '../../components/forms/Select';
  import mediaModal from '@/scss/auth/home/modals/mediaModal/mediaModal';
  import modal from '@/scss/auth/home/modals/modal/modal';

  require('../../vendors/fullPage.min');

  export default {
    components: {
      Select
    },
    data() {
      return {
        select: {
          small: true,
          text: 'Русский',
          class: 'lang__select',
          links: true,
          options: [
            {
              text: 'English',
              val: 'English'
            },
            {
              text: 'Italiano',
              val: 'Italiano'
            },
            {
              text: 'France',
              val: 'France'
            },
            {
              text: 'Bahasa Melayu',
              val: 'Bahasa Melayu'
            }]
        }
      };
    },
    computed: {},
    methods: {
      getThumbPath(src) {
        return require(`../../assets/images/${src}`);
      },
      getThumbsArray(array) {
        return JSON.stringify(array.map(s => this.getThumbPath(s)));
      },
      swapTabs(event) {
        const target = event.target;
        if (!target.classList.contains('active')) {
          const dataNav = target.dataset.nav;

          document.querySelector('.tabs__navItem.active').classList.remove('active');
          target.classList.add('active');

          const prevTab = document.querySelector('.tabs__wrapper.active');
          prevTab.classList.remove('fadeIn');
          prevTab.classList.add('fadeOut');

          setTimeout(() => {
            prevTab.classList.remove('active');
            const nextTab = document.querySelector(
              '.tabs__wrapper[data-tab="' + dataNav + '"]'
            );
            nextTab.classList.remove('fadeOut');
            nextTab.classList.add('fadeIn');
            nextTab.classList.add('active');
          }, 300);
        }
      },

      preview() {
        const thumbs = document.querySelectorAll('.tabBlock__thumbnail');

        thumbs.forEach(el => {
          el.addEventListener('mouseenter', this.showPreview);
          el.addEventListener('mousemove', this.movePreview);
          el.addEventListener('mouseleave', this.hidePreview);
        });
      },

      showPreview(e) {
        const target = e.target;
        const preview = document.querySelector('.preview');
        if (target.classList.contains('tabBlock__thumbnail_video')) {
          const src = target.querySelector('video').src;
          preview.innerHTML = `<video class="preview__video" src="${src}"></video>`;
        } else {
          const src = target.querySelector('img').src;
          preview.innerHTML = `<img src="${src}" alt="" class="preview__img">`;
        }
        preview.style.display = 'flex';
        preview.style.top = 20 + e.clientY + 'px';
        preview.style.left = 20 + e.clientX + 'px';
      },

      movePreview(e) {
        const preview = document.querySelector('.preview');
        preview.style.top = 20 + e.clientY + 'px';
        preview.style.left = 20 + e.clientX + 'px';
      },

      hidePreview() {
        const preview = document.querySelector('.preview');
        preview.style.display = 'none';
      }
    },
    mounted() {
      const body = document.querySelector('body');
      body.classList.add('body_hidden');
      body.dataset.hijacking = 'on';
      body.dataset.animation = 'catch';
      // eslint-disable-next-line no-undef
      if (document.querySelector('.screenWrapper')) {
        let page = new FullPage('.screenWrapper', {
          // section selector
          section: '.screen',

          // animation options
          animationDuration: 700,
          animationTiming: 'ease',
          animationTranform: 'transform',

          // enable side navigation
          pagination: true,

          // enable keyboard navigation
          keyboard: true,

          // enable touch events
          touch: true,

          // touch limit in ms
          touchLimit: 100,

          // infinite loop
          loop: false,

          // callbacks
          onLeave: null,
          afterLoad: null
        });
        const moveNext = document.querySelector('.moveNext');
        moveNext.addEventListener('click', () => {
          page.moveTo(1);
        });
      }


      const tabs = document.querySelectorAll('.tabs__navItem');
      tabs.forEach(el => {
        el.addEventListener('click', this.swapTabs);
      });

      modal();
      mediaModal();
      this.preview();
    }
  };
</script>

<style lang="scss">
  @import '../../scss/auth/home/modals/modal/modal';

  #app {
    height: 100%;
  }

  .preview__img, .preview__video {
    width: 100%;
  }

</style>
<style lang="scss" scoped>
  @import '../../scss/auth/shared';
  @import '../../scss/auth/home';
  @import '../../scss/mixins';

  section {
    margin-bottom: 0;
  }

  .main-home-wrapper {
    height: 100%;
  }

  .body_hidden {
    overflow: hidden;
    height: 100%;
  }

  //text
  .text_1 {
    @include font(20, r, 32px);
    color: $color_titleText;
  }

  .text_3 {
    @include font(14, r, 22px);
  }

  .text_4 {
    @include font(12, r, 18px);
  }

  .text_spec1 {
    @include font(16, b, 26px);
  }

  .text_spec2 {
    @include font(14, s, 22px);
    color: $color_blue1;
  }

  .screenWrapper {
    height: 100%;
  }

  .screen {
    width: 100%;
    height: 100%;
    position: relative;

    &_first {
      background-repeat: repeat;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      background-image: url('../../assets/images/auth/home/bg.png');

      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(7, 4, 29, 0.75);
      }
    }
  }

  .screen__footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .header {
    position: absolute;
    z-index: 2;

    width: 100%;
    top: 30px;
  }

  .header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .lang {
    color: $color_white;
    @include font(14, r, 19px);
    width: 140px;
  }

  .lang__title {
    margin-bottom: 6px;
  }

  .signInBtn {
    text-transform: uppercase;
  }

  .mainContent {
    color: $color_white;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .mainContent__title {
    color: $color_white;
    text-transform: uppercase;
    line-height: 49px;
  }

  .mainContent__desc {
    margin-top: 41px;
    margin-bottom: 53px;
    text-align: center;
    @include font(24, r, 33px);
  }

  .users-counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
    margin-bottom: 15px;
  }

  .users-counter__num {
    @include font(24, b, 33px);
    color: $color_white;
  }

  .users-counter__text {
    @include font(12, b, 16px);
    text-transform: uppercase;
    color: $color_white;
    margin-top: 9px;
    text-align: center;
  }

  .moveNext {
    display: block;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .tabs {
    padding: 35px 0;
  }

  .tabs__nav {
    display: flex;
    margin-bottom: 23px;
  }

  .tabs__navItem {
    margin-right: 40px;
    font-size: 16px;
    position: relative;
    transition: 0.2s linear;
    cursor: pointer;

    &::after {
      content: '';
      width: 0;
      height: 2px;
      position: absolute;
      top: calc(100% + 5px);
      left: 0;
      background: $color_blue2;
      transition: 0.2s linear;
    }

    &.active {
      color: $color_blue2;

      &::after {
        width: 100%;
      }
    }
  }

  .tabs__wrapper {
    display: none;
    flex-direction: column;

    &.active {
      display: flex;
    }
  }

  .tabBtn {
    align-self: center;
    margin-top: 20px;
  }

  .secondFooter__bottom {
    background: #252525;
  }

  .secondFooter__top {
    background: $color_grey1;
  }

  .secondFooter__col {
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .secondFooter__botWrap {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .secondFooter__topWrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 26px 0;
  }

  .secondFooter__topLink {
    @include font(14, r, 19px);
    color: $color_mainText;
    margin-top: 10px;
  }

  .secondFooter__botGroup {
    @include font(12, r, 16px);
    display: flex;
    color: $color_white;
  }

  .secondFooter__botLink {
    @include font(12, r, 16px);
    color: $color_white;
    opacity: 0.5;

    &:first-child {
      margin-right: 40px;
    }

    &:hover {
      color: $color_white;
      opacity: 1;
      text-decoration: none;
    }
  }

  .secondFooter__social {
    opacity: 0.5;

    &:not(:last-child) {
      margin-right: 20px;
    }

    &:hover {
      opacity: 1;
    }
  }
</style>
