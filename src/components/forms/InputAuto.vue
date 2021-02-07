<template lang="pug">
  .select-component(v-click-outside="hide")
    .select-component__wrap(:class="showList ? 'select-component__wrap_focus' : ''")
      input(
        :disabled="disabled"
        type='text',
        ref='input',
        :value="value",
        :placeholder="placehold",
        @click="onClick",
        @input="autocomplete",
        @blur="checkField"
      ).select-component__input
    .select-component__list-wrap
      PerfectScrollbar
        transition(name="slide")
          .select-component__list(v-if="showList")
            .select-component__list-item(v-for="(item, index) in listItems" @click="changeSelect(item)" v-html='item' :key="index")
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar';

export default {
  props: {
    items: Array,
    placehold: String,
    value: String,
    disabled: Boolean
  },
  components: {
    PerfectScrollbar
  },
  data() {
    return {
      showList: false,
      listItems: []
    };
  },
  mounted() {
    this.listItems = [...this.items];
    if (this.value) {
      this.changeSelect(this.value);
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
    changeSelect(str) {
      this.$refs.input.value = str.replace('<b>', '').replace('</b>', '');
      this.showList = false;
      this.$emit('input', this.$refs.input.value);
    },
    onClick() {
      this.showList = true;
    },
    autocomplete(e) {
      this.showList = true;
      this.listItems = this.items.filter(el => {
        let str = this.$refs.input.value.toUpperCase();
        if (el.toUpperCase().indexOf(str) !== -1) {
          return el;
        }
      });
      this.listItems = this.listItems.map(el => {
        const str = this.$refs.input.value.toUpperCase();
        const index = el.toUpperCase().indexOf(str);
        const newStr = el.slice(index, index + str.length);
        return el.replace(newStr, newStr.bold());
      });
      this.$emit('input', e.target.value);
    },
    checkField() {
      this.items.forEach(el => {
        if (el.toUpperCase() === this.$refs.input.value.toUpperCase()) {
          this.$refs.input.value = el;
        }
      });
      this.$emit('input', this.$refs.input.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-enter-active {
  animation: slideToggle 0.2s;
}

.slide-leave-active {
  animation: slideToggle 0.2s reverse;
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
    z-index: 3;
    border-radius: 3px;
  }

  &__list {
    max-height: 180px;
  }

  &__list-item {
    padding: 10px 20px;
    cursor: pointer;
    margin: 1px;
    &:hover {
      background-color: #e9eaed;
    }
  }
}
</style>
