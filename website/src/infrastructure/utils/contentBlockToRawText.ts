import type { PortableTextBlock } from '@portabletext/types';
import { portableTextToMarkdown } from '@portabletext/markdown';
import markdownPlugin from 'prettier/plugins/markdown';
import Prettier from 'prettier/standalone';

function customToMarkdown(
  portableText: PortableTextBlock | PortableTextBlock[],
): string {
  return portableTextToMarkdown(
    Array.isArray(portableText) ? portableText : [portableText],
    {
      unknownType: () => '',
      types: {
        gif: () => '',
        divider: () => '',
        detailedImage: () => '',
        youtubeVideo: () => '',
        codePen: () => '',
        imageSlider: () => '',
        tweet: () => '',
        code: () => '',
        callout: ({ value }): string => {
          const node = value as {
            title?: string;
            content: PortableTextBlock | PortableTextBlock[];
          };
          return `${node?.title ?? ''}\n${customToMarkdown(
            node.content,
          )}`.trim();
        },
      },
      marks: {
        highlight: ({ children }) => children,
        strikethrough: ({ children }) => children,
        internalLink: ({ children }) => children,
        pageLink: ({ children }) => children,
        link: ({ children }) => children,
        strong: ({ children }) => children,
        underline: ({ children }) => children,
        em: ({ children }) => children,
      },
      listItem: ({ children }) => children ?? '',
    },
  );
}

export async function contentBlockToRawText(
  body: PortableTextBlock | PortableTextBlock[],
): Promise<string> {
  const content = customToMarkdown(body);

  const formattedContent = await Prettier.format(content, {
    parser: 'markdown',
    plugins: [markdownPlugin],
  });

  return formattedContent
    .replace(/"/gim, '')
    .replace(/'/gim, '')
    .replace(/&/gim, '')
    .replace(/:/gim, '')
    .replace(/;/gim, '')
    .replace(/\\/gim, '')
    .replace(/-/gim, ' ')
    .replace(/[()]/gim, '')
    .replace(/[[\]]/gim, '')
    .replace(/#/gim, '')
    .replace(/[.\b]/gim, '');
}
