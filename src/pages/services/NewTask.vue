<template lang="pug">
  .new-task
    .page__nav
      breadcrumbs(:links="servicesLinks.links" :current="servicesLinks.current")

    .new-task__inner.container.page
      .loader(v-if="isLoaded")
        Spinner

      .new-task__form
        .new-task__header
          .new-task__title {{getCurrentStep.name}}
          .new-task__counter (шаг {{getCurrentStep.id}} из {{steps.length}})

        .new-task__step(v-if="currentStep === 1")
          .field.new-task__field
            .field__title Название
            InputField(fieldName="name")
          .field.new-task__field
            .field__title Ответственный (опционально)
            .field__row
              InputObjects(:items="users" type="user")
              .field__tooltip
                Tooltip(text="Подсказка о выборе ответственного")
          .field.new-task__field
            .field__title Бюджет (опционально)
            .field__row
              InputField
              .field__tooltip
                Tooltip(text="Подсказка о бюджете")
          .field.new-task__field
            .field__title Дедлайн (опционально)
            .field__row
              TextInput(
                placeholder="Все время"
                :validate="false"
                :range="true"
                :time="true"
                :value="null"
                name="task_deadline"
                :disabled-date="null"
                :max-date="null"
                isDate
                @input="() => null"
              )
              .field__tooltip
                Tooltip(text="Подсказка о дедлайне")
          .field.new-task__field
            .field__row
              Checkbox(text="Пользователь может предложить свои условия")
              .field__tooltip
                Tooltip(text="Подсказка о своих условиях")

        .new-task__step(v-if="currentStep === 2")
          .field.new-task__field
            .field__title Описание (опционально)
            .field__row
              TextArea
              .field__tooltip.new-task__tooltip
                Tooltip(text="Подсказка об описании")
          .field.new-task__field
            .field__title Теги (опционально)
            .field__row
              InputTag(placeholder="")
              .field__tooltip
                Tooltip(text="Подсказка о тегах")
          .field.new-task__field
            .field__title Локация (опционально)
            .field__row
              InputField(
                fieldName="location"
                :icon="icons.location"
              )
              .field__tooltip
                Tooltip(text="Подсказка о выборе локации")

        .new-task__step(v-if="currentStep === 3")
          .field.new-task__field
            .field__title Сообщество
            .field__row
              InputObjects(:items="communities" type="user")
              .field__tooltip
                Tooltip(text="Подсказка о выборе сообщества")

          .field.new-task__field
            .field__title Проект (опционально)
            .field__row
              InputObjects(:items="projects")
              .field__tooltip
                Tooltip(text="Подсказка о выборе проекта")

          .field.new-task__field
            .field__title Подпроект (опционально)
            .field__row
              InputObjects(:items="projects")
              .field__tooltip
                Tooltip(text="Подсказка о выборе проекта")

        .new-task__step(v-if="currentStep === 4")
          .field.new-task__field
            Radio(
              text="Задача доступна публично"
              name="publicity"
            )
            .field__info.new-task__radio-description
              span Услуга будет доступна для всех пользователей сайта. Все люди смогут ее просматривать, комментировать и оформлять заказы.
          .field.new-task__field
            Radio(
              text="Задача доступна только внутри сообщества"
              name="publicity"
            )
            .field__info.new-task__radio-description
              span Задача будет доступна только для участников сообщества, в котором она создана. Только они смогут с
                | ней взаимодействовать.
          .field.new-task__field
            Radio(
              text="Задача доступна только вам"
              name="publicity"
            )
            .field__info.new-task__radio-description
              span Задача будет доступна только Вам. Только Вы сможете с ней взаимодействовать.

      .new-task__footer
        button.new-task__button.button.button_big.button_neutral(
          @click="() => null"
          v-if="currentStep > 1"
        )
          span Назад
        button.new-task__button.button.button_big.button_green(
          @click="() => null"
          v-if="currentStep < steps.length"
          :disabled="!isStepValid"
        )
          span Далее
        button.new-task__button.button.button_big(
          @click="() => null"
          v-if="currentStep === steps.length"
          :disabled="!isStepValid"
        )
          span Создать
</template>

<script>
  import { mapGetters } from 'vuex';
  import Breadcrumbs from '@/components/Breadcrumbs';
  import Radio from '@/components/forms/Radio';
  import InputTag from '@/components/forms/InputTag';
  import Tooltip from '@/components/Tooltip';
  import InputField from '@/components/forms/InputField';
  import images from '@/components/images';
  import Checkbox from '@/components/forms/Checkbox';
  import TextInput from '@/components/forms/TextInput';
  import InputAuto from '@/components/forms/InputAuto';
  import InputObjects from '@/components/forms/InputObjects';
  import TextArea from '@/components/forms/TextArea';

  const PAGE_NAME = 'Новая задача';

  export default {
    name: 'NewTaskPage',
    components: {
      TextArea,
      InputObjects,
      InputAuto,
      TextInput,
      Breadcrumbs,
      Checkbox,
      InputField,
      InputTag,
      Radio,
      Tooltip
    },
    data(){
      return {
        servicesLinks: {
          links: [
            { label: 'Услуги', href: '/services' },
            { label: 'Задачи', href: '' }
          ],
          current: PAGE_NAME
        },
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
            name: 'Принадлежность'
          },
          {
            id: 4,
            name: 'Публичность'
          },
        ],
        users: [
          {name: 'Иван Петров', initials: 'ИП', fillLevel: 50},
          {name: 'Петр Иванов', initials: 'ПИ', fillLevel: 10},
          {name: 'Иван Иванов', initials: 'ИИ', fillLevel: 23},
          {name: 'Петр Петров', initials: 'ПП', fillLevel: 10},
          {name: 'Петр Михайлов', initials: 'ПМ', fillLevel: 50},
        ],
        communities: [
          {name: 'Alpha', initials: 'AL'},
          {name: 'Beta', initials: 'BT'},
          {name: 'Gamma', initials: 'GM'},
          {name: 'Lambda', initials: 'LM'}
        ],
        projects: [
          {name: 'Название интересного проекта 1'},
          {name: 'Название интересного проекта 2'},
          {name: 'Название интересного проекта 3'},
          {name: 'Название интересного проекта 4'},
        ],
        currentStep: 3,
        icons: images.icons
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
    }
  }
</script>

<style lang="scss" scoped>
.new-task {

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