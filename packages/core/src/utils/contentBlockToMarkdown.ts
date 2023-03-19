import type { PortableTextBlock } from '@portabletext/types';
import toMarkdown from '@sanity/block-content-to-markdown';

export function contentBlockToMarkdown(body: PortableTextBlock) {
  return toMarkdown(body, {
    serializers: {
      types: {
        gif: () => undefined,
        divider: () => undefined,
        detailedImage: () => undefined,
        youtubeVideo: () => undefined,
        codePen: () => undefined,
        imageSlider: () => undefined,
        tweet: () => undefined,
        code: ({ node }: any) => {
          return node.code;
        },
        callout: ({ node }: any) => {
          return `${node.title ?? ''}
          ${contentBlockToMarkdown(node.content)}`.trim();
        },
      },
      marks: {
        highlight: ({ children }: any) => children,
        strikethrough: ({ children }: any) => children,
        internalLink: ({ children }: any) => children,
      },
    },
  });
}
