import type { PortableTextBlock } from '@portabletext/types';
import { SupportedLanguages } from '@raulmelo/core/intl';

import {
  queryPostBySlug,
  queryPosts,
  queryTilBySlug,
  queryTils,
} from '@/infrastructure/api/modules/posts';
import { sanityClient } from '@/infrastructure/sanity/client';
import { contentBlockToMarkdown } from '@/infrastructure/utils/contentBlockToMarkdown';
import { contentBlockToRawText } from '@/infrastructure/utils/contentBlockToRawText';

/**
 * Plain `.md`/`.txt` renderings of every post and TIL, emitted next to the HTML
 * page they mirror (`/en/blog/some-post.md`). They replace the token protected
 * `/api/content-markdown` and `/api/content-text` endpoints, which could not
 * survive a static build.
 */
export type ContentKind = `post` | `til`;
export type ContentFormat = `markdown` | `text`;

const CONTENT_TYPE: Record<ContentFormat, string> = {
  markdown: `text/markdown; charset=utf-8`,
  text: `text/plain; charset=utf-8`,
};

export async function getContentExportStaticPaths(kind: ContentKind) {
  const perLanguage = await Promise.all(
    SupportedLanguages.map(async (lang) => {
      const entries =
        kind === `post`
          ? await queryPosts({ language: lang, client: sanityClient })
          : await queryTils({ language: lang, client: sanityClient });

      return entries.map((entry) => ({ params: { lang, slug: entry.slug } }));
    }),
  );

  return perLanguage.flat();
}

/**
 * The `.md` and `.txt` routes are separate modules but share this one, so
 * memoising here halves the Sanity requests they cost per build.
 */
type ExportableEntry = { content: PortableTextBlock } | null;

const entryCache = new Map<string, Promise<ExportableEntry>>();

function findEntry(kind: ContentKind, slug: string) {
  const key = `${kind}:${slug}`;
  const cached = entryCache.get(key);

  if (cached) {
    return cached;
  }

  const pending: Promise<ExportableEntry> =
    kind === `post`
      ? queryPostBySlug({ slug, client: sanityClient, preview: false })
      : queryTilBySlug({ slug, client: sanityClient, preview: false });

  entryCache.set(key, pending);

  return pending;
}

export async function renderContentExport(
  kind: ContentKind,
  slug: string,
  format: ContentFormat,
) {
  const entry = await findEntry(kind, slug);

  if (!entry) {
    throw new Error(`No published ${kind} found for slug "${slug}".`);
  }

  const body =
    format === `markdown`
      ? await contentBlockToMarkdown(entry.content, { sanityClient })
      : await contentBlockToRawText(entry.content);

  return new Response(body, {
    headers: { 'Content-Type': CONTENT_TYPE[format] },
  });
}
