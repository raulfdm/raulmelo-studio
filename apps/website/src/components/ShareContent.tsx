import { LinkedInIcon, TwitterIcon } from '@components/Icons';
import classNames from 'classnames';
import qs from 'query-string';
import React from 'react';
import { FormattedMessage } from 'react-intl';

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
        <FormattedMessage id="blogPost.share" />
      </span>
      <ul className={classNames(['flex', 'space-x-4'])}>
        <ShareItem
          onClick={() => {
            window.open(
              linkGenerator.linkedIn(linkedIn.title, linkedIn.summary),
              '_blank',
              'noopener',
            );
          }}
          Icon={LinkedInIcon}
        />
        <ShareItem
          onClick={() => {
            window.open(
              linkGenerator.twitter(twitter.text),
              '_blank',
              'noopener',
            );
          }}
          Icon={TwitterIcon}
        />
      </ul>
    </Wrapper>
  );
};

const ShareItem: React.FC<{
  onClick: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: React.FC<any>;
}> = ({ onClick, Icon }) => {
  return (
    <li className={classNames(['w-6 md:w-8'])}>
      <button role="link" onClick={onClick}>
        <Icon className={classNames(['w-6 md:w-8'])} />
      </button>
    </li>
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
