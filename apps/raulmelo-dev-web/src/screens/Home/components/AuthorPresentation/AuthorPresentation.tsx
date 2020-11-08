import React from 'react';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';
/**
 * Keep importing like separately to
 * grasp tree shaking and reduce bundle size.
 */
import { Twitter } from '@styled-icons/boxicons-logos/Twitter';
import { Linkedin } from '@styled-icons/boxicons-logos/Linkedin';
import { Github } from '@styled-icons/boxicons-logos/Github';

import {
  AuthorPresentationWrapper,
  AuthorDataWrapper,
  AuthorName,
  AuthorSynopsis,
  SocialWrapper,
  SocialLink,
  AuthorImageWrapper,
} from './styled';
import { PersonalInformationApiData, SocialApiData } from '@types-api';

type Props = {
  fullName: PersonalInformationApiData['full_name'];
  profilePic: PersonalInformationApiData['profile_pic']['url'];
  linkedIn: SocialApiData['linkedIn'];
  github: SocialApiData['github'];
  twitter: SocialApiData['twitter'];
};

export const AuthorPresentation: React.FC<Props> = ({
  fullName,
  profilePic,
  linkedIn,
  github,
  twitter,
}) => {
  return (
    <AuthorPresentationWrapper>
      <AuthorDataWrapper>
        <AuthorName data-testid="author__name">{fullName}</AuthorName>
        <AuthorSynopsis data-testid="author__description">
          <FormattedMessage id="siteData.description" />
        </AuthorSynopsis>
        <SocialWrapper>
          <SocialLink href={github.url!} data-testid="author__githubUrl">
            <Github size={21} />
          </SocialLink>
          <SocialLink href={twitter.url!} data-testid="author__twitterUrl">
            <Twitter size={21} />
          </SocialLink>
          <SocialLink href={linkedIn.url!} data-testid="author__linkedInUrl">
            <Linkedin size={21} />
          </SocialLink>
        </SocialWrapper>
      </AuthorDataWrapper>
      <AuthorImageWrapper>
        <Image
          src={profilePic}
          layout="fill"
          // TODO: move this to locale
          alt="Author profile pic"
        />
      </AuthorImageWrapper>
    </AuthorPresentationWrapper>
  );
};
