import { z } from 'zod';

export const supportedLanguagesSchema = z.enum(['en', 'pt']);
export type SupportedLanguages = z.infer<typeof supportedLanguagesSchema>;

export const allLanguagesSchema = z.union([
  supportedLanguagesSchema,
  z.enum(['all']),
]);
export type AllLanguages = z.infer<typeof allLanguagesSchema>;

export const appThemeSchema = z.enum(['dark', 'light']);
export type AppTheme = z.infer<typeof appThemeSchema>;
