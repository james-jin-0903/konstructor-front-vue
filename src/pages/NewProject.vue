<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
    .container.page.new-project
      form.new-project__form(@submit="onSubmit")
        .field.new-project__field
          .field__title Название
          .input
            input.input__input(
              type="text"
              placeholder=""
              v-model='projectName'
            )

        .field.new-project__field
          .field__title Ответственный
          InputAuto(
            v-model="projectResponsible",
            name="platform",
            :items='responsibleList',
            placehold=''
          )
          .new-project__tooltip
            Tooltip(:text="'Здесь будет размещен информационный текст'")

        button.button.button_default.new-project__submit(:class="!disablePoint && 'buttonSubmit_disabled'" :disabled="!disablePoint" type="submit" value="Создать")
          span Сохранить

</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue';
import InputAuto from '../components/forms/InputAuto.vue';
import Tooltip from '../components/Tooltip.vue';
import { mapActions, mapGetters } from 'vuex';
import { CLIENT_UUID } from '@/config';

export default {
  name: 'NewProject',
  components: {
    Breadcrumbs,
    InputAuto,
    Tooltip,
  },
  props: {
    isSub: Boolean,
  },
  data() {
    return {
      breadcrumbs: {
        links: [
          { label: 'Konstruktor', href: '/' },
          { label: 'Проекты', href: '/projects' },
        ],
        current: this.isSub ? 'Новый подпроект' : 'Новый проект',
      },
      projectName: '',
      projectResponsible: '',
      responsibleList: [],
    };
  },
  computed: {
    disablePoint() {
      if (this.projectName !== '' && this.projectResponsible !== '') {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    if (this.isSub) {
      const projectInfo = JSON.parse(localStorage.getItem('projectInfo'));
      if (!projectInfo) this.$router.push('/projects');
      this.breadcrumbs.links.push({
        label: projectInfo.name,
        href: `/project/${projectInfo.id}`,
      });
    }
  },
  methods: {
    ...mapActions({
      fetchNewProject: 'projects/fetchNewProject',
    }),
    onSubmit(e) {
      e.preventDefault();
      const props = this.isSub
        ? {
            title: this.projectName,
            responsible_user_uuid: CLIENT_UUID,
          }
        : {
            title: this.projectName,
            responsible_user_uuid: CLIENT_UUID,
          };
      this.fetchNewProject(props);
    },
  },
};
</script>

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
