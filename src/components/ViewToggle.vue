<template lang="pug">
  button(
    type="button"
    :class="{ 'toggle--dropdown': hasDropdown }"
    @click="toggleView"
  ).toggle
    .toggle__icon
      img(v-if="currentView === views.BLOCK" :src="images.icons.viewBlock")
      img(v-if="currentView === views.LIST" :src="images.icons.viewList")
    transition(name="fade" :duration="{ enter: 500, leave: 0 }")
      ul.toggle__dropdown(v-if="isDropdownVisible").dropdown
        li(@click.stop="changeView(views.BLOCK)").dropdown__item
          span.dropdown__icon: BlockIcon(color="white" stroke="#B2BCCA")
          span.dropdown__text Режим блоков
        li(@click.stop="changeView(views.LIST)").dropdown__item
          span.dropdown__icon: ListIcon(color="#B2BCCA")
          span.dropdown__text Режим строк
</template>

<script>
  import images from '@/components/images';
  import { ViewTypes } from '@/utils/constants';
  import BlockIcon from '@/components/icons/BlockIcon.vue';
  import ListIcon from '@/components/icons/ListIcon.vue';

  const DEFAULT_VIEW = ViewTypes.BLOCK;

  export default {
    name: 'ViewToggle',
    components: {
      BlockIcon,
      ListIcon
    },
    props: {
      hasDropdown: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        images,
        currentView: DEFAULT_VIEW,
        views: ViewTypes,
        viewsList: [
          {
            icon: BlockIcon.default,
            text: 'Режим блоков'
          },
          {
            icon: images.icons.menu,
            text: 'Режим строк'
          }
        ],
        isDropdownVisible: false
      };
    },
    methods: {
      toggleView() {
        if (this.hasDropdown) {
          this.isDropdownVisible = !this.isDropdownVisible;
          return;
        }
        this.changeView();
      },
      changeView(view) {
        if (view) {
          this.currentView = view;
        } else {
          this.currentView = this.currentView === this.views.BLOCK ? this.views.LIST : this.views.BLOCK;
        }
        if (this.hasDropdown) {
          this.isDropdownVisible = false;
        }
        this.$emit('change', this.currentView);
      }
    }
  };
</script>

<style scoped lang="scss">
  .toggle {
    background: #444444;
    border-radius: 20px;
    border: none;
    padding: 4px 24px 4px 10px;
    height: 30px;
    width: 50px;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;

    &__icon {
      width: 16px;
    }

    &__dropdown {
      position: absolute;
      padding: 0;
      left: 50%;
      top: 50%;
      border-radius: 3px;
      border: 1px solid $blue1;
      background: $white;
      @include font(14, r, 19px);
      color: $gray6;
    }

    &:before,
    &:after {
      content: '';
      position: absolute;
      background: url("../assets/images/icon_arrow-up.svg") no-repeat center;
      width: 10px;
      height: 15px;
      right: 9px;
      top: 3px;
    }

    &:after {
      transform: rotate(180deg);
      top: 12px;
      transform-origin: center;
      right: 8px;
    }

    &--dropdown {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      &:before, &:after {
        content: none;
      }
    }
  }

  .dropdown {
    &__icon {
      display: flex;
    }
    &__text {
      text-align: left;
    }
  }
</style>
