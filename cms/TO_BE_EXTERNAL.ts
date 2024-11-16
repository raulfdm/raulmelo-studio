export const calloutTypes = [`note`, `info`, `warn`] as const
export type CalloutType = (typeof calloutTypes)[number]
