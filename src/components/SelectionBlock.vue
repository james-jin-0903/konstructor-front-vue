<template lang="pug">
  .selection-block(@mouseenter="onEnter" @mouseleave="onLeave")
    transition( name="fade")
      .selection-block__unhovered(v-if="!hovered" @click="singleCheck" :class="item.check && 'selection-block__unhovered_active'")
        .selection-block__label {{name}}
        img.selection-block__img(:src="image")
        .selection-block__overlay
    transition( name="fade")
      .selection-block__hovered(v-if="hovered")
        PerfectScrollbar
          transition(name="fade")
            .selection-block__checklist(v-if="!adding")
              label.checkbox-wrapper(v-for="(child, index) in item.children" :key="'check' + index")
                input(:id="child.id" :name="child.id" type="checkbox" @change="checkStatuses($event, index)"  v-model="item.children[index].is_selected")
                span.checkbox-wrapper__icon {{child.name}}
              .selection-block__add-wrap(@click="handleAddNew")
                img.selection-block__add-icon(src="../assets/images/icon_plus.svg")
                .selection-block__add-text Добавить {{typeLabel[0]}}
            .selection-block__add(v-else)
              .field.add-selection__field
                .field__title {{capitalizeFirstLetter(typeLabel[0])}}:
                .input
                  input.input__input(type="text" placeholder="Введите название"  v-model='newItem')
              .group-button
                button(@click="addItem(item.id)" :disabled="!newItem" type="button").selection-block__add-submit.button.button_medium.button_default
                  span Добавить
                button(@click="adding = false" type="button").selection-block__add-cancel.button.button_medium.button_neutral
                  span Отменить


</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
import { capitalizeFirstLetter } from '@/utils/strings';

export default {
  props: {
    name: String,
    image: String,
    index: Number,
    value: Object,
    typeLabel: Array,
  },
  components: {
    PerfectScrollbar,
  },
  data() {
    return {
      adding: false,
      hovered: false,
      newItem: '',
      item: {},
    };
  },
  created() {
    this.item = { ...this.value };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return capitalizeFirstLetter(string);
    },
    onEnter() {
      this.hovered = true;
    },
    onLeave() {
      this.hovered = false;
    },
    addItem(parentId) {
      if (this.newItem !== '') {
        const data = {
          parent_id: parentId,
          name: this.newItem,
          is_selected: false,
        };
        this.adding = false;
        this.item.children = [...this.item.children, data];
        this.newItem = '';
        this.$emit('change', this.item);
      }
    },
    checkStatuses(event, index) {
      const state = event.target.checked;
      this.item.children[index].is_selected = state;
      this.item.is_selected = this.item.children.length
        ? this.item.children.some(child => child.is_selected)
        : state;
      this.$emit('change', { index: this.index, data: this.item });
    },
    singleCheck() {
      if (this.item.children.length === 0) {
        this.item.check = !this.item.check;
        this.$emit('change', { index: this.index, data: this.item });
      }
    },
    handleAddNew() {
      this.adding = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.selection-block {
  height: 158px;
  border-radius: 3px;
  cursor: pointer;
  position: relative;

  &__unhovered {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    background: #dfe4eb url('../assets/images/icon_konstruktor.png') no-repeat center;

    &:hover {
      .selection-block__overlay {
        opacity: 0;
      }

      .selection-block__label {
        text-shadow: 0 0 3px black;
      }
    }

    &_active {
      .selection-block__overlay {
        opacity: 0;
      }

      .selection-block__label {
        text-shadow: 0 0 3px black;
      }
    }
  }

  &__label {
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    text-transform: uppercase;
    position: absolute;
    top: 50%;
    left: 50%;
    color: white;
    transform: translate(-50%, -50%);
    z-index: 2;
    transition: all 0.2s ease-in-out;
    text-shadow: 0 0 3px transparent;
  }

  &__img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    min-height: 100%;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    opacity: 1;
    background: rgba(7, 4, 29, 0.5);
    transition: all 0.2s ease-in-out;
  }

  &__hovered {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
    border: 1px solid #d8e0e6;
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: #666666;
    font-size: 16px;
    line-height: 22px;
  }

  &__checklist {
    padding: 20px;
    max-height: 158px;
    cursor: default;
  }

  &__add-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
  }

  &__add-icon {
    width: 16px;
    height: 16px;
    margin-right: 7px;
  }

  &__add {
    padding: 20px;
    cursor: default;
  }

  &__add-submit {
    margin-right: 10px;
  }
}
.checkbox-wrapper {
  display: block;
  margin-bottom: 12px;
}

.group-button {
  display: flex;
  align-items: center;
  margin-top: 29px;
}
</style>
