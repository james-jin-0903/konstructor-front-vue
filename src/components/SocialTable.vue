<template lang="pug">
  .table-component
    .table-component__header
      .table-component__title Социальные сети
      Tooltip(:text="'Тут будет текст с описанием того, для чего пользователю вводить эти данные.'")
      .table-component__counter {{`${this.getList.length} ${this.countWord}`}}
      img.table-component__add(src='../assets/images/icon_plus.svg' @click="onAddSocial")
    .table-component__table
      .table-component__thead(v-if="getList.length > 0")
        .table-component__col.social__name Название
        .table-component__col.social__requisites Аккаунт
        .table-component__col.social__action

      .table-component__tbody
        .table-component__row(v-for="(row) in getList" :key="row.id")
          .table-component__row-wrapper(v-if="row.isDeleted" :key="row.id")
            .table-component__row-item
              img.icon-delete(src='../assets/images/icon_remove.svg')
              .deleted__info Информация удалена. Вы можете восстановить ее до следующего сохранения изменений.
            .table-component__row-item.social__action
              .table-component__action.table-action(@click="onRestoreSocial(row.id)" )
                .table-action__wrapper(rel="Восстановить")
                  img.social__action-icn(src="../assets/images/icon_restore.png")
          .table-component__row-wrapper(v-else)
            .table-component__row-item.social__name
              Avatar(:image="row.icon" :initials="row.icon ? null : row.network_slug.slice(0, 1)")
              .table-component__text.social__name-text {{row.network_slug}}
            .table-component__row-item.social__requisites
              .social__requisites-text() {{row.account}}
            .table-component__row-item.social__action
              .table-component__action.table-action(@click="handleToggleTooltip(row, $event)" )
                .table-action__wrapper(rel="Опции")
                  img.social__action-icn(src="../assets/images/icon_options.svg")
        .table-component__empty(v-if="!getList.length")
          span У Вас пока нет ни одной социальной сети. Вы можете добавить ее, нажав
          img(src="../assets/images/icon_plus.svg")
          span возле заголовка таблицы
        transition( name="fade")
          .table-component__tooltip(v-if="tooltipToggle" ref="tooltip" v-click-outside="closeTooltip")
            .table-component__tooltip-item(@click="onEditSocial()")
              img.table-component__tooltip-icn.table-component__tooltip-icn_edit(src='../assets/images/icon_edit.png')
              .table-component__tooltip-text Редактировать
            .table-component__tooltip-item(@click="onRemoveSocial()")
              img.icon-delete.table-component__tooltip-icn(src='../assets/images/icon_remove.svg')
              .table-component__tooltip-text Удалить
    button.button.button_default.table-component__submit.page-social__submit(
      @click="onSubmit"
      :class="!disablePoint && 'buttonSubmit_disabled'"
      :disabled="!disablePoint"
    )
      span Сохранить


</template>

<script>
  import Tooltip from './Tooltip.vue';
  import { mapGetters, mapActions } from 'vuex';
  import { declOfNum } from '@/utils/declensionOfNum';
  import Avatar from '@/components/Avatar';

  export default {
    components: {
      Avatar,
      Tooltip: Tooltip
    },
    props: {},
    data() {
      return {
        tooltipToggle: false,
        currentId: 0,
        currentItem: {},
        deletedItems: []
      };
    },
    computed: {
      ...mapGetters({
        getList: 'social/getList'
      }),
      countWord: function() {
        const length = this.getList.length;
        const lastNum = Number(length.toString().slice(-1));
        return declOfNum(lastNum, ['сеть', 'сети', 'сетей']);
      },
      disablePoint() {
        return this.deletedItems.length;
      }
    },
    methods: {
      ...mapActions({
        deleteSocial: 'social/deleteSocial',
        deleteFromList: 'social/deleteFromList',
        removeSocial: 'social/removeSocial',
        restoreSocial: 'social/restoreSocial'
      }),
      onAddSocial() {
        this.$router.push({ path: '/social/add' });
      },
      onRemoveSocial() {
        this.removeSocial(this.currentId);
        this.deletedItems.push(this.currentId);
        this.tooltipToggle = false;
        this.clearCurrentItem();
      },
      onRestoreSocial(id) {
        this.restoreSocial(id);
        this.deletedItems = this.deletedItems.filter(item => item !== id);
        this.tooltipToggle = false;

        this.clearCurrentItem();
      },
      onEditSocial(item) {
        const id = item || this.currentId;
        this.$router.push({ path: `/social/${id}` });
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
              btn = btn.closest('.table-action');
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
          !e.target.classList.contains('social__action-icn')
        ) {
          this.currentId = null;
          this.removeActiveRowClass();
          this.tooltipToggle = false;
        }
      },
      async onSubmit() {
        for (const id of this.deletedItems) {
          await this.deleteSocial(id);
        }
        this.deleteFromList(this.deletedItems);
        this.deletedItems = [];
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

  .social {
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
</style>
