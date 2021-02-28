import React from 'react';
import Image from 'next/image';
import { defineMessage, FormattedMessage } from 'react-intl';

import { PersonalInformationApiData } from '@types-api';
import { siteData } from '@data/siteData';
import { useLocalization } from '@hooks/useLocalization';
import {
  TwitterIcon,
  GithubIcon,
  LinkedInIcon,
} from '@raulfdm/blog-components';

type Props = {
  fullName: PersonalInformationApiData['full_name'];
  profilePic: PersonalInformationApiData['profile_pic']['url'];
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
      <div className="flex flex-col mt-5 max-w-xl md:mt-0 md:mr-10">
        <h1
          className="text-2xl md:text-4xl font-semibold font-sans"
          data-testid="author__name"
        >
          {fullName}
        </h1>
        <p
          className="font-sans text-base md:text-lg font-normal mt-2.5"
          data-testid="author__description"
        >
          <FormattedMessage id="siteData.description" />
        </p>
        <div className="flex align-center pt-5 flex-1 text-gray-500 dark:text-gray-400">
          <SocialLink
            href={siteData.social.github.url}
            data-testid="author__githubUrl"
          >
            <GithubIcon />
          </SocialLink>
          <SocialLink
            href={siteData.social.twitter.url}
            data-testid="author__twitterUrl"
          >
            <TwitterIcon />
          </SocialLink>
          <SocialLink
            href={siteData.social.linkedIn.url}
            data-testid="author__linkedInUrl"
          >
            <LinkedInIcon />
          </SocialLink>
        </div>
      </div>
      <div className="relative w-20 h-20 md:w-32 md:h-32 rounded">
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
