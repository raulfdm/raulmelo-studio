import type { PortableTextBlock } from '@portabletext/types';
import toMarkdown from '@sanity/block-content-to-markdown';
import type { SanityClient } from '@sanity/client';
import markdownPlugin from 'prettier/plugins/markdown';
import Prettier from 'prettier/standalone';

import { imgUrlFor } from './image';

type Options = { sanityClient: SanityClient };

function customToMarkdown(
  portableText: PortableTextBlock,
  { sanityClient }: Options,
) {
  return toMarkdown(portableText, {
    serializers: {
      types: {
        gif: () => undefined,
        divider: () => '---',
        youtubeVideo: () => undefined,
        codePen: () => undefined,
        imageSlider: () => undefined,
        tweet: () => undefined,
        detailedImage: ({
          node: { alt, caption, image },
        }: {
          node: {
            alt?: string;
            caption?: string;
            image: {
              asset: {
                _ref: string;
              };
            };
          };
        }) => {
          const finalAlt = alt || caption || 'Image description';
          const url = imgUrlFor(sanityClient, image).url;

          return `![${finalAlt}](${url})`;
        },
        code: ({
          node,
        }: {
          node: { code: string; filename?: string; language?: string };
        }) => {
          const result = [];
          if (node.filename) {
            result.push(`**${node.filename}**\n`);
          }

          if (node.language) {
            result.push(`\`\`\`${node.language}`);
          } else {
            result.push('```');
          }

          result.push(node.code);

          result.push('```');

          return result.join('\n');
        },
        callout: ({
          node,
          ...props
        }: {
          node: {
            title?: string;
            type: string;
            content: PortableTextBlock;
          };
        }) => {
          const result: string[] = [];

          if (node.title) {
            result.push(`> **${node.title}**`);
          }

          const md = customToMarkdown(node.content, { sanityClient }).trim();

          result.push(`> ${md}`);

          return result.join('\n');
        },
      },
      marks: {
        highlight: ({ children }: any) => `\`${children}\``,
        strikethrough: ({ children }: any) => `~~${children}~~`,
        internalLink: ({ children }: any) => children,
        pageLink: ({ children }: any) => children,
      },
    },
  });
}

export async function contentBlockToMarkdown(
  portableText: PortableTextBlock,
  { sanityClient }: Options,
) {
  const content = customToMarkdown(portableText, { sanityClient });
  const formattedContent = await Prettier.format(content, {
    parser: 'markdown',
    plugins: [markdownPlugin],
  });

  return formattedContent;
}
