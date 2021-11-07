import mdxPrims, { MdxPrismOptions } from 'mdx-prism-2';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutoLink from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkCodeTitle from 'remark-code-titles';
import remarkUnwrapImages from 'remark-unwrap-images';

export function serializeMdx(source: string): ReturnType<typeof serialize> {
  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkUnwrapImages, remarkCodeTitle] as never,
      rehypePlugins: [
        [
          mdxPrims,
          {
            ignoreMissing: true,
            lineHighlight: {
              component: 'span',
            },
          } as MdxPrismOptions,
        ],
        rehypeSlug,
        [
          rehypeAutoLink,
          {
            properties: {
              className: 'copy-title-icon',
            },
            content: null,
          },
        ],
      ] as never,
    },
  });
}
