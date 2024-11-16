export const SUPPORTED_LANGUAGES = ['en', 'pt'] as const
export type SupportedLanguages = (typeof SUPPORTED_LANGUAGES)[number]

export const calloutTypes = [`note`, `info`, `warn`] as const
export type CalloutType = (typeof calloutTypes)[number]
