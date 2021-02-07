<template lang="pug">
  .services-history-page
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.services-history-page__toolbar
        .toolbar__main
          .toolbar__item
            .toolbar__item.field.services-history-page__date
              TextInput(
                placeholder="Все время"
                :validate="false"
                :range="true"
                :time="true"
                :value="filterDate"
                name="date_of_birth"
                :disabled-date="todayDate"
                :max-date="maxDate"
                isDate
                @input="dateChange"
              ).services-history-page__date
    .services-draft-page__inner.container.page
      .loader(v-if="isLoaded")
        Spinner
      .services-draft-page__content
        .services-history-page__counter {{ historyItemsCount }} услуги
        .table-component
          .table-component__table
            .table-component__thead.history-table__thead
              .table-component__col.history-table__head.history-table__head_event(@click="sortByEventName")
                | Событие
                .history-table__arrow-icon(
                  :class="{ 'history-table__arrow-icon_active': sortByIndex === 0}"
                ) {{ !eventNameSortOrder ? '↑' : '↓' }}
              .table-component__col.history-table__head.history-table__head_date(@click="sortByDate")
                | Дата
                .history-table__arrow-icon(
                  :class="{ 'history-table__arrow-icon_active': sortByIndex === 1}"
                ) {{ dateSortOrder ? '↑' : '↓' }}
            .table-component__tbody
              .table-component__row(v-for="(event, i) in historyItems").history-table__row
                .table-component__row-item.history-table__col.history-table__col_event
                  span.history-table__message {{ event.message }}
                  template(v-if="event.type !== 'copied'")
                    .history-service-item
                      span.history-service-item__image: img(:src="event.objects[0].image" width="30" height="30")
                      span.history-service-item__icon: img(:src="event.objects[0].icon" width="16" height="16")
                      span.history-service-item__name {{ event.objects[0].name }}
                  template(v-else)
                    .history-service-item
                      span.history-service-item__image: img(:src="event.objects[0].image" width="30" height="30")
                      span.history-service-item__icon: img(:src="event.objects[0].icon" width="16" height="16")
                      span.history-service-item__name {{ event.objects[0].name }}
                    .history-table__text-helper ( копия:
                    .history-service-item
                      span.history-service-item__image: img(:src="event.objects[1].image" width="30" height="30")
                      span.history-service-item__icon: img(:src="event.objects[1].icon" width="16" height="16")
                      span.history-service-item__name {{ event.objects[1].name }}
                    .history-table__text-helper )
                .table-component__row-item.history-table__col.history-table__col_date
                  | {{ event.date }}
</template>

<script>
  import { mapGetters } from 'vuex';
  import { format } from 'date-fns';
  import Breadcrumbs from '@/components/Breadcrumbs';
  import TextInput from '@/components/forms/TextInput';
  import images from '@/components/images.ts';

  const PAGE_NAME = 'История';

  export default {
    name: 'ServicesHistory',
    components: {
      Breadcrumbs,
      TextInput
    },
    data(){
      return {
        breadcrumbs: {
          links: [
            { label: 'Услуги', href: '/services' },
            { label: 'Исполнители', href: '' }
          ],
          current: PAGE_NAME
        },
        defaultDate: null,
        filterDate: null,
        maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 30)),
        todayDate(date) {
            const limit = this.maxDate;
            return date > limit;
        },
        historyItemsCount: 6,
        historyItems: [
          {
            id: 0,
            type: 'archived',
            message: 'Вы отправили в архив услугу',
            objects: [{
              image: images.testImage,
              icon: images.icons.task_blue,
              name: 'Название удаленной услуги'
            }],
            date: format(new Date(2020, 6, 4), 'd LLL Y, hh:mm ')
          },
          {
            id: 1,
            type: 'created',
            message: 'Вы создали услугу',
            objects: [{
              image: images.testImage,
              icon: images.icons.task_blue,
              name: 'Название созданной услуги'
            }],
            date: format(new Date(2020, 2, 24, 14, 57), 'd LLL Y, hh:mm ')
          },
          {
            id: 2,
            type: 'copied',
            message: 'Вы создали копию услуги',
            objects: [
              {
                image: images.testImage,
                icon: images.icons.task_blue,
                name: 'Название оригинала услуги'
              },
              {
                image: images.avatar,
                icon: images.icons.task_blue,
                name: 'Название копии услуги'
              },
            ],
            date: format(new Date(2020, 4, 1, 4, 53), 'd LLL Y, hh:mm ')
          },
          {
            id: 3,
            type: 'copied',
            message: 'Вы создали активную копию услуги',
            objects: [
              {
                image: images.testImage,
                icon: images.icons.task_blue,
                name: 'Название оригинала услуги'
              },
              {
                image: images.avatar,
                icon: images.icons.task_blue,
                name: 'Название копии услуги'
              },
            ],
            date: format(new Date(2020, 6, 3, 6, 50), 'd LLL Y, hh:mm ')
          },
          {
            id: 4,
            type: 'recovered',
            message: 'Вы активировали из архива услугу',
            objects: [{
              image: images.avatar,
              icon: images.icons.task_blue,
              name: 'Название восстановленной услуги'
            }],
            date: format(new Date(2020, 1, 4, 11, 34), 'd LLL Y, hh:mm ')
          },
          {
            id: 5,
            type: 'edited',
            message: 'Вы отредактировали услугу',
            objects: [{
              image: images.testImage,
              icon: images.icons.task_blue,
              name: 'Название отредактированной услуги'
            }],
            date: format(new Date(2019, 6, 11, 12, 12), 'd LLL Y, hh:mm ')
          },
        ],
        eventNameSortOrder: 1,
        dateSortOrder: 1,
        sortByIndex: null
      }
    },
    computed: {
      ...mapGetters({
        isLoaded: 'social/getLoaded'
      })
    },
    mounted() {
      this.sortByEventName();
    },
    methods: {
      dateChange(date) {
        this.filterDate = date.value;
      },
      sortByEventName() {
        this.historyItems.sort((a, b) => {
          return this.eventNameSortOrder
            ? a.message.localeCompare(b.message)
            : b.message.localeCompare(a.message)
        });
        this.eventNameSortOrder = this.eventNameSortOrder ? 0 : 1;
        this.sortByIndex = 0;
      },
      sortByDate() {
        // TODO: implement correct sort by Date or string related to future data structure
        this.historyItems.sort((a, b) => {
          return this.dateSortOrder
            ? a.date.localeCompare(b.date)
            : b.date.localeCompare(a.date)
        });
        this.dateSortOrder = this.dateSortOrder ? 0 : 1;
        this.sortByIndex = 1;
      }
    }
  }
</script>

<style lang="scss">
  .services-history-page {
    &__toolbar {
      margin-top: 40px;
    }

    &__counter {
      margin-bottom: 20px;
      @include font(16, r, 22px);
      color: $gray3;
    }

    .history-table {
      &__thead {
        margin-bottom: 25px;
      }
      &__head {
        color: $gray6;
        cursor: pointer;
        &_event {
          width: 85%;
        }
        &_date {
          width: 15%;
        }
      }
      &__arrow-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
        display: inline-block;
        text-align: center;
        margin-left: 5px;

        &_active {
          color: $white;
          border-radius: 50%;
          background-color: $blue1;
        }
      }
      &__row {
        margin-bottom: 10px;
      }
      &__col {
        @include font(14, r, 19px);
        color: $gray6;

        &_event {
          width: 85%;
          display: flex;
          align-items: center;
        }
        &_date {
          width: 15%;
        }
      }
      &__message {
        margin-right: 10px;
      }
      &__text-helper {
        color: $gray3;
        margin-right: 10px;
      }
    }

    .history-service-item {
      display: flex;
      align-items: center;
      margin-right: 10px;

      &__icon {
        height: 16px;
        margin-right: 10px;
      }

      &__image {
        height: 30px;
        border-radius: 3px;
        overflow: hidden;
        margin-right: 10px;
      }

      &__name {
        font-weight: 600;
        color: $gray7;
      }
    }
  }
</style>