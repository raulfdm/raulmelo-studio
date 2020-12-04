import dynamic from 'next/dynamic';
import { defineMessages } from 'react-intl';

import { MenuBar } from '@components/MenuBar';
import { Container } from '@components/Ui';
import { SEO, titleWithNameAndJobTitle } from '@components/SEO';
import { useLocalization } from '@hooks/useLocalization';
import { useBlogPostFilters } from '@screens/Home/hooks/useBlogPostFilters';
import { getTagUrl } from '@utils/url';
import { PersonalInformationApiData, PostTagApiData } from '@types-api';

import type { Posts as PostsType } from '@screens/Home/components/Posts';
import type { AuthorPresentation as AuthorPresentationType } from '@screens/Home/components/AuthorPresentation';

const Posts = dynamic(() =>
  import('@screens/Home/components/Posts').then((mod) => mod.Posts),
) as typeof PostsType;

const AuthorPresentation = dynamic(() =>
  import('@screens/Home/components/AuthorPresentation').then(
    (mod) => mod.AuthorPresentation,
  ),
) as typeof AuthorPresentationType;

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
};

export const TagPage: React.FC<TagPageProps> = ({ tag, personalInfo }) => {
  const { formatMessage } = useLocalization();
  const {
    activeFilter,
    loadMorePosts,
    postsToRender,
    hasMore,
  } = useBlogPostFilters(tag.blog_posts);

  return (
    <>
      <SEO
        description={titleWithNameAndJobTitle(
          formatMessage(messages.description, { tag: tag.name }),
        )}
        title={formatMessage(messages.title, { tag: tag.name })}
        withDefaultTitle
        url={getTagUrl(tag.slug)}
      />

      <MenuBar />
      <Container as="main">
        <AuthorPresentation
          fullName={personalInfo.full_name}
          profilePic={personalInfo.profile_pic.url}
        />
        <Posts
          posts={postsToRender()}
          filter={activeFilter}
          hasMore={hasMore()}
          loadMore={loadMorePosts}
          customTitle={formatMessage(messages.title, { tag: tag.name })}
        />
      </Container>
    </>
  );
};
