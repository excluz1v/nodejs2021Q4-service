module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  env: {
    es2020: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      impliedStrict: true,
    },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  settings: {
    noInlineConfig: true,
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },

  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb-base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'import/extensions': 'off',
    'linebreak-style': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'no-void': 0,
  },
};
