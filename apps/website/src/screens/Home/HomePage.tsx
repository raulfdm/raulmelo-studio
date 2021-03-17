import { defineMessages } from 'react-intl';
import { useRouter } from 'next/router';
import { Pagination, PaginationItem } from '@raulfdm/blog-components';

import { Container } from '@components/Ui';
import { MenuBar } from '@components/MenuBar';
import { PersonalInformationApiData } from '@types-api';
import { PostsApiData } from 'src/types/api/posts';
import { SEO } from '@components/SEO';
import { SupportedLanguages } from '@types-app';
import { useLocalization } from '@hooks/useLocalization';
import { AuthorPresentation } from './components/AuthorPresentation';
import { usePageQueryReset } from './hooks/usePageQueryReset';
import { Posts } from './components/Posts';

export type HomePageProps = {
  personalInfo: PersonalInformationApiData;
  posts: PostsApiData;
  locale: SupportedLanguages;
  pageNumber: number;
  numberOfPages: number;
};

const messages = defineMessages({
  description: {
    id: 'siteData.description',
  },
  title: {
    id: 'siteData.title',
  },
  latests: {
    id: 'home.title.latests',
  },
  page: {
    id: 'home.title.page',
  },
});

export const HomePage: React.FC<HomePageProps> = ({
  personalInfo,
  posts,
  pageNumber,
  numberOfPages,
}) => {
  const { formatMessage } = useLocalization();
  const router = useRouter();
  usePageQueryReset({ pageNumber, numberOfPages });

  const pageTitle = pageNumber === 1 ? messages.latests : messages.page;

  return (
    <>
      <SEO
        description={formatMessage(messages.description)}
        title={formatMessage(messages.title)}
        url="/"
      />

      <MenuBar />
      <Container as="main">
        <AuthorPresentation
          fullName={personalInfo.full_name}
          profilePic={personalInfo.profile_pic.url}
        />
        <Posts posts={posts} title={formatMessage(pageTitle, { pageNumber })} />
        {numberOfPages > 1 ? (
          <Pagination
            className="flex justify-center mt-6"
            count={numberOfPages}
            page={pageNumber}
            defaultPage={pageNumber}
            onChange={(_, page) => {
              router.push(`${router.pathname}?page=${page}`);
            }}
            renderItem={(item) => {
              return <PaginationItem {...item} />;
            }}
          />
        ) : null}
      </Container>
    </>
  );
};
