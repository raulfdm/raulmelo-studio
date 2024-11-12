// @ts-check

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default function createConfig(tsconfigRootDir) {
  return tseslint.config(
    // ignores
    {
      ignores: [
        '.DS_Store',
        '.env.*',
        '**/*.d.ts',
        '**/*.typegen.ts',
        'bin/**',
        'build/**',
        'cache/**',
        'dist/**',
        'node_modules/**',
        '.turbo/**',
        '.history/**',
        '.svelte-kit/**',
        '.vercel/**',
        'package-lock.json',
        'pnpm-lock.yaml',
      ],
    },
    eslint.configs.recommended,
    eslintConfigPrettier,
    /**
     * eslint TS setup
     *
     * @see https://typescript-eslint.io/getting-started/typed-linting
     */
    ...tseslint.configs.recommendedTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          project: true,
          tsconfigRootDir: tsconfigRootDir,
        },
      },
    },
    /**
     * Custom ts rules
     */
    {
      files: ['**/*.ts', '**/*.tsx'],

      rules: {
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',

        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            disallowTypeAnnotations: false,
          },
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { destructuredArrayIgnorePattern: '^_', varsIgnorePattern: '^Props' },
        ],
        '@typescript-eslint/no-unsafe-assignment': 'warn',
      },
    },
  );
}
