import type { PortableTextBlock } from '@portabletext/types';
import toMarkdown from '@sanity/block-content-to-markdown';
import Prettier from 'prettier/standalone';

function customToMarkdown(portableText: PortableTextBlock) {
  return toMarkdown(portableText, {
    serializers: {
      types: {
        gif: () => undefined,
        divider: () => undefined,
        detailedImage: () => undefined,
        youtubeVideo: () => undefined,
        codePen: () => undefined,
        imageSlider: () => undefined,
        tweet: () => undefined,
        code: () => undefined,
        callout: ({ node }: any) => {
          return `${node.title ?? ''}\n${customToMarkdown(
            node.content,
          )}`.trim();
        },
      },
      marks: {
        highlight: ({ children }: any) => children,
        strikethrough: ({ children }: any) => children,
        internalLink: ({ children }: any) => children,
        pageLink: ({ children }: any) => children,
        link: () => undefined,
        strong: ({ children }: any) => children,
        underline: ({ children }: any) => children,
        em: ({ children }: any) => children,
      },
      list: ({ children }: { children: string[] }) => {
        return children.filter((child) => child.trim() !== '*').join('\n');
      },
    },
  });
}

export async function contentBlockToRawText(
  body: PortableTextBlock,
): Promise<string> {
  const content = customToMarkdown(body);

  const formattedContent = await Prettier.format(content, {
    parser: 'markdown',
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
    .replace(/[\[\]]/gim, '')
    .replace(/#/gim, '')
    .replace(/[.\b]/gim, '');
}
