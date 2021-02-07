<template lang="pug">
  .toolbar.projects-toolbar
    .toolbar__main
      button.toolbar__item.toggle(
        type="button"
        @click="toggleIsListType"
      )
        .toggle__icon
          img(:src="images.icons.list" v-if="getIsListType")
          img(:src="images.icons.block" v-else)

      a(href="#").toolbar__item
        img(:src="images.icons.earth")

      a(href="#").toolbar__item.user-page__link
        img(:src="images.icons.analytics")
      .toolbar__item
        Select(
          :options="optionsSort"
          :defaultValue="optionsSort[0].val"
          :className="'toolbar__sortSelect'"
          :small="true"
        )
      .toolbar__item
        TextInput(
          placeholder="Все время"
          :validate="false"
          :range="true"
          :time="true"
          :value="filterDate"
          name="date_of_birth"
          :disabled-date="todayDate"
          :max-date="maxDate"
          small
          isDate
          @input="dateChange"
        )
      .toolbar__item(v-if="!isArchive")
        ToolsDropdown(:tools="morePages")


    .toolbar__aside
      .toolbar__item
        ToolsDropdown(
          :className="'tools-dropdown_flower tools-dropdown_left'"
          :tools="tools"
          @click="handleToolClick"
        )
</template>

<script>
  import ToolsDropdown from './ToolsDropdown.vue';
  import Select from './forms/Select.vue';
  import images from '@/components/images';
  import TextInput from '@/components/forms/TextInput';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    props: ['morePages', 'tools', 'optionsSort', 'isArchive', 'handleToolClick'],
    components: {
      ToolsDropdown,
      Select,
      TextInput
    },
    data() {
      return {
        images: images,
        maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 30)),
        todayDate(date) {
          const limit = this.maxDate;
          return date > limit;
        },
        filterDate: null
      };
    },
    created() {
    },
    methods: {
      ...mapActions({
        toggleIsListType: 'listing/toggleIsListType'
      }),
      dateChange(date) {
        this.filterDate = date.value;
      }
    },
    computed: {
      ...mapGetters({
        getIsListType: 'listing/getIsListType'
      })
    }
  };
</script>

<style lang="scss">
  .select-right-icon {
    margin-left: 5px;

    &_up {
      transform: rotate(180deg);
    }
  }

  .toolbar {
    &__sortSelect {
      width: 160px;

      .select__dropdown {
        max-height: 120px;
      }
    }
  }
</style>

<style lang="scss" scoped></style>
