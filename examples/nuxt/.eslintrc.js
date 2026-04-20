module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  globals: {
    defineNuxtConfig: 'readonly',
    defineNuxtPlugin: 'readonly',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  rules: {},
}
