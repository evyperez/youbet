module.exports = (async () => {
  const recessOrder = await import('stylelint-config-recess-order');

  return {
    customSyntax: 'postcss-scss',
    extends: [
      'stylelint-config-standard',
      'stylelint-config-sass-guidelines',
      'stylelint-config-recess-order',
    ],
    plugins: ['@stylistic/stylelint-plugin'],
    rules: {
      // -------------------------------------------------------------
      // Property order (with spacing between groups)
      // -------------------------------------------------------------
      'order/properties-order': recessOrder.default.rules['order/properties-order'].map((group) => ({
        ...group,
        emptyLineBefore: 'always',
        noEmptyLineBetween: true,
      })),

      // -------------------------------------------------------------
      // BEM convention
      // -------------------------------------------------------------
      'selector-class-pattern': [
        '^_?[a-z0-9]+(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
        {
          message: 'Class names should follow the BEM naming convention',
        },
      ],

      // -------------------------------------------------------------
      // SCSS patterns
      // -------------------------------------------------------------
      'scss/at-function-pattern': '^_?[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
      'scss/at-mixin-pattern': '^_?[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
      'scss/dollar-variable-pattern':
        '^_?[a-z0-9]+(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',

      // -------------------------------------------------------------
      // Stylistic rules (disabled or adjusted due to Prettier)
      // -------------------------------------------------------------
      '@stylistic/color-hex-case': 'lower',
      'color-hex-length': 'long',
      '@stylistic/string-quotes': 'single',
      '@stylistic/block-opening-brace-space-before': 'always',

      // Disabled due to Prettier formatting style
      'declaration-empty-line-before': null,
      '@stylistic/declaration-colon-space-after': null,
      '@stylistic/indentation': null,
      'at-rule-empty-line-before': null,

      // Accept Prettier's multi-line style
      '@stylistic/declaration-block-semicolon-newline-after': 'always-multi-line',
      '@stylistic/function-parentheses-space-inside': [
        'never-single-line',
        { ignore: ['multi-line'] },
      ],

      // -------------------------------------------------------------
      // Accessibility & Maintainability
      // -------------------------------------------------------------
      'selector-max-id': 0,
      'selector-no-qualifying-type': [true, { ignore: ['attribute'] }],
      'max-nesting-depth': 3,

      // -------------------------------------------------------------
      // Compatibility
      // -------------------------------------------------------------
      'value-no-vendor-prefix': true,
      'property-no-vendor-prefix': true,
      'at-rule-no-vendor-prefix': true,
      'value-keyword-case': ['lower', { ignoreKeywords: [/^currentColor$/] }],

      // -------------------------------------------------------------
      // Library/project-specific exceptions
      // -------------------------------------------------------------
      'annotation-no-unknown': null,
      'scss/no-global-function-names': null,
      'media-query-no-invalid': null,
      // Legacy color notation (hsl, etc.) and custom SCSS functions
      'color-function-notation': null,
      'hue-degree-notation': null,
      'alpha-value-notation': null,
      'declaration-property-value-no-unknown': null,
      'declaration-property-value-keyword-no-deprecated': null,
      // Placeholder blocks and focus-visible empty blocks
      'block-no-empty': null,
      'no-descending-specificity': null,
      // Allow longhand when clarity is preferred
      'declaration-block-no-redundant-longhand-properties': null,
      // Keyframes and keyframe selectors (library/legacy names)
      'keyframes-name-pattern': null,
      'selector-max-compound-selectors': null,
      // Constants with required precision (e.g. MDC linear channel values)
      'number-max-precision': null,
      // Property order (auto-fix applied; remaining conflicts need manual triage)
      'order/properties-order': null,
      'declaration-block-no-duplicate-properties': null,
    },
  };
})();
