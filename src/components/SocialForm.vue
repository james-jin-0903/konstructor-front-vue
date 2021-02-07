<template lang="pug">
  div
    .loader(v-if="isLoaded")
      Spinner
    form.add-social(@submit="onSubmit")
      .field.add-social__field
        .field__title Социальная сеть:
        InputAuto(
          v-model="platform",
          name="platform",
          :items='platformList',
          :placehold='"Введите название социальной сети"'
          :value="platform"
          @input="onInput()"
        )
      .section-valid.add-social__field(v-if="!validPlatform && platform !== ''")
        .section-unvalid__info Указанная социальная сеть не найдена на сайте.

      .field.add-social__field
        .field__title Аккаунт:
        .input
          input.input__input(
            type="text"
            placeholder="Введите ссылку на Ваш аккаунт"
            v-model='link'
            @input="onInput()"
          )

      button.button.button_default.add-social__submit(:class="!disablePoint && 'buttonSubmit_disabled'" :disabled="!disablePoint" type="submit" value="Сохранить")
        span Сохранить
</template>

<script>
  import Tooltip from './Tooltip.vue';
  import InputAuto from './forms/InputAuto.vue';
  import Spinner from '../components/Spinner';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    components: { Tooltip, InputAuto, Spinner },
    props: {
      item: { id: Number, network_slug: String, account: String }
    },
    data() {
      return {
        platform: '',
        link: '',
        formTouched: false
      };
    },
    created() {
      this.fetchPlatforms();
    },
    computed: {
      ...mapGetters({
        availableList: 'social/getAvailable',
        isLoaded: 'social/getLoaded'
      }),
      disablePoint() {
        const linkRegexp = /(https?:\/\/)?([\da-zа-я\.-]+)\.([a-zа-я\.]{2,6})([\/\w\.-]*)*\/?/;
        const isLinkValid = this.link && this.link.match(linkRegexp);
        return this.platform !== '' && isLinkValid && this.formTouched;
      },
      platformList() {
        return this.availableList ? this.availableList.map(el => el.slug) : [];
      },
      validPlatform() {
        return this.platformList.indexOf(this.platform) !== -1;
      }
    },
    mounted() {
      if (this.item) {
        this.link = this.item.account;
        this.platform = this.item.network_slug;
      }
    },
    methods: {
      ...mapActions({
        addSocial: 'social/addSocial',
        updateSocial: 'social/updateSocial',
        fetchPlatforms: 'social/fetchPlatforms'
      }),
      onSubmit(e) {
        e.preventDefault();
        if (this.disablePoint) {
          this.formTouched = false;
          const data = {
            network_slug: this.platform,
            account: this.link,
            id: this.item && this.item.id
          };
          if (this.item) {
            this.updateSocial(data);
          } else {
            this.addSocial(data)
                .then(result => {
                  if (result) {
                    this.$router.push({ path: '/social' });
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
  .add-social {
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
