import js from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';

export default [
  {
    ignores: ['node_modules/**', 'public/**', 'static/**', 'resources/**'],
  },
  js.configs.recommended,
  {
    files: ['assets/scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'no-console': 'warn',
      'no-irregular-whitespace': 'warn',
      'no-proto': 'error',

      eqeqeq: ['error', 'smart'],
      'prefer-const': 'error',
      'no-unused-vars': ['error', {args: 'none'}],

      '@stylistic/comma-spacing': 'error',
      '@stylistic/eol-last': 'error',
      '@stylistic/indent': ['error', 2, {SwitchCase: 1}],
      '@stylistic/keyword-spacing': 'error',
      '@stylistic/max-len': ['warn', 160, 2],
      '@stylistic/new-parens': 'error',
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', {max: 2}],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/object-curly-spacing': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single', {avoidEscape: true}],
      '@stylistic/semi': 'error',
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', 'never'],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/space-unary-ops': 'error',
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/arrow-spacing': ['error', {before: true, after: true}],
      '@stylistic/no-confusing-arrow': 'error',
    },
  },
];
