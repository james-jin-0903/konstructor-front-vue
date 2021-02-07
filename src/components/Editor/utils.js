export const DEFAULT_OBJECT_PROP = {
  type: Object,
  default: () => {
  },
  required: false
};

export const DEFAULT_BOOLEAN_PROP = {
  type: Boolean,
  default: () => false,
  required: false
};

export const PLUGIN_PROPS_TYPE = {
  type: [Boolean, Object],
  default: () => false,
  required: false
};

export const PLUGIN_PROPS = [
  'paragraph',
  'header',
  'image',
  'list',
  'linkTool',
  'code',
  'quote',
  'delimiter',
  'inlineCode',
  'marker',
  'table'
];

export const PLUGINS = {
  header: require('@editorjs/header'),
  list: require('@editorjs/list'),
  image: require('@editorjs/image'),
  inlineCode: require('@editorjs/inline-code'),
  quote: require('@editorjs/quote'),
  code: require('@editorjs/code'),
  linkTool: require('@editorjs/link'),
  delimiter: require('@editorjs/delimiter'),
  table: require('@editorjs/table'),
  paragraph: require('@editorjs/paragraph'),
  marker: require('@editorjs/marker')
};

export function useTools(props, config) {
  const pluginKeys = Object.keys(PLUGINS);
  const tools = { ...props.customTools };
  /**
   * When plugin props are empty, enable all plugins
   */
  if (pluginKeys.every(p => !props[p])) {
    pluginKeys.forEach(key => tools[key] = { class: PLUGINS[key] });
    Object.keys(config).forEach(key => {
      if (tools[key] !== undefined && tools[key] !== null) {
        tools[key]['config'] = config[key];
      }
    });
    return tools;
  }

  pluginKeys.forEach(key => {
    const prop = props[key];
    if (!prop) {
      return;
    }

    tools[key] = { class: PLUGINS[key] };

    if (typeof prop === 'object') {
      const options = Object.assign({}, props[key]);
      delete options['class'];
      tools[key] = Object.assign(tools[key], options);
    }
  });

  Object.keys(config).forEach(key => {
    if (tools[key] !== undefined && tools[key] !== null) {
      tools[key]['config'] = config[key];
    }
  });

  return tools;
}
