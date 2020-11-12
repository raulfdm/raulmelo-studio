import styled from 'styled-components';
import { FormattedMessage, defineMessage } from 'react-intl';

import { GlobalStyles } from '@styles/index';
import { MenuBar } from '@components/MenuBar';
import { useLocalization } from '@hooks/useLocalization';
import { AppThemeProvider } from '@contexts/AppTheme';
import Head from 'next/head';

const Wrapper = styled.div`
  max-width: 75vw;
  margin: 0 auto;
  text-align: center;
`;
const Title = styled.h2`
  font-size: 10vw;
`;

const Subtitle = styled.p`
  font-size: calc(1.6em + 1.75vw);
  line-height: 1.2;
  margin-bottom: 1em;
`;

const Description = styled.p`
  line-height: 1.65;
  font-size: calc(16px + 0.25vw);
  font-weight: 300;
  opacity: 0.8;
  font-family: ${({ theme }) => theme.font.contentSans};
`;

const pageTitleMessage = defineMessage({
  id: '404.title',
  description: 'page title',
});

const Error = () => {
  const { formatMessage } = useLocalization();

  return (
    <>
      <Head>
        <title>{formatMessage(pageTitleMessage)}</title>
      </Head>
      <AppThemeProvider>
        <GlobalStyles />
        <MenuBar />
        <Wrapper>
          <Title>Oops!</Title>
          <Subtitle>
            <FormattedMessage id="404.subtitle" />
          </Subtitle>
          <Description>
            <FormattedMessage id="404.description" />
          </Description>
        </Wrapper>
      </AppThemeProvider>
    </>
  );
};

export default Error;
