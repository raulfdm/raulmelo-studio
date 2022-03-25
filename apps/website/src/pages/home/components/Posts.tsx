import { IPostsAndTilsPost } from '@raulmelo/core/dist/types/domains/posts';
import { AnimatePresence, m } from 'framer-motion';
import tw from 'twin.macro';

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
  posts: IPostsAndTilsPost[];
  title: string;
};

const styles = {
  wrapper: tw`col-span-full`,
  title: tw`mb-4 font-sans text-lg font-extrabold lg:text-xl lg:mb-8`,
  list: tw`space-y-10`,
};

export const Posts = ({ posts, title }: PostsProps) => {
  return (
    <section css={styles.wrapper}>
      <h2 css={styles.title}>{title}</h2>
      <m.ul css={styles.list}>
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
