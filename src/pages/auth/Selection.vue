<template lang="pug">
  main.layoutMain__main.layoutMain__main_hovered.layoutMain--auth
    .container.container_centered.auth-container
      .app__wrapper
        h3.app__title {{$t(toggleType ? 'skills.title' : 'interest.title')}}
          .app__tooltip
            Tooltip(:text="$t(toggleType ? 'skills.tooltip' : 'interest.tooltip')")
        form.pageSelection__form()

          .pageSelection__grid
            SelectionBlock(v-for="(item, index) in list" :key="item.id" :id="item.id" :label="item.name" :img="item.image", v-model="list[index]")
          .app__groupBtns
            .button.pageSelection__btn(@click="back")
              span {{$t('skills.back')}}
            button.button.button_next.pageSelection__btn(type="button" @click.prevent="onSubmit" :disabled="!disablePoint")
              span {{$t(toggleType ? 'skills.enter' : 'interest.enter')}}
</template>

<script>
  import SelectionBlock from '../../components/SelectionBlock';
  import Tooltip from '../../components/Tooltip.vue';
  import { authRoutesMap } from '../../config';
  import { mapGetters, mapActions, mapMutations } from 'vuex';


  export default {
    components: {
      SelectionBlock,
      Tooltip
    },
    props: ['type'],
    data() {
      return {
        list: []
      };
    },
    computed: {
      ...mapGetters({
        getSkillsList: 'signUp/getSkillsList',
        getInterestList: 'signUp/getInterestList',
        getSkills: 'signUp/getSkills',
        getInterest: 'signUp/getInterest'
      }),
      disablePoint() {
        if (this.counter >= 1 && this.counter < 6) {
          return true;
        }
        return false;
      },

      counter() {
        let counter = 0;
        this.list.forEach(el => {
          if (el.is_selected) {
            counter++;
          }
        });
        return counter;
      },
      toggleType() {
        return this.type === 'skills';
      }
    },
    created() {
      this.onCreated();
    },
    watch: {
      type() {
        this.onCreated();
      }
    },
    methods: {
      ...mapActions({
        fetchSkills: 'signUp/fetchSkills',
        fetchInterest: 'signUp/fetchInterest',
        fetchSignUp: 'signUp/fetchSignUp'
      }),
      ...mapMutations({
        setSkills: 'signUp/SET_SKILLS',
        setInterest: 'signUp/SET_INTEREST',
        setLevel: 'signUp/SET_LEVEL'
      }),
      back() {
        if (this.toggleType) {
          this.setLevel(1);
        } else {
          this.setLevel(2);
        }
        this.$router.back();
        this.onCreated();
      },
      async onCreated() {
        if (this.toggleType) {
          await this.fetchSkills();
          const skills = JSON.parse(JSON.stringify(this.getSkillsList));
          this.getSkills.forEach(el => {
            const index = this.getSkillsList.findIndex(oldEl => {
              return el.id === oldEl.id;
            });
            skills[index] = JSON.parse(JSON.stringify(el));
          });
          this.list = skills;
        } else {
          await this.fetchInterest();
          const interest = JSON.parse(JSON.stringify(this.getInterestList));
          this.getInterest.forEach(el => {
            const index = this.getInterestList.findIndex(oldEl => {
              return el.id === oldEl.id;
            });
            interest[index] = JSON.parse(JSON.stringify(el));
          });
          this.list = interest;
        }
      },
      async onSubmit() {
        if (this.disablePoint) {
          if (this.toggleType) {
            this.setSkills(this.list);
            this.$router.push(authRoutesMap.interest);
          } else {
            this.setInterest(this.list);
            this.fetchSignUp();
            this.$router.push(authRoutesMap.signIn);
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../scss/auth/shared';

  .pageSelection__form {
    width: 1180px;
  }

  .pageSelection__grid {
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas: '. . . .' '. . . .' '. . . .';
    grid-gap: 20px;
  }

  .pageSelection__btn {
    width: 100px;
    margin: 0 10px;

    &_complete {
      margin-top: 35px;
    }
  }

  .app__title {
    margin-top: 0;
  }
</style>
