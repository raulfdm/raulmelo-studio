import { MenuBar } from '@components/MenuBar';
import { SEO } from '@components/SEO';
import { useLocalization } from '@hooks/useLocalization';
import { Pagination, PaginationItem } from '@raulfdm/blog-components';
import { useRouter } from 'next/router';
import { defineMessages } from 'react-intl';
import { AuthorPresentation } from './components/AuthorPresentation';
import { Posts } from './components/Posts';
import { usePageQueryReset } from './hooks/usePageQueryReset';
import { HomePageProps } from './types';

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
  personalInformation,
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
      <main className="grid-container">
        <AuthorPresentation
          fullName={personalInformation.full_name}
          profilePic={personalInformation.profile_pic.url}
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
      </main>
    </>
  );
};
