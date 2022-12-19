import { z } from 'zod';

export const THEME_VARIANTS = ['dark', 'light'] as const;
export const appThemeSchema = z.enum(THEME_VARIANTS);
export type AppTheme = z.infer<typeof appThemeSchema>;
