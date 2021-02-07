<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-emails__toolbar
        .action

    .page-projects.container.page
      ProjectsToolbar(
        :morePages="morePages"
        :optionsSort="optionsSort"
        :tools="tools"
        :handleToolClick="handleToolClick"
      )
      table.projects-info-block
        tr.projects-info-block__row
          td.projects-info-block__row-title Прибыль:
          td.projects-info-block__row-body
            .projects-info-block__row-wrap
              b.h2 $1000
              .deviation.deviation_down
                .deviation__arrow(v-html="arrowsvg")
                .deviation__value $50
              Tooltip

        tr.projects-info-block__row
          td.projects-info-block__row-title Экономия:
          td.projects-info-block__row-body
            .projects-info-block__row-wrap
              span $2
              .deviation.deviation_up
                .deviation__arrow(v-html="arrowsvg")
                .deviation__value $1
              Tooltip
        tr.projects-info-block__row
          td.projects-info-block__row-title Количество:
          td.projects-info-block__row-body
            .projects-info-block__row-wrap
              span 10 страниц
              .deviation.deviation_neutral
                .deviation__arrow(v-html="arrowsvg")
                .deviation__value 0
              Tooltip
        tr.projects-info-block__row(v-if="responsible")
          td.projects-info-block__row-title Ответственный:
          td.projects-info-block__row-body
            .projects-info-block__row-wrap
              a.projects-info-block__link(:href="responsible.url") {{this.responsible.title}}
        tr.projects-info-block__row(v-if="lider")
          td.projects-info-block__row-title Лидер:
          td.projects-info-block__row-body
            .projects-info-block__row-wrap
              a.projects-info-block__link(:href="lider.url") {{this.lider.title}}
              a(href="/leaderboard") Перейти к таблице лидеров
        tr.projects-info-block__row(v-if="deadline")
          td.projects-info-block__row-title Дедлайн через:
          td.projects-info-block__row-body
            .projects-info-block__deadline(:rel="formatDeadline.rel") {{this.formatDeadline.text}}
      ProjectsTable(
        :count="tableData.count"
        :totals="tableData.totals"
        :projects="tableData.projects"
        type="subprojects"
      )

</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue';
import Tooltip from '../components/Tooltip.vue';
import ProjectsToolbar from '../components/ProjectsToolbar.vue';
import ProjectsTable from '../components/ProjectsTable.vue';
import { declOfNum } from '@/utils/declensionOfNum';
import { differenceInHours, differenceInSeconds } from 'date-fns';
import { mapActions, mapGetters } from 'vuex';
import images from '@/components/images';

const PAGE_NAME = 'Название проекта';
export default {
  name: 'Projects',
  components: {
    Breadcrumbs,
    ProjectsToolbar,
    Tooltip,
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
      responsible: {
        title: 'Константин Константинопольский',
        url: '/',
      },
      lider: {
        title: 'Елена Еленина',
        url: '/liderboard',
      },
      deadline: 1586286180000,
      morePages: [
        {
          type: 'edit',
          icon: images.icons.edit,
          text: 'Редактировать',
        },
        {
          type: 'copy',
          icon: images.icons.copy,
          text: 'Копировать',
        },
        {
          type: 'goToArchive',
          icon: images.icons.archive,
          text: 'Перейти к архиву',
          count: '99',
        },
        {
          type: 'goToHistory',
          icon: images.icons.history,
          text: 'Перейти к истории',
          count: '9',
        },
        {
          type: 'goToKPI',
          icon: images.icons.kpi,
          text: 'Настройки KPI',
        },
        {
          type: 'goToTeam',
          icon: images.icons.user,
          text: 'Команда',
        },
        {
          type: 'goToIdea',
          icon: images.icons.idea_gray,
          text: 'Идеи по теме проекта',
        },
        {
          type: 'share',
          icon: images.icons.share,
          text: 'Поделиться',
        },
        {
          type: 'addToDream',
          icon: images.icons.icon_crown,
          text: 'Добавить к мечте',
        },
        {
          type: 'addFavorite',
          icon: images.icons.fav,
          text: 'Добавить в закладки',
        },
        {
          type: 'report',
          icon: images.icons.report,
          text: 'Пожаловаться',
        },
        {
          type: 'powerOff',
          icon: images.icons.powerOff,
          text: 'Отправить в архив',
        },
      ],
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
          type: 'newSubproject',
          icon: images.icons.subcube,
          text: 'Новый подпроект',
          border: true,
        },
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
            name: 'Название масштабного и интересного подпроекта 1',
            url: '/subProject/project_name1',
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
            name: 'Название масштабного и интересного подпроекта 2',
            url: '/subProject/project_name2',
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
            name: 'Название масштабного и интересного подпроекта 3',
            url: '/subProject/project_name3',
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
  computed: {
    ...mapGetters({}),
    formatDeadline: function() {
      const currentDate = new Date();
      const deadlineDate = new Date(this.deadline);

      let seconds = Math.floor((deadlineDate - currentDate) / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      hours = hours - days * 24;
      minutes = minutes - days * 24 * 60 - hours * 60;
      let str = '';
      if (days > 0) str += `${days} ${declOfNum(days, ['день', 'дня', 'дней'])}, `;
      if (hours > 0) str += `${hours} ${declOfNum(hours, ['час', 'часа', 'часов'])}, `;
      if (minutes > 0) str += `${minutes} ${declOfNum(minutes, ['минута', 'минуты', 'минут'])}, `;
      str = str.slice(0, -2);
      return {
        text: str,
        rel: new Date(deadlineDate).toLocaleString().slice(0, -3),
      };
    },
  },
  created() {},
  methods: {
    ...mapActions({}),
    handleToolClick({ type }) {
      if (type === 'newSubproject') {
        localStorage.setItem(
          'projectInfo',
          JSON.stringify({
            id: 'test_id',
            name: 'Название проекта',
          })
        );
        this.$router.push('/newSubproject');
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
