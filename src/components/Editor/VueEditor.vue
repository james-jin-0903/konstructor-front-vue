<template>
  <div id="vue-editor-js">
    <div :id="props.holderId"/>
    <button :id="`${props.holderId}-button`" @click="save" style="display: none;"/>
  </div>
</template>

<script>
  import { reactive, onMounted, watch } from '@vue/composition-api';
  import EditorJS from '@editorjs/editorjs/dist/editor';
  import autosize from 'autosize';
  import {
    DEFAULT_OBJECT_PROP,
    DEFAULT_BOOLEAN_PROP,
    PLUGIN_PROPS_TYPE,
    PLUGIN_PROPS,
    useTools
  } from './utils';

  export default {
    name: 'VueEditor',
    props: {
      holderId: {
        type: String,
        default: () => 'codex-editor',
        required: false
      },
      autofocus: DEFAULT_BOOLEAN_PROP,
      initData: DEFAULT_OBJECT_PROP,
      customTools: DEFAULT_OBJECT_PROP,
      config: DEFAULT_OBJECT_PROP,
      ...PLUGIN_PROPS.reduce((a, pluginName) => ({ ...a, [pluginName]: PLUGIN_PROPS_TYPE }), {})
    },
    setup: (props, context) => {
      const state = reactive({ editor: null });

      function initEditor(props) {
        destroyEditor();
        const { holderId: holder, autofocus, initData: data, config } = props;
        const tools = useTools(props, config);
        state.editor = new EditorJS({
          holder,
          autofocus,
          data,
          tools,
          onReady: () => onReady(),
          onChange: () => onChange()
        });
      }

      function destroyEditor() {
        if (state.editor) {
          state.editor.destroy();
          state.editor = null;
        }
      }

      function save() {
        if (!state.editor) {
          return;
        }

        state.editor.save()
             .then((result) => context.emit('save', result));
      }

      const updateAreas = () => {
        const areas = document.querySelector('.codex-editor').querySelectorAll('textarea:not(.inited)');
        areas.forEach(area => {
          area.style.display = 'none';
          autosize(area);
          area.style.display = '';
          autosize.update(area);
          area.classList.add('inited');
        });
      };

      function onReady() {
        context.emit('ready');
        setTimeout(() => {
          updateAreas();
        }, 100);
      }

      function onChange() {
        context.emit('change');
        setTimeout(() => {
          updateAreas();
        }, 100);
      }


      onMounted(_ => initEditor(props));

      watch(_ => props.initData, _ => initEditor);

      return { props, state, save };
    }
  };
</script>
