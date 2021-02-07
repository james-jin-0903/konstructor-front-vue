<template lang="pug">
  .new-idea
    MediaModal(
      v-if="isModalOpen"
      @select="selectImage"
      @add="addImage"
      @close="closeModal"
      :items="media"
      tabindex="0"
    )
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")

    .new-idea__inner.container.page
      .loader(v-if="isLoaded")
        Spinner

      .new-idea__form
        .new-idea__header
          .new-idea__title {{getCurrentStep.name}}
          .new-idea__counter (шаг {{getCurrentStep.id}} из {{steps.length}})

        .new-idea__step(v-if="currentStep === 1")
          .new-idea__row.field.pageSettings__field
            .field__title Название:
            InputField(
              v-if=form
              :value="form.name"
              fieldName="name"
              placeholder="Введите название идеи"
              validation="required"
              @input="handleFieldInput"
            )

          .new-idea__row.field.pageSettings__field
            .field__title Тип:
            .field__row
              Select(
                @change="changeSelect"
                :text="typeSelect.text"
                :placeholder="typeSelect.placeholder"
                :options="typeSelect.options"
                :defaultValue="form.type"
                v-validate=""
                name="gender"
              )
              .field__tooltip
                Tooltip(text='Подсказка для выбора типа публикации')

        .new-idea__step.new-idea__step_wide(v-if="currentStep === 2")
          VueEditor(
            v-if="editorData"
            :config="editorConfig"
            :init-data="editorData"
            ref="editor"
            placeholder="Введите текст своей идеи или нажмите плюс для добавления нового блока"
            @save="onEditorSave"
            @change="onEditorChange"
          )

        .new-idea__step(v-if="currentStep === 3")
          .new-idea__row
            MediaLoader(
              label="Вы можете добавить обложку"
              tooltip="Подсказка для добавления обложки"
              :value="form.image"
              :preventOpen="true"
              @click="handleImageLoaderClick"
            ).media-loader_style-2

          .new-idea__row.field.pageSettings__field
            .field__title Проект:
              .field__info(rel="Поле не обязательно для заполнения") (опционально)
            .field__row
              InputField(
                v-if=form
                :value="form.project"
                fieldName="project"
                placeholder="Выберите проект"
                @input="handleFieldInput"
              )
              .field__tooltip
                Tooltip(text='Подсказка для выбора проекта')

          .new-idea__row.field.pageSettings__field
            .field__title Теги:
              .field__info(rel="Поле не обязательно для заполнения") (опционально)
            .field__row
              InputTag(placeholder='' v-model="form.tags")
              .field__tooltip
                Tooltip(text='Подсказка для выбора тегов')

          .new-idea__row.field.pageSettings__field
            .field__title Адрес:
              .field__info(rel="Поле не обязательно для заполнения") (опционально)
            .field__row
              InputField(
                v-if=form
                :value="form.address"
                fieldName="address"
                placeholder="Введите адрес"
                :icon="icons.location"
                @input="handleFieldInput"
              )
              .field__tooltip
                Tooltip(text='Подсказка для адреса')

          .new-idea__row.field.pageSettings__field
            .field__title Время отложенной публикации
              .field__info(rel="Поле не обязательно для заполнения") (опционально)
            .field__row
              TextInput(
                placeholder=""
                :validate="false"
                :range="false"
                :time="true"
                :value="form.pubDate"
                name="pub_date"
                :disabled-date="todayDate"
                :max-date="maxDate"
                isDate
                @input="dateChange"
              ).user-page__date
              .field__tooltip
                Tooltip(text='Подсказка для выбора времени')

        .new-idea__step.new-idea__step_type-2(v-if="currentStep === 4")
          .new-idea__row.new-idea__row_type-2
            Radio(text="Идея доступна публично" name="idea" @change="radioChange" value="public" :checked="form.visibility === 'public'").new-idea__radio
            .new-idea__radio-description Идея будет доступна для всех пользователей сайта. Все люди смогут ее просматривать и комментировать.
          .new-idea__row.new-idea__row_type-2
            Radio(text="Идея доступна только внутри сообщества" name="idea" @change="radioChange" value="community" :checked="form.visibility === 'community'").new-idea__radio
            .new-idea__radio-description Идея будет доступна только для участников сообщества, в котором она создана. Только они смогут ее просматривать и комментировать.
          .new-idea__row.new-idea__row_type-2
            Radio(text="Идея доступна только Вам" name="idea" @change="radioChange" value="me" :checked="form.visibility === 'me'").new-idea__radio
            .new-idea__radio-description Идея будет доступна только Вам. Только Вы сможете ее просматривать и комментировать.

        .new-idea__footer
          button.new-idea__button.button.button_big.button_neutral(@click="handleBack" v-if="currentStep > 1")
            span Назад
          button.new-idea__button.button.button_big.button_green(@click="handleNext"  v-if="currentStep < steps.length" :disabled="!isStepValid")
            span Далее
          button.new-idea__button.button.button_big(@click="handleCreate" v-if="currentStep === steps.length" :disabled="!isFormValid")
            span Создать

</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Spinner from '@/components/Spinner';
  import Breadcrumbs from '@/components/Breadcrumbs.vue';
  import SocialTable from '@/components/SocialTable.vue';
  import AddSocial from '@/components/SocialForm.vue';
  import TextInput from '@/components/forms/TextInput';
  import Checkbox from '@/components/forms/Checkbox';
  import ToolsDropdown from '@/components/ToolsDropdown';
  import images from '@/components/images';
  import Tooltip from '@/components/Tooltip';
  import Select from '@/components/forms/Select';
  import MediaLoader from '@/components/MediaLoader';
  import InputField from '@/components/forms/InputField';
  import InputTag from '@/components/forms/InputTag';
  import Radio from '@/components/forms/Radio';
  import { Editor } from 'vue-editor-js';
  import VueEditor from '@/components/Editor/VueEditor';
  import MediaModal from '@/components/MediaModal';
  import { Escapable } from '@/utils/escapable';

  const mockItems = [
    {
      isFolder: true,
      text: 'Name_of_Folder_1',
      id: 1
    },
    {
      isFolder: true,
      text: 'Name_of_Folder_1',
      id: 2
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Long_Name_of_My_Favourite_File.png',
      id: 3
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_2.png',
      id: 4
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_3.png',
      id: 5
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_4.png',
      id: 6
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_5.png',
      id: 7
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_6.png',
      id: 8
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_7.png',
      id: 9
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_8.png',
      id: 10
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_9.png',
      id: 11
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_10.png',
      id: 12
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_11.png',
      id: 13
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_12.png',
      id: 14
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_13.png',
      id: 15
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_14.png',
      id: 16
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_15.png',
      id: 17
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_16.png',
      id: 18
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_17.png',
      id: 19
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_18.png',
      id: 20
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_19.png',
      id: 21
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_20.png',
      id: 22
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_21.png',
      id: 23
    },
    {
      url: require('../../assets/images/idea_01.png'),
      text: 'Name_of_File_22.png',
      id: 24
    }

  ];

  const PAGE_NAME = 'Новая идея';
  export default {
    name: 'ideasDraft',
    mixins: [Escapable],
    components: {
      MediaModal,
      VueEditor,
      Radio,
      InputTag,
      InputField,
      MediaLoader,
      Select,
      ToolsDropdown,
      Tooltip,
      Breadcrumbs,
      SocialTable,
      AddSocial,
      TextInput,
      Spinner,
      Checkbox
    },
    data() {
      return {
        maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 30)),
        todayDate(date) {
          const limit = new Date(new Date().setDate(new Date().getDate() - 1));
          return date <= limit;
        },
        lastImageBlockId: null,
        isModalOpen: false,
        icons: images.icons,
        defaultDate: null,
        breadcrumbs: {
          links: [
            { label: 'Идеи', href: '/ideas' }
          ],
          current: PAGE_NAME
        },
        currentStep: 1,
        isEditorValid: false,
        steps: [
          {
            id: 1,
            name: 'Основная информация'
          },
          {
            id: 2,
            name: 'Текст идеи'
          },
          {
            id: 3,
            name: 'Подробная информация'
          },
          {
            id: 4,
            name: 'Публичность'
          }
        ],
        form: {
          pubDate: null,
          project: '',
          image: null,
          address: '',
          name: '',
          type: '',
          visibility: null,
          tags: null
        },
        typeSelect: {
          text: 'Выберите тип публикации',
          placeholder: true,
          options: [
            {
              text: 'Публикация',
              val: 'publication'
            },
            {
              text: 'Видео',
              val: 'video'
            }
          ]
        },
        editorConfig: {
          initData: {},
          savedData: {},
          config: {
            autofocus: false,
            image: {
              field: 'image',
              types: 'image/*'
            }
          },
          header: {
            levels: [2],
            defaultLevel: 2
          },
          code: {
            placeholder: 'Введите код'
          },
          quote: {
            quotePlaceholder: 'Введите цитату',
            captionPlaceholder: 'Введите подпись цитаты (автор или источник)'
          }
        },
        editorData: null,
        media: mockItems
      };
    },
    mounted() {
      const editorData = window.localStorage.getItem('editorData');
      if (editorData) {
        try {
          const parsedData = JSON.parse(editorData);
          this.editorData = parsedData;
        } catch (e) {
          this.editorData = {};
        }
      } else {
        this.editorData = {};
      }

      document.addEventListener('editor:imageClick', this.openModal);
    },
    computed: {
      ...mapGetters({
        isLoaded: 'social/getLoaded'
      }),
      getCurrentStep() {
        return this.steps.find(step => step.id === this.currentStep);
      },
      isFormValid() {
        // TODO check form here after backend integration
        return this.form.visibility;
      },
      escapableVisible() {
        return this.isModalOpen;
      },
      isStepValid() {
        switch (this.currentStep) {
          case 1: {
            return this.form.name && this.form.type;
          }
          case 2: {
            return this.isEditorValid;
          }
          case 3: {
            // TODO set when backend was ready return this.form.image;
            return true;
          }

        }
        return false;
      }
    },
    methods: {
      ...mapActions({
        fetchSocial: 'social/fetchSocial'
      }),
      escapeHandler() {
        this.isModalOpen = false;
      },
      changeSelect(event) {
        this.form.type = event.value;
      },
      changeValue() {
        this.$validator.validate();
      },
      handleBack() {
        this.currentStep--;
      },
      handleNext() {
        this.currentStep++;
      },
      handleCreate() {
        const id = '123';
        this.$router.push({ path: `/ideas/${id}` });
      },
      dateChange(event) {
        this.form.pubDate = event.value;
      },
      handleFieldInput(event) {
        const { name, value } = event;
        this.form[name] = value;
      },
      radioChange(event) {
        this.form.visibility = event;
      },
      handleImageChange(event) {
        this.form.image = event;
      },
      handleImageRemove() {
        this.form.image = null;
      },
      handleImageLoaderClick() {
        this.isModalOpen = true;
      },
      onEditorSave() {

      },
      onEditorChange(event) {
        const editor = this.$refs.editor;
        editor
          .state.editor
          .save()
          .then((outputData) => {
            const blocks = outputData.blocks;
            const filteredBlocks = blocks &&
              blocks.filter(block => block.type === 'image' ? block.file && block.file.url.length : true);
            outputData.blocks = filteredBlocks;
            this.isEditorValid = filteredBlocks.length;
            window.localStorage.setItem('editorData', JSON.stringify(outputData));
          })
          .catch((error) => {
            throw new Error(error)
          });
      },
      openModal(event) {
        this.lastImageBlockId = event.detail.id;
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
        this.lastImageBlockId = null;
      },
      addImage() {
        const customEvent = new CustomEvent('editor:addNew', { detail: { id: this.lastImageBlockId } });
        document.dispatchEvent(customEvent);
        this.closeModal();
      },
      selectImage(selectEvent) {
        const { url } = selectEvent;
        const customEvent = new CustomEvent('editor:imageSelect', { detail: { id: this.lastImageBlockId } });
        document.dispatchEvent(customEvent);
        this.closeModal();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .new-idea {

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

    &__row {
      margin-bottom: 20px;

      &_type-2 {
        margin-bottom: 30px;
      }
    }

    &__step {
      width: 380px;

      &_type-2 {
        padding-top: 11px;
      }

      &_wide {
        width: 892px;
      }
    }

    &__footer {
      margin-top: 40px;
      display: flex;
    }

    &__button {
      margin-right: 10px;
      padding-left: 30px;
      padding-right: 30px;

      &:last-child {
        margin-right: 0;
      }
    }

    &__radio {
      margin-bottom: 21px;
    }

    &__radio-description {
      padding-left: 26px;
      color: #B2BCCA;
    }
  }
</style>
