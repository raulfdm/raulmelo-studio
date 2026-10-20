import type { PortableTextBlock } from '@portabletext/types';
import { portableTextToMarkdown } from '@portabletext/markdown';
import type { SanityClient } from '@sanity/client';
import markdownPlugin from 'prettier/plugins/markdown';
import Prettier from 'prettier/standalone';

import { imgUrlFor } from './image';

type Options = { sanityClient: SanityClient };

function customToMarkdown(
  portableText: PortableTextBlock | PortableTextBlock[],
  { sanityClient }: Options,
) {
  return portableTextToMarkdown(
    Array.isArray(portableText) ? portableText : [portableText],
    {
      types: {
        gif: () => '',
        divider: () => '---',
        youtubeVideo: () => '',
        codePen: () => '',
        imageSlider: () => '',
        tweet: () => '',
        detailedImage: ({ value }) => {
          const { alt, caption, image } = value as {
            alt?: string;
            caption?: string;
            image: {
              asset: {
                _ref: string;
              };
            };
          };
          const finalAlt = alt || caption || 'Image description';
          const url = imgUrlFor(sanityClient, image).url;

          return `![${finalAlt}](${url})`;
        },
        code: ({ value }) => {
          const node = value as {
            code: string;
            filename?: string;
            language?: string;
          };
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
        callout: ({ value }) => {
          const node = value as {
            title?: string;
            type: string;
            content: PortableTextBlock;
          };
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
        highlight: ({ children }) => `\`${children}\``,
        strikethrough: ({ children }) => `~~${children}~~`,
        internalLink: ({ children }) => children,
        pageLink: ({ children }) => children,
      },
    },
  );
}

export async function contentBlockToMarkdown(
  portableText: PortableTextBlock | PortableTextBlock[],
  { sanityClient }: Options,
) {
  const content = customToMarkdown(portableText, { sanityClient });
  const formattedContent = await Prettier.format(content, {
    parser: 'markdown',
    plugins: [markdownPlugin],
  });

  return formattedContent;
}
