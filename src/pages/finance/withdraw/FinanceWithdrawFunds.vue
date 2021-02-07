<template>
  <div class="container">
    <FinancesPageToolBar
      :crumbLinks="breadcrumbs.links"
      :crumbCurrent="breadcrumbs.current"
    >
      <template #container>
        <span></span>
      </template>
    </FinancesPageToolBar>
    <div class="finances-page__row px">
      <div
        class="finances-page__col-6 d-flex"
        style="margin-top: -20px; margin-bottom: 30px;"
      >
        <span
          class="finances-page__text"
          style="margin-top: 10px; margin-bottom: 10px; margin-right: 10px;"
          >Средства на счету:</span
        >
        <h2 style="display: inline;">$1000</h2>
      </div>
    </div>
    <form v-if="!isFormEmpty">
      <div class="new-item" style="margin-bottom: 30px;">
        <div class="new-item__title" style="margin-bottom: 13px;">
          Платежная система
        </div>
        <div class="finances-page__row" style="margin-left: 0;">
          <div class="finances-page__col-12">
            <Select
              @change="changeSelect"
              :small="paymentSelect.small"
              :text="(paymentSelect.text = paymentSelect.options.text)"
              :placeholder="paymentSelect.placeholder"
              :options="paymentSelect.options"
              name="paymentSystem"
            ></Select>
          </div>
        </div>
      </div>
      <div class="new-item">
        <div
          v-if="showCardInput"
          class="finances-page__row justify-around"
          style="margin-left: -5px;"
        >
          <div class="finances-page__col-5" style="margin-left: -15px;">
            <div class="new-item__title">
              Номер карты
            </div>
            <input
              type="text"
              placeholder="xxxx xxxx xxxx xxxx"
              class="new-item__input"
              name="card-number"
              v-model="form.creditCard"
            />
            <p>{{ errors.first('card-number') }}</p>
          </div>
          <div class="finances-page__col-3">
            <div class="new-item__title">
              Срок действ.
            </div>
            <input
              type="text"
              placeholder="MM/YYYY"
              class="new-item__input"
              v-model="form.expiryDate"
            />
          </div>
          <div class="finances-page__col-2">
            <div class="new-item__title">
              CVC2/CVV2
            </div>
            <input
              type="text"
              placeholder="xxx"
              class="new-item__input"
              v-model="form.cvcCvv"
            />
          </div>
          <div class="finances-page__col-12" style="margin-left: 0;">
            <div class="new-item__title">
              Имя и фамилия владельца
            </div>
            <input
              type="text"
              class="new-item__input"
              v-model="form.nameAndSirname"
            />
          </div>
        </div>
        <div class="finances-page__row justify-around" style="margin-left: 0;">
          <div class="finances-page__col-12">
            <div class="new-item__title">
              Вывод средств
            </div>
            <input
              type="text"
              class="new-item__input"
              v-model="form.withdrawAmount"
            />
          </div>
          <div class="finances-page__col-12">
            <button
              type="submit"
              :class="[isDisabled ? 'new-item__btn_disabled' : 'new-item__btn']"
              @click="submitForm"
              :disabled="isDisabled"
            >
              Пополнить
            </button>
          </div>
        </div>
      </div>
    </form>
    <div v-else class="finances-page__row" style="margin-top: 20px;">
      <div class="finances-page__col-12">
        <p class="refill-message">
          Ваш запрос на вывод {{ form.withdrawAmount }} отправлен
        </p>
      </div>
    </div>
    <div v-if="showRecommendations">
      <div class="page">
        <div>
          <EventItem
            :item="ideaItem"
            :key="ideaItem.id"
            v-for="ideaItem of items"
            :small="isListView"
            route="/finances/recommendations"
          ></EventItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FinancesPageToolBar from '@/components/finances-page/FinancesPageToolBar.vue';
import Select from '@/components/forms/Select.vue';
import images from '@/components/images.ts';
import EventItem from '@/components/EventItem';
import { ViewTypes } from '@/utils/constants';
import { mapActions, mapGetters } from 'vuex';
import { log } from 'util';

const PAGE_NAME = 'Вывод средств';

const RECOMMENDATIONS = [
  {
    id: 1,
    image: 'idea_01.png',
    isVideo: true,
    icon: 'feather',
    title: 'Название интересной идеи',
    tags: ['Наука'],
    category: {
      title: 'Сообщество',
      text: 'Публицисты',
      url: '/'
    },
    subcategory: {
      title: 'Тип',
      text: 'Публикация',
      url: '/'
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: 'button',
      action: ''
    },
    tools: [
      {
        type: 'newObject',
        icon: images.icons.newEvent,
        text: 'Объекты на базе идеи'
      },
      {
        type: 'report',
        icon: images.icons.report,
        text: 'Пожаловаться'
      }
    ]
  },
  {
    id: 2,
    image: 'idea_02.png',
    isVideo: false,
    icon: 'feather',
    title: 'Короткое',
    tags: ['Автомобили'],
    category: {
      title: 'Сообщество',
      text: 'Технологии и жизнь',
      url: '/'
    },
    subcategory: {
      title: 'Тип',
      text: 'Опыт реализации',
      url: '/'
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: 'button',
      action: ''
    }
  }
];

export default {
  name: 'FinanceWithdrawFunds',
  components: {
    FinancesPageToolBar,
    Select,
    EventItem
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
            label: 'Капитал',
            href: '/finances/capital'
          },
          {
            label: 'Счет',
            href: '/'
          }
        ],
        current: PAGE_NAME
      },
      isFormEmpty: false,
      showCardInput: false,
      showRecommendations: false,
      form: {
        creditCard: null,
        expiryDate: null,
        cvcCvv: null,
        nameAndSirname: null,
        topupAmount: null
      },
      paymentSelect: {
        small: false,
        text: '',
        placeholder: true,
        options: [
          {
            text: 'Visa',
            val: 'Visa',
            icon: images.avatar
          },
          {
            text: 'Visa',
            val: 'visa'
          }
        ]
      },
      items: RECOMMENDATIONS,
      maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 30)),
      todayDate(date) {
        const limit = this.maxDate;
        return date > limit;
      },
      defaultDate: null,
      filterDate: null,
      views: ViewTypes,
      currentView: ViewTypes.BLOCK
    };
  },

  computed: {
    isDisabled() {
      let creditCard = this.form.creditCard;
      let expiryDate = this.form.expiryDate;
      let cvcCvv = this.form.cvcCvv;
      let nameAndSirname = this.form.nameAndSirname;
      let topupAmount = this.form.topupAmount;

      if (
        creditCard &&
        expiryDate &&
        cvcCvv &&
        nameAndSirname &&
        topupAmount !== null
      ) {
        return false;
      } else {
        return true;
      }
    },
    ...mapGetters({
      isLoaded: 'social/getLoaded'
    }),
    isListView() {
      return this.currentView === ViewTypes.LIST;
    }
  },

  methods: {
    ...mapActions({
      fetchSocial: 'social/fetchSocial'
    }),
    dateChange(date) {
      this.filterDate = date.value;
    },
    changeSelect(event) {
      this.$validator.validate();

      this.showCardInput = true;
    },
    submitForm(e) {
      e.preventDefault();
      let data = [];
      data.push(this.form);

      setTimeout(() => {
        this.isFormEmpty = true;
        this.showRecommendations = true;
      }, 2000);
    }
  }
};
</script>

<style lang="scss">
@import '@/scss/components/new-item';

.refill-message {
  color: #4daf7c;
  font-weight: bold;
  font-size: 20px;
}
</style>