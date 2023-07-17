import { defineConfig, getFlatCompat } from '@raulmelo/eslint-config';

const compat = getFlatCompat();

export default defineConfig([
	...compat.extends('plugin:svelte/recommended'),
	...compat.config({
		ignorePatterns: ['*.cjs'],
		parserOptions: {
			sourceType: 'module',
			ecmaVersion: 2020,
			extraFileExtensions: ['.svelte']
		},
		env: {
			browser: true,
			es2017: true,
			node: true
		},
		overrides: [
			{
				files: ['*.svelte'],
				parser: 'svelte-eslint-parser',
				parserOptions: {
					parser: '@typescript-eslint/parser'
				}
			}
		]
	})
]);
