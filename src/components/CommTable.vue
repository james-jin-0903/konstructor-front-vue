<template lang="pug">
  .table-component
    .table-component__header
      .table-component__title Коммуникации
      Tooltip(:text="'Тут будет текст с описанием того, для чего пользователю вводить эти данные.'")
      .table-component__counter {{`${this.getList.length} ${this.countWord}`}}
      img.table-component__add(src='../assets/images/icon_plus.svg' @click="onAddComm")
    .table-component__table
      .table-component__thead
        .table-component__col.comm__name Коммуникация
        .table-component__col.comm__requisites Аккаунт
        .table-component__col.comm__forward Переадресация
        .table-component__col.comm__action

      .table-component__tbody
        .table-component__row(v-for="(row) in getList" :key="row.id")
          .table-component__row-wrapper(v-if="row.isDeleted" :key="row.id")
            .table-component__row-item
              img.icon-delete(src='../assets/images/icon_remove.svg')
              .deleted__info Информация удалена. Вы можете восстановить ее до следующего сохранения изменений.
            .table-component__row-item.comm__action
              .table-component__action.tableAction(@click="onRestoreComm(row.id)" )
                .tableAction__wrapper(rel="Восстановить")
                  img.comm__action-icn(src="../assets/images/icon_restore.png")
          .table-component__row-wrapper(v-else)
            .table-component__row-item.comm__name
              Avatar(:initials="row.network_slug.slice(0, 1)")
              .table-component__text.comm__name-text {{row.network_slug}}
            .table-component__row-item.comm__requisites
              .table-component__text.comm__requisites-text() {{row.account}}
            .table-component__row-item.comm__forward
              .checkboxWrapper
                input(:id="'checkbox_forward' + row.id" :name="'checkbox_forward' + row.id" type="checkbox" @click="onCheckbox(row, $event)" :checked="row.forwarding")
                label(:for="'checkbox_forward' + row.id")
            .table-component__row-item.comm__action
              .table-component__action.tableAction(@click="handleToggleTooltip(row, $event)" )
                .tableAction__wrapper(rel="Опции")
                  img.comm__action-icn(src="../assets/images/icon_options.svg")
        .table-component__empty(v-if="getList.length === 0")
          span У Вас пока нет ни одной социальной сети. Вы можете добавить ее, нажав
          img(src="../assets/images/icon_plus.svg")
          span возле заголовка таблицы
        transition( name="fade")
          .table-component__tooltip(v-if="tooltipToggle" ref="tooltip" v-click-outside="closeTooltip")
            .table-component__tooltip-item(@click="onEditComm()")
              img.table-component__tooltip-icn.table-component__tooltip-icn_edit(src='../assets/images/icon_edit.png')
              .table-component__tooltip-text Редактировать
            .table-component__tooltip-item(v-if="!isFirst" @click="onHighPriority")
              img.icon-arrow.table-component__tooltip-icn(src='../assets/images/icon_arrow.svg')
              .table-component__tooltip-text Приоритет: выше
            .table-component__tooltip-item(v-if="!isLast" @click="onLowPriority")
              img.icon-arrow.icon-arrow_down.table-component__tooltip-icn(src='../assets/images/icon_arrow.svg')
              .table-component__tooltip-text Приоритет: ниже
            .table-component__tooltip-item(@click="onRemoveComm()")
              img.icon-delete.table-component__tooltip-icn(src='../assets/images/icon_remove.svg')
              .table-component__tooltip-text Удалить
    button.button.button_default.table-component__submit.page-comm__submit(
      @click="onSubmit"
      :disabled="!disablePoint"
    )
      span Сохранить


</template>

<script>
  import Tooltip from './Tooltip.vue';
  import { mapGetters, mapActions } from 'vuex';
  import { declOfNum } from '@/utils/declensionOfNum';
  import { isArraysEquals } from '@/utils/isArraysEquals';
  import Avatar from '@/components/Avatar';

  export default {
    components: {
      Avatar,
      Tooltip
    },
    props: {
      changed: Boolean
    },
    data() {
      return {
        tooltipToggle: false,
        currentId: 0,
        currentItem: {},
        deletedItems: [],
        changedItems: [],
        initialOrder: [],
        list: []
      };
    },
    computed: {
      ...mapGetters({
        getList: 'communications/getList',
        getPermList: 'communications/getPermList'
      }),
      countWord: function() {
        const length = this.getList.length;
        const lastNum = Number(length.toString().slice(-1));
        return declOfNum(lastNum, ['сеть', 'сети', 'сетей']);
      },
      isOrderWasChanged() {
        return !isArraysEquals(this.initialOrder, this.getList.map(item => item.id));
      },
      disablePoint() {
        return this.deletedItems.length || this.isOrderWasChanged || this.changedItems.length;
      },
      isFirst() {
        return this.currentId === this.getList[0].id;
      },
      isLast() {
        return this.currentId === this.getList[this.getList.length - 1].id;
      }
    },
    mounted() {
      this.initialOrder = this.getList.map(item => item.id);
    },
    methods: {
      ...mapActions({
        removeComm: 'communications/removeComm',
        restoreComm: 'communications/restoreComm',
        editCommunication: 'communications/update',
        deleteCommunication: 'communications/deleteCommunication',
        deleteFromList: 'communications/deleteFromList',
        lowPriority: 'communications/lowPriority',
        highPriority: 'communications/highPriority',
        updateSortOrder: 'communications/updateSortOrder'
      }),
      onAddComm() {
        this.$router.push({ path: '/communications/add' });
      },
      onRemoveComm() {
        this.removeComm(this.currentId);
        this.deletedItems.push(this.currentId);
        this.tooltipToggle = false;
        this.clearCurrentItem();
      },
      onRestoreComm(id) {
        this.restoreComm(id);
        this.deletedItems = this.deletedItems.filter(item => item !== id);
        this.tooltipToggle = false;

        this.clearCurrentItem();
      },
      onCheckbox(item, e) {
        const changedItem = { ...item };
        changedItem.forwarding = e.target.checked ? 1 : 0;

        const itemId = changedItem.id;
        const changedIndex = this.changedItems.findIndex(item => item.id === itemId);
        const currentValue = this.getList.find(item => item.id === itemId);
        if (changedItem.forwarding === currentValue.forwarding) {
          this.changedItems = this.changedItems.filter(item => item.id !== itemId);
          return;
        }
        if (changedIndex >= 0) {
          this.changedItems[changedIndex] = changedItem;
        } else {
          this.changedItems.push(changedItem);
        }
      },
      onEditComm(item) {
        const id = item || this.currentId;
        this.$router.push({ path: `/communications/${id}` });
      },
      onHighPriority() {
        this.highPriority(this.currentItem);
        const toolTop = this.$refs.tooltip.offsetTop;
        this.$refs.tooltip.style.top = toolTop - 42 + 'px';
      },
      onLowPriority() {
        this.lowPriority(this.currentItem);
        const toolTop = this.$refs.tooltip.offsetTop;
        this.$refs.tooltip.style.top = toolTop + 42 + 'px';
      },
      clearCurrentItem() {
        this.currentId = '';
      },
      handleToggleTooltip(item, e) {
        this.removeActiveRowClass();
        this.tooltipToggle = false;
        if (item.id === this.currentId) {
          this.tooltipToggle = false;
          this.currentId = null;
          return;
        }
        this.currentId = item.id;
        this.currentItem = item;
        setTimeout(() => {
          this.tooltipToggle = true;
          this.$nextTick(() => {
            let btn = e.target;
            const row = btn.closest('.table-component__row');
            row.classList.add('table-component__row_active');
            if (!e.target.classList.contains('tableAction')) {
              btn = btn.closest('.tableAction');
            }
            const topValue = btn.offsetTop;
            this.$refs.tooltip.style.top = topValue + 13 + 'px';
          });
        });
      },
      closeTooltip(e) {
        if (
          !e.target.classList.contains('table-component__action') &&
          !e.target.classList.contains('tableAction__wrapper') &&
          !e.target.classList.contains('comm__action-icn')
        ) {
          this.currentId = null;
          this.tooltipToggle = false;
        }
      },
      async onSubmit() {
        if (this.isOrderWasChanged) {
          await this.updateSortOrder(this.getList.map(item => item.id));
        }
        if (this.changedItems.length) {
          for (const item of this.changedItems) {
            await this.editCommunication(item);
          }
          this.changedItems = [];
        }

        if (this.deletedItems.length) {
          for (const id of this.deletedItems) {
            await this.deleteCommunication(id);
          }
          this.deleteFromList(this.deletedItems);
          this.deletedItems = [];
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .table-component{
    &__title {
      margin-right: 9px;
    }

    &__counter {
      margin: 0 19px 0 24px;
    }
  }

  .comm {
    &__name {
      width: 400px;
    }

    &__name-text {
      margin-left: 10px;
      font-family: 'Open Sans Condensed', Arial, sans-serif;
      font-weight: bold;
      font-size: 16px;
      line-height: 22px;
      color: #666666;
    }

    &__requisites {
      width: 300px;
    }

    &__forward {
      width: 110px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__action {
      width: 34px;
    }

    &__requisites-text {
      margin-right: 9px;
    }

  }
  
  .icon-arrow {
    margin-left: 4px;
    margin-right: 14px;

    &_down {
      transform: rotate(180deg);
    }
  }
</style>

<style lang="scss">
  .icon-delete {
    margin-right: 6px;
  }
</style>
