<template lang="pug">
  form.add-comm(@submit="onSubmit")
    .field.add-comm__field
      .field__title Коммуникация:
      InputAuto(v-model="platform", name="platform", :items='platformList', :placehold='"Введите название коммуникации"')
    .section-valid.add-comm__field(v-if="!validPlatform && platform !== ''")
      .section-unvalid__info Указанная коммуникация не найдена на сайте. Будет создан новый фантом.
        Tooltip.section-unvalid__tooltip(:text="'Фантом - профиль или сообщество, у которого нет владельца. Создается сайтом автоматически.'")

    .field.add-comm__field
      .field__title Аккаунт:
      .input
        input.input__input(type="text" placeholder="Введите ссылку на Ваш аккаунт"  v-model='link')

    button.button.button_default.add-comm__submit(:class="!disablePoint && 'buttonSubmit_disabled'" :disabled="!disablePoint" type="submit" value="Сохранить")
      span Сохранить
</template>

<script>
  import Tooltip from './Tooltip.vue';
  import InputAuto from './forms/InputAuto.vue';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    components: {
      Tooltip,
      InputAuto
    },
    props: {
      returnBack: Function
    },
    data() {
      return {
        platform: '',
        link: ''
      };
    },
    computed: {
      ...mapGetters({
        getPlatforms: 'communications/getPlatforms'
      }),
      disablePoint() {
        if (this.platform !== '' && this.link !== '') {
          return true;
        } else {
          return false;
        }
      },
      platformList() {
        return this.getPlatforms.map(el => {
          return el.name;
        });
      },
      validPlatform() {
        if (this.platformList.indexOf(this.platform) !== -1) {
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      ...mapActions({
        addComm: 'communications/addComm'
      }),
      onSubmit(e) {
        e.preventDefault();
        if (this.disablePoint) {
          this.addComm({
            platform: this.platform,
            link: this.link
          });
          this.returnBack();
        }
      }
    }
  };
</script>

<style lang="scss">
  .add-comm {
    width: 380px;
    &__submit {
      margin-top: 26px;
    }
    &__field {
      margin-bottom: 15px;
    }
  }

  .section-unvalid {
    margin-top: 25px;
    &__info {
      font-size: 16px;
      line-height: 22px;  
    }

    &__tooltip {
      display: inline-block;
      margin-left: 8px;
    }
  }
</style>
