import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
import { getPostUrl } from '@/infrastructure/utils/url';
import { ContentTile } from '@/ui/ContentTile';
import type { SupportedLanguages } from '@raulmelo/core';
import type { QueryPostsAndTilsReturnType } from '@raulmelo/core/dist/types/domains/posts/queryPostsAndTils';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';

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
  lang: SupportedLanguages;
};

export const Posts = ({ posts, lang }: PostsProps) => {
  const intl = getIntl(lang);

  const readMoreLabel = intl.formatMessage({ id: 'blog.readMore' });
  const title = intl.formatMessage({ id: 'blog.title.latests' });

  return (
    <section className="col-span-full">
      <h2 className="mb-4 font-sans text-lg font-extrabold lg:text-xl lg:mb-8">
        {title}
      </h2>
      <LazyMotion features={domAnimation}>
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
                      formatDate={function (date) {
                        return intl.formatDate(date, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        });
                      }}
                      urlBuilder={(slug) => getPostUrl(slug, lang)}
                      readMoreLabel={readMoreLabel}
                      {...post}
                    />
                  </m.li>
                ))
              : null}
          </AnimatePresence>
        </m.ul>
      </LazyMotion>
    </section>
  );
};
