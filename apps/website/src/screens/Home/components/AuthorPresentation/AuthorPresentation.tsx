import { GithubIcon, LinkedInIcon, TwitterIcon } from '@components/Icons';
import { useLocalization } from '@hooks/useLocalization';
import { getSocial } from '@utils/seo';
import Image from 'next/image';
import React from 'react';
import { defineMessage } from 'react-intl';
import siteData from 'site-data';
import tw from 'twin.macro';

const message = defineMessage({ id: 'authorPresentation.profileImageAlt' });

const styles = {
  header: tw`flex flex-col-reverse justify-between md:flex-row mb-7 col-span-full`,
  figure: tw`relative w-20 md:w-32 h-20 md:h-32 rounded`,
  image: tw`rounded-full object-cover`,
  content: {
    wrapper: tw`flex flex-col w-full md:max-width[75%] mt-4 md:mt-0`,
    title: tw`font-sans font-black text-2xl md:text-3xl xl:text-4xl`,
    description: tw`text-md md:text-md xl:text-lg mt-2.5`,
    icons: {
      wrapper: tw`flex items-center pt-5 flex-1 dark:opacity-90 space-x-4 text-secondary`,
      icon: tw`w-6 lg:w-8`,
    },
  },
};

export const AuthorPresentation = () => {
  const { locale, formatMessage } = useLocalization();
  const defaultSeo = siteData.defaultSeo[locale];
  const github = getSocial('github');
  const twitter = getSocial('twitter');
  const linkedIn = getSocial('linkedin');

  return (
    <header css={styles.header}>
      <aside css={styles.content.wrapper}>
        <h1 css={styles.content.title} data-testid="author__name">
          {siteData.personalInformation.full_name}
        </h1>
        <p css={styles.content.description} data-testid="author__description">
          {defaultSeo?.description}
        </p>
        <section css={styles.content.icons.wrapper}>
          <a href={github.url} data-testid="author__githubUrl">
            <GithubIcon css={styles.content.icons.icon} />
          </a>
          <a href={twitter.url} data-testid="author__twitterUrl">
            <TwitterIcon css={styles.content.icons.icon} />
          </a>
          <a href={linkedIn.url} data-testid="author__linkedInUrl">
            <LinkedInIcon css={styles.content.icons.icon} />
          </a>
        </section>
      </aside>
      <figure css={styles.figure}>
        <Image
          css={styles.image}
          src={siteData.personalInformation.profile_pic.url}
          layout="fill"
          alt={formatMessage(message)}
          loading="eager"
        />
      </figure>
    </header>
  );
};
