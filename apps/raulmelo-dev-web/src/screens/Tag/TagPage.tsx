import React from 'react';
import { defineMessages } from 'react-intl';

import { AppThemeProvider } from '@contexts/AppTheme';
import { GlobalStyles } from '@styles/index';
import { MenuBar } from '@components/MenuBar';
import { AuthorPresentation } from '@screens/Home/components/AuthorPresentation';
import { Container } from '@components/Ui';
import { SEO, titleWithNameAndJobTitle } from '@components/SEO';
import { useLocalization } from '@hooks/useLocalization';
import { Posts } from '@screens/Home/components/Posts';
import { useBlogPostFilters } from '@screens/Home/hooks/useBlogPostFilters';
import { getTagUrl } from '@utils/url';
import {
  PersonalInformationApiData,
  PostTagApiData,
  SiteApiData,
  SocialApiData,
} from '@types-api';

const messages = defineMessages({
  description: {
    id: 'tag.description',
  },
  title: {
    id: 'tag.title',
  },
});

export type TagPageProps = {
  tag: PostTagApiData;
  personalInfo: PersonalInformationApiData;
  social: SocialApiData;
  site: SiteApiData;
};

export const TagPage: React.FC<TagPageProps> = ({
  tag,
  personalInfo,
  social,
  site,
}) => {
  const { formatMessage, locale } = useLocalization();
  const {
    activeFilter,
    loadMorePosts,
    postsToRender,
    hasMore,
  } = useBlogPostFilters(tag.blog_posts);

  return (
    <>
      <SEO
        /* TODO: centralize a single way to do that
      currently "withDefaultTitle" does something similar 
      */
        description={titleWithNameAndJobTitle(
          formatMessage(messages.description, { tag: tag.name }),
        )}
        title={formatMessage(messages.title, { tag: tag.name })}
        withDefaultTitle
        siteUrl={site.url}
        imageUrl={site.seo_image.url}
        twitterUrl={social.twitter.url}
        url={getTagUrl(tag.slug)}
      />
      <AppThemeProvider>
        <GlobalStyles />
        <MenuBar />
        <Container as="main">
          <AuthorPresentation
            fullName={personalInfo.full_name}
            profilePic={personalInfo.profile_pic.url}
            linkedIn={social.linkedIn}
            github={social.github}
            twitter={social.twitter}
          />
          <Posts
            posts={postsToRender(locale)}
            filter={activeFilter}
            hasMore={hasMore()}
            loadMore={loadMorePosts}
            customTitle={formatMessage(messages.title, { tag: tag.name })}
          />
        </Container>
      </AppThemeProvider>
    </>
  );
};
