import { z } from 'zod';

export const tagSchema = z.object({
  slug: z.string(),
});
export type Tag = z.infer<typeof tagSchema>;

export const tagsSchema = z.array(tagSchema);
