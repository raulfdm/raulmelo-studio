import { hydrate, renderToString } from '@config/mdx';
import { UsesPage, UsesPageProps } from '@screens/Uses/UsesPage';
import { head } from '@utils/utilities';
import { UsesApiData } from '@types-api';
import { Backend } from '@services/Backend';
import { GetStaticProps } from 'next';

type Props = UsesPageProps & { usesMd: RenderToStringReturnType };

const Uses = ({ usesMd, seo }: Props) => {
  const content = hydrate(usesMd);

  return <UsesPage seo={seo}>{content}</UsesPage>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const uses = (await Backend.fetch(
    'uses',
    `?language=${locale}`,
  )) as UsesApiData[];

  const usesData = head(uses);

  const mdxSource = await renderToString(usesData.content);

  return {
    props: {
      usesMd: mdxSource,
      seo: usesData.seo,
    },
    revalidate: 1,
  };
};

export default Uses;
