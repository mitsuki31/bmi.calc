import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true
      }
    },

    rules: {
      /* TypeScript */
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: true,
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports'
        }
      ],

      /* Code quality */
      'no-unused-vars': 'off',
      'no-console': 'off',

      /* Style */
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],

      /* CLI practical rules */
      'no-process-exit': 'off',

      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error'
    }
  },

  {
    ignores: [
      'node_modules/',
      'dist/',
      '**/coverage/',
      'eslint.config.ts',
      '*.tgz'
    ]
  }
];
