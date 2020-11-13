import { ThemeProvider } from 'styled-components';
import { useQuery } from 'react-query';

import { CvPage } from '@screens/CV/CvPage';
import { theme } from '@screens/CV/styled';
import { CvApiDataProps } from '@screens/CV/types';
import { Backend } from 'src/services/Backend';

type CvProps = {
  cv: CvApiDataProps;
};

const Cv: React.FC<CvProps> = (props) => {
  const { data } = useQuery('cv', fetchCvData, { initialData: props.cv });

  return (
    <ThemeProvider theme={theme}>
      <CvPage {...data!} />
    </ThemeProvider>
  );
};

export async function getStaticProps() {
  const data = await fetchCvData();

  return {
    props: {
      cv: data,
    },
  };
}

async function fetchCvData(): Promise<CvApiDataProps> {
  const [cv, personalInfo] = await Promise.all([
    Backend.fetch('cv'),
    Backend.fetch('personal-information'),
  ]);

  return { cv, personalInfo };
}

export default Cv;
