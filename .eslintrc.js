const eslintrc = {
  extends: ['eslint-config-airbnb'],
  env: {
    node: true,
    es6: true,
    jest: true,
    amd: true,
    commonjs: true,
    browser: true,
    'react-native/react-native': true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      legacyDecorators: true,
    },
  },
  plugins: [
    'react',
    'babel',
    'jsx-a11y',
    'react-native',
  ],

  rules: {
    'class-methods-use-this': 0,
    camelcase: 0,
    'func-names': 0,
    'react/sort-comp': 0,
    'react/prop-types': 0,
    'react/jsx-first-prop-new-line': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'no-throw-literal': 0,
    'max-len': 0,
    'max-classes-per-file': ['error', 2],
    'react/no-multi-comp': 0,
    'array-callback-return': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 1,
    'jsx-a11y/img-has-alt': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'react/no-string-refs': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx', '.md'] }],
    'react/no-array-index-key': 0,
    'react/no-find-dom-node': 0,
    'react/require-extension': 0,
    'react/destructuring-assignment': 1,
    'react/no-unescaped-entities': 1,
    'react/require-default-props': 1,
    'react/forbid-prop-types': 1,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'prefer-destructuring': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-no-comment-textnodes': 0,
    'object-curly-newline': 0,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 1,
    'react-native/no-color-literals': 1,
    'react-native/no-raw-text': 2,
    indent: ['error', 2, {
      SwitchCase: 1,
    }],
    'global-require': 0,
    'no-use-before-define': 1,
    'no-return-await': 1,
    'react/prefer-stateless-function': 1,
  },
};
module.exports = eslintrc;
