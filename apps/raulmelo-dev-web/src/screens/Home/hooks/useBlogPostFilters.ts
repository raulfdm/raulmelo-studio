import { useState, useMemo } from 'react';

import { Posts } from '@models/Posts';
import { PostModel } from '@models/Post';
import { PostsApiData } from 'src/types/api/posts';
import { SupportedLanguages } from '@types-app';

const POST_THRESHOLD = 5;

type PossibleFilters = 'all' | 'single' | 'series';

export function useBlogPostFilters(apiPosts: PostsApiData) {
  const [numberOfPostsToShow, setNumberOfPostsToShow] = useState(
    POST_THRESHOLD,
  );

  const [activeFilter, setActiveFilter] = useState('all' as PossibleFilters);

  const posts = useMemo(() => Posts(apiPosts), []);

  function postsToRender(language?: SupportedLanguages) {
    const postsForLanguage = language
      ? posts.postsByLanguage()[language]
      : posts;

    let postsResult: PostModel[] = [];

    if (activeFilter === 'all') {
      postsResult = postsForLanguage.allPosts;
    }

    if (activeFilter === 'series') {
      postsResult = postsForLanguage.seriesPosts;
    }

    if (activeFilter === 'single') {
      postsResult = postsForLanguage.singlePosts;
    }

    /* TODO: implement here */
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

  function changeFilter(filter: PossibleFilters) {
    setActiveFilter(filter);
  }

  function hasMore() {
    /**
     * TODO: fix this logic
     * When we load more posts, the list of postsToRender is updated.
     * Then, when "hasMore" is called in the component itself,
     * we have the following scenario:
     *
     * posts.length = 10 (already updated via loadMore)
     * allPosts.length = 10
     * 10 < 10 === false
     *
     * The test would pass but functionality wise will be broken
     *
     * When just returning true, functionality wise it works fine
     */

    // const posts = postsToRender();
    // const allPosts = getPostForFilter();
    // return posts.length <= allPosts.length;
    return true;
  }

  return { postsToRender, loadMorePosts, activeFilter, changeFilter, hasMore };
}
