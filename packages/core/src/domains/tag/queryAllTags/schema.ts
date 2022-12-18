import { z } from 'zod';

export const tagsSchema = z.array(
  z.object({
    slug: z.string(),
  }),
);

export type Tag = z.infer<typeof tagsSchema>;
