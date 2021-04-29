import { ChevronDownIcon } from '@components/Icons';
import { BlogPostPost } from '@screens/BlogPost';
import { createMachine } from '@xstate/fsm';
import { useMachine } from '@xstate/react/fsm';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import tw, { css } from 'twin.macro';

// TODO: review this html markup. It seems having ugly/bad HTML structure.
export const SeriesSection: React.FC<SeriesSectionProps> = ({
  series,
  currentPostId,
}) => {
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
            aria-role="button"
          >
            <span css={styles.header.title}>{name}</span>
            <motion.button
              css={styles.header.button}
              initial="collapsed"
              animate={currentState}
              variants={{
                expanded: { rotate: '0deg' },
                collapsed: { rotate: '180deg' },
              }}
            >
              <ChevronDownIcon css={styles.header.icon} />
            </motion.button>
          </div>

          <motion.ul
            layout
            css={styles.list}
            initial={false}
            animate={currentState}
            variants={variants.list}
            data-testid="series-post-list"
          >
            {posts.map((post) => {
              const { id, copy, uri } = post;
              const isCurrentPost = id === currentPostId;
              return (
                <motion.li
                  layout
                  css={styles.item(isCurrentPost)}
                  key={id}
                  data-testid={`post_${id}`}
                  variants={variants.item}
                >
                  <Link href={uri}>
                    <a
                      css={styles.link}
                      aria-hidden={currentState === 'collapsed'}
                    >
                      {copy}
                    </a>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          <div
            onClick={toggleSection}
            css={styles.footer(currentState)}
            aria-role="button"
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
  series: NonNullable<BlogPostPost['series']>;
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
    ${tw`transition-theme duration-200 ease`};
  `,
  list: tw`m-0 pb-0`,
  item: (isCurrentPost: boolean) => css`
    ${tw`cursor-pointer`};
    ${tw`m-0`};
    ${tw`font-sans text-sm md:text-base`};
    ${isCurrentPost
      ? tw`bg-green-400`
      : tw`hover:bg-green-400 hover:bg-opacity-50`};
  `,
  link: tw`block no-underline px-4 py-3`,
  header: {
    wrapper: (currentState: SeriesMachineState) => css`
      ${tw`flex content-between`};
      ${tw`cursor-pointer`};
      ${tw`py-3 px-4`};
      ${tw`text-lg md:text-xl font-bold`};
      ${tw`transition-spacing duration-300`};
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
    ${tw`py-3 px-4`};
    ${tw`text-base md:text-md font-sans`};
    ${tw`transition-spacing duration-300`};
    ${currentState === 'expanded'
      ? tw`pt-2.5 border-t border-gray-100 dark:border-gray-600`
      : tw`pt-0 border-none`}
  `,
};
