import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import { Container } from '@components/Ui';
import { ArrowIosDownwardOutline } from '@styled-icons/evaicons-outline/ArrowIosDownwardOutline';
import {
  Card,
  ExpanderButton,
  Info,
  Item,
  List,
  MenuFooter,
  Wrapper,
} from './styled';
import { RelevantPostSerieData } from '@screens/Blog/utils/series';

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
      <Card data-testid="series-menu">
        <Wrapper>
          <Header isOpen={isOpen} toggleSection={toggleSection} name={name} />
          <List
            initial={false}
            animate={isOpen ? 'open' : 'collapsed'}
            variants={variants.list}
            data-testid="series-post-list"
          >
            {posts!.map((post) => {
              const { id, copy, uri } = post!;
              return (
                <Item
                  key={id}
                  className={id === currentPostId ? 'active' : ''}
                  data-testid={`post_${id}`}
                  variants={variants.item}
                >
                  <Link href={uri}>
                    <a>{copy}</a>
                  </Link>
                </Item>
              );
            })}
          </List>
          <Footer
            isOpen={isOpen}
            toggleSection={toggleSection}
            amount={amount}
          />
        </Wrapper>
      </Card>
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
    <Info expanded={isOpen} onClick={toggleSection} data-testid="expand-button">
      <span>{name}</span>
      <ExpanderButton
        initial="collapsed"
        animate={isOpen ? 'open' : 'collapsed'}
        variants={{
          open: { rotate: '0deg' },
          collapsed: { rotate: '180deg' },
        }}
      >
        <ArrowIosDownwardOutline size={21} />
      </ExpanderButton>
    </Info>
  );
};

type FooterProps = Pick<HeaderProps, 'isOpen' | 'toggleSection'> & {
  amount: number;
};

const Footer = ({ isOpen, amount, toggleSection }: FooterProps) => {
  return (
    <MenuFooter expanded={isOpen} onClick={toggleSection}>
      <span>
        <FormattedMessage
          id="series.sectionDescription"
          values={{
            seriesAmount: amount,
          }}
        />
      </span>
    </MenuFooter>
  );
};
