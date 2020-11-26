import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Container } from '@components/Ui';
import { RelevantPostSerieData } from '@screens/Blog/utils/series';
import { ChevronDown } from '@icons';

interface SeriesSectionProps {
  currentPostId: string;
  series: RelevantPostSerieData;
  divider?: boolean;
}

const variants = {
  list: {
    open: {
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
    open: {
      y: 0,
      height: 'auto',
      opacity: 1,
      transition: {
        stiffness: 1000,
        velocity: -200,
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

export const SeriesSection: React.FC<SeriesSectionProps> = ({
  series,
  currentPostId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { name, posts, amount } = series;

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [currentPostId]);

  const toggleSection = () => setIsOpen(!isOpen);

  return (
    <Container data-testid="series-section" as="section">
      <div
        className="relative bg-white dark:bg-blue-800 rounded shadow my-5"
        data-testid="series-menu"
      >
        <div>
          <Header isOpen={isOpen} toggleSection={toggleSection} name={name} />
          <motion.ul
            className="m-0"
            initial={false}
            animate={isOpen ? 'open' : 'collapsed'}
            variants={variants.list}
            data-testid="series-post-list"
          >
            {posts.map((post) => {
              const { id, copy, uri } = post;
              const isCurrentPost = id === currentPostId;
              return (
                <motion.li
                  className={classnames([
                    'cursor-pointer',
                    'm-0 p-b',
                    'font-sans text-sm md:text-base',
                    isCurrentPost
                      ? 'bg-green-400'
                      : 'hover:bg-green-400 hover:bg-opacity-50',
                  ])}
                  key={id}
                  data-testid={`post_${id}`}
                  variants={variants.item}
                >
                  <Link href={uri}>
                    <a className="block no-underline px-4 py-3">{copy}</a>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
          <Footer
            isOpen={isOpen}
            toggleSection={toggleSection}
            amount={amount}
          />
        </div>
      </div>
    </Container>
  );
};

type HeaderProps = {
  toggleSection: () => void;
  isOpen: boolean;
  name: string;
};

const Header = ({ isOpen, toggleSection, name }: HeaderProps) => {
  return (
    <div
      className={classnames([
        'flex content-between',
        'cursor-pointer',
        'py-3 px-4',
        'font-serif text-lg md:text-xl font-bold',
        'transition-spacing duration-300',
        isOpen
          ? 'pb-2.5 border-b border-gray-100 dark:border-gray-600'
          : 'pb-0 border-none',
      ])}
      onClick={toggleSection}
      data-testid="expand-button"
    >
      <span className="flex-1">{name}</span>
      <motion.button
        className="flex items-center justify-center w-7 h-7"
        initial="collapsed"
        animate={isOpen ? 'open' : 'collapsed'}
        variants={{
          open: { rotate: '0deg' },
          collapsed: { rotate: '180deg' },
        }}
      >
        <ChevronDown className="w-5" />
      </motion.button>
    </div>
  );
};

type FooterProps = Pick<HeaderProps, 'isOpen' | 'toggleSection'> & {
  amount: number;
};

const Footer = ({ isOpen, amount, toggleSection }: FooterProps) => {
  return (
    <div
      onClick={toggleSection}
      className={classnames([
        'flex content-between',
        'cursor-pointer',
        'py-3 px-4',
        'text-sm md:text-base font-sans',
        ' transition-spacing duration-300',
        isOpen
          ? 'pt-2.5 border-t border-gray-100 dark:border-gray-600'
          : 'pt-0 border-none',
      ])}
    >
      <span>
        <FormattedMessage
          id="series.sectionDescription"
          values={{
            seriesAmount: amount,
          }}
        />
      </span>
    </div>
  );
};
