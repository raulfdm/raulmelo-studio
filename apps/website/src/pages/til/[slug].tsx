import { MdxPostTemplate } from '@components/templates/MdxPost';
import { hydrate, renderToString } from '@config/mdx';
import {
  ITilPost,
  ITilPostGraphQLResponse,
  ITilPostParsed,
} from '@screens/TilPost';
import { Backend } from '@services/Backend';
import { SupportedLanguages } from '@types-app';
import { head } from '@utils/ramda';
import { GetStaticPaths } from 'next';

type Props = {
  til: ITilPostParsed;
};

const TilPostPage = ({ til }: Props) => {
  const parsedContent = hydrate(til.content);

  return (
    <MdxPostTemplate
      title={til.title}
      description={til.title}
      publishedAt={til.publishedAt}
      tags={til.tags}
    >
      {parsedContent}
    </MdxPostTemplate>
  );
};

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const til = await fetchTilBySlug(params.slug);
  const content = await renderToString(til.content);

  return {
    props: {
      til: { ...til, content },
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  type ResponseType = {
    tils: { slug: string; locale: SupportedLanguages }[];
  };

  const query = `
  query TilsPath {
    tils(locale: "all") {
      locale
      slug
    }
  }  
  `;

  const { tils } = await Backend.graphql<ResponseType>(query);

  return {
    paths: tils.map(generatePath),
    fallback: false,
  };

  function generatePath(til: ResponseType['tils'][0]) {
    return {
      params: {
        slug: til.slug,
      },
      locale: til.locale,
    };
  }
};

async function fetchTilBySlug(slug: string): Promise<ITilPost> {
  const query = `
    query Tils {
      tils(locale: "all", where: { slug: "${slug}" }) {
        id
        publishedAt
        title
        locale
        slug
        content
        tags {
          id
          name
          slug
        }
      }
    }
`;

  const { tils } = await Backend.graphql<ITilPostGraphQLResponse>(query);

  const til = head(tils);

  if (!til) {
    throw new Error('Invalid Slug');
  }

  return til;
}

export default TilPostPage;
