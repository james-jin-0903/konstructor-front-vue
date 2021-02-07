<template lang="pug">
  .table-component
    .loader(v-if="isLoaded")
      Spinner

    .table-component__header
      .table-component__title Электронная почта
      Tooltip(:text="'Здесь Вы можете увидеть свои почтовые ящики и управлять ими.'")
      .table-component__counter {{`${this.workList.length} ${this.countWord}`}}
      img.table-component__add(src='../assets/images/icon_plus.svg' @click="onAddEmail")

    .table-component__table
      .table-component__thead(v-if="workList.length")
        .table-component__col.emails__address Адрес
        .table-component__col.emails__status Статус
        .table-component__col.emails__notify Оповещения
        .table-component__col.emails__action

      .table-component__tbody
        .table-component__row(v-for="(row) in workList" :key="row.id")
          .table-component__text.table-component__row-item.emails__address {{row.email}}
            .table-component__main-item(v-if="row.is_main") (основной адрес)
          .table-component__row-item.emails__status
            .div {{row.state_slug}}
            .table-component__text.emails__status-text(:class="getInfoByStatus(row).class") {{getInfoByStatus(row).text}}
            Tooltip(v-if="!row.is_main" :text="getInfoByStatus(row).tooltip")
          .table-component__row-item.emails__notify.emails__notify_row
            .checkbox-wrapper
              input(
                @click="onCheckbox(row, $event)"
                :id="'checkbox_notify' + row.id"
                :name="'checkbox_notify' + row.id"
                :disabled="row.is_main ? false : row.state_slug !== 1"
                :checked="row.is_main ? true : row.notification_on"
                type="checkbox"
              )
              label(:for="'checkbox_notify' + row.id")
          .table-component__row-item.emails__action
            .table-component__action.table-action(v-if="row.main" @click="onEditEmail(row)")
              .table-action__wrapper(rel="Редактировать")
                img.emails__action-icn.table-action__action-icn_edit(src='../assets/images/icon_edit.png')
            .table-component__action.table-action(v-else @click="handleToggleTooltip(row, $event)" )
              .table-action__wrapper(rel="Опции")
                img.emails__action-icn(src='../assets/images/icon_options.svg')

        .table-component__empty(v-if="!workList.length")
          span У Вас пока нет ни одной социальной сети. Вы можете добавить ее, нажав
          img(src="../assets/images/icon_plus.svg")
          span возле заголовка таблицы
        transition(name="fade" :duration="{ enter: 500, leave: 0 }")
          .table-component__tooltip(v-if="tooltipToggle" ref="tooltip" v-click-outside="closeTooltip")
            .table-component__tooltip-item(@click="onEditEmail()")
              img.table-component__tooltip-icn.table-component__tooltip-icn_edit(src='../assets/images/icon_edit.png')
              .table-component__tooltip-text Редактировать
            .table-component__tooltip-item(@click="onRemoveEmail()")
              img.icon-delete.table-component__tooltip-icn(src='../assets/images/icon_remove.svg')
              .table-component__tooltip-text Удалить
    button.button.button_default.table-component__submit(
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
  import Spinner from '@/components/Spinner';

  export default {
    components: { Tooltip, Spinner },
    props: {},
    data() {
      return {
        tooltipToggle: false,
        currentId: 0,
        currentItem: {},
        changedItems: [],
        deletedItems: []
      };
    },
    computed: {
      ...mapGetters({
        getList: 'emails/getList',
        isLoaded: 'emails/getLoaded'
      }),
      workList: function() {
        return [...this.getList]
          .sort((a, b) => {
            if (a.is_main) {
              return -1;
            } else if (b.is_main) {
              return 1;
            } else {
              return 0;
            }
          });
      },
      countWord: function() {
        const length = this.workList.length;
        const lastNum = Number(length.toString().slice(-1));
        return declOfNum(lastNum, ['адрес', 'адресa', 'адресов']);
      },
      disablePoint() {
        return this.deletedItems.length || this.changedItems.length;
      }
    },
    mounted() {
    },
    methods: {
      ...mapActions({
        editEmail: 'emails/editEmail',
        deleteEmail: 'emails/deleteEmail',
        removeEmail: 'emails/removeEmail'
      }),
      onAddEmail() {
        this.$router.push({ path: '/emails/add' });
      },
      onRemoveEmail() {
        this.removeEmail(this.currentId);
        this.deletedItems.push(this.currentId);
        this.tooltipToggle = false;
      },
      onEditEmail(item) {
        const id = item || this.currentId;
        this.$router.push({ path: `/emails/${id}` });
      },
      onCheckbox(item, e) {
        const changedItem = {
          ...item,
          notification_on: e.target.checked ? 1 : 0,
          is_main: item.is_main ? 1 : 0
        };

        const itemId = changedItem.id;
        const changedIndex = this.changedItems.findIndex(item => item.id === itemId);
        const currentValue = this.workList.find(item => item.id === itemId);
        if (changedItem.notification_on === currentValue.notification_on) {
          this.changedItems = this.changedItems.filter(item => item.id !== itemId);
          return;
        }
        if (changedIndex >= 0) {
          this.changedItems[changedIndex] = changedItem;
        } else {
          this.changedItems.push(changedItem);
        }
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
          !e.target.classList.contains('emails__action-icn')
        ) {
          this.removeActiveRowClass();
          this.currentId = null;
          this.tooltipToggle = false;
        }
      },
      getInfoByStatus(mail) {
        const status = mail.state_slug;
        const isMain = mail.is_main;
        if (status === 1 || isMain) {
          return {
            text: 'Подтвержден',
            class: 'emails__status_green'
          };
        } else if (status === 2) {
          return {
            text: 'В процессе',
            class: 'emails__status_yellow',
            tooltip:
              '<p>На указанный адрес было отправлено письмо с дальнейшими инструкциями для подтверждения. Если письмо не пришло, то Вы можете <span class="no-break"><a href="" class="link">повторить отправку</a>.</span>'
          };
        } else {
          return {
            text: 'Не подтвержден',
            class: 'emails__status_red',
            tooltip:
              '<p>На указанный адрес было отправлено письмо с дальнейшими инструкциями для подтверждения. Срок действия этого письма завершен. Вы можете <span class="no-break"><a href="" class="link">повторить отправку</a>.</span></p>'
          };
        }
      },
      async onSubmit() {
        if (this.changedItems.length) {
          for (const item of this.changedItems) {
            await this.editEmail(item);
          }
          this.changedItems = [];
        }

        for (const id of this.deletedItems) {
          await this.deleteEmail(id);
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

  .emails {
    &__address {
      width: 400px;
    }

    &__status {
      width: 150px;
    }

    &__notify {
      width: 100px;
      &_row {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    &__action {
      width: 34px;   
    }

    &__status-text {
      margin-right: 9px;
    }
  }

  .no-break {
    white-space: nowrap;
  }
</style>

<style lang="scss">
  .emails__status_red {
    &__status {
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
  }
</style>
