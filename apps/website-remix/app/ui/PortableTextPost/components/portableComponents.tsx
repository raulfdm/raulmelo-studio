import { useLocalization } from '$infrastructure/contexts/Localization';
import { getPathnameWithLocale } from '$infrastructure/utils/url';
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
import { Link } from '@remix-run/react';
import { Fragment } from 'react';

import { defineMessages } from 'react-intl';

import { Image } from './Image';
import { ImageAdapter } from './ImageAdapter';
import { ImageSliderAdapter } from './ImageSliderAdapter';

const messages = defineMessages({
  copyButtonTitle: {
    id: `blogPost.copyButton.title`,
  },
  copyButtonSuccess: {
    id: `blogPost.copyButton.success`,
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
        .filter((c) => c !== ``)
        .reduce((accumulator, current, currentIndex) => {
          if (current.length === 0) {
            return accumulator;
          }

          if (current === `\n`) {
            accumulator.push(<br key={currentIndex} />);
            return accumulator;
          }

          accumulator.push(<Fragment key={current}>{current}</Fragment>);
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
      blank,
      href,
    }: {
      children: React.ReactNode;
      href: string;
      blank: boolean;
    }) => {
      const props = {
        href,
        children,
      } as React.AnchorHTMLAttributes<HTMLAnchorElement>;

      if (blank === true) {
        props.target = `_blank`;
        props.rel = `noopener noreferrer`;
      }

      return <a {...props} />;
    },
    internalLink: ({
      children,
      itemMeta,
    }: {
      children: React.ReactNode;
      itemMeta: {
        slug: string;
        _type: `post` | `til`;
      };
    }) => {
      const { slug, _type } = itemMeta;
      let href = ``;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { locale } = useLocalization();

      if (_type === `post`) {
        href = getPathnameWithLocale(`/blog`, locale);
      } else if (_type === `til`) {
        href = getPathnameWithLocale(`/til/`, locale);
      }

      href += slug;

      return <Link to={href}>{children}</Link>;
    },
  },
};
