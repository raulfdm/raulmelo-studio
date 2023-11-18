import {
  type SupportedLanguages,
  supportedLanguagesSchema,
} from '@raulmelo/core/config';

export function preferredLocaleOrFallback(
  preferredLocale: string | undefined,
): SupportedLanguages {
  preferredLocale = preferredLocale ?? 'en';

  const result = supportedLanguagesSchema.safeParse(preferredLocale);

  if (!result.success) {
    return `en`;
  }

  return result.data;
}
