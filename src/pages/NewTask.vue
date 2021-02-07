<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links" :current="breadcrumbs.current")
    .container.page
      NewTaskFormMain(v-if="stepCount === 1 && mainData" :increaseStep="increaseStep" v-model="mainData")
      NewTaskFormDetail(v-if="stepCount === 2 && detailData" :increaseStep="increaseStep" :decreaseStep="decreaseStep" v-model="detailData")
      NewTaskFormPublic(v-if="stepCount === 3 && publicRadio" :decreaseStep="decreaseStep" v-model="publicRadio")

</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue';
import NewTaskFormMain from '../components/NewTaskFormMain';
import NewTaskFormDetail from '../components/NewTaskFormDetail';
import NewTaskFormPublic from '../components/NewTaskFormPublic';

export default {
  name: 'NewTask',
  components: {
    Breadcrumbs,
    NewTaskFormMain,
    NewTaskFormDetail,
    NewTaskFormPublic,
  },
  props: {},
  data() {
    return {
      breadcrumbs: {
        links: [
          { label: 'Konstruktor', href: '/' },
          { label: 'Проекты', href: '/projects' },
        ],
        current: 'Новая задача',
      },
      stepCount: 1,
      mainData: {
        name: '',
        budget: '',
        projectResponsible: '',
        deadlineDate: null,
        terms: true,
      },
      detailData: {
        describtion: '',
        tag: '',
        address: '',
      },
      publicRadio: 'filler',
    };
  },
  computed: {},
  created() {
    const projectInfo = JSON.parse(localStorage.getItem('taskParentsInfo'));
    if (!projectInfo) this.$router.push('/projects');
    this.breadcrumbs.links.push({
      label: projectInfo.project_name,
      href: `/project/${projectInfo.project_id}`,
    });
    this.breadcrumbs.links.push({
      label: projectInfo.subproject_name,
      href: `/subproject/${projectInfo.subproject_id}`,
    });
  },
  methods: {
    increaseStep() {
      this.stepCount++;
    },
    decreaseStep() {
      this.stepCount--;
    },
  },
};
</script>

<style lang="scss">
.new-task-form {
  width: 380px;

  &__title {
    @include font(16, b, 22px);
    display: flex;
    margin-bottom: 20px;
  }

  &__title-dope {
    margin-left: 10px;
    font-weight: normal;
    color: $gray3;
  }

  &__field {
    & + .new-task-form__field {
      margin-top: 15px;
    }
  }

  &__submit {
    margin-top: 40px;
  }

  &__checkbox {
    display: flex;
    margin-top: 15px;
    align-items: center;

    .field__tooltip {
      position: unset;
      margin-left: 10px;
    }
  }

  &__radio {
    & + .new-task-form__radio {
      margin-top: 25px;
    }
  }
  
}
</style>

<style lang="scss" scoped>
.new-project {
  &__form {
    width: 380px;
  }

  &__field {
    position: relative;
    & + .new-project__field {
      margin-top: 20px;
    }
  }

  &__submit {
    margin-top: 40px;
  }

  &__tooltip {
    position: absolute;
    bottom: 11px;
    left: calc(100% + 10px);
  }
}
</style>
