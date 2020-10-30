import { GetStaticPaths } from 'next';
import { hydrate, renderToString } from '@config/mdx';

import { UsesPage } from '@screens/Uses/UsesPage';
import { SupportedLanguages } from '@types-app';
import { head } from '@utils/utilities';
import { UsesApiData } from '@types-api';
import { Backend } from 'src/services/Backend';

type Params = {
  params: { lang: SupportedLanguages };
};

type GetStaticPropsReturnType = {
  props: {
    usesMd: RenderToStringReturnType;
    lang: SupportedLanguages;
  };
  revalidate: number;
};

const Uses = (props: GetStaticPropsReturnType['props']) => {
  const content = hydrate(props.usesMd);

  return <UsesPage>{content}</UsesPage>;
};

export const getStaticProps = async ({
  params: { lang },
}: Params): Promise<GetStaticPropsReturnType> => {
  const usesMdx = (await Backend.fetch(
    'uses',
    `?language=${lang}`,
  )) as UsesApiData;

  const mdxSource = await renderToString(head(usesMdx).content);

  return {
    props: { usesMd: mdxSource, lang },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          lang: 'en',
        },
      },
      {
        params: {
          lang: 'pt',
        },
      },
    ],
    fallback: false,
  };
};

export default Uses;
