<template lang="pug">
  div
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.page-skills__toolbar
        .action
      NavigationTabs(:current="pageName" :typeLabel="typeLabel" :links="links")

    .page-skills.container.page
      .loader(v-if="isLoaded")
        Spinner
      Selection(:dataList="skills" @submit="onSubmit" :typeLabel="typeLabel")
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs';
import Select from '../components/forms/Select';
import Selection from '../components/Selection';
import NavigationTabs from '../components/NavigationTabs';
import { mapActions, mapGetters } from 'vuex';
import Spinner from '@/components/Spinner';

const PAGE_NAME = 'Навыки';
export default {
  name: 'SkillsPage',
  components: { Spinner, Breadcrumbs, Select, Selection, NavigationTabs },
  data() {
    return {
      breadcrumbs: {
        links: [{ label: 'Настройки', href: '/settings' }],
        current: PAGE_NAME
      },
      pageName: PAGE_NAME,
      typeLabel: ['навык', 'навыка', 'навыков'],
      links: [
        {
          label: 'Основные',
          href: '/settings'
        },
        {
          label: 'Аккаунт',
          href: '/account'
        },
        {
          label: 'Навыки',
          href: '/skills'
        },
        {
          label: 'Интересы',
          href: '/interest'
        },
        {
          label: 'Соцсети',
          href: '/social'
        },
        {
          label: 'Электронная почта',
          href: '/emails'
        },
        {
          label: 'Коммуникации',
          href: '/communications'
        },
        {
          label: 'Адреса',
          href: '/address'
        },
        {
          label: 'Счета',
          href: '/payment'
        }
      ]
    };
  },
  created() {
    this.fetchSkills();
  },
  methods: {
    ...mapActions({
      fetchSkills: 'skills/fetch',
      updateSkills: 'skills/update'
    }),
    onSubmit(data) {
      const existed = data.map(item => item.id);
      const children = data
        .map(item =>
          item.children.map(child => {
            return { name: child.name, parent_id: item.id };
          })
        )
        .flat();
      const res = {
        existed,
        new: children
      };
      this.updateSkills(res);
    }
  },
  computed: {
    ...mapGetters({
      skills: 'skills/getSkills',
      isLoaded: 'skills/getLoaded'
    })
  }
};
</script>

<style lang="scss" scoped>
.pag-skills {
  &__form {
    width: 380px;
  }

  &__toolbar {
    justify-content: flex-end;
  }

  &__field {
    margin-top: 15px;
  }

  &__submit {
    margin-top: 35px;
  }
}
</style>
