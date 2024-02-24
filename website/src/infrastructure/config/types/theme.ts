import { z } from 'zod';

export const THEME_VARIANTS = ['dark', 'light'] as const;
export const AppTheme = z.enum(THEME_VARIANTS);
export type AppTheme = z.infer<typeof AppTheme>;
