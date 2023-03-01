import { useLocalization } from '$infrastructure/contexts/Localization';
import getPostUrl from '$infrastructure/utils/url';
import { ContentTile } from '$ui/ContentTile';
import type { IPostsAndTilsPost } from '@raulmelo/core/dist/types/domains/posts';
import { AnimatePresence, m } from 'framer-motion';

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

export const Posts = ({ posts, title }: PostsProps) => {
  const { locale } = useLocalization();

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
                  <ContentTile
                    urlBuilder={(slug) => getPostUrl(slug, locale)}
                    {...post}
                  />
                </m.li>
              ))
            : null}
        </AnimatePresence>
      </m.ul>
    </section>
  );
};
