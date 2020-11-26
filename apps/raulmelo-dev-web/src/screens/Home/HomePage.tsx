import dynamic from 'next/dynamic';

import { SEO } from '@components/SEO';
import { MenuBar } from '@components/MenuBar';
import { Container } from '@components/Ui';
import { PersonalInformationApiData } from '@types-api';
import { SupportedLanguages } from '@types-app';
import { useBlogPostFilters } from './hooks/useBlogPostFilters';
import { PostFilters } from './types';
import { PostsApiData } from 'src/types/api/posts';
import { defineMessages } from 'react-intl';
import { useLocalization } from '@hooks/useLocalization';

import type { Filter as FilterType } from './components/Filter';
import type { Posts as PostsType } from './components/Posts';
import type { AuthorPresentation as AuthorPresentationType } from './components/AuthorPresentation';

const Posts = dynamic(() =>
  import('./components/Posts').then((mod) => mod.Posts),
) as typeof PostsType;

const AuthorPresentation = dynamic(() =>
  import('./components/AuthorPresentation').then(
    (mod) => mod.AuthorPresentation,
  ),
) as typeof AuthorPresentationType;

const Filter = dynamic(() =>
  import('./components/Filter').then((mod) => mod.Filter),
) as typeof FilterType;

export type HomePageProps = {
  personalInfo: PersonalInformationApiData;

  posts: PostsApiData;
  locale: SupportedLanguages;
};

const messages = defineMessages({
  description: {
    id: 'siteData.description',
  },
  title: {
    id: 'siteData.title',
  },
});

export const HomePage: React.FC<HomePageProps> = ({
  personalInfo,

  posts,
  locale,
}) => {
  const { formatMessage } = useLocalization();
  const {
    activeFilter,
    loadMorePosts,
    changeFilter,
    postsToRender,
    hasMore,
  } = useBlogPostFilters(posts);

  return (
    <>
      <SEO
        description={formatMessage(messages.description)}
        title={formatMessage(messages.title)}
        url="/"
      />

      <MenuBar />
      <Container as="main">
        <AuthorPresentation
          fullName={personalInfo.full_name}
          profilePic={personalInfo.profile_pic.url}
        />
        <Filter
          activeFilter={activeFilter as PostFilters}
          changeFilter={changeFilter}
        />
        <Posts
          posts={postsToRender(locale)}
          filter={activeFilter}
          hasMore={hasMore()}
          loadMore={loadMorePosts}
        />
      </Container>
    </>
  );
};
