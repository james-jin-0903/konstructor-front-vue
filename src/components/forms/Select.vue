<template lang="pug">
  .select(:class="selectClass")
    input(type="hidden" value=selectValue :name="name").select__input
    .select__wrapper(v-on:click="this.toggleDropdown")
      span(v-if="selectIcon")
        img(:src="selectIcon").select__icon
      .select__text(class=placeholderClass) {{selectText}}
    .select__dropdown
      .option(
        v-for="(option, index) in selectOptions"
        v-if="!option.selected"
        @click="selectOption(option.val)"
        :data-value="option.val"
        :class="option.class"
        :key="index"
      )
        span(v-if="option.icon")
          img(:src="option.icon").option__icon
        .option__text {{option.text}}
        .option__text {{option.selected}}
</template>

<script>
  import '../../scss/style.scss';
  import slideToggle from '../../utils/slideToggle';
  import slideDown from '../../utils/slideDown';
  import clickOutside from '../../utils/clickOutside';
  import PerfectScrollbar from 'perfect-scrollbar';

  export default {
    name: 'Select',
    props: [
      'className',
      'small',
      'val',
      'text',
      'options',
      'icon',
      'placeholder',
      'name',
      'defaultValue'
    ],
    mounted() {
      const dropdown = this.$el.querySelector('.select__dropdown');
      clickOutside(this.$el, () => {
        this.closeDropdown(this.$el);
      });
      this.ps = new PerfectScrollbar(dropdown);
      if (this.defaultValue) {
        this.selectOptions = this.options.filter(
          l => l.val !== this.defaultValue
        );
        this.selectOption(this.defaultValue, true);
      } else {
        this.selectIcon = this.icon;
        this.selectOptions = this.options;
      }
    },
    watch: {
      defaultValue: function(newVal) {
        if (newVal) {
          this.selectOption(newVal, true);
        }
      },
      options(newVal) {
        this.selectOptions = newVal;
      }
    },
    data() {
      return {
        selectIcon: '',
        selectValue: this.val ? this.val : this.text,
        selectText: this.text || '',
        selectClass: this.small
          ? 'select_small ' + (this.className ? this.className : '')
          : this.className,
        placeholderClass: this.text && this.text.length ? 'select__text_plh' : '',
        selectOptions: []
      };
    },
    computed: {},
    methods: {
      selectOption(value, preventEmit) {
        this.selectValue = value;
        const selectedOption = this.options.find(option => option.val === value);
        this.selectText = selectedOption ? selectedOption.text : '';
        this.selectOptions = this.options.filter(l => l.val !== value);
        this.selectIcon = selectedOption && selectedOption.icon;
        if (!preventEmit) {
          this.$emit('change', {
            name: this.name,
            label: this.selectText,
            value: this.selectValue
          });
        }
        this.closeDropdown();
      },

      toggleDropdown(event) {
        const target = event.currentTarget;
        const select = this.$el;
        const dropdown = select.querySelector('.select__dropdown');
        if (this.options.length === 1) {
          return;
        }
        slideToggle(dropdown, '0s');
        setTimeout(() => {
          this.ps.update();
        }, 0);
        if (target.classList.contains('select__wrapper_open')) {
          target.classList.remove('select__wrapper_open');
        } else {
          target.classList.add('select__wrapper_open');
        }

        if (dropdown.classList.contains('select__dropdown_open')) {
          dropdown.classList.remove('select__dropdown_open');
        } else {
          dropdown.classList.add('select__dropdown_open');
        }
      },

      closeDropdown() {
        const dropdown = this.$el.querySelector('.select__dropdown');
        const wrapper = this.$el.querySelector('.select__wrapper');

        if (wrapper.classList.contains('select__wrapper_open')) {
          wrapper.classList.remove('select__wrapper_open');
          slideDown(dropdown, '0.3s');
        }

        if (dropdown.classList.contains('select__dropdown_open')) {
          dropdown.classList.remove('select__dropdown_open');
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .select {
    height: 36px;
    position: relative;
    z-index: 3;
    color: #444444;

    @include font(16, r, 22px);

    &_small {
      height: 30px;
      @include font(14, r, 19px);

      .option {
        height: 30px;
      }
    }

    &__wrapper {
      height: 100%;
      padding: 0 10px;
      background: white;
      border: 1px solid $gray2;
      border-radius: 3px;
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      transition: 0.3s;

      &::after {
        content: "";
        width: 0;
        height: 0;
        margin-left: auto;
        border-style: solid;
        border-width: 5px 4px 0 4px;
        border-color: #81a7c3 transparent transparent transparent;
        transition: 0.3s;
      }

      &_open {
        border-radius: 3px 3px 0 0;
        border-color: $blue1;
        border-bottom-color: $gray2;

        &::after {
          transform: rotate(180deg);
          border-color: #4a6c87 transparent transparent transparent;
        }
      }
    }

    &__text {
      margin-right: 10px;

      &_plh {
        color: #b2bcca;
      }
    }

    &__icon {
      margin-right: 10px;
      display: block;
    }

    &__dropdown {
      display: none;
      position: absolute;
      overflow: hidden;
      top: calc(100%);
      height: 0;
      left: 0;
      width: 100%;
      background-color: white;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
      z-index: 2;
      max-height: 144px;

      &_open {
        border: 1px solid $blue1;
        border-top: none;
        border-radius: 0 0 3px 3px;
      }
    }
  }

  .option {
    height: 36px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: #d8e0e6;
    }

    &__icon {
      margin-right: 10px;
    }
  }
</style>
