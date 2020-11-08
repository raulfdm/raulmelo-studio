import React from 'react';

import { PersonalInformationApiData, SocialApiData } from '@types-api';
import { RegularSiteTheme } from '@components/Themes/RegularSiteTheme';
import { SupportedLanguages } from '@types-app';
import { AuthorPresentation } from './components/AuthorPresentation';
import { Posts } from './components/Posts';
import { useBlogPostFilters } from './hooks/useBlogPostFilters';
import { PostFilters } from './types';
import { Filter } from './components/Filter';
import { PostsApiData } from 'src/types/api/posts';

export type HomePageProps = {
  personalInfo: PersonalInformationApiData;
  social: SocialApiData;
  posts: PostsApiData;
  locale: SupportedLanguages;
};

export const HomePage: React.FC<HomePageProps> = ({
  personalInfo,
  social,
  posts,
  locale,
}) => {
  const {
    activeFilter,
    loadMorePosts,
    changeFilter,
    postsToRender,
    hasMore,
  } = useBlogPostFilters(posts);

  return (
    <RegularSiteTheme>
      <AuthorPresentation
        fullName={personalInfo.full_name}
        profilePic={personalInfo.profile_pic.url}
        linkedIn={social.linkedIn}
        github={social.github}
        twitter={social.twitter}
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
    </RegularSiteTheme>
  );
};
