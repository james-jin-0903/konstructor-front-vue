<template lang="pug">
  .select-component(v-click-outside="hide")
    .select-component__wrap(:class="showList ? 'select-component__wrap_focus' : ''")
      input(
        v-if="!isSelectedItemVisible"
        v-model="searchQuery"
        :disabled="disabled"
        type='text',
        ref='input',
        :placeholder="placehold",
        @click="showList = true",
        @input="autocomplete",
      ).select-component__input
      .select-component__input.select-component__input_with-item(v-else @click="resetSelectedItem")
        template(v-if="type === 'object'")
          Object(:name="selectedItem.name")
        template(v-if="type === 'user'")
          Avatar(
            :name="selectedItem.name"
            :initials="selectedItem.initials"
            :fill-level="selectedItem.fillLevel"
          )
    .select-component__list-wrap
      PerfectScrollbar
        transition(name="slide")
          .select-component__list(v-if="showList")
            .select-component__list-item(
              v-for="item in listItems"
              @click="selectItem(item)"
              :key="`obj${item.name}`"
            )
              template(v-if="type === 'object'")
                Object(:name="item.name")
              template(v-if="type === 'user'")
                Avatar(
                  :name="item.name"
                  :initials="item.initials"
                  :fill-level="item.fillLevel"
                )
</template>

<script>
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
  import Avatar from '@/components/Avatar';
  import Object from '../Object';

  export default {
    name: 'InputObjects',
    components: {
      Object,
      Avatar,
      PerfectScrollbar
    },
    props: {
      items: Array,
      placehold: String,
      value: String,
      disabled: Boolean,
      type: {
        type: String,
        default: () => 'object'
      }
    },
    data() {
      return {
        showList: false,
        listItems: [],
        searchQuery: '',
        selectedItem: null
      };
    },
    computed: {
      isSelectedItemVisible() {
        return this.selectedItem !== null;
      }
    },
    watch: {
      items(newItems) {
        this.listItems = [...newItems];
      }
    },
    methods: {
      hide() {
        this.showList = false;
      },
      selectItem(item) {
        this.selectedItem = { ...item };
        this.hide();
        this.$emit('input', this.selectedItem);
      },
      resetSelectedItem() {
        this.selectedItem = null;
      },
      autocomplete(e) {
        this.showList = true;
        this.listItems = this.items.filter(el => {
          let str = this.$refs.input.value.toUpperCase();
          if (el.name.toUpperCase().indexOf(str) !== -1) {
            return el;
          }
        }).splice(0, 4);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .slide-enter-active {
    animation: slideToggle .3s linear;
  }

  .slide-leave-active {
    animation: slideToggle .2s linear reverse;
  }

  @keyframes slideToggle {
    0% {
      max-height: 0;
    }
    100% {
      max-height: 180px;
    }
  }

  .select-component {
    position: relative;
    display: flex;
    width: auto;
    font-size: 16px;
    line-height: 22px;

    &:hover {
      .select-component__btn {
        background: rgba(247, 247, 247, 0.8);
      }
    }

    &__wrap {
      background: #ffffff;
      border: 1px solid #dfe4eb;
      border-radius: 3px;
      display: flex;
      width: 100%;
      &_focus {
        border-color: #81a6c3;
      }
    }

    &__input {
      border: none;
      width: 100%;
      border-radius: 4px;
      padding: 7px 9px;
      &_width-item {
        padding: 3px;
      }
      &::placeholder {
        color: $gray3;
      }
    }

    &__list-wrap {
      position: absolute;
      top: calc(100%);
      width: 100%;
      box-shadow: inset 0 0 0 1px #81a6c3;
      background: #ffffff;
      z-index: 9;
      border-radius: 3px;
    }

    &__list {
      max-height: 180px;  
    }

    &__list-item {
      padding: 3px;
      cursor: pointer;
      margin: 1px;
      &:hover {
        background-color: #e9eaed;
      }
    }
  }
</style>
