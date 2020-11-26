import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { motion, AnimatePresence } from 'framer-motion';

import { PostFilters } from '@screens/Home/types';
import { SupportedLanguages } from '@types-app';
import { useLocalization } from '@hooks/useLocalization';
import { InfiniteScroll } from '@components/InfiniteScroll';
import { PostCard } from '@components/PostCard';
import { PostApiData } from '@types-api';
import { isEmpty } from '@utils/ramda';

type PostsProps = {
  filter: PostFilters;
  posts: PostApiData[];
  loadMore: () => void;
  hasMore: boolean;
  customTitle?: string;
};

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
      <h2 className="text-2xl mb-3 font-bold font-sans">
        {customTitle || <FormattedMessage id={filterLocale[filter]} />}
      </h2>

      {isEmpty(posts) ? (
        <p className="text-base font-sans">
          <FormattedMessage
            id="home.noPosts"
            values={{
              language: formatMessage(messages[locale as SupportedLanguages]),
            }}
          />
        </p>
      ) : (
        <InfiniteScroll
          threshold={500}
          onLoadMore={loadMore}
          hasMore={hasMore}
          Component={motion.ul}
        >
          <AnimatePresence initial={false}>
            {posts.map((post) => (
              <motion.li
                className="mb-7"
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
                <PostCard post={post} key={post.id} />
              </motion.li>
            ))}
          </AnimatePresence>
        </InfiniteScroll>
      )}
    </>
  );
};
