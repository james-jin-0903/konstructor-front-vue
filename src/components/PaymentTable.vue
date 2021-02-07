<template lang="pug">
  .table-component
    .table-component__header
      .table-component__title Счета
      Tooltip(:text="'Тут будет текст с описанием того, для чего пользователю вводить эти данные.'")
      .table-component__counter {{`${this.workList.length} ${this.countWord}`}}
      img.table-component__add(src='../assets/images/icon_plus.svg' @click="onAddEmail")
    .table-component__table
      .table-component__thead
        .table-component__col.payment__platform Платформа
        .table-component__col.payment__requisites Реквизиты
        .table-component__col.payment__action

      .table-component__tbody
        .table-component__row(v-for="(row, index) in workList" :key="index")
          .table-component__row-item.payment__platform
            Avatar(:initials="row.platform.slice(0, 1)")
            .table-component__text.payment__platform-text {{row.platform}}
            .table-component__main-item(v-if="row.main") (основной счет)
          .table-component__row-item.payment__requisites
            .table-component__text.payment__requisites-text() {{row.showRqst}}

          .table-component__row-item.payment__action
            .table-component__action.table-action(v-if="row.main" @click="onEditEmail(row.id)")
              .table-action__wrapper(rel="Редактировать")
                img.payment__action-icn.table-action__action-icn_edit(src='../assets/images/icon_edit.png')
            .table-component__action.table-action(v-else @click="handleToogleTooltip(row, $event)")
              .table-action__wrapper(rel="Опции")
                img.payment__action-icn(src='../assets/images/icon_options.svg')
        .table-component__empty(v-if="workList.length === 0")
          span У Вас пока нет ни одного счета. Вы можете добавить его, нажав
          img(src='../assets/images/icon_plus.svg')
          span возле заголовка таблицы
        transition(name="fade")
          .table-component__tooltip(v-if="tooltipToggle" ref="tooltip" v-click-outside="closeTooltip")
            .table-component__tooltip-item(@click="onEditEmail()")
              img.table-component__tooltip-icn.table-component__tooltip-icn_edit(src='../assets/images/icon_edit.png')
              .table-component__tooltip-text Редактировать
            .table-component__tooltip-item(@click="onRemoveEmail()")
              img.icon-delete.table-component__tooltip-icn(src='../assets/images/icon_remove.svg')
              .table-component__tooltip-text Удалить
    button.button.button_default.table-component__submit(:class="!disablePoint && 'button_disabled'")
      span Сохранить


</template>

<script>
  import Tooltip from './Tooltip.vue';
  import { mapGetters, mapActions } from 'vuex';
  import Avatar from '@/components/Avatar';

  export default {
    components: {
      Avatar,
      Tooltip: Tooltip
    },
    props: {
      changed: Boolean
    },
    data() {
      return {
        tooltipToggle: false,
        currentId: 0,
        currentItem: {},
        disablePoint: false
      };
    },
    computed: {
      ...mapGetters({
        getList: 'payment/getList'
      }),
      workList: function() {
        const temp = [...this.getList].sort((a, b) => {
          if (a.main) {
            return -1;
          } else if (b.main) {
            return 1;
          } else {
            return 0;
          }
        });

        return temp.map(el => {
          if (!el.requisites.email) {
            let newStr = el.requisites.number.split('');
            newStr = newStr.fill('*', 0, newStr.length - 2).join('');
            el.showRqst = newStr;
            return el;
          } else {
            let newStr = el.requisites.email.split('');
            newStr = newStr.fill('*', 3, newStr.length).join('');
            el.showRqst = newStr;
            return el;
          }
        });
      },
      countWord: function() {
        const length = this.workList.length;
        const lastNum = Number(length.toString().slice(-1));

        if (lastNum === 0 || (length > 10 && length < 20)) {
          return 'счетов';
        } else if (lastNum === 1) {
          return 'счет';
        } else if (lastNum === 2 || lastNum === 3 || lastNum === 4) {
          return 'счетa';
        } else {
          return 'счетов';
        }
      }
    },
    mounted() {
      if (this.changed) {
        this.disablePoint = true;
      }
    },
    methods: {
      ...mapActions({
        removePayment: 'payment/removePayment'
      }),
      onAddEmail() {
        this.$root.$emit('windowAdd', {
          toggle: true
        });
      },
      onRemoveEmail() {
        this.removePayment(this.currentId);
        this.tooltipToggle = false;
        this.disablePoint = true;
      },
      onEditEmail(item) {
        this.$root.$emit('windowEdit', {
          toggle: true,
          item: item ? item : this.currentId
        });
      },
      handleToogleTooltip(item, e) {
        if (this.tooltipToggle) {
          this.tooltipToggle = false;
          return;
        } else {
          this.currentId = item.id;
          this.currentItem = item;
          this.tooltipToggle = true;
        }
        this.$nextTick(() => {
          let btn = e.target;
          if (!e.target.classList.contains('tableAction')) {
            btn = btn.closest('.table-action');
          }
          const topValue = btn.offsetTop;
          this.$refs.tooltip.style.top = topValue + 13 + 'px';
        });
      },
      closeTooltip(e) {
        if (
          !e.target.classList.contains('tableComponent__action') &&
          !e.target.classList.contains('tableAction__wrapper') &&
          !e.target.classList.contains('payment__action-icn')
        ) {
          this.tooltipToggle = false;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .table-component {
    &__title {
      margin-right: 9px;
    }
    &__counter {
      margin: 0 19px 0 24px;
    }
  }

  .payment {
    &__platform {
      width: 400px;
    }

    &__platform-text {
      margin-left: 10px;
    }

    &__requisites {
      width: 300px;
    }

    &__action {
      width: 34px;
    }

    &__requisites-text {
      margin-right: 9px;
    }

  }
</style>

<style lang="scss">

  .status {
    &_red {
      color: #f26671;
    }

    &_yellow {
      color: #f6ae32;
    }

    &_green {
      color: #4daf7c;
    }
  }
</style>
