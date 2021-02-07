<template lang="pug">
  .files-history-page
    .page__nav.files-history-page__toolbar
      Breadcrumbs(:links="breadcrumbs.links" :current="breadcrumbs.current")
    .container.page
      .loader(v-if="isLoaded")
        Spinner
      .files-history-page__content(v-else)
        .files-history-page__history-info
          .files-history-page__title История
          Tooltip(text="Подсказка об истории").files-history-page__tooltip
          .files-history-page__event-counter 10 событий
        .tableComponent
          .tableComponent__table
            .tableComponent__thead.history-table__thead
              .tableComponent__col.history-table__head.history-table__head_event(@click="() => null")
                | Событие
              .tableComponent__col.history-table__head.history-table__head_date(@click="() => null")
                | Дата
            .tableComponent__tbody
              .tableComponent__row(v-for="(event, i) in historyItems").history-table__row
                .tableComponent__rowItem.history-table__col.history-table__col_event
                  .history-table__user
                    Avatar(:name="event.user.name" :initials="event.user.initials")
                  span.history-table__message {{ event.action }}
                  Object(
                    v-if="event.target"
                    :name="event.target.name"
                    :image="event.target.image"
                    :custom-icon="event.target.icon"
                  ).history-table__target
                  .history-table__text-helper(v-if="event.warning") ({{ event.warning }})
                .tableComponent__rowItem.history-table__col.history-table__col_date
                  | {{ event.date }}
</template>
<script>
  import Breadcrumbs from '@/components/Breadcrumbs';
  import { mapGetters } from 'vuex';
  import images from '@/components/images';
  import { format } from 'date-fns';
  import Tooltip from '@/components/Tooltip';
  import Avatar from '@/components/Avatar';
  import Object from '@/components/Object';

  const PAGE_NAME = 'История';

  export default {
    components: {
      Object,
      Avatar,
      Tooltip,
      Breadcrumbs
    },
    data() {
      return {
        breadcrumbs: {
          links: [
            { label: 'Файлы', href: '/files' },
            { label: 'Мои файлы', href: '' },
            { label: 'Name_Of_folder_1', href: '/files' }
          ],
          current: PAGE_NAME
        },
        historyItems: [
          {
            id: 0,
            user: {
              name: 'Константин Константинопольский',
              initials: 'KK'
            },
            action: 'удалил файл',
            target: {
              image: images.testImage,
              icon: images.icons.file_outline,
              name: 'Name_of_file_1.jpg'
            },
            date: format(new Date(2020, 6, 4), 'd LLL Y, hh:mm ')
          },
          {
            id: 1,
            user: {
              name: 'Константин Константинопольский',
              initials: 'KK'
            },
            action: 'переименовал папку',
            target: {
              icon: images.icons.folder_outline,
              name: 'Name_of_folder1.jpg'
            },
            warning: 'New Folder',
            date: format(new Date(2020, 6, 4), 'd LLL Y, hh:mm ')
          },
          {
            id: 2,
            user: {
              name: 'Константин Константинопольский',
              initials: 'KK'
            },
            action: 'загрузил файл',
            target: {
              image: images.uploadCover,
              icon: images.icons.file_outline,
              name: 'Name_of_image.jpg'
            },
            date: format(new Date(2020, 6, 4), 'd LLL Y, hh:mm ')
          },
          {
            id: 3,
            user: {
              name: 'Константин Константинопольский',
              initials: 'KK'
            },
            action: 'создал копию файла',
            target: {
              image: images.uploadCover,
              icon: images.icons.file_outline,
              name: 'Name_of_copied_file.kpi'
            },
            date: format(new Date(2020, 6, 4), 'd LLL Y, hh:mm ')
          },
          {
            id: 4,
            user: {
              name: 'Константин Константинопольский',
              initials: 'KK'
            },
            action: 'переместил папку',
            target: {
              icon: images.icons.folder_outline,
              name: 'Name_of_folder3'
            },
            date: format(new Date(2020, 6, 4), 'd LLL Y, hh:mm ')
          },
          {
            id: 5,
            user: {
              name: 'Константин Константинопольский',
              initials: 'KK'
            },
            action: 'создал папку',
            target: {
              icon: images.icons.folder_outline,
              name: 'Name_of_folder3'
            },
            date: format(new Date(2020, 6, 4), 'd LLL Y, hh:mm ')
          },
          {
            id: 6,
            user: {
              name: 'Константин Константинопольский',
              initials: 'KK'
            },
            action: 'скачал файл',
            target: {
              image: images.uploadCover,
              icon: images.icons.file_outline,
              name: 'Name_of_copied_file.kpi'
            },
            date: format(new Date(2020, 6, 4), 'd LLL Y, hh:mm ')
          },
          {
            id: 7,
            user: {
              name: 'Константин Константинопольский',
              initials: 'KK'
            },
            action: 'распечатал файл',
            target: {
              image: images.uploadCover,
              icon: images.icons.file_outline,
              name: 'Name_of_copied_file.kpi'
            },
            date: format(new Date(2020, 6, 4), 'd LLL Y, hh:mm ')
          },
          {
            id: 7,
            user: {
              name: 'Константин Константинопольский',
              initials: 'KK'
            },
            action: 'изменил права доступа текущей папки',
            target: null,
            date: format(new Date(2020, 6, 4), 'd LLL Y, hh:mm ')
          },
          {
            id: 8,
            user: {
              name: 'Константин Константинопольский',
              initials: 'KK'
            },
            action: 'создал текущую папку',
            target: null,
            date: format(new Date(2020, 6, 4), 'd LLL Y, hh:mm ')
          },
        ],
      }
    },
    computed: {
      ...mapGetters({
        isLoaded: 'social/getLoaded'
      })
    },
  }
</script>

<style lang="scss" scoped>
  .files-history-page {
    &__history-info {
      display: flex;
      align-items: center;
    }
    &__tooltip {
      margin: 0 10px;
    }
    &__title {
      @include font(16, b, 22px);
      color: $gray7;
    }
    &__event-counter {
      @include font(16, n, 22px);
      color: $gray3;
    }
  }

  .history-table {
    &__thead {
      margin-bottom: 10px;
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

    &__user {
      margin-right: 10px;
    }
    &__target {
      margin-right: 10px;
    }
  }
</style>