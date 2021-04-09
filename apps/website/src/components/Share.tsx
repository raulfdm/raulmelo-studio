import { LinkedInIcon, TwitterIcon } from '@raulfdm/blog-components';
import classNames from 'classnames';
import React from 'react';

export const Share = ({ as = 'div', className }: ShareProps) => {
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
        <li>
          <LinkedInIcon className={classNames(['w-6 md:w-8'])} />
        </li>
        <li>
          <TwitterIcon className={classNames(['w-6 md:w-8'])} />
        </li>
      </ul>
    </Wrapper>
  );
};

type ShareProps = {
  as?: React.ElementType;
  className?: string;
};
