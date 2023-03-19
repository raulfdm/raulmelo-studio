export const calloutTypes = [`note`, `info`] as const;

export type CalloutType = (typeof calloutTypes)[number];
