module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    config: "readable",
  },
  extends: [
    'plugin:vue/essential',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quotes': ['error', 'single']
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};
