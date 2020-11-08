import React from 'react';
import * as R from 'ramda';
import { FormattedMessage, defineMessages } from 'react-intl';
import { motion, AnimatePresence } from 'framer-motion';

import { styled } from '@styles/styled';
import { PostFilters } from '@screens/Home/types';
import { PostModel } from '@models/Post';
import { SupportedLanguages } from '@types-app';
import { useLocalization } from '@hooks/useLocalization';
import { InfiniteScroll } from '@components/InfiniteScroll';
import { PostCard } from '@components/PostCard';

type PostsProps = {
  filter: PostFilters;
  posts: PostModel[];
  loadMore: () => void;
  hasMore: boolean;
  customTitle?: string;
};

const PostsTitle = styled.h2`
  letter-spacing: -0.32px;
  font-size: 2.1rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.font.contentSans};
  padding-bottom: 1.2rem;
`;

const PostList = styled.ul`
  list-style: none;
`;

const PostListItem = styled(motion.li)`
  margin-bottom: 3rem;
`;

const NoPostsMessage = styled.p`
  font-size: 1.6rem;
  line-height: 24px;
  font-weight: 400;
  font-family: ${({ theme }) => theme.font.contentSans};
`;

const messages = defineMessages({
  pt: {
    id: 'languages.pt',
  },
  en: {
    id: 'languages.en',
  },
});

export const Posts: React.FC<PostsProps> = ({
  filter,
  posts,
  loadMore,
  hasMore,
  customTitle,
}) => {
  const { locale, formatMessage } = useLocalization();

  if (!posts) return null;

  const filterLocale = {
    all: 'home.filter.all',
    series: 'home.filter.series',
    single: 'home.filter.single',
  };

  const itemsAnimationVariants = {
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: index * 0.1,
      },
    }),
    hidden: {
      scale: 0,
      opacity: 0,
    },
  };

  return (
    <>
      <PostsTitle>
        {customTitle || <FormattedMessage id={filterLocale[filter]} />}
      </PostsTitle>

      {R.isEmpty(posts) ? (
        <NoPostsMessage>
          <FormattedMessage
            id="home.noPosts"
            values={{
              language: formatMessage(messages[locale as SupportedLanguages]),
            }}
          />
        </NoPostsMessage>
      ) : (
        <InfiniteScroll
          threshold={500}
          onLoadMore={loadMore}
          hasMore={hasMore}
          Component={PostList}
        >
          <AnimatePresence initial={false}>
            {posts.map((post) => (
              <PostListItem
                key={post.id}
                variants={itemsAnimationVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{
                  opacity: {
                    stiffness: 1000,
                    velocity: -100,
                  },
                }}
              >
                <PostCard post={post} tags={post.post_tags} />
              </PostListItem>
            ))}
          </AnimatePresence>
        </InfiniteScroll>
      )}
    </>
  );
};
