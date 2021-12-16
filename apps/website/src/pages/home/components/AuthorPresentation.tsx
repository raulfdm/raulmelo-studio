import Image from 'next/image';
import { defineMessage } from 'react-intl';
import tw from 'twin.macro';

import {
  DevToIcon,
  GithubIcon,
  LinkedInIcon,
  TwitterIcon,
} from '~/components/Icons';
import { MediumIcon } from '~/components/Icons/Medium';
import { useLocalization } from '~/hooks/useLocalization';
import siteData from '~/site-data';
import { getSocial } from '~/utils/seo';

const message = defineMessage({ id: 'authorPresentation.profileImageAlt' });

const styles = {
  header: tw`flex flex-col-reverse justify-between md:flex-row mb-7 col-span-full`,
  figure: tw`relative w-20 h-20 rounded md:w-32 md:h-32`,
  image: tw`object-cover rounded-full`,
  content: {
    wrapper: tw`flex flex-col w-full md:max-width[75%] mt-4 md:mt-0`,
    title: tw`font-sans text-2xl font-black md:text-3xl xl:text-4xl`,
    description: tw`text-md md:text-md xl:text-lg mt-2.5`,
    icons: {
      wrapper: tw`flex items-center flex-1 pt-5 space-x-4 dark:opacity-90 text-secondary`,
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
  const devTo = getSocial('dev.to');
  const medium = getSocial('medium');

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
          <a href={devTo.url} data-testid="author__linkedInUrl">
            <DevToIcon css={styles.content.icons.icon} />
          </a>
          <a href={medium.url} data-testid="author__linkedInUrl">
            <MediumIcon css={styles.content.icons.icon} />
          </a>
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
