import { useState, useMemo } from 'react';

import { Posts } from '@models/Posts';
import { PostsApiData } from '@types-api';

const POST_THRESHOLD = 5;

export type PossibleFiltersIndex = keyof typeof filters;
export type PossibleFilters = 'all' | 'single' | 'series';

const filters = {
  0: 'all',
  1: 'single',
  2: 'series',
};

export function useBlogPostFilters(apiPosts: PostsApiData) {
  const [numberOfPostsToShow, setNumberOfPostsToShow] = useState(
    POST_THRESHOLD,
  );

  const [activeTabIndex, setActiveTabIndex] = useState<PossibleFiltersIndex>(0);

  const posts = useMemo(() => Posts(apiPosts), [apiPosts]);

  function postsToRender() {
    let postsResult: PostsApiData = [];
    const activeFilter = filters[activeTabIndex];

    if (activeFilter === 'all') {
      postsResult = posts.allPosts;
    }

    if (activeFilter === 'series') {
      postsResult = posts.seriesPosts;
    }

    if (activeFilter === 'single') {
      postsResult = posts.singlePosts;
    }

    return postsResult.slice(0, numberOfPostsToShow);
  }

  const loadMorePosts = () => {
    setNumberOfPostsToShow((previous) => {
      const nextAmountOfPosts = previous + POST_THRESHOLD;
      /**
       * This logic limits the max number of posts to the posts size.
       * If I only have 10 posts and this action is called 4 times, I don't
       * want having nextAmountOfPosts equals 20.
       */
      const result =
        nextAmountOfPosts <= posts.allPosts.length
          ? nextAmountOfPosts
          : posts.allPosts.length;

      return result;
    });
  };

  function changeFilter(tabIndex: PossibleFiltersIndex) {
    setActiveTabIndex(tabIndex);
  }

  function hasMore() {
    return postsToRender().length < apiPosts.length;
  }

  return {
    postsToRender,
    loadMorePosts,
    activeFilter: filters[activeTabIndex] as PossibleFilters,
    activeTabIndex,
    changeFilter,
    hasMore,
  };
}
