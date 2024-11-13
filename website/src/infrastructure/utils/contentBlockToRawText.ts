import type { PortableTextBlock } from '@portabletext/types';
import toMarkdown from '@sanity/block-content-to-markdown';
import markdownPlugin from 'prettier/plugins/markdown';
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
        callout: ({ node }: TODO) => {
          return `${node?.title ?? ''}\n${customToMarkdown(
            node?.content as PortableTextBlock,
          )}`.trim();
        },
      },
      marks: {
        highlight: ({ children }: TODO) => children,
        strikethrough: ({ children }: TODO) => children,
        internalLink: ({ children }: TODO) => children,
        pageLink: ({ children }: TODO) => children,
        link: () => undefined,
        strong: ({ children }: TODO) => children,
        underline: ({ children }: TODO) => children,
        em: ({ children }: TODO) => children,
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
