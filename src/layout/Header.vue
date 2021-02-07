<template lang="pug">
  header.header(class=this.class)
    .header__top.headerTop.header__top_hovered
      .container.headerTop__wrapper
        .headerTop__info
          Avatar(:image="images.testImage").headerTop__avatar.avatar_big
          .headerTop__infoWrap
            router-link(to="/dream").headerTop__infoItem.headerTop__infoItem_dream
              img.headerTop__infoIcon(src="../assets/images/icon_crown-head.svg")
              .headerTop__infoText 999К
            router-link(to="/finances").headerTop__infoItem.headerTop__infoItem_cash
              img.headerTop__infoIcon(src="../assets/images/icon_cards-head.svg")
              .headerTop__infoText $999К
            .headerTop__infoItem.headerTop__infoItem_rate
              .headerTop__infoText 25%
        .headerTop__menu.headerMenu
          router-link(to="/groups" :class="{'headerMenu__item_active': currentPath.includes('groups')}").headerMenu__item
            img.headerMenu__icon(:src="images.icons.group")
            .headerMenu__label Groups
          router-link(to="/ideas" v-bind:class="{'headerMenu__item_active': this.currentPath.includes('ideas')}").headerMenu__item
            img.headerMenu__icon(:src="images.icons.idea")
            .headerMenu__label Ideas
          router-link(to="/investments" :class="{'headerMenu__item_active': currentPath.includes('investments')}").headerMenu__item
            img.headerMenu__icon(:src="images.icons.investment")
            .headerMenu__label Investments
          router-link(to="/services" :class="{'headerMenu__item_active': currentPath.includes('srvices')}").headerMenu__item
            img.headerMenu__icon(:src="images.icons.service")
            .headerMenu__label Services
          router-link(to="/goods" :class="{'headerMenu__item_active': currentPath.includes('goods')}").headerMenu__item
            img.headerMenu__icon(:src="images.icons.goods")
            .headerMenu__label Goods
          router-link(to="/files" :class="{'headerMenu__item_active': currentPath.includes('files')}").headerMenu__item
            img.headerMenu__icon(:src="images.icons.files")
            .headerMenu__label Files
          router-link(to="/settings" v-show="!settingChilds[$route.name]").headerMenu__item.headerMenu__item-lg
            img.headerMenu__icon(:src="images.icons.settings")
            .headerMenu__label Settings
          .headerMenu__item.headerMenu__dropdown(v-show="settingChilds[$route.name] == true" :class="{'headerMenu__item_active': currentPath.includes('settings')}")
            img.headerMenu__icon(:src="images.icons.settings")
            .headerMenu__label Settings
            .headerMenu__dropList
              .headerMenu__dropWrap
                router-link(to="/jobs" :class="{'headerMenu__item': $route.path.includes('jobs')}").headerMenu__dropItem
                  img.headerMenu__dropIcon(:src="images.icons.job")
                  .headerMenu__dropName Jobs
                router-link(to="/all-services" :class="{'headerMenu__item': $route.path.includes('all-services')}").headerMenu__dropItem
                  img.headerMenu__dropIcon(:src="images.icons.serviceAll")
                  .headerMenu__dropName All Services
                router-link(to="/marketing" :class="{'headerMenu__item': $route.path.includes('marketing')}").headerMenu__dropItem
                  img.headerMenu__dropIcon(:src="images.icons.marketing")
                  .headerMenu__dropName Marketing
                router-link(to="/t-management" :class="{'headerMenu__item': $route.path.includes('t-management')}").headerMenu__dropItem
                  img.headerMenu__dropIcon(:src="images.icons.tm")
                  .headerMenu__dropName T-Management
                router-link(to="/projects" :class="{'headerMenu__item': $route.path.includes('projects')}").headerMenu__dropItem
                  img.headerMenu__dropIcon(:src="images.icons.task")
                  .headerMenu__dropName Projects
                router-link(to="/contact" :class="{'headerMenu__item': $route.path.includes('contact')}").headerMenu__dropItem
                  img.headerMenu__dropIcon(:src="images.icons.contacts")
                  .headerMenu__dropName Contact
                router-link(to="/stats" :class="{'headerMenu__item': $route.path.includes('stats')}").headerMenu__dropItem
                  img.headerMenu__dropIcon(:src="images.icons.stats")
                  .headerMenu__dropName Stats
                router-link(to="/wish" :class="{'headerMenu__item': $route.path.includes('wish')}").headerMenu__dropItem
                  img.headerMenu__dropIcon(:src="images.icons.wishlist")
                  .headerMenu__dropName Wish List
                router-link(to="/bookmarks" :class="{'headerMenu__item': $route.path.includes('bookmarks')}").headerMenu__dropItem
                  img.headerMenu__dropIcon(:src="images.icons.bookmark")
                  .headerMenu__dropName Bookmarks
                router-link(to="/support" :class="{'headerMenu__item': $route.path.includes('support')}").headerMenu__dropItem
                  img.headerMenu__dropIcon(:src="images.icons.support")
                  .headerMenu__dropName Support
                a(href="javascript:void(0)").headerMenu__dropItem
                  img.headerMenu__dropIcon(:src="images.icons.exit")
                  .headerMenu__dropName Log Out
        .headerTop__nav.headerNav
          router-link(to="/").headerNav__item
            img.headerMenu__icon(:src="images.icons.search")
          .headerNav__item.headerNav__item_friends
            img.headerMenu__icon(:src="images.icons.friends")
          router-link(to="/").headerNav__item
            img.headerMenu__icon(:src="images.icons.cart")
    .header__bottom.headerBottom
      .container.headerBottom__wrapper
        .headerBottom__slider
          .headerBottom__sliderWrap
            - var n = 0
            while n++ < 15
              .headerBottom__slide
                router-link(to="/user")
                  Avatar(initials="AD" fill-level='20').avatar_medium
              .headerBottom__slide
                router-link(to="/user")
                  Avatar(fill-level='80' :image="images.avatar").avatar_medium
              .headerBottom__slide
                router-link(to="/user")
                  Avatar(fill-level='100' :image="images.avatar").avatar_medium
        .headerBottom__buttons
          .headerBottom__prev.headerBottom__arrow
          .headerBottom__next.headerBottom__arrow
</template>

<script>
  import slideToggle from '../utils/slideToggle';
  import slideDown from '../utils/slideDown';
  import { tns } from '../../node_modules/tiny-slider/src/tiny-slider';

  import images from '../components/images';
  import '../scss/style.scss';
  import Avatar from '@/components/Avatar';

  export default {
    name: 'Header',
    components: {
      Avatar
    },
    props: ['black'],
    data() {
      return {
        images,
        class: this.black ? 'header_black' : '',
        currentPath: '',
        settingChilds: {  
          'settings': true,
          'jobs': true,
          'all-services': true,
          'marketing': true,
          't-management': true,
          'projects': true,
          'contact': true,
          'stats': true,
          'wish': true,
          'bookmarks': true,
          'support': true
        }
      };
    },
    mounted() {
      const headerTop = document.querySelector('.header__top');
      const layoutMain = document.querySelector('.layoutMain__main');
      const headerAvatar = document.querySelector('.headerTop__avatar');
      const headerRate = document.querySelector('.headerTop__infoItem_rate');
      const headerCash = document.querySelector('.headerTop__infoItem_cash');
      const dropList = document.querySelector('.headerMenu__dropList');
      headerTop.addEventListener('mouseenter', () => {
        if (layoutMain.scrollTop !== 0) {
          layoutMain.classList.add('layoutMain__main_hovered');
          slideToggle(headerAvatar, '0.2s', '60px', 'flex', 'w');
          slideToggle(headerRate, '0.2s', false, 'flex', 'w');
          slideToggle(headerCash, '0.2s', false, 'flex', 'w');
        }
      });
      headerTop.addEventListener('mouseleave', () => {
        if (layoutMain.scrollTop !== 0) {
          layoutMain.classList.remove('layoutMain__main_hovered');
          slideToggle(headerAvatar, '0.2s', '60px', 'flex', 'w');
          slideToggle(headerRate, '0.2s', false, 'flex', 'w');
          slideToggle(headerCash, '0.2s', false, 'flex', 'w');
          if (dropdown.classList.contains('headerMenu__dropdown_open')) {
            dropdown.classList.remove('headerMenu__dropdown_open');
            headerTop.classList.remove('header__top_drop');
          }
          slideDown(dropList, '0.2s');
        }
      });
      layoutMain.addEventListener('scroll', function() {
        if (
          layoutMain.scrollTop !== 0 &&
          headerTop.classList.contains('header__top_hovered')
        ) {
          headerTop.classList.remove('header__top_hovered');
          layoutMain.classList.remove('layoutMain__main_hovered');
          if (dropdown.classList.contains('headerMenu__dropdown_open')) {
            dropdown.classList.remove('headerMenu__dropdown_open');
            headerTop.classList.remove('header__top_drop');
          }
          slideDown(dropList, '0.2s');
        } else if (layoutMain.scrollTop === 0) {
          headerTop.classList.add('header__top_hovered');
          layoutMain.classList.add('layoutMain__main_hovered');
        }
      });

      const headerRateText = document.querySelector(
        '.headerTop__infoItem_rate .headerTop__infoText'
      );
      const avatarFiller = document.querySelector('.avatar__filler');
      const headerRateVal = headerRateText.innerHTML;
      avatarFiller.style.setProperty('height', headerRateVal);

      const dropdown = document.querySelector('.headerMenu__dropdown');
      dropdown.addEventListener('click', function() {
        if (dropdown.classList.contains('headerMenu__dropdown_open')) {
          dropdown.classList.remove('headerMenu__dropdown_open');
          setTimeout(() => {
            headerTop.classList.remove('header__top_drop');
          }, 300);
        } else {
          dropdown.classList.add('headerMenu__dropdown_open');

          headerTop.classList.add('header__top_drop');
        }
        slideToggle(dropList, '0.3s');
      });

      // const dropItems = document.querySelectorAll('.headerMenu__dropItem');
      // dropItems.forEach(item => {
      //   item.addEventListener('click', function() {
      //     if (dropdown.classList.contains('headerMenu__dropdown_open')) {
      //       dropdown.classList.remove('headerMenu__dropdown_open');
      //       setTimeout(() => {
      //         headerTop.classList.remove('header__top_drop');
      //       }, 300);
      //     }
      //     slideToggle(dropList, '0.3s');
      //   });
      // })

      const friendBtn = document.querySelector('.headerNav__item_friends');
      const headerBottom = document.querySelector('.headerBottom');
      friendBtn.addEventListener('click', function() {
        if (this.classList.contains('headerNav__item_friends_close')) {
          slideToggle(headerBottom, '0.3s');
          this.classList.remove('headerNav__item_friends_close');
        } else {
          slideDown(headerBottom, '0.3s');
          this.classList.add('headerNav__item_friends_close');
        }
      });

      tns({
        container: '.headerBottom__sliderWrap',
        items: 22,
        controlsText: ['', ''],
        nav: false,
        mouseDrag: true,
        swipeAngle: false,
        prevButton: '.headerBottom__prev',
        nextButton: '.headerBottom__next',
        loop: false,
        speed: 400
      });
    },
    watch: {
      $route(to) {
        this.currentPath = to.name || '';
      }
    }
  };
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    position: relative;
    z-index: 5;

    .header__top {
      height: 40px;
      transition: height 0.2s linear;
      background: #252525;
      overflow: hidden;

      &:hover {
        height: 80px;
        overflow: unset;

        .headerMenu__label {
          opacity: 0.5;
        }

        .headerTop__menu {
          padding-top: 10px;
        }

        .headerTop__nav {
          padding-top: 10px;
        }
      }

      &_drop {
        overflow: unset;
      }

      &_hovered.headerTop {
        height: 80px;

        .headerTop__infoItem {
          &_cash {
            display: flex !important;
            width: auto !important;
            cursor: pointer;

            opacity: 0.5;
            transition: opacity 0.5s ease;

            &:hover {
              opacity: 1;
              text-decoration: none;
              color: #fff;
            }
          }

          &_rate {
            display: flex !important;
            width: auto !important;
            opacity: 1 !important;
          }
        }

        .headerTop__avatar {
          display: flex !important;
          width: 60px !important;
          opacity: 1 !important;
        }

        .headerMenu__label {
          opacity: 0.5;
        }

        .headerTop__menu {
          padding-top: 10px;
        }

        .headerTop__nav {
          padding-top: 10px;
        }
      }
    }

    .header__bottom {
      background: #f1f2f7;
    }
  }

  .headerTop {
    display: flex;
    padding-top: 10px;

    .headerTop__wrapper {
      display: flex;
      justify-content: space-between;
    }

    .headerTop__info {
      display: flex;
    }

    .headerTop__infoItem {
      display: flex;
      align-items: center;

      &:not(:last-child) {
        margin-bottom: 7px;
      }

      &_dream {
        text-decoration: none;
        color: #fff;
        opacity: 0.5;
        transition: opacity 0.5s ease;
        cursor: pointer;

        &:hover {
          text-decoration: none;
          color: #fff;
          opacity: 1;
        }
      }

      &_cash {
        text-decoration: none;
        color: #fff;
        display: none;

      }

      &_rate {
        color: #12d09b;
        display: none;
      }
    }

    .headerTop__infoIcon {
      margin-right: 10px;
      min-width: 16px;
    }

    .headerTop__infoText {
      font-size: 12px;
      line-height: 16px;
    }

    .headerTop__avatar {
      margin-right: 10px;
      display: none;
    }
  }

  .headerMenu {
    display: flex;
    transition: 0.2s linear;
    padding-top: 0;

    .headerMenu__item {
      display: flex;
      flex-flow: column;
      align-items: center;
      cursor: pointer;
      text-decoration: none;

      &:not(:last-child) {
        margin-right: 50px;
      }

      &:hover {
        text-decoration: none;

        .headerMenu__icon,
        .headerMenu__label {
          opacity: 1;
        }
      }

      &-lg {
        width: 61px;
        margin-right: 0 !important;
      }
    }

    .headerMenu__icon {
      height: 18px;
      min-height: 18px;
      opacity: 0.5;
    }

    .headerMenu__label {
      margin-top: 5px;
      @include font(12, r, 16px);
      color: #ffffff;
      text-decoration: none;
      opacity: 0;
      transition: opacity 0.2s linear;
    }

    .headerMenu__dropdown {
      position: relative;

      .headerMenu__label {
        display: flex;
        align-items: center;
      }

      .headerMenu__label:after {
        content: '';
        width: 0;
        height: 0;
        margin-left: 9px;
        border-style: solid;
        border-width: 5px 3.75px 0 3.75px;
        border-color: #ffffff transparent transparent transparent;
        transition: 0.3s;
      }

      &_open.headerMenu__dropdown {
        .headerMenu__icon {
          opacity: 1;
        }

        .headerMenu__label {
          opacity: 1;
        }

        .headerMenu__label:after {
          transform: rotate(180deg);
          border-color: #ffffff transparent transparent transparent;
        }
      }
    }

    .headerMenu__dropList {
      position: absolute;
      top: 100%;
      left: 10px;
      display: none;
      overflow: hidden;
      background: #252525;
      z-index: 5;
      cursor: default;
    }

    .headerMenu__dropWrap {
      padding: 20px;
    }

    .headerMenu__dropItem {
      display: flex;
      align-items: center;
      cursor: pointer;

      &:not(:last-child) {
        margin-bottom: 15px;
      }

      &:hover {
        opacity: 0.7;
      }
    }

    .headerMenu__dropIcon {
      margin-right: 9px;
    }

    .headerMenu__dropName {
      color: #ffffff;
      white-space: nowrap;
      font-size: 12px;
      line-height: 16px;
    }
  }

  .header__top.header__top_hovered .headerMenu__item.headerMenu__item_active {
    .headerMenu__icon,
    .headerMenu__label {
      opacity: 1;
    }
  }

  .headerNav {
    display: flex;
    transition: 0.2s linear;
    padding-top: 0;

    .headerNav__item {
      opacity: 0.5;

      &:not(:last-child) {
        margin-right: 28px;
      }

      &:hover {
        opacity: 1;
      }

      &_friends {
        cursor: pointer;

        .headerMenu__icon {
          transition: 0.3s linear;
          transform: rotate(0deg);
        }

        &_close {
          .headerMenu__icon {
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  .headerBottom {
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .headerBottom__wrapper {
    display: flex;
    align-items: center;
    height: 60px;
    justify-content: space-between;
  }

  .headerBottom__slider {
    width: calc(100% - 90px);
  }

  .headerBottom__buttons {
    width: 70px;
    display: flex;
    justify-content: space-between;
  }

  .headerBottom__arrow {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #d8e0e6;

      &::after {
        opacity: 1;
      }
    }

    &::after {
      content: '';
      border: solid #81a6c3;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 5px;
      opacity: 0.6;
      border-radius: 2px;
    }
  }

  .headerBottom__prev {
    &::after {
      transform: rotate(135deg);
      margin-left: 5px;
    }
  }

  .headerBottom__next {
    &::after {
      transform: rotate(-45deg);
      margin-right: 5px;
    }
  }

  .headerBottom__sliderWrap {
    display: flex;
  }

</style>
