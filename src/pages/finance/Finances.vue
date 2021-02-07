<template>
  <div class="finances-page mb">
    <FinancesPageToolBar />
    <DataTable :tableInfo="capitalTableInfo">
      <template #heading>
        <div class="finances-page__capital">
          <div class="finances-page__capital-link">
            <div class="finances-page__col">
              <RouterLink to="/finances/capital/my-account">
                <h2 class="capital-link-text">Capital</h2>
                <img
                  src="@/assets/images/icon_arrow-right.svg"
                  class="finances-page__link-arrow"
                />
              </RouterLink>
              <h3 class="finances-page__total-events">
                Activities
                <span>{{ capitalTableInfo.length }} events</span>
              </h3>
            </div>
          </div>
        </div>
      </template>
    </DataTable>
    <DataTable :tableInfo="budgetTableInfo">
      <template #heading>
        <div
          id="capital-recom-block"
          class="finances-page__recommendation-block"
        >
          <h3>We have found 8 recommendations for increasing your capital!</h3>
          <a hred="#" class="finances-page__add-funds">learn more</a>
          <button class="cross" @click="removeCapitalRecomm">
            <img src="@/assets/images/icon_cross.svg" />
          </button>
        </div>
        <div class="finances-page__capital">
          <div class="finances-page__capital-link">
            <div class="finances-page__col">
              <RouterLink to="/finances/budget">
                <h2 class="capital-link-text">Budget</h2>
                <img
                  src="@/assets/images/icon_arrow-right.svg"
                  class="finances-page__link-arrow"
                />
              </RouterLink>
              <h3 class="finances-page__total-events">
                Activities
                <span>{{ budgetTableInfo.length }} events</span>
              </h3>
            </div>
          </div>
        </div>
      </template>
    </DataTable>
    <div class="container">
      <div id="budget-recom-block" class="finances-page__recommendation-block">
        <h3>We have found 8 recommendations for optimizing your budget!</h3>
        <a hred="#" class="finances-page__add-funds">learn more</a>
        <button class="cross" @click="removeBudgetRecomm">
          <img src="@/assets/images/icon_cross.svg" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import DataTable from '@/components/finances-page/DataTable.vue';

export default {
  name: 'Finances',
  components: {
    FinancesPageToolBar,
    DataTable
  },
  data() {
    return {
      capitalTableInfo: [
        {
          event: 'Погашена дебеторская задолженность',
          'group User': 'Константин Константинопольск...',
          author: 'Иван Петров',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Приобретена дебеторская задолженн...',
          'group User': 'Константин Константинопольск...',
          author: 'Иван Петров',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Выведены средства (в обработке)',
          'group User': '-',
          author: 'Иван Петров',
          amount: '$500',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Получена входящая транзакция',
          'group User': 'Константин Константинопольск...',
          author: '-',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        }
      ],
      budgetTableInfo: [
        {
          event: 'Изменен доход план бюджета',
          object: 'Название бюджета 1',
          author: 'Иван Петров',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Изменен расход план статьи бюджета',
          object: 'Название статьи бюджета 1',
          author: 'Иван Петров',
          amount: '$1000',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Создана исходящая транзакция',
          object: 'Название транзакции 1',
          author: 'Иван Петров',
          amount: '$50',
          date: '10 ноя 2017, 13:50'
        },
        {
          event: 'Получена входящая транзакция',
          object: 'Название транзакции 2',
          author: 'Иван Петров',
          amount: '$50',
          date: '10 ноя 2017, 13:50'
        }
      ]
    };
  },

  methods: {
    removeCapitalRecomm() {
      let capitalRecomBlock = document.getElementById('capital-recom-block');
      capitalRecomBlock.innerHTML = '';
    },
    removeBudgetRecomm() {
      let budgetRecomBlock = document.getElementById('budget-recom-block');
      budgetRecomBlock.innerHTML = '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/pages/finances-page';

.mb {
  margin-bottom: 2rem;
}
</style>
