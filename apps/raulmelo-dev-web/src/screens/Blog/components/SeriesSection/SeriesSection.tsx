import React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import { Container } from '@components/Ui';
import { ArrowIosDownwardOutline } from '@styled-icons/evaicons-outline/ArrowIosDownwardOutline';
import * as S from './styled';
import { RelevantPostSerieData } from '@screens/Blog/utils/series';

interface SeriesSectionProps {
  currentPostId: string;
  series: RelevantPostSerieData;
  divider?: boolean;
}

export const SeriesSection: React.FC<SeriesSectionProps> = ({
  series,
  currentPostId,
}) => {
  return (
    <Container data-testid="series-section" as="section">
      <SeriesMenu series={series} currentPostId={currentPostId} />
    </Container>
  );
};

type SeriesMenuProps = Pick<SeriesSectionProps, 'series' | 'currentPostId'>;

function SeriesMenu({ series, currentPostId }: SeriesMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { name, posts, amount } = series;

  React.useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [currentPostId]);

  return (
    <S.Card data-testid="series-menu">
      <S.Wrapper>
        <S.Info
          expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          data-testid="expand-button"
        >
          <span>{name}</span>
          <S.ExpanderButton
            initial="collapsed"
            animate={isOpen ? 'open' : 'collapsed'}
            variants={{
              open: { rotate: '0deg' },
              collapsed: { rotate: '180deg' },
            }}
          >
            <ArrowIosDownwardOutline size={21} />
          </S.ExpanderButton>
        </S.Info>
        <S.List
          animate={isOpen ? 'open' : 'collapsed'}
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ ease: [0.4, 0, 0.2, 1] }}
          data-testid="series-post-list"
        >
          {posts!.map((post) => {
            const { id, copy, uri } = post!;
            /* TODO: fix this animation. It's wacky. */
            return (
              <S.Item
                key={id}
                animate={isOpen ? 'open' : 'collapsed'}
                className={id === currentPostId ? 'active' : ''}
                data-testid={`post_${id}`}
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: 0 },
                }}
              >
                {/*
                  To proper work it needs next 10.0.2
                  https://github.com/vercel/next.js/issues/19007 
                */}
                <Link href={uri}>
                  <a>{copy}</a>
                </Link>
              </S.Item>
            );
          })}
        </S.List>
        <S.MenuFooter expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <span>
            <FormattedMessage
              id="series.sectionDescription"
              values={{
                seriesAmount: amount,
              }}
            />
          </span>
        </S.MenuFooter>
      </S.Wrapper>
    </S.Card>
  );
}
