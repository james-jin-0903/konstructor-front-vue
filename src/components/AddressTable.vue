<template lang="pug">
  .table-component
    .table-component__header
      .table-component__title Адреса
      Tooltip(:text="'Тут будет текст с описанием того, для чего пользователю вводить эти данные.'")
      .table-component__counter {{`${this.getList.length} ${this.countWord}`}}
      img.table-component__add(src='../assets/images/icon_plus.svg' @click="onAddAddress")
    .table-component__table
      .table-component__thead
        .table-component__col.address__country Страна
        .table-component__col.address__city Город
        .table-component__col.address__index Индекс
        .table-component__col.address__street Улица
        .table-component__col.address__house Дом
        .table-component__col.address__apartment Кв/Офис
        .table-component__col.address__note
        .table-component__col.address__action

      .table-component__tbody
        .table-component__row(v-for="(row, index) in getList" :key="row.id")
          .table-component__row-wrapper(v-if="row.isDeleted" :key="row.id")
            .table-component__row-item
              img.icon-delete(src='../assets/images/icon_remove.svg')
              .deleted__info Информация удалена. Вы можете восстановить ее до следующего сохранения изменений.
            .table-component__row-item.address__action
              .table-component__action.tableAction(@click="onRestoreAddress(row.id)" )
                .tableAction__wrapper(rel="Восстановить")
                  img.address__action-icn(src="../assets/images/icon_restore.png")
          .table-component__row-wrapper(v-else)
            .table-component__row-item.address__country
              Avatar(:initials="row.country && row.country.name.slice(0, 1)")
              .table-component__text.address__name-text {{row.country.name}}
            .table-component__row-item.address__city
              Avatar(:initials="row.city.name && row.city.name.slice(0, 1)")
              .table-component__text.address__name-text {{row.city.name}}
            .table-component__row-item.address__index
              .table-component__text.address__text() {{row.index}}
            .table-component__row-item.address__street
              .table-component__text.address__text() {{row.street}}
            .table-component__row-item.address__house
              .table-component__text.address__text() {{row.house}}
            .table-component__row-item.address__apartment
              .table-component__text.address__text() {{row.apartment === '' ? '-' : row.apartment}}
            .table-component__row-item.address__note
              Tooltip(:text="row.note" v-if="row.note && row.note !== ''")
            .table-component__row-item.address__action
              .table-component__action.tableAction(@click="handleToggleTooltip(row, $event)" )
                .tableAction__wrapper(rel="Опции")
                  img.address__action-icn(src="../assets/images/icon_options.svg")
        .table-component__empty(v-if="getList.length === 0")
          span У Вас пока нет ни одного адреса. Вы можете добавить его, нажав
          img(src="../assets/images/icon_plus.svg")
          span возле заголовка таблицы
        transition( name="fade")
          .table-component__tooltip(v-if="tooltipToggle" ref="tooltip" v-click-outside="closeTooltip")
            .table-component__tooltipItem(@click="onEditAddress()")
              img.table-component__tooltipIcn.table-component__tooltipIcn_edit(src='../assets/images/icon_edit.png')
              .table-component__tooltipText Редактировать
            .table-component__tooltipItem(@click="onRemoveAddress()")
              img.icon-delete.table-component__tooltipIcn(src='../assets/images/icon_remove.svg')
              .table-component__tooltipText Удалить
    button.button.button_default.table-component__submit.pageAddress__submit(
      :disabled="!disablePoint"
      @click="onSubmit"
    )
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
        formTouched: false,
        tooltipToggle: false,
        currentId: 0,
        currentItem: {},
        deletedItems: []
      };
    },
    computed: {
      ...mapGetters({
        getList: 'address/getList',
        getPermList: 'address/getPermList'
      }),
      countWord: function() {
        const length = this.getList.length;
        const lastNum = Number(length.toString().slice(-1));

        if (lastNum === 0 || (length > 10 && length < 20)) {
          return 'адресов';
        } else if (lastNum === 1) {
          return 'адрес';
        } else if (lastNum === 2 || lastNum === 3 || lastNum === 4) {
          return 'адреса';
        } else {
          return 'адресов';
        }
      },
      disablePoint() {
        return this.deletedItems.length;
      }
    },
    methods: {
      ...mapActions({
        deleteFromList: 'address/deleteFromList',
        deleteAddress: 'address/deleteAddress',
        removeAddress: 'address/removeAddress',
        restoreAddress: 'address/restoreAddress'
      }),
      onAddAddress() {
        this.$router.push({ path: '/address/add' });
      },
      onRemoveAddress() {
        this.removeAddress(this.currentId);
        this.deletedItems.push(this.currentId);
        this.tooltipToggle = false;

        this.clearCurrentItem();
      },
      onRestoreAddress(id) {
        this.restoreAddress(id);
        this.deletedItems = this.deletedItems.filter(item => item !== id);
        this.tooltipToggle = false;

        this.clearCurrentItem();
      },
      onEditAddress(item) {
        const id = item || this.currentId;
        this.$router.push({ path: `/address/${id}` });
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
      removeActiveRowClass() {
        this.$el
            .querySelectorAll('.table-component__row_active').forEach(el => {
          el.classList.remove('table-component__row_active');
        });
      },
      closeTooltip(e) {
        if (
          !e.target.classList.contains('table-component__action') &&
          !e.target.classList.contains('tableAction__wrapper') &&
          !e.target.classList.contains('address__action-icn')
        ) {
          this.removeActiveRowClass();
          this.currentId = null;
          this.tooltipToggle = false;
        }
      },
      async onSubmit() {
        if (this.deletedItems.length) {
          for (const id of this.deletedItems) {
            await this.deleteAddress(id);
          }
          this.deleteFromList(this.deletedItems);
          this.deletedItems = [];
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

  .address {
    &__name-text {
      margin-left: 10px;
      font-family: 'Open Sans Condensed', Arial, sans-serif;
      font-weight: bold;
      font-size: 16px;
      line-height: 22px;
      color: #666666;
    }

    &__conutry,
    &__city {
      width: 180px;
    }

    &__index {
      width: 70px;
    }

    &__street {
      width: 280px;
    }

    &__house,
    &__apartment {
      width: 60px;
    }

    &__note {
      width: 16px;
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
  .icon-delete {
    margin-right: 6px;
  }

  .address__note {
    .tooltip .tooltip__info {
      left: unset;
      right: 8px;
    }
  }
</style>
