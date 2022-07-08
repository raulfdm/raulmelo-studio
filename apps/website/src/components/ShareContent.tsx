import styled from '@emotion/styled';
import { LinkedInIcon, TwitterIcon } from '@raulmelo/ui';
import qs from 'query-string';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Wrapper = styled.div``;

export const ShareContent = ({
  as,
  className,
  linkedIn,
  twitter,
}: ShareProps) => {
  return (
    <Wrapper as={as} className={className}>
      <span className="block mb-4 font-extrabold text-md md:text-lg lg:text-xl md:mb-6">
        <FormattedMessage id="blogPost.share" />
      </span>
      <ul className="flex space-x-4 text-secondary">
        <li className="w-6 md:w-8">
          <button
            /* TODO: localize that */
            title="Share on LinkedIn"
            role="link"
            onClick={() => {
              window.open(
                linkGenerator.linkedIn(linkedIn.title, linkedIn.summary),
                '_blank',
                'noopener',
              );
            }}
          >
            <LinkedInIcon className="w-6 md:w-8" />
          </button>
        </li>

        <li className="w-6 md:w-8">
          <button
            /* TODO: localize that */
            title="Share on Twitter"
            role="link"
            onClick={() => {
              window.open(
                linkGenerator.twitter(twitter.text),
                '_blank',
                'noopener',
              );
            }}
          >
            <TwitterIcon className="w-6 md:w-8" />
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
  className?: string;
  linkedIn: {
    title: string;
    summary?: string;
  };
  twitter: {
    text: string;
  };
};
