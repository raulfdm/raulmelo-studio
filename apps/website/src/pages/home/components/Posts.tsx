import type { QueryPostsAndTilsReturnType } from '@raulmelo/core/dist/types/domains/posts/queryPostsAndTils';
import { AnimatePresence, m } from 'framer-motion';

import { ContentTile } from '~/components/ContentTile';
import { getPostUrl } from '~/utils/url';

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

type PostsProps = {
  posts:
    | QueryPostsAndTilsReturnType['posts']
    | QueryPostsAndTilsReturnType['tils'];
  title: string;
};

export const Posts = ({ posts, title }: PostsProps) => {
  return (
    <section className="col-span-full">
      <h2 className="mb-4 font-sans text-lg font-extrabold lg:text-xl lg:mb-8">
        {title}
      </h2>
      <m.ul className="space-y-10">
        <AnimatePresence initial={false}>
          {posts
            ? posts.map((post) => (
                <m.li
                  key={post._id}
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
                  <ContentTile urlBuilder={getPostUrl} {...post} />
                </m.li>
              ))
            : null}
        </AnimatePresence>
      </m.ul>
    </section>
  );
};
