import type { IBlogPostBySlugApiResponse } from '@raulmelo/core/dist/types/domains/posts/queryPostBySlug/types';
import { ChevronDownIcon } from '@raulmelo/ui';
import { createMachine } from '@xstate/fsm';
import { useMachine } from '@xstate/react/fsm';
import { m } from 'framer-motion';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import tw, { css } from 'twin.macro';

// TODO: review this html markup. It seems having ugly/bad HTML structure.
export const SeriesSection = ({
  series,
  currentPostId,
}: SeriesSectionProps) => {
  const [current, send] = useMachine(seriesMachine);
  const { name, posts } = series;
  const currentState = current.value as SeriesMachineState;

  const toggleSection = () => send('TOGGLE');

  return (
    <section>
      <div css={styles.wrapper} data-testid="series-menu">
        <div>
          <div
            css={styles.header.wrapper(currentState)}
            onClick={toggleSection}
            data-testid="expand-button"
            role="button"
          >
            <span css={styles.header.title}>{name}</span>
            <m.button
              css={styles.header.button}
              initial="collapsed"
              animate={currentState}
              variants={{
                expanded: { rotate: '0deg' },
                collapsed: { rotate: '180deg' },
              }}
            >
              <ChevronDownIcon css={styles.header.icon} />
            </m.button>
          </div>

          <m.ul
            layout
            css={styles.list}
            initial={false}
            animate={currentState}
            variants={variants.list}
            data-testid="series-post-list"
          >
            {posts.map((post) => {
              const { _id, seriesCopy, slug } = post;

              const isCurrentPost = _id === currentPostId;
              return (
                <m.li
                  layout
                  css={styles.item(isCurrentPost)}
                  key={_id}
                  data-testid={`post_${_id}`}
                  variants={variants.item}
                >
                  <Link href={slug} passHref>
                    <a
                      css={styles.link}
                      aria-hidden={currentState === 'collapsed'}
                    >
                      {seriesCopy}
                    </a>
                  </Link>
                </m.li>
              );
            })}
          </m.ul>

          <div
            onClick={toggleSection}
            css={styles.footer(currentState)}
            role="button"
          >
            <span>
              <FormattedMessage
                id="series.sectionDescription"
                values={{
                  seriesAmount: posts.length,
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SeriesSectionProps {
  currentPostId: string;
  series: NonNullable<IBlogPostBySlugApiResponse['series']>;
  divider?: boolean;
}

type SeriesMachineEvent =
  | {
      type: 'TOGGLE';
    }
  | { type: 'CLOSE' };

type SeriesMachineState = 'expanded' | 'collapsed';

const variants = {
  list: {
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        restDelta: 2,
        staggerChildren: 0.07,
        stiffness: 40,
        type: 'spring',
      },
    },
    collapsed: {
      opacity: 0,
      height: 0,
      transition: {
        damping: 40,
        delay: 0.6,
        staggerChildren: 0.05,
        staggerDirection: -1,
        stiffness: 400,
        type: 'spring',
      },
    },
  },
  item: {
    expanded: {
      y: 0,
      height: 'auto',
      opacity: 1,
      transition: {
        stiffness: 1000,
      },
    },
    collapsed: {
      y: 50,
      height: 0,
      opacity: 0,
      transition: {
        stiffness: 1000,
      },
    },
  },
};

const seriesMachine = createMachine<never, SeriesMachineEvent>({
  initial: 'collapsed',
  states: {
    collapsed: {
      on: {
        TOGGLE: 'expanded',
      },
    },
    expanded: {
      on: {
        TOGGLE: 'collapsed',
        CLOSE: 'collapsed',
      },
    },
  },
});

const styles = {
  wrapper: css`
    ${tw`relative`};
    ${tw`bg-white dark:bg-blue-800`};
    ${tw`rounded`};
    ${tw`shadow`};
    ${tw`my-8`};
    ${tw`duration-200 transition-theme ease`};
  `,
  list: tw`pb-0 m-0`,
  item: (isCurrentPost: boolean) => css`
    ${tw`cursor-pointer`};
    ${tw`m-0`};
    ${tw`font-sans text-sm md:text-base`};
    ${isCurrentPost
      ? tw`bg-green-400`
      : tw`hover:bg-green-400 hover:bg-opacity-50`};
  `,
  link: tw`block px-4 py-3 no-underline`,
  header: {
    wrapper: (currentState: SeriesMachineState) => css`
      ${tw`flex content-between`};
      ${tw`cursor-pointer`};
      ${tw`px-4 py-3`};
      ${tw`text-lg font-bold md:text-xl`};
      ${tw`duration-300 transition-spacing`};
      ${currentState === 'expanded'
        ? tw`pb-2.5 border-b border-gray-100 dark:border-gray-600`
        : `pb-0 border-none`}
    `,
    title: tw`flex-1`,
    button: tw`flex items-center justify-center w-7 h-7`,
    icon: tw`w-5`,
  },
  footer: (currentState: SeriesMachineState) => css`
    ${tw`flex content-between`};
    ${tw`cursor-pointer`};
    ${tw`px-4 py-3`};
    ${tw`font-sans text-base md:text-md`};
    ${tw`duration-300 transition-spacing`};
    ${currentState === 'expanded'
      ? tw`pt-2.5 border-t border-gray-100 dark:border-gray-600`
      : tw`pt-0 border-none`}
  `,
};
