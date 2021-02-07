<template lang="pug">
  .tooltip(ref="tooltip", v-on:mouseenter="this.showTooltip" v-on:mouseleave="this.hideTooltip")
    svg.tooltip__icon(width='16' height='16' viewbox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg')
      circle(cx='8' cy='8' r='7.5' fill='white' stroke='#81A6C3')
      rect(x='7' y='6' width='2' height='6' fill='#81A6C3')
      rect(x='7' y='3' width='2' height='2' fill='#81A6C3')
    .tooltip__info.tooltip__info_hidden(v-html="text")
</template>

<script>
  import '../scss/style.scss';

  export default {
    name: 'Tooltip',
    props: {
      text: String
    },
    mounted() {
      this.info = this.$el.querySelector('.tooltip__info');
    },
    methods: {
      showTooltip() {
        this.info.classList.remove('tooltip__info_hidden');
        this.info.classList.add('fadeIn');
        this.info.classList.remove('fadeOut');
      },

      hideTooltip() {
        this.info.classList.add('fadeOut');
        this.info.classList.remove('fadeIn');
      }

    }
  };
</script>

<style lang="scss" scoped>
  .tooltip {
    position: relative;
    width: 16px;
    height: 16px;

    &:hover {
      .tooltip__icon {
        fill: #4a6c87;
        circle {
          stroke: #4a6c87;
        }

        rect {
          fill: #4a6c87;
        }
      }
    }

    &__info {
      position: absolute;
      line-height: 19px;
      background: #ffffff;
      border: 1px solid $blue1;
      border-radius: 3px;
      width: 250px;
      padding: 6px 10px;
      top: 8px;
      left: 8px;
      z-index: 5;

      &_hidden {
        visibility: hidden;
      }
    }

    &__icon {
      transition: linear 0.1s;
    }
  }
</style>
