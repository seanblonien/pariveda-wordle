module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './packages/**/tsconfig.json'],
    tsconfigRootDir: '.',
    sourceType: 'module',
    ecmaFeatures: {jsx: true},
    warnOnUnsupportedTypeScriptVersion: true,
  },
  env: {
    node: true,
    browser: true,
    jest: true,
    es6: true,
  },
  plugins: [
    'react',
    'jsx-a11y',
    'import',
    'unused-imports',
    'prettier',
    '@typescript-eslint',
    'sort-export-all',
    'sonarjs',
  ],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:sort-export-all/recommended',
    'plugin:sonarjs/recommended',
    'prettier',
  ],
  ignorePatterns: [
    'node_modules',
    'build',
    'lib',
    'test',
    'docusaurus',
    '*.(spec|test).ts',
    'out',
    '.vercel',
    '.github',
    '!.markdownlint-cli2.js',
    '!tailwind.config.js',
  ],
  settings: {
    react: {version: '17.0'},
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/extensions': ['.js', '.ts', '.tsx'],
    'import/resolver': {
      node: {extensions: ['.js', '.ts', '.tsx', '.json']},
      typescript: {project: ['./tsconfig.json', './packages/**/tsconfig.json']},
    },
  },
  reportUnusedDisableDirectives: true,
  rules: {
    // other
    // 'max-len': ['warn', {code: 100, comments: 120}],
    'max-lines-per-function': ['error', 100],
    'require-await': 'off',
    'object-property-newline': ['error', {allowAllPropertiesOnSameLine: true}],
    'no-unused-vars': 'off', // use typescript rule instead
    'no-useless-constructor': 'off',
    'no-underscore-dangle': ['warn', {allow: ['_id', '_typecheck']}],
    'no-use-before-define': 'off',
    'no-debugger': 'warn',
    'no-shadow': 'off',
    'no-var': 'error',
    'no-nested-ternary': 'warn',
    'arrow-body-style': ['warn', 'as-needed'],
    'no-param-reassign': ['error', {ignorePropertyModificationsForRegex: ['a|accum|accumulator']}],
    'no-restricted-imports': [
      'warn',
      {
        paths: [
          {
            name: 'react',
            importNames: ['default'],
            message: `Import the named modules directly, or if using React Types, just use the global React type and don't import the module directly.`,
          },
        ],
        patterns: ['@material-ui/*/*/*', '!@material-ui/core/test-utils/*'],
      },
    ],
    // prettier
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'lf',
        semi: true,
        singleQuote: true,
        bracketSpacing: false,
        jsxSingleQuote: true,
        bracketSameLine: false,
        arrowParens: 'avoid',
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 100,
      },
    ],
    // TypeScript
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': ['error', {fixToUnknown: true}],
    // '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/require-await': 'warn',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          String: {
            message: 'Use `string` instead',
            fixWith: 'string',
          },
          Object: {
            message: 'Use `object` instead',
            fixWith: 'object',
          },
          '{}': {
            message: 'Use `object` instead',
            fixWith: 'object',
          },
          object: false,
        },
      },
    ],
    // React
    'react/prop-types': 'off',
    'react/self-closing-comp': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': ['error', {extensions: ['.tsx']}],
    'react/jsx-no-undef': ['error', {allowGlobals: true}],
    'react/jsx-uses-react': 'off',
    'react/jsx-curly-brace-presence': 'warn',
    '@typescript-eslint/no-shadow': 'error',
    'react/function-component-definition': ['error', {namedComponents: 'arrow-function'}],
    'react/no-array-index-key': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/jsx-props-no-spreading': [
      'error',
      {html: 'enforce', custom: 'ignore', explicitSpread: 'ignore'},
    ],
    'react-hooks/exhaustive-deps': 'off', // TODO: TURN ON WHEN FIXED
    // import
    // 'import/namespace': 'off',
    'import/newline-after-import': 'warn',
    'import/no-cycle': [
      'error',
      {
        maxDepth: 1,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      'warn',
      {'newlines-between': 'never', alphabetize: {order: 'asc', caseInsensitive: true}},
    ],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': ['warn', {ignore: ['prism-react-renderer']}],
    // unused-import
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_'},
    ],
    // Sonar
    'sonarjs/no-ignored-return': 'off', // for performance reasons
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {'@typescript-eslint/no-var-requires': 'off', 'no-param-reassign': 'off'},
    },
    {
      files: ['*.test.tsx', 'setupTests.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
