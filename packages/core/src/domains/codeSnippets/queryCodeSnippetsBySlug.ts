import { type SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

type QueryCodeSnippetsBySlugParams = {
  client: SanityClient;
  slug: string;
};

export async function queryCodeSnippetsBySlug({
  client,
  slug,
}: QueryCodeSnippetsBySlugParams) {
  const result = await client.fetch(codeSnippetsQuery, { slug });

  return CodeSnippet.parse(result);
}

export type QueryCodeSnippetsBySlugReturnType = Awaited<
  ReturnType<typeof queryCodeSnippetsBySlug>
>;

const codeSnippetsQuery = groq`
*[_type=="codeSnippets" && !(_id in path('drafts.**')) && slug.current == $slug][0]{  
  ...,
  "slug": slug.current,
  "tags": tags[]->{
    _id,
    name,
    "slug": slug.current
  },
}
`;

const CodeSnippet = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  publishedAt: z.string(),
  description: z.string(),
  snippets: z.array(
    z.object({
      language: z.string(),
      code: z.string(),
      showLineNumbers: z.boolean(),
      fileName: z.string().optional(),
      highlightedLines: z.string().optional(),
    }),
  ),
  tags: z
    .array(
      z.object({
        slug: z.string(),
        name: z.string(),
        _id: z.string(),
      }),
    )
    .optional(),
});
