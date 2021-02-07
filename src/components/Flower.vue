<template lang="pug">
  .flower(v-click-outside="closeTooltip")
    .flower__toggle(@click="toggleTooltip")
    transition(name="fade")
      ul.flower__tooltip(v-if="tooltipVisible" ref="tooltip")
        li.flower__item(@click="itemSelect")
          span.icon.flower__icon
            img(src="../assets/images/icon_peoples.svg")
          span.flower__text Новое сообщество
        li.flower__item(@click="itemSelect")
          span.icon.flower__icon
            img(src="../assets/images/icon_diamond.svg")
          span.flower__text Новое событие
        li.flower__item(@click="itemSelect")
          span.icon.flower__icon
            img(src="../assets/images/icon_mail.svg")
          span.flower__text Новое письмо
        li.flower__item(@click="itemSelect")
          span.icon.flower__icon
            img(src="../assets/images/icon_mail.svg")
          span.flower__text Новая транзакция
        li.flower__item(@click="itemSelect")
          span.icon.flower__icon
            img(src="../assets/images/icon_file.svg")
          span.flower__text Новый документ
</template>

<script>
  export default {
    name: 'Flower',
    data() {
      return {
        tooltipVisible: false
      };
    },
    methods: {
      toggleTooltip() {
        this.tooltipVisible = !this.tooltipVisible;
      },
      closeTooltip() {
        this.tooltipVisible = false;
      },
      itemSelect() {
        this.tooltipVisible = false;
      }
    }
  };
</script>

<style lang="scss" scoped>

  .flower {
    position: relative;
    &__toggle {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: url('../assets/images/icon_action.png');
      background-size: cover;
      background-position: center;
      cursor: pointer;

      &:hover {
        background-image: url('../assets/images/icon_action_h.png');
      }
    }

    &__icon {
      min-width: 20px;
      margin-right: 7px;
    }

    &__tooltip {
      background: white;
      list-style: none;
      padding: 0;
      min-width: 176px;
      position: absolute;
      right: 50%;
      top: 50%;
      border: 1px solid $blue1;
      box-sizing: border-box;
      border-radius: 3px;
      z-index: 1;
    }

    &__item {
      cursor: pointer;
      padding: 4px 10px;
      display: flex;
      flex-wrap: nowrap;
      white-space: nowrap;
      &:first-child {
        border-bottom: 1px solid $gray2;
      }
      &:hover {
        background: $gray1;
      }
    }

    &__text {
      flex: 1;
    }
  }
</style>
