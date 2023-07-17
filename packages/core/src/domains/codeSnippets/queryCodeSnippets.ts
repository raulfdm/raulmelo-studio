import type { SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

type QueryCodeSnippetsParams = {
  client: SanityClient;
};

export async function queryCodeSnippets({ client }: QueryCodeSnippetsParams) {
  const result = await client.fetch(codeSnippetsQuery);

  return CodeSnippetList.parse(result);
}

export type QueryCodeSnippetsReturnType = Awaited<
  ReturnType<typeof queryCodeSnippets>
>;

const codeSnippetsQuery = groq`
*[_type=="codeSnippet" && !(_id in path('drafts.**'))] | order(publishedAt desc){  
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

const CodeSnippetList = z.array(CodeSnippet);
