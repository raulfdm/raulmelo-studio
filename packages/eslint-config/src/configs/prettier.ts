import type { Linter } from 'eslint';
import prettier from 'eslint-config-prettier';

export const prettierConfig = [prettier] satisfies Linter.FlatConfig[];
