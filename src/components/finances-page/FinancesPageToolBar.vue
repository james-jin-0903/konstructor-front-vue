<template lang="pug">
.finances-page
  slot(name='breadcrumbs')
    .page__nav
      breadcrumbs(:links='breadcrumbs.links', :current='breadcrumbs.current')
  slot(name='container')
    .container.finances-page__container
      .finances-page__row.align-start
        .finances-page__col-6
          slot(name='links')
            .finances-page__links
              slot(name='row-mode')
                RouterLink.finances-page__row-mode(:to='rowModeLink', :style='isRowActive')
                  img(:src='rowModeIcon')
              slot(name='earth-mode')
                RouterLink.finances-page__link.finances-page__map-mode(:to='mapModeLink')
                  img(src='@/assets/images/icon_earth.svg')
              slot(name='analytics-mode')
                RouterLink.finances-page__link.finances-page__analytics-mode(:to='analyticsModeLink', :style='isAnalyticsActive')
                  img(src='@/assets/images/icon_analytics.svg')
              slot
                calendar.finances-page__date-picker(placeholder='Select Date')
          slot(name='tools-dropdown')
          slot(name='history')
          slot(name='toolbar-data')
            slot(name='capital-row')
              .finances-page__row.px
                slot(name='capital-text')
                  .finances-page__col-6
                    slot(name='capital-text-inner')
                      span.finances-page__text &Scy;&rcy;&iecy;&dcy;&scy;&tcy;&vcy;&acy; &ncy;&acy; &scy;&chcy;&iecy;&tcy;&ucy;:
                slot(name='capital-rate')
                  .finances-page__col-2
                    slot(name='capital-rate-inner')
                      h2 $1000
                slot(name='capital-rate-up')
                  .finances-page__col-2.text-center
                    .finances-page__rate-up
                      slot(name='capital-rate-up-inner')
                        img.finances-page__rate-up_icon(src='@/assets/images/icon-arrow-up.png')
                        span.finances-page__rate-up_text $50
                slot(name='capital-hint')
                  .finances-page__col-2
                    slot(name='capital-hint-inner')
                      h4.finances-page__hint
                        | i
                        span.finances-page__hint_tooltip Some hint
            slot(name='hourly-row')
              .finances-page__row.px.mt-n
                slot(name='hourly-text')
                  .finances-page__col-6
                    slot(name='hourly-text-inner')
                      span.finances-page__text Recommended hourly pay rate:
                slot(name='hourly-rate')
                  .finances-page__col-2
                    slot(name='hourly-rate-inner')
                      h3.mt-n $5
                slot(name='hourly-rate-up')
                  .finances-page__col-2.text-center
                    slot(name='hourly-rate-up-inner')
                      .finances-page__rate-up.mt-n
                        img.finances-page__rate-up_icon(src='@/assets/images/icon-arrow-up.png')
                        span.finances-page__rate-up_text $0.1
                slot(name='hourly-hint')
                  .finances-page__col-2
                    slot(name='hourly-hint-inner')
                      h4.finances-page__hint.mt-n
                        | i
                        span.finances-page__hint_tooltip Some hint
            slot(name='profit-row')
              .finances-page__row.px.mt-n
                slot(name='profit-text')
                  .finances-page__col-6
                    slot(name='profit-text-inner')
                      span.finances-page__text Profit from $1 of invesments:
                slot(name='profit-rate')
                  .finances-page__col-2
                    slot(name='profit-rate-inner')
                      h3.mt-n $1.2
                slot(name='profit-rate-down')
                  .finances-page__col-2.text-center
                    slot(name='profit-rate-down-inner')
                      .finances-page__rate-down.mt-n
                        img.finances-page__rate-down_icon(src='@/assets/images/icon_arrow_down.png')
                        span.finances-page__rate-down_text $0.3
                slot(name='profit-hint')
                  .finances-page__col-2
                    slot(name='profit-hint-inner')
                      h4.finances-page__hint.mt-n
                        | i
                        span.finances-page__hint_tooltip Some hint
        .finances-page__col-6.text-right
          slot(name='withdraw-funds-btn')
          a.finances-page__add-funds(href='#') &Pcy;&ocy;&pcy;&ocy;&lcy;&ncy;&icy;&tcy;&softcy; &scy;&chcy;&iecy;&tcy;
          a.finances-page__action(href='#')
            img(src='@/assets/images/icon_flash-2.svg')
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Calendar from '@/components/Calendar.vue';
import { log } from 'console';

export default {
  name: 'FinancesPageToolBar',
  components: {
    Breadcrumbs,
    Calendar
  },
  props: {
    rowModeLink: {
      type: String,
      default: '/finances'
    },
    mapModeLink: {
      type: String,
      default: '/finances/map-mode'
    },
    analyticsModeLink: {
      type: String,
      default: '/finances/analytics-mode'
    },
    crumbLinks: {
      type: Array,
      default: () => []
    },
    crumbCurrent: {
      type: String,
      default: 'Финансы'
    }
  },
  data() {
    return {
      breadcrumbs: {
        links: this.crumbLinks,
        current: this.crumbCurrent
      },
      isAnalyticsActive: '',
      isRowActive: '',
      rowModeIcon: ''
    };
  },

  mounted() {
    // Changing the clicked link's state into active mode
    var pageAddress = this.$route.path;

    if (pageAddress.includes('analytics')) {
      return (
        (this.isAnalyticsActive = 'background: #777'),
        (this.isRowActive = 'background: transparent'),
        (this.rowModeIcon = require('@/assets/images/icon_bars-dark.svg'))
      );
    } else {
      return (
        (this.isAnalyticsActive = 'background: transparent'),
        (this.isRowActive = 'background: #444')(
          (this.rowModeIcon = require('@/assets/images/icon_bars.png'))
        )
      );
    }
  }
};
</script>

<style lang="scss">
@import '@/scss/pages/finances-page';
</style>