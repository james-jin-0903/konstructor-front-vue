<template lang="pug">
  .projects-table
    .projects-table__top
      .projects-table__count(v-if="formatCount") {{this.formatCount}}
      .projects-table__totals
        .projects-table__total
          img.projects-table__total-rocket(:src="images.icons.rocket_black" alt="gray rocket")
          span {{this.formatTotals[0]}}
        .projects-table__total
          img.projects-table__total-rocket(:src="images.icons.rocket_yellow" alt="yellow rocket")
          span {{this.formatTotals[1]}}
        .projects-table__total
          img.projects-table__total-rocket(:src="images.icons.rocket_red" alt="red rocket")
          span {{this.formatTotals[2]}}
    div
      .project-block(
        v-for="project in projects"
        :class="blockClasses(project)"
      )
        .project-block__logo(:class="getIsListType ? 'project-block__logo_small' : ''")
          img(:src="project.logo || images.icons.konstruktorLogo", :alt="project.name")
        .project-block__info
          .project-block__title
            img(:src="titleIcon", alt="cube")
            router-link(:to="project.url") {{project.name}}
          .project-block__tags
            a.project-block__tag(v-for="tag in projects.tags" :href="tag.url") {{tag.title}}
        .project-block__info
          .project-block__text-block
            .project-block__text-block-title Ответственный
            a.project-block__text(:href="project.responsible.url") {{project.responsible.title}}
          .project-block__text-block(v-if="project.location && !getIsListType")
            .project-block__text-block-title Локация
            a.project-block__text(:href="project.location.url") {{project.location.title}}
        .project-block__info
          .project-block__text-block
            .project-block__text-block-title Прибыль
            .project-block__text {{`$${project.profit.sum}`}}
              .deviation(:class="{'deviation_up': project.profit.deviation > 0, 'deviation_down': project.profit.deviation < 0, 'deviation_neutral': project.profit.deviation === 0}")
                .deviation__arrow(v-html="arrowsvg")
                .deviation__value {{`$${Math.abs(project.profit.deviation)}`}}
          .project-block__text-block(v-if="!getIsListType")
            .project-block__text-block-title Дедлайн
            .project-block__text.project-block__deadline {{project.formatDeadline}}
        .project-block__social(v-if="!getIsListType")
          img.project-block__social-link(:src="images.icons.share", alt="share")
          img.project-block__social-link(:src="images.icons.icon_crown", alt="crown")
          img.project-block__social-link(:src="images.icons.fav", alt="favorite")
        .project-block__task-tools(v-if="type==='tasks' && getIsListType")
          .project-block__task-btn.project-block__task-btn_edit(v-html="require('!html-loader!../assets/images/icon_edit.svg')")
          .project-block__task-btn.project-block__task-btn_remove(v-html="images.icons.remove")
          .project-block__task-btn.project-block__task-btn_success(v-html="require('!html-loader!../assets/images/icon_success.svg')")
        .project-block__tools
          ToolsDropdown(
            :className="'tools-dropdown_left'"
            :tools="toolsMenu"
          )

</template>

<script>
  import images from '@/components/images';
  import { declOfNum } from '@/utils/declensionOfNum';
  import { kFormatter } from '@/utils/kFormatter';
  import ToolsDropdown from './ToolsDropdown.vue';
  import { differenceInHours, format } from 'date-fns';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    props: {
      count: Number,
      totals: Array[Number],
      projects: Array,
      type: String
    },
    components: {
      ToolsDropdown
    },
    data() {
      return {
        images: images,
        arrowsvg:
          '<svg width="8" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.646 12.354a.5.5 0 00.708 0l3.182-3.182a.5.5 0 10-.708-.708L4 11.293 1.172 8.464a.5.5 0 10-.708.708l3.182 3.182zM3.5 0v12h1V0h-1z" fill="#989898"/></svg>',
        titleIcon: this.getTitleIcon(),
        formatCount: `${this.count} ${declOfNum(this.count, ['проект', 'проекта', 'проекты'])}`,
        formatTotals: this.getFormatTotals(),
        formatProjects: this.getFormatProjects(),
        dataType: this.type
      };
    },
    computed: {
      ...mapGetters({
        getIsListType: 'listing/getIsListType'
      }),
      toolsMenu() {
        if (this.dataType === 'projects') {
          return this.getIsListType
            ? [
              {
                type: 'edit',
                icon: images.icons.edit,
                text: 'Редактировать'
              },
              {
                type: 'copy',
                icon: images.icons.copy,
                text: 'Копировать'
              },
              {
                type: 'goToArchive',
                icon: images.icons.archive,
                text: 'Перейти к архиву',
                count: '99'
              },
              {
                type: 'goToHistory',
                icon: images.icons.history,
                text: 'Перейти к истории',
                count: '9'
              },
              {
                type: 'goToKPI',
                icon: images.icons.kpi,
                text: 'Настройки KPI'
              },
              {
                type: 'goToTeam',
                icon: images.icons.user,
                text: 'Команда'
              },
              {
                type: 'goToIdea',
                icon: images.icons.idea_gray,
                text: 'Идеи по теме проекта'
              },
              {
                type: 'share',
                icon: images.icons.share,
                text: 'Поделиться'
              },
              {
                type: 'addToDream',
                icon: images.icons.icon_crown,
                text: 'Добавить к мечте'
              },
              {
                type: 'addFavorite',
                icon: images.icons.fav,
                text: 'Добавить в закладки'
              },
              {
                type: 'report',
                icon: images.icons.report,
                text: 'Пожаловаться'
              },
              {
                type: 'powerOff',
                icon: images.icons.powerOff,
                text: 'Отправить в архив'
              }
            ]
            : [
              {
                type: 'edit',
                icon: images.icons.edit,
                text: 'Редактировать'
              },
              {
                type: 'copy',
                icon: images.icons.copy,
                text: 'Копировать'
              },
              {
                type: 'goToArchive',
                icon: images.icons.archive,
                text: 'Перейти к архиву',
                count: '99'
              },
              {
                type: 'goToHistory',
                icon: images.icons.history,
                text: 'Перейти к истории',
                count: '9'
              },
              {
                type: 'goToKPI',
                icon: images.icons.kpi,
                text: 'Настройки KPI'
              },
              {
                type: 'goToTeam',
                icon: images.icons.user,
                text: 'Команда'
              },
              {
                type: 'goToIdea',
                icon: images.icons.idea_gray,
                text: 'Идеи по теме проекта'
              },
              {
                type: 'report',
                icon: images.icons.report,
                text: 'Пожаловаться'
              },
              {
                type: 'powerOff',
                icon: images.icons.powerOff,
                text: 'Отправить в архив'
              }
            ];
        }
        if (this.dataType === 'subprojects') {
          return [
            {
              type: 'edit',
              icon: images.icons.edit,
              text: 'Редактировать'
            },
            {
              type: 'copy',
              icon: images.icons.copy,
              text: 'Копировать'
            },
            {
              type: 'goToArchive',
              icon: images.icons.archive,
              text: 'Перейти к архиву',
              count: '99'
            },
            {
              type: 'goToHistory',
              icon: images.icons.history,
              text: 'Перейти к истории',
              count: '9'
            },
            {
              type: 'goToKPI',
              icon: images.icons.kpi,
              text: 'Настройки KPI'
            },
            {
              type: 'goToTeam',
              icon: images.icons.user,
              text: 'Команда'
            },
            {
              type: 'report',
              icon: images.icons.report,
              text: 'Пожаловаться'
            },
            {
              type: 'powerOff',
              icon: images.icons.powerOff,
              text: 'Отправить в архив'
            }
          ];
        }
        if (this.dataType === 'tasks') {
          return [
            {
              type: 'edit',
              icon: images.icons.edit,
              text: 'Редактировать'
            },
            {
              type: 'copy',
              icon: images.icons.copy,
              text: 'Копировать'
            },
            {
              type: 'goToArchive',
              icon: images.icons.archive,
              text: 'Перейти к архиву',
              count: '99'
            },
            {
              type: 'goToHistory',
              icon: images.icons.history,
              text: 'Перейти к истории',
              count: '9'
            },
            {
              type: 'goToKPI',
              icon: images.icons.kpi,
              text: 'Настройки KPI'
            },
            {
              type: 'goToTeam',
              icon: images.icons.user,
              text: 'Команда'
            },
            {
              type: 'goToTimeMangment',
              icon: images.icons.clock,
              text: 'Перейти к тайм-менеджменту'
            },
            {
              type: 'goToFinance',
              icon: images.icons.cash,
              text: 'Перейти к финансам'
            },
            {
              type: 'report',
              icon: images.icons.report,
              text: 'Пожаловаться'
            },
            {
              type: 'powerOff',
              icon: images.icons.powerOff,
              text: 'Отправить в архив'
            }
          ];
        }
        if (this.dataType === 'archive') {
          return [
            {
              type: 'copy',
              icon: images.icons.copy,
              text: 'Создать активную копию'
            },
            {
              type: 'activate',
              icon: images.icons.powerOff,
              text: 'Активировать'
            }
          ];
        }
        return [];
      }
    },
    created() {
    },
    methods: {
      ...mapActions({}),
      getTitleIcon() {
        if (this.type === 'projects' || this.type === 'archive') {
          return images.icons.cube;
        }
        if (this.type === 'subprojects') {
          return images.icons.subcube;
        }
        if (this.type === 'tasks') {
          return images.icons.rocket_grey;
        }
      },
      getFormatTotals() {
        return this.totals.map((item) => {
          return kFormatter(item);
        });
      },
      getFormatProjects() {
        return this.projects.map((item) => {
          const today = new Date().valueOf();
          const deviationDate = differenceInHours(item.deadline, today);
          if (deviationDate <= 0) {
            item.deadlineStatus = 2;
          }
          if (deviationDate > 0 && deviationDate <= 24) {
            item.deadlineStatus = 1;
          }
          if (deviationDate > 24) {
            item.deadlineStatus = 0;
          }
          item.formatDeadline = new Date(item.deadline).toLocaleString().slice(0, -3);
          return item;
        });
      },
      blockClasses(project) {
        return {
          projectBlock_red: project.deadlineStatus === 2,
          projectBlock_yellow: project.deadlineStatus === 1,
          projectBlock_small: this.getIsListType
        };
      }
    }
  };
</script>

<style lang="scss">

  .project-block {
    &__task-btn {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid $black;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;

      & + .project-block__task-btn {
        margin-left: 10px;
      }

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      &_remove {
        border-color: $red3;

        &:hover {
          background: rgba(247, 155, 163, 0.75);

          svg {
            fill: white;
          }
        }

        &:active {
          background: $red3;
        }

        svg {
          fill: $red3;
        }
      }

      &_edit {
        &:hover {
          background: #ececec;
        }

        &:active {
          background: $black;
        }

        svg {
          fill: $black;
        }
      }

      &_success {
        border-color: $green3;

        &:hover {
          background: rgba(77, 175, 124, 0.75);

          svg {
            fill: white;
          }
        }

        &:active {
          background: $green3;
        }

        svg {
          top: 47%;
          left: 53%;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .projects-table {
    margin-top: 60px;

    &__top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }

    &__count {
      color: $gray3;
    }

    &__totals {
      display: flex;
    }

    &__total {
      display: flex;
      align-items: center;

      & + .projects-table__total {
        margin-left: 20px;
      }
    }

    &__total-rocket {
      margin-right: 8px;
    }
  }

  .project-block {
    display: flex;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 3px;
    border: 1px solid transparent;

    &:hover {
      border-color: $blue1;
    }

    &__logo {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $gray2;
      border-radius: 3px;
      margin-right: 10px;

      &_small {
        width: 30px;
        height: 30px;
      }

      img {
        max-width: 90%;
        max-height: 90%;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-right: 25px;

      &:nth-child(2) {
        flex: 1;
      }

      &:nth-child(3) {
        width: 175px;
      }

      &:nth-child(4) {
        width: 150px;
      }
    }

    &__title {
      @include font(14, s, 19px);
      display: flex;
      align-items: center;
      cursor: pointer;

      a {
        color: $gray7;
        text-decoration: none;
      }

      img {
        width: 16px;
        height: 16px;
        margin-right: 10px;
      }
    }

    &__text-block {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      a {
        color: $blue1;
        text-decoration: none;
        max-width: 100%;
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    &__text-block-title {
      color: $gray3;
      @include font(12, r, 16px);
    }

    &__text {
      @include font(14, r, 19px);
      display: flex;

      .deviation {
        margin: 0 10px;
      }
    }

    &__social {
      height: 80px;
      display: flex;
      align-items: flex-end;
    }

    &__social-link {
      display: block;
      max-width: 16px;
      max-height: 16px;
      cursor: pointer;

      & + .project-block__social-link {
        margin-left: 20px;
      }
    }

    &__task-tools {
      display: flex;
      align-items: center;
    }

    &__tools {
      margin-left: 60px;
    }

    &_red {
      border: 1px solid $red3;

      .project-block__deadline {
        font-weight: 600;
      }
    }

    &_yellow {
      border: 1px solid $orange3;

      .project-block__deadline {
        font-weight: 600;
      }
    }

    &_small {
      align-items: center;
    }
  }
</style>
