import { siteData } from '@data/siteData';
import { useLocalization } from '@hooks/useLocalization';
import {
  GithubIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@raulfdm/blog-components';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import { defineMessage, FormattedMessage } from 'react-intl';

type Props = {
  fullName: string;
  profilePic: string;
};

const message = defineMessage({ id: 'authorPresentation.profileImageAlt' });

const SocialLink = (props: React.ComponentPropsWithoutRef<'a'>) => (
  <>
    <a className="mr-4 cursor-pointer relative" {...props} />
    <style jsx>{`
      a:not(:last-child):after {
        content: '·';
        color: inherit;
        position: absolute;
        right: -10px;
        top: 0;
      }
    `}</style>
  </>
);

export const AuthorPresentation: React.FC<Props> = ({
  fullName,
  profilePic,
}) => {
  const { formatMessage } = useLocalization();
  return (
    <div className="flex flex-col-reverse justify-between md:flex-row mb-7">
      <div
        className={classNames([
          'flex flex-col',
          'w-full md:max-w-[75%]',
          'mt-4 md:mt-0',
        ])}
      >
        <h1
          className="font-sans font-bold text-2xl md:text-3xl xl:text-4xl"
          data-testid="author__name"
        >
          {fullName}
        </h1>
        <p
          className="text-md md:text-md xl:text-lg mt-2.5"
          data-testid="author__description"
        >
          <FormattedMessage id="siteData.description" />
        </p>
        <div className="flex align-center pt-5 flex-1 text-gray-500 dark:text-gray-100">
          <SocialLink
            href={siteData.social.github.url}
            data-testid="author__githubUrl"
          >
            <GithubIcon width={24} />
          </SocialLink>
          <SocialLink
            href={siteData.social.twitter.url}
            data-testid="author__twitterUrl"
          >
            <TwitterIcon width={24} />
          </SocialLink>
          <SocialLink
            href={siteData.social.linkedIn.url}
            data-testid="author__linkedInUrl"
          >
            <LinkedInIcon width={24} />
          </SocialLink>
        </div>
      </div>
      <div
        className={classNames([
          'relative',
          'w-20 md:w-32',
          'h-20 md:h-32',
          'rounded',
        ])}
      >
        <Image
          className="rounded-full object-cover"
          src={profilePic}
          layout="fill"
          alt={formatMessage(message)}
          quality={100}
          loading="eager"
        />
      </div>
    </div>
  );
};
