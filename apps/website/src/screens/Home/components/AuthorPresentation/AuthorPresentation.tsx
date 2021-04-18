import { useLocalization } from '@hooks/useLocalization';
import {
  GithubIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@raulfdm/blog-components';
import { getDefaultSeoByLocale, getSocial } from '@utils/seo';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import { defineMessage } from 'react-intl';
import siteData from 'site-data';

const message = defineMessage({ id: 'authorPresentation.profileImageAlt' });

export const AuthorPresentation = () => {
  const { locale, formatMessage } = useLocalization();
  const defaultSeo = getDefaultSeoByLocale(locale);
  const github = getSocial('github');
  const twitter = getSocial('twitter');
  const linkedIn = getSocial('linkedin');

  return (
    <header className="flex flex-col-reverse justify-between md:flex-row mb-7 col-span-full">
      <aside
        className={classNames([
          'flex flex-col',
          'w-full md:max-w-[75%]',
          'mt-4 md:mt-0',
        ])}
      >
        <h1
          className="font-sans font-black text-2xl md:text-3xl xl:text-4xl"
          data-testid="author__name"
        >
          {siteData.personalInformation.full_name}
        </h1>
        <p
          className="text-md md:text-md xl:text-lg mt-2.5"
          data-testid="author__description"
        >
          {defaultSeo?.description}
        </p>
        <section
          className={classNames([
            'flex align-center pt-5 flex-1',
            'text-black opacity-60 dark:text-white dark:opacity-90',
            'space-x-4',
          ])}
        >
          <a href={github.url} data-testid="author__githubUrl">
            <GithubIcon className="w-6 lg:w-8" />
          </a>
          <a href={twitter.url} data-testid="author__twitterUrl">
            <TwitterIcon className="w-6 lg:w-8" />
          </a>
          <a href={linkedIn.url} data-testid="author__linkedInUrl">
            <LinkedInIcon className="w-6 lg:w-8" />
          </a>
        </section>
      </aside>
      <figure
        className={classNames([
          'relative',
          'w-20 md:w-32',
          'h-20 md:h-32',
          'rounded',
        ])}
      >
        <Image
          className="rounded-full object-cover"
          src={siteData.personalInformation.profile_pic.url}
          layout="fill"
          alt={formatMessage(message)}
          quality={100}
          loading="eager"
        />
      </figure>
    </header>
  );
};
