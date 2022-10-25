import {
  DevToIcon,
  GithubIcon,
  LinkedInIcon,
  MediumIcon,
  TwitterIcon,
} from '@raulmelo/ui';
import Image from 'next/image';
import { ComponentPropsWithoutRef } from 'react';
import { defineMessage } from 'react-intl';

import { useLocalization } from '~/hooks/useLocalization';
import siteData from '~/site-data';
import { getSocial } from '~/utils/seo';

const message = defineMessage({ id: 'authorPresentation.profileImageAlt' });

export const AuthorPresentation = () => {
  const { locale, formatMessage } = useLocalization();
  const defaultSeo = siteData.defaultSeo[locale];
  const github = getSocial('github');
  const twitter = getSocial('twitter');
  const linkedIn = getSocial('linkedin');
  const devTo = getSocial('dev.to');
  const medium = getSocial('medium');

  return (
    <header className="flex flex-col-reverse justify-between md:flex-row mb-7 col-span-full">
      <aside className="flex flex-col w-full md:max-w-[75%] mt-4 md:mt-0">
        <h1
          className="font-sans text-2xl font-black md:text-3xl xl:text-4xl"
          data-testid="author__name"
        >
          {siteData.personalInformation.fullName}
        </h1>
        <p
          className="text-md md:text-md xl:text-lg mt-2.5"
          data-testid="author__description"
        >
          {defaultSeo?.description}
        </p>
        <section className="flex items-center flex-1 pt-5 space-x-4 dark:opacity-90 text-secondary">
          <IconWrapper href={devTo.url} data-testid="author__linkedInUrl">
            <DevToIcon />
          </IconWrapper>
          <IconWrapper href={medium.url} data-testid="author__linkedInUrl">
            <MediumIcon />
          </IconWrapper>
          <IconWrapper href={github.url} data-testid="author__githubUrl">
            <GithubIcon />
          </IconWrapper>
          <IconWrapper href={twitter.url} data-testid="author__twitterUrl">
            <TwitterIcon />
          </IconWrapper>
          <IconWrapper href={linkedIn.url} data-testid="author__linkedInUrl">
            <LinkedInIcon />
          </IconWrapper>
        </section>
      </aside>
      <figure className="relative w-20 h-20 rounded md:w-32 md:h-32">
        <Image
          className="object-cover rounded-full"
          src={siteData.personalInformation.profilePic.url}
          alt={formatMessage(message)}
          loading="eager"
          priority
          width={128}
          height={128}
        />
      </figure>
    </header>
  );
};

function IconWrapper(props: ComponentPropsWithoutRef<'a'>) {
  return <a className="w-6 lg:w-8" {...props} />;
}
