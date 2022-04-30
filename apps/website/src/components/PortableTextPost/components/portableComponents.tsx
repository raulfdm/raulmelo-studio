import {
  BigQuote,
  CodeBlock,
  CodePenIframe,
  DotDivider,
  Gif,
  Highlight,
  sanityToUiAdapter,
  Tweet,
  YouTubeIframe,
} from '@raulmelo/ui';
import Link from 'next/link';
import { defineMessages } from 'react-intl';

import { useLocalization } from '~/hooks/useLocalization';

import { Image } from './Image';
import { ImageAdapter } from './ImageAdapter';
import { ImageSliderAdapter } from './ImageSliderAdapter';

const messages = defineMessages({
  copyButtonTitle: {
    id: 'blogPost.copyButton.title',
  },
  copyButtonSuccess: {
    id: 'blogPost.copyButton.success',
  },
});

export const portableComponents = {
  hardBreak: false,
  types: {
    divider: () => <DotDivider />,
    code: sanityToUiAdapter((props) => {
      const { formatMessage } = useLocalization();
      return (
        <CodeBlock
          {...props}
          copyTitle={formatMessage(messages.copyButtonTitle)}
          copyTooltipTitle={formatMessage(messages.copyButtonSuccess)}
        />
      );
    }),
    youtubeVideo: sanityToUiAdapter(YouTubeIframe),
    image: ImageAdapter,
    codePen: sanityToUiAdapter(CodePenIframe),
    tweet: sanityToUiAdapter(Tweet),
    gif: sanityToUiAdapter(Gif),
    imageSlider: ImageSliderAdapter,
    detailedImage: sanityToUiAdapter(Image),
  },
  block: {
    bigQuote: ({ children }: { children: React.ReactNode }) => {
      return <BigQuote>{children}</BigQuote>;
    },
    blockquote: ({ children }: { children: string[] }) => {
      const updatedChildren = children
        .filter((c) => c !== '')
        .reduce((accumulator, current) => {
          if (current.length === 0) {
            return accumulator;
          }

          if (current === '\n') {
            accumulator.push(<br />);
            return accumulator;
          }

          accumulator.push(current);
          return accumulator;
        }, [] as (React.ReactNode | string)[]);

      return <blockquote>{updatedChildren}</blockquote>;
    },
  },
  marks: {
    strikethrough: ({ children }: { children: React.ReactNode }) => (
      <s>{children}</s>
    ),
    // TODO: enhance these components PLEEEAAAASE
    highlight: ({ children, ...props }: { children: React.ReactNode }) => {
      return <Highlight {...props}>{children}</Highlight>;
    },
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value: { href: string; blank: boolean };
    }) => {
      const { href, blank } = value;
      const props = {
        href,
        children,
      } as React.AnchorHTMLAttributes<HTMLAnchorElement>;

      if (blank === true) {
        props.target = '_blank';
        props.rel = 'noopener noreferrer';
      }

      return <a {...props} />;
    },
    internalLink: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value: {
        itemMeta: {
          slug: string;
          _type: 'post' | 'til';
        };
      };
    }) => {
      const { slug, _type } = value.itemMeta;
      let href = '';

      if (_type === 'post') {
        href = '/blog/';
      } else if (_type === 'til') {
        href = '/til/';
      }

      href += slug;

      return (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      );
    },
  },
};
