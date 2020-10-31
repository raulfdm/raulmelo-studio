import { hydrate, renderToString } from '@config/mdx';
import { UsesPage } from '@screens/Uses/UsesPage';
import { head } from '@utils/utilities';
import { UsesApiData } from '@types-api';
import { Backend } from '@services/Backend';
import { GetStaticProps } from 'next';

type GetStaticPropsReturnType = {
  props: {
    usesMd: RenderToStringReturnType;
  };
  revalidate: number;
};

const Uses = (props: GetStaticPropsReturnType['props']) => {
  const content = hydrate(props.usesMd);

  return <UsesPage>{content}</UsesPage>;
};

export const getStaticProps: GetStaticProps = async ({
  locale,
}): Promise<GetStaticPropsReturnType> => {
  const usesMdx = (await Backend.fetch(
    'uses',
    `?language=${locale}`,
  )) as UsesApiData;

  const mdxSource = await renderToString(head(usesMdx).content);

  return {
    props: {
      usesMd: mdxSource,
    },
    revalidate: 1,
  };
};

export default Uses;
