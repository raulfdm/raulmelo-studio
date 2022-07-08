import {
  DevToIcon,
  GithubIcon,
  LinkedInIcon,
  MediumIcon,
  TwitterIcon,
} from '@raulmelo/ui';
import Image from 'next/image';
import { defineMessage } from 'react-intl';

import { useLocalization } from '~/hooks/useLocalization';
import siteData from '~/site-data';
import { getSocial } from '~/utils/seo';

const message = defineMessage({ id: 'authorPresentation.profileImageAlt' });

const iconClasses = 'w-6 lg:w-8';

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
          <a href={devTo.url} data-testid="author__linkedInUrl">
            <DevToIcon className={iconClasses} />
          </a>
          <a href={medium.url} data-testid="author__linkedInUrl">
            <MediumIcon className={iconClasses} />
          </a>
          <a href={github.url} data-testid="author__githubUrl">
            <GithubIcon className={iconClasses} />
          </a>
          <a href={twitter.url} data-testid="author__twitterUrl">
            <TwitterIcon className={iconClasses} />
          </a>
          <a href={linkedIn.url} data-testid="author__linkedInUrl">
            <LinkedInIcon className={iconClasses} />
          </a>
        </section>
      </aside>
      <figure className="relative w-20 h-20 rounded md:w-32 md:h-32">
        <Image
          className="object-cover rounded-full"
          src={siteData.personalInformation.profilePic.url}
          layout="fill"
          alt={formatMessage(message)}
          loading="eager"
          priority
        />
      </figure>
    </header>
  );
};
