<template>
  <div class="container">
    <breadcrumbs
      :links="breadcrumbs.links"
      :current="breadcrumbs.current"
      style="margin-bottom: 20px;"
    >
    </breadcrumbs>
    <form action="/finances/budget">
      <transition :name="transitionName" mode="out-in">
        <div v-if="step == 1" key="1">
          <div class="new-item__heading">
            Основная информация
            <span class="new-item__steps"
              >(шаг {{ step }} из {{ totalSteps }})</span
            >
          </div>
          <div class="new-item">
            <div class="new-item__title">Название</div>
            <div
              class="new-item__input-container"
              :class="{'input_error': errors.has('name'),  'input_success': fields.name ? (fields.name.touched &amp;&amp; fields.name.valid) : false}"
            >
              <div class="finances-page__row" style="margin-left: 0;">
                <div class="finances-page__col-11">
                  <input
                    class="new-item__input"
                    type="text"
                    v-model="form.name"
                    v-validate="'required'"
                    name="name"
                    @blur="changeValue"
                  />
                  <img
                    class="input__icn-status"
                    v-show="errors.has('name')"
                    src="@/assets/images/icon_error.svg"
                  /><img
                    class="input__icn-status"
                    v-show="fields.name &amp;&amp; fields.name.touched &amp;&amp; fields.name.valid"
                    src="@/assets/images/icon_success.svg"
                  />
                </div>
              </div>
            </div>
            <div class="input__error-msg" v-show="errors.has('name')">
              {{ this.errors.first('name') }}
            </div>
          </div>

          <div class="new-item">
            <div class="new-item__title">
              Расход план <span class="new-item__caption">(опционально)</span>
            </div>
            <div
              class="new-item__input-container"
              :class="{'input_error': errors.has('expensePlan'),  'input_success': fields.expensePlan ? (fields.expensePlan.touched &amp;&amp; fields.expensePlan.valid) : false}"
            >
              <div class="finances-page__row" style="margin-left: 0;">
                <div class="finances-page__col-11">
                  <input
                    class="new-item__input"
                    type="text"
                    v-model="form.expensePlan"
                    v-validate="'required'"
                    name="Expense Plan"
                    @blur="changeValue"
                  />
                  <img
                    class="input__icn-status"
                    v-show="errors.has('expensePlan')"
                    src="@/assets/images/icon_error.svg"
                  /><img
                    class="input__icn-status"
                    v-show="fields.expensePlan &amp;&amp; fields.expensePlan.touched &amp;&amp; fields.expensePlan.valid"
                    src="@/assets/images/icon_success.svg"
                  />
                </div>
                <div class="finances-page__col-1">
                  <h4
                    class="finances-page__hint"
                    style="margin-left: 10px; margin-top: -15px;"
                  >
                    i
                    <span class="finances-page__hint_tooltip">Some hint</span>
                  </h4>
                </div>
              </div>
            </div>
            <div class="input__error-msg" v-show="errors.has('expensePlan')">
              {{ this.errors.first('expensePlan') }}
            </div>
          </div>

          <div class="new-item">
            <div class="new-item__title">
              Доход план <span class="new-item__caption">(опционально)</span>
            </div>
            <div
              class="new-item__input-container"
              :class="{'input_error': errors.has('incomePlan'),  'input_success': fields.incomePlan ? (fields.incomePlan.touched &amp;&amp; fields.incomePlan.valid) : false}"
            >
              <div class="finances-page__row" style="margin-left: 0;">
                <div class="finances-page__col-11">
                  <input
                    class="new-item__input"
                    type="text"
                    v-model="form.incomePlan"
                    v-validate="'required'"
                    name="Income Plan"
                    @blur="changeValue"
                  /><img
                    class="input__icn-status"
                    v-show="errors.has('incomePlan')"
                    src="@/assets/images/icon_error.svg"
                  /><img
                    class="input__icn-status"
                    v-show="fields.incomePlan &amp;&amp; fields.incomePlan.touched &amp;&amp; fields.incomePlan.valid"
                    src="@/assets/images/icon_success.svg"
                  />
                </div>
                <div class="finances-page__col-1">
                  <h4
                    class="finances-page__hint"
                    style="margin-left: 10px; margin-top: -15px;"
                  >
                    i
                    <span class="finances-page__hint_tooltip">Some hint</span>
                  </h4>
                </div>
              </div>
            </div>
            <div class="input__error-msg" v-show="errors.has('incomePlan')">
              {{ this.errors.first('incomePlan') }}
            </div>
          </div>
        </div>

        <div v-if="step == 2" key="2">
          <div class="new-item__heading">
            Принадлежность
            <span class="new-item__steps"
              >(шаг {{ step }} из {{ totalSteps }})</span
            >
          </div>
          <div class="new-item">
            <div class="new-item__title">
              Бюджет <span class="new-item__caption">(опционально)</span>
            </div>
            <div
              class="new-item__input-container"
              :class="{'input_error': errors.has('budget'),  'input_success': fields.budget ? (fields.budget.touched &amp;&amp; fields.budget.valid) : false}"
            >
              <div class="finances-page__row" style="margin-left: 0;">
                <div class="finances-page__col-11">
                  <input
                    class="new-item__input"
                    type="text"
                    v-model="form.budget"
                    v-validate="'required'"
                    name="Expense Plan"
                    @blur="changeValue"
                  />
                  <img
                    class="input__icn-status"
                    v-show="errors.has('budget')"
                    src="@/assets/images/icon_error.svg"
                  /><img
                    class="input__icn-status"
                    v-show="fields.expensePlan &amp;&amp; fields.expensePlan.touched &amp;&amp; fields.expensePlan.valid"
                    src="@/assets/images/icon_success.svg"
                  />
                </div>
                <div class="finances-page__col-1">
                  <h4
                    class="finances-page__hint"
                    style="margin-left: 10px; margin-top: -15px;"
                  >
                    i
                    <span class="finances-page__hint_tooltip">Some hint</span>
                  </h4>
                </div>
              </div>
            </div>
            <div class="input__error-msg" v-show="errors.has('expensePlan')">
              {{ this.errors.first('budget') }}
            </div>
          </div>

          <div class="new-item">
            <div class="new-item__title">
              Статья бюджета
              <span class="new-item__caption">(опционально)</span>
            </div>
            <div
              class="new-item__input-container"
              :class="{'input_error': errors.has('budgetItem'),  'input_success': fields.budgetItem ? (fields.budgetItem.touched &amp;&amp; fields.budgetItem.valid) : false}"
            >
              <div class="finances-page__row" style="margin-left: 0;">
                <div class="finances-page__col-11">
                  <input
                    class="new-item__input"
                    type="text"
                    v-model="form.budgetItem"
                    v-validate="'required'"
                    name="Income Plan"
                    @blur="changeValue"
                  /><img
                    class="input__icn-status"
                    v-show="errors.has('budgetItem')"
                    src="@/assets/images/icon_error.svg"
                  /><img
                    class="input__icn-status"
                    v-show="fields.budgetItem &amp;&amp; fields.budgetItem.touched &amp;&amp; fields.budgetItem.valid"
                    src="@/assets/images/icon_success.svg"
                  />
                </div>
                <div class="finances-page__col-1">
                  <h4
                    class="finances-page__hint"
                    style="margin-left: 10px; margin-top: -15px;"
                  >
                    i
                    <span class="finances-page__hint_tooltip">Some hint</span>
                  </h4>
                </div>
              </div>
            </div>
            <div class="input__error-msg" v-show="errors.has('budgetItem')">
              {{ this.errors.first('budgetItem') }}
            </div>
          </div>
        </div>
      </transition>

      <button
        v-if="step == 1"
        :class="[isDisabled ? 'new-item__btn_disabled' : 'new-item__btn_next']"
        @click.prevent="nextStep"
        :disabled="isDisabled"
      >
        Далее
      </button>
      <button
        v-if="step == 2"
        class="new-item__prev-btn"
        @click.prevent="prevStep"
      >
        Назад
      </button>
      <button
        v-if="step == 2"
        :class="[isDisabled2 ? 'new-item__btn_disabled' : 'new-item__btn']"
        type="submit"
        @click="submitForm"
        :disabled="isDisabled2"
      >
        Создать
      </button>
    </form>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';

const PAGE_NAME = 'Новый объект бюджета';

export default {
  name: 'BudgetNewItem',
  components: {
    Breadcrumbs
  },
  data() {
    return {
      breadcrumbs: {
        links: [
          {
            label: 'Финансы',
            href: '/finances'
          },
          {
            label: 'Бюджет',
            href: '/finances/budget'
          }
        ],
        current: PAGE_NAME
      },
      form: {
        name: '',
        expensePlan: '',
        incomePlan: '',
        budget: '',
        budgetItem: ''
      },
      totalSteps: 2,
      step: 1,
      transitionName: 'slide-right'
    };
  },
  computed: {
    isDisabled() {
      const name = this.form.name;
      const expensePlan = this.form.expensePlan;
      const incomePlan = this.form.incomePlan;

      if (name && expensePlan && incomePlan !== '') {
        return false;
      } else {
        return true;
      }
    },
    isDisabled2() {
      const budget = this.form.budget;
      const budgetItem = this.form.budgetItem;

      if (budget && budgetItem !== '') {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    if (this.step == 1) {
      return (transitionName = 'slide-right');
    } else {
      return (transitionName = 'slide-left');
    }
  },
  methods: {
    changeValue() {
      this.$validator.validate();
    },
    submitForm(e) {
      e.preventDefault();
      e.stopPropagation();
      this.$validator.reset();
      // console.log(JSON.stringify(this.form));
      location.reload();
    },
    nextStep() {
      this.step++;
    },
    prevStep() {
      this.step--;
    }
  }
};
</script>

<style lang="scss">
@import '@/scss/components/new-item';

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>