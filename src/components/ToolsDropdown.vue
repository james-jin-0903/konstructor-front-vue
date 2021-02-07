<template lang="pug">
  .tools-dropdown(v-bind:class="{'tools-dropdown_left': placeOnLeft, 'tools-dropdown_no-bg': noBackground}")
    button(type="button" @click.stop="toggleDropdown" :class="isDropdownVisible ? 'tools-dropdown__toggle_active' : ''").tools-dropdown__toggle
      span
      .tools-dropdown__badge(v-if="badgeCount && !isDropdownVisible")
        span.dropdown__counter.counter {{ badgeCount }}
    transition(name="fade" :duration="{ enter: 500, leave: 0 }")
      ul(v-if="isDropdownVisible").tools-dropdown__list.dropdown
        li(
          v-for="tool of tools"
          :key="tool.type"
          v-bind:class="{'dropdown__item_parent': tool.children && tool.children.length }"
          @click="selectItem(tool.type)"
        ).dropdown__item
          span(v-if="tool.icon").dropdown__icon.tools-dropdown__icon
            img(:src="tool.icon")
          span.dropdown__text {{tool.text}}
          span(v-if="tool.count").dropdown__counter.counter {{tool.count}}
          ul.dropdown.dropdown_children(v-if="tool.children && tool.children.length")
            li(
              v-for="childTool of tool.children"
              :key="childTool.type"
              @click="selectItem(childTool.type)"
            ).dropdown__item
              span(v-if="childTool.icon").dropdown__icon.tools-dropdown__icon
                img(:src="childTool.icon")
              span.dropdown__text {{childTool.text}}
              span(v-if="childTool.count").dropdown__counter.counter {{childTool.count}}
</template>

<script>
import '../scss/style.scss';
import clickOutside from '../utils/clickOutside';

export default {
  name: 'ToolsDropdown',
  props: {
    tools: Array,
    className: String,
    placeOnLeft: Boolean,
    noBackground: Boolean,
    badgeCount: {
      type: Number,
      default: () => null
    }
  },
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  },
  data() {
    return {
      isDropdownVisible: false
    };
  },
  mounted() {
    clickOutside(this.$el, () => {
      if (this.isDropdownVisible) {
        this.isDropdownVisible = false;
        this.$emit('close');
      }
    });
  },
  methods: {
    selectItem(type) {
      this.isDropdownVisible = false;
      this.$emit('select', { type });
    },
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
      this.$emit(this.isDropdownVisible ? 'open' : 'close');
    },
  },
};
</script>

<style lang="scss" scoped>
.tools-dropdown {
  position: relative;
  width: 30px;
  height: 30px;

  &__toggle {
    width: 30px;
    height: 30px;
    background: url('../assets/images/icon_options.svg') no-repeat center;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.5s ease, background-color 0.5s ease;
    position: relative;

    &:hover,
    &_active {
      background-color: #F1F2F7;
      opacity: 1;
    }
  }

  &__badge {
    position: absolute;
    bottom: -5px;
    right: -5px;
  }

  &__list {
    position: absolute;
    left: 15px;
    top: 15px;
  }

  &__list {
    position: absolute;
    left: 15px;
    top: 15px;
  }

  &__count {
    font-size: 12px;
    line-height: 16px;
    background: #f9ca7a;
    border-radius: 20px;
    padding: 0 4px;
    margin-left: 8px;
  }

  &_no-bg .tools-dropdown__toggle:hover {
    background-color: transparent;
  }

  &_flower .tools-dropdown__toggle {
    background: linear-gradient(90deg, #f09819 0%, #ff512f 100%);
    opacity: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:before {
      content: '';
      display: block;
      width: 9px;
      height: 16px;
      background: url('../assets/images/icon_flash-new.svg') no-repeat center;
    }

    background-size: cover;

    &:hover {
      background: linear-gradient(90deg, #d88917 0%, #e6492a 100%);
    }

    &__icon {
      width: 16px;
      display: flex;
      justify-content: center;
    }
  }

  &_left .tools-dropdown__list {
    left: auto;
    right: 15px;
  }
}
</style>
