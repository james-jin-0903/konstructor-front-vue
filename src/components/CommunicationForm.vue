<template lang="pug">
  div
    .loader(v-if="isLoaded")
      Spinner

    form.communication-form(@submit="onSubmit")
      .field.communication-form__field
        .field__title Коммуникация:
        InputAuto(
          v-model="platform",
          name="platform",
          @input="onInput"
          :items='platformList',
          :value="platform"
          :placehold='"Введите название коммуникации"'
        )
      .section-valid.communication-form__field(v-if="!validPlatform && platform !== ''")
        .section-unvalid__info Указанная коммуникация не найдена на сайте.

      .field.communication-form__field
        .field__title Аккаунт:
        .input
          input.input__input(type="text" placeholder="Введите ссылку на Ваш аккаунт" v-model='link' @input="onInput")

      button.button.button_default.communication-form__submit(:disabled="!disablePoint" type="submit" value="Сохранить")
        span Сохранить
</template>

<script>
  import Tooltip from './Tooltip.vue';
  import InputAuto from './forms/InputAuto.vue';
  import { mapGetters, mapActions } from 'vuex';
  import Spinner from '@/components/Spinner';

  export default {
    name: 'CommunicationForm',
    components: { Tooltip, InputAuto, Spinner },
    props: {
      item: Object
    },
    data() {
      return {
        platform: '',
        link: '',
        forward: false,
        formTouched: false
      };
    },
    created() {
      this.fetchPlatforms();
    },
    computed: {
      ...mapGetters({
        getPlatforms: 'communications/getPlatforms',
        isLoaded: 'communications/getLoaded'
      }),
      disablePoint() {
        return this.platform !== '' && this.link !== '' && this.formTouched;
      },
      platformList() {
        return this.getPlatforms.map(el => el.slug);
      },
      validPlatform() {
        return this.platformList.indexOf(this.platform) !== -1;
      }
    },
    mounted() {
      if (this.item) {
        this.platform = this.item.network_slug;
        this.link = this.item.account;
        this.forward = this.item.forwarding;
      }
    },
    methods: {
      ...mapActions({
        handleAdd: 'communications/add',
        handleUpdate: 'communications/update',
        fetchPlatforms: 'communications/fetchPlatforms'
      }),
      onSubmit(e) {
        e.preventDefault();
        if (this.disablePoint) {
          this.formTouched = false;
          const data = {
            id: this.item && this.item.id,
            network_slug: this.platform,
            account: this.link,
            forwarding: this.forward ? 1 : 0
          };
          if (this.item) {
            this.handleUpdate(data);
          } else {
            this.handleAdd(data)
                .then(result => {
                  if (result) {
                    this.$router.push({ path: '/communications' });
                  }
                });
          }
        }
      },
      onInput() {
        this.formTouched = true;
      }
    }
  };
</script>

<style lang="scss">
  .communication-form {
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
