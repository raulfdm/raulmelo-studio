import { LinkedInIcon, TwitterIcon } from '@raulfdm/blog-components';
import classNames from 'classnames';
import React from 'react';
import qs from 'query-string';

export const ShareContent = ({
  as = 'div',
  className,
  linkedIn,
  twitter,
}: ShareProps) => {
  const Wrapper = as;

  return (
    <Wrapper className={className}>
      <span
        className={classNames([
          'font-extrabold',
          'text-md md:text-lg lg:text-xl',
          'block',
          'mb-4 md:mb-6',
        ])}
      >
        Share
      </span>
      <ul className={classNames(['flex', 'space-x-4'])}>
        <li className={classNames(['w-6 md:w-8'])}>
          <button
            onClick={() => {
              window.open(
                linkGenerator.linkedIn(linkedIn.title, linkedIn.summary),
                '_blank',
                'noopener',
              );
            }}
          >
            <LinkedInIcon className={classNames(['w-6 md:w-8'])} />
          </button>
        </li>
        <li className={classNames(['w-6 md:w-8'])}>
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
            <TwitterIcon />
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
