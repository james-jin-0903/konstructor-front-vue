<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-emails__toolbar
        .action

    .page-projects.container.page
      ProjectsToolbar(
        :optionsSort="optionsSort"
        :tools="tools"
        :isArchive="true"
      )
      
      ProjectsTable(
        :count="tableData.count"
        :totals="tableData.totals"
        :projects="tableData.projects"
        type="archive"
      )

</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue';
import ProjectsToolbar from '../components/ProjectsToolbar.vue';
import ProjectsTable from '../components/ProjectsTable.vue';
import { mapActions, mapGetters } from 'vuex';
import images from '@/components/images';

const PAGE_NAME = 'Архив';
export default {
  name: 'Archive',
  components: {
    Breadcrumbs,
    ProjectsToolbar,
    ProjectsTable,
  },
  data() {
    return {
      arrowsvg:
        '<svg width="8" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.646 12.354a.5.5 0 00.708 0l3.182-3.182a.5.5 0 10-.708-.708L4 11.293 1.172 8.464a.5.5 0 10-.708.708l3.182 3.182zM3.5 0v12h1V0h-1z" fill="#989898"/></svg>',
      breadcrumbs: {
        links: [{ label: 'Konstruktor', href: '/' }],
        current: PAGE_NAME,
      },
      optionsSort: [
        {
          text: `Алфавит <img class="selectRightIcon selectRightIcon_up" src="${images.icons.sortArrow}" />`,
          val: 'alpha_up',
        },
        {
          text: `Алфавит <img class="selectRightIcon" src="${images.icons.sortArrow}" />`,
          val: 'alpha_down',
        },
        {
          text: `Дата создания <img class="selectRightIcon selectRightIcon_up" src="${images.icons.sortArrow}" />`,
          val: 'create_up',
        },
        {
          text: `Дата создания <img class="selectRightIcon" src="${images.icons.sortArrow}" />`,
          val: 'create_down',
        },
        {
          text: `Дата изменения <img class="selectRightIcon selectRightIcon_up" src="${images.icons.sortArrow}" />`,
          val: 'edit_up',
        },
        {
          text: `Дата изменения <img class="selectRightIcon" src="${images.icons.sortArrow}" />`,
          val: 'edit_down',
        },
      ],
      tools: [
        {
          type: 'newEvent',
          icon: images.icons.newEvent,
          text: 'Новое событие',
        },
        {
          type: 'newEmail',
          icon: images.icons.newEmail,
          text: 'Новое письмо',
        },
        {
          type: 'newTransaction',
          icon: images.icons.newTransaction,
          text: 'Новая транзакция',
        },
        {
          type: 'newDocument',
          icon: images.icons.newDocument,
          text: 'Новый документ',
        },
        {
          type: 'newTable',
          icon: images.icons.newTable,
          text: 'Новая таблица',
        },
      ],
      tableData: {
        count: 3,
        totals: [999000, 54, 10000],
        projects: [
          {
            id: 25325,
            name: 'Название масштабного и интересного проекта 1',
            url: '/project/project_name1',
            logo: require('../assets/images/projectLogo1.svg'),
            responsible: {
              title: 'Константин Константин Константин',
              url: '/',
            },
            location: null,
            profit: {
              sum: 1000,
              deviation: 2,
            },
            deadline: 1585386180000,
            tags: [
              {
                title: 'ИТ',
                url: '/',
              },
            ],
          },
          {
            id: 25,
            name: 'Название масштабного и интересного проекта 2',
            url: '/project/project_name2',
            logo: require('../assets/images/projectLogo2.svg'),
            responsible: {
              title: 'Константин Константин Константин',
              url: '/',
            },
            location: {
              title: 'Австралия, Сидней',
              url: '/',
            },
            profit: {
              sum: 1000,
              deviation: -10,
            },
            deadline: 1585568980000,
            tags: [
              {
                title: 'ИТ',
                url: '/',
              },
              {
                title: 'IT',
                url: '/',
              },
            ],
          },
          {
            id: 251,
            name: 'Название масштабного и интересного проекта 3',
            url: '/project/project_name3',
            logo: '',
            responsible: {
              title: 'Константин Константин Константин',
              url: '/',
            },
            location: {
              title: 'Австралия, Сидней',
              url: '/',
            },
            profit: {
              sum: 1000,
              deviation: 0,
            },
            deadline: 1602489780000,
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    ...mapActions({}),
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>

<style lang="scss">
.deviation {
  display: flex;
  align-items: center;
  margin: 0 20px;

  &_up {
    color: $green3;
    .deviation__arrow {
      transform: rotate(180deg);
    }
    path {
      fill: $green3;
    }
  }
  &_down {
    path {
      fill: $red3;
    }
  }
  &_neutral {
    &:before {
      content: '-';
      color: $gray3;
    }
    svg {
      display: none;
    }
  }

  &__arrow {
    display: flex;
    align-items: center;
    margin-right: 4px;
  }
}

.page-projects {
  a {
    color: $blue1;
    text-decoration: none;
    display: inline-block;
    &:hover {
      text-decoration-line: underline;
      color: $blue2;
    }
  }
}

.projects-info-block {
  margin-top: 40px;
  border-spacing: 10px;
  border-collapse: separate;

  &__row {
    & + .projects-info-block__row {
      padding-top: 20px;
    }
  }

  &__row-title {
    @include font(14, r, 19px);
    color: $gray3;
    padding: 0;
    width: 1%;
    padding-right: 20px;
    vertical-align: bottom;
  }

  &__row-body {
    padding: 0;
    color: $gray6;
    .h2 {
      color: $gray6;
      line-height: 1;
    }
  }

  &__row-wrap {
    display: flex;
    align-items: flex-end;
  }

  &__deadline {
    cursor: pointer;
    position: relative;
    display: inline-block;
    &:hover:after {
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      content: attr(rel);
      left: 50px;
      display: block;
      transform: translateX(-25%);
      padding: 0 4px;
      position: absolute;
      white-space: nowrap;
      z-index: 4;
    }    
  }

  &__link {
    @include font(14, r, 19px);
    & + a {
      @include font(12, r, 16px);
      margin-left: 18px;
    }   
  }
}
</style>

<style lang="scss" scoped></style>
