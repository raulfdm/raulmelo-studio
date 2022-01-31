import { LinkedInIcon, TwitterIcon } from '@raulmelo/ui';
import qs from 'query-string';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import tw, { styled, TwStyle } from 'twin.macro';

const Wrapper = styled.div``;

const styles = {
  title: tw`block mb-4 font-extrabold text-md md:text-lg lg:text-xl md:mb-6`,
  list: tw`flex space-x-4 text-secondary`,
  item: tw`w-6 md:w-8`,
  itemIcon: tw`w-6 md:w-8`,
};

export const ShareContent = ({
  as,
  className,
  linkedIn,
  twitter,
}: ShareProps) => {
  return (
    <Wrapper as={as} css={className}>
      <span css={styles.title}>
        <FormattedMessage id="blogPost.share" />
      </span>
      <ul css={styles.list}>
        <li css={styles.item}>
          <button
            role="link"
            onClick={() => {
              window.open(
                linkGenerator.linkedIn(linkedIn.title, linkedIn.summary),
                '_blank',
                'noopener',
              );
            }}
          >
            <LinkedInIcon css={styles.itemIcon} />
          </button>
        </li>

        <li css={styles.item}>
          <button
            role="link"
            onClick={() => {
              window.open(
                linkGenerator.twitter(twitter.text),
                '_blank',
                'noopener',
              );
            }}
          >
            <TwitterIcon css={styles.itemIcon} />
          </button>
        </li>
      </ul>
    </Wrapper>
  );
};

const linkGenerator = {
  linkedIn(title: string, summary?: string): string {
    return `https://www.linkedin.com/shareArticle?${qs.stringify(
      { url: global.location.href, title, summary },
      { encode: true, strict: true },
    )}`;
  },
  twitter(text: string) {
    return `https://twitter.com/share?${qs.stringify(
      {
        url: global.location.href,
        text,
        via: 'raul_fdm',
      },
      { encode: true, strict: true },
    )}`;
  },
};

type ShareProps = {
  as?: React.ElementType;
  className?: string | TwStyle;
  linkedIn: {
    title: string;
    summary?: string;
  };
  twitter: {
    text: string;
  };
};
