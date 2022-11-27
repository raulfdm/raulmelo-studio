import type { IBlogPostBySlugApiResponse } from '@raulmelo/core/dist/types/domains/posts/queryPostBySlug/types';
import { ChevronDownIcon } from '@raulmelo/ui';
import { Link } from '@remix-run/react';
import { useMachine } from '@xstate/react';
import classNames from 'classnames';
import { m } from 'framer-motion';
import { FormattedMessage } from 'react-intl';
import { createMachine } from 'xstate';

// TODO: review this html markup. It seems having ugly/bad HTML structure.
export const SeriesSection = ({
  series,
  currentPostId,
}: SeriesSectionProps) => {
  const [current, send] = useMachine(seriesMachine);
  const { name, posts } = series;
  const currentState = current.value as SeriesMachineState;

  const toggleSection = () => send('TOGGLE');

  const isExpanded = current.matches('expanded');
  return (
    <section>
      <div
        className="relative my-8 duration-200 bg-white rounded shadow dark:bg-blue-800 transition-theme ease"
        data-testid="series-menu"
      >
        <div>
          <div
            className={classNames([
              'flex content-between cursor-pointer px-4 py-3',
              'text-lg font-bold md:text-xl duration-300 transition-spacing',
              isExpanded
                ? 'pb-2.5 border-b border-gray-100 dark:border-gray-600'
                : 'pb-0 border-none',
            ])}
            onClick={toggleSection}
            data-testid="expand-button"
            role="button"
          >
            <span className="flex-1">{name}</span>
            <m.button
              className="flex items-center justify-center w-7 h-7"
              initial="collapsed"
              animate={currentState}
              variants={{
                expanded: { rotate: '0deg' },
                collapsed: { rotate: '180deg' },
              }}
            >
              <ChevronDownIcon className="w-5" />
            </m.button>
          </div>

          <m.ul
            layout
            className="pb-0 m-0"
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
                  className={classNames(
                    'cursor-pointer m-0 font-sans text-sm md:text-base',
                    {
                      'bg-green-400 hover:bg-green-400 hover:bg-opacity-50':
                        isCurrentPost,
                    },
                  )}
                  key={_id}
                  data-testid={`post_${_id}`}
                  variants={variants.item}
                >
                  <Link
                    to={slug}
                    className="block px-4 py-3 no-underline"
                    aria-hidden={currentState === 'collapsed'}
                  >
                    {seriesCopy}
                  </Link>
                </m.li>
              );
            })}
          </m.ul>

          <div
            onClick={toggleSection}
            className={classNames([
              'flex content-between cursor-pointer px-4 py-3',
              'font-sans text-base md:text-md duration-300 transition-spacing',
              isExpanded
                ? 'pt-2.5 border-t border-gray-100 dark:border-gray-600'
                : 'pt-0 border-none',
            ])}
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

const seriesMachine = createMachine({
  predictableActionArguments: true,
  preserveActionOrder: true,
  tsTypes: {} as import('./SeriesSection.typegen').Typegen0,
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
