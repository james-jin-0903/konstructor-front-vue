<template lang="pug">
  form.page-selection__form()
    .page-selection__count-text Выбрано {{typeLabel[2]}}: {{counter}} из 5
    .page-selection__grid
      SelectionBlock(
        v-for="(item, index) in list"
        v-model="dataList[index]"
        @change="itemChange"
        :key="item.id"
        :name="item.name"
        :image="item.image"
        :index="index"
        :typeLabel="typeLabel"
      ).page-selection__item
    button.button.button_default.page-selection__submit(:disabled="!disablePoint" type="button" @click="handleSubmit")
      span Сохранить
</template>

<script>
  import SelectionBlock from './SelectionBlock.vue';

  export default {
    components: {
      SelectionBlock
    },
    props: {
      dataList: Array,
      typeLabel: Array
    },
    data() {
      return {
        list: [],
        counter: 0,
        formTouched: false
      };
    },
    watch: {
      dataList(newList) {
        this.list = newList;
        this.formTouched = false;
      },
      list() {
        this.counter = this.list.filter(item => item.is_selected).length;
      }
    },
    computed: {
      disablePoint() {
        return this.formTouched || this.counter >= 5;
      }
    },
    methods: {
      itemChange(data) {
        this.list[data.index] = data.data;
        this.list = [...this.list];
        this.formTouched = true;
      },
      handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.$emit('submit', this.list);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page-selection {
    &__grid {
      margin-top: 15px;
      margin-bottom: 40px;
      display: flex;
      flex-wrap: wrap;
    }

    &__item {
      width: 24%;
      margin-right: 1%;
    }
  }
</style>
