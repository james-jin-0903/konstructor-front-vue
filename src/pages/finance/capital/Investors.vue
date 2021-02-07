<template>
  <div class="container">
    <breadcrumbs
      :links="breadcrumbs.links"
      :current="breadcrumbs.current"
    ></breadcrumbs>
    <NavigationTabs
      :links="tabLinks"
      current="Инвесторам"
      style="margin-top: -20px;"
    />
    <FinancesPageToolBar>
      <template v-slot:breadcrumbs>
        <span></span>
      </template>
      <template v-slot:hourly-row>
        <span></span>
      </template>
      <template v-slot:profit-row>
        <span></span>
      </template>
    </FinancesPageToolBar>
    <h3
      class="finances-page__total-events"
      style="margin-top: -20px; margin-bottom: 10px;"
    >
      <span>{{ investorsTableInfo.length }} Инвесторам</span>
    </h3>
    <SecondDataTable :tableInfo="investorsTableInfo" />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import SecondDataTable from '@/components/finances-page/SecondDataTable.vue';
import NavigationTabs from '@/components/NavigationTabs.vue';

const PAGE_NAME = 'Инвесторам';

export default {
  name: 'Investors',
  components: {
    Breadcrumbs,
    FinancesPageToolBar,
    SecondDataTable,
    NavigationTabs
  },
  data() {
    return {
      breadcrumbs: {
        links: [
          {
            label: 'Финансы',
            href: '/finances/'
          },
          {
            label: 'Капитал',
            href: '/finances/'
          }
        ],
        current: PAGE_NAME
      },
      investorsTableInfo: [
        {
          investor: 'Ромашка',
          assets: '$1000',
          share: '25%'
        },
        {
          investor: 'Лютик',
          assets: '$1000',
          share: '25%'
        },
        {
          investor: 'Spark',
          assets: '$1000',
          share: '25%'
        },
        {
          investor: 'Lion Inc',
          assets: '$1000',
          share: '25%'
        }
      ],
      tabLinks: [
        {
          label: 'Мой счет',
          href: '/finances/capital/my-account'
        },
        {
          label: 'Дебеторы',
          href: '/finances/capital/debitors'
        },
        {
          label: 'Кредиторы',
          href: '/finances/capital/lenders'
        },
        {
          label: 'Доли сообществ',
          href: '/finances/capital/share-communities'
        },
        {
          label: 'Инвесторам',
          href: '/finances/capital/investors'
        },
        {
          label: 'Вкладчики',
          href: '/finances/capital/savers'
        }
      ]
    };
  }
};
</script>

<style>
</style>