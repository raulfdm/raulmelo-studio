import { PostCardWrapper } from '@components/PostCardWrapper';
import { BlogPostFromTagPage } from '@screens/Tag/types';
import { AnimatePresence, motion } from 'framer-motion';

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
  posts: BlogPostFromTagPage[];
  title: string;
};

export const Posts = ({ posts, title }: PostsProps) => {
  return (
    <>
      <h2 className="text-2xl mb-3 font-bold font-sans">{title}</h2>
      <motion.ul>
        <AnimatePresence initial={false}>
          {posts
            ? posts.map((post) => (
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
                  <PostCardWrapper post={post} />
                </motion.li>
              ))
            : null}
        </AnimatePresence>
      </motion.ul>
    </>
  );
};
