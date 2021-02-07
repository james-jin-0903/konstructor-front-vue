<template lang="pug">
  .new-service
    .page__nav
      breadcrumbs(:links="servicesLinks.links" :current="servicesLinks.current")

    .new-service__inner.container.page
      .loader(v-if="isLoaded")
        Spinner

      .new-service__form
        .new-service__header
          .new-service__title {{getCurrentStep.name}}
          .new-service__counter (шаг {{getCurrentStep.id}} из {{steps.length}})

        .new-service__step(v-if="currentStep === 1")
          .field.new-service__field
            .field__title Название
            TextInput
          .field.new-service__field
            .field__title Сообщество
            .field__row
              InputObjects(:items="communities" type="user")
              .field__tooltip
                Tooltip(text="Подсказка о выборе сообщества")
          .field.new-service__field
            .field__title Тип цены
            .field__row
              Select(:options="priceOptions" @change="setPriceType")
              .field__tooltip
                Tooltip(text="Подсказка о типе цены")
          template(v-if="selectedPrice === 'concretePrice'")
            .field.new-service__field
              .field__title Цена
              TextInput
            .field.new-service__field(v-if="selectedPrice === 'concretePrice'")
              .field__row
                Checkbox(text="Пользователь может предложить свою цену")
                .field__tooltip
                  Tooltip(text="Подсказка о предложении своей цены")

        .new-service__step(v-if="currentStep === 2")
          .field.new-service__field
            .field__title Описание (опционально)
            .field__row
              TextArea
              .field__tooltip.new-service__tooltip
                Tooltip(text="Подсказка об описании")
          .field.new-service__field
            .field__title Теги (опционально)
            .field__row
              InputTag(placeholder="")
              .field__tooltip
                Tooltip(text="Подсказка о тегах")
          .field.new-service__field
            .field__title Адрес (опционально)
            .field__row
              InputField(:icon="icons.location")
              .field__tooltip
                Tooltip(text="Подсказка об адресе")

        .new-service__step(v-if="currentStep === 3")
          .field.new-service__field
            Radio(
              text="Услуга доступна публично"
              name="publicity"
            )
            .field__info.new-service__radio-description
              span Услуга будет доступна для всех пользователей сайта. Все люди смогут ее просматривать, комментировать и оформлять заказы.
          .field.new-service__field
            Radio(
              text="Услуга доступна только внутри сообщества"
              name="publicity"
            )
            .field__info.new-service__radio-description
              span Услуга будет доступна только для участников сообщества, в котором она создана. Только они смогут с ней взаимодействовать.
          .field.new-service__field
            Radio(
              text="Услуга доступна только вам"
              name="publicity"
            )
            .field__info.new-service__radio-description
              span Услуга будет доступна только Вам. Только Вы сможете с ней взаимодействовать.

        .new-service__footer
          button.new-service__button.button.button_big.button_neutral(
            @click="() => null"
            v-if="currentStep > 1"
          )
            span Назад
          button.new-service__button.button.button_big.button_green(
            @click="() => null"
            v-if="currentStep < steps.length"
            :disabled="!isStepValid"
          )
            span Далее
          button.new-service__button.button.button_big(
            @click="() => null"
            v-if="currentStep === steps.length"
            :disabled="!isStepValid"
          )
            span Создать

</template>

<script>
  import { mapGetters } from 'vuex';
  import Breadcrumbs from '@/components/Breadcrumbs';
  import Spinner from '@/components/Spinner';
  import TextInput from '@/components/forms/TextInput';
  import Tooltip from '@/components/Tooltip';
  import InputAuto from '@/components/forms/InputAuto';
  import Select from '@/components/forms/Select';
  import Radio from '@/components/forms/Radio';
  import InputTag from '@/components/forms/InputTag';
  import Checkbox from '@/components/forms/Checkbox';
  import InputObjects from '@/components/forms/InputObjects';
  import InputField from '@/components/forms/InputField';
  import images from '@/components/images';
  import TextArea from '@/components/forms/TextArea';

  const PAGE_NAME = 'Новая услуга';

  export default {
    name: 'NewServicePage',
    components: {
      InputField,
      InputObjects,
      Breadcrumbs,
      Checkbox,
      InputAuto,
      InputTag,
      Radio,
      Select,
      Spinner,
      TextInput,
      TextArea,
      Tooltip
    },
    data(){
      return {
        icons: images.icons,
        communities: [
          {name: 'Alpha', initials: 'AL'},
          {name: 'Beta', initials: 'BT'},
          {name: 'Gamma', initials: 'GM'},
          {name: 'Lambda', initials: 'LM'}
        ],
        servicesLinks: {
          links: [
            { label: 'Услуги', href: '/services' },
            { label: 'Исполнители', href: '' }
          ],
          current: PAGE_NAME
        },
        currentStep: 2,
        steps: [
          {
            id: 1,
            name: 'Основная информация'
          },
          {
            id: 2,
            name: 'Подробная информация'
          },
          {
            id: 3,
            name: 'Публичность'
          },
        ],
        priceOptions: [
          {
            text: 'Конкретная цена',
            val: 'concretePrice'
          },
          {
            text: 'Другая цена',
            val: 'otherPrice'
          },
        ],
        selectedPrice: null
      }
    },
    computed: {
      ...mapGetters({
        isLoaded: 'social/getLoaded'
      }),
      getCurrentStep() {
        return this.steps.find(step => step.id === this.currentStep);
      },
      isStepValid() {
        return true;
      }
    },
    methods: {
      setPriceType({ value }) {
        this.selectedPrice = value;
      }
    }
  }
</script>

<style lang="scss" scoped>
.new-service {

  &__inner {
    padding-top: 30px;
  }

  &__header {
    display: flex;
    margin-bottom: 20px;
  }

  &__title {
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    margin-right: 10px;

    color: #444444;
  }

  &__counter {
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #B2BCCA;
  }

  &__step {
    width: 380px;
  }

  &__field {
    margin-bottom: 20px;
  }

  &__footer {
    margin-top: 40px;
    display: flex;
  }

  &__button {
    margin-right: 10px;
  }

  &__radio-description {
    padding-left: 20px;
    margin-top: 20px;
  }

  &__tooltip {
    top: 0;
    bottom: 0;
    transform: none;
    padding-top: 3%;
  }
}
</style>