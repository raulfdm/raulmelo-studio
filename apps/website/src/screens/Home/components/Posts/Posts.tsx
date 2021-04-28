import { PostCardWrapper } from '@components/PostCardWrapper';
import { IHomePost } from '@screens/Home/types';
import { AnimatePresence, motion } from 'framer-motion';
import tw from 'twin.macro';

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
  posts: Omit<IHomePost, 'description'>[];
  title: string;
};

const styles = {
  wrapper: tw`col-span-full`,
  title: tw`font-sans font-extrabold text-lg lg:text-xl mb-4 lg:mb-8`,
  list: tw`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`,
};

export const Posts = ({ posts, title }: PostsProps) => {
  return (
    <section css={styles.wrapper}>
      <h2 css={styles.title}>{title}</h2>
      <motion.ul css={styles.list}>
        <AnimatePresence initial={false}>
          {posts
            ? posts.map((post) => (
                <motion.li
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
                  <PostCardWrapper post={post} />
                </motion.li>
              ))
            : null}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
};
