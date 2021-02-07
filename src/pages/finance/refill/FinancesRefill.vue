<template>
  <div class="container">
    <breadcrumbs
      :links="breadcrumbs.links"
      :current="breadcrumbs.current"
      style="margin-bottom: 20px;"
    ></breadcrumbs>
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
              Сумма пополнения
            </div>
            <input
              type="text"
              class="new-item__input"
              v-model="form.topupAmount"
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
        <p class="refill-message">Счет пополнен на {{ form.topupAmount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Select from '@/components/forms/Select.vue';
import images from '@/components/images.ts';
import { log } from 'util';

const PAGE_NAME = 'Пополнение счета';

export default {
  name: 'FinancesRefill',
  components: {
    Breadcrumbs,
    Select
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
      }
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
    }
  },

  methods: {
    changeSelect(event) {
      this.$validator.validate();

      this.showCardInput = true;
    },
    submitForm(e) {
      e.preventDefault();
      let data = [];
      data.push(this.form);

      this.isFormEmpty = true;

      setTimeout(() => {
        this.$router.push('/finances/recommendations');
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