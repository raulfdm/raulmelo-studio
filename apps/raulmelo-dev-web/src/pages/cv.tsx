import { CvPage } from '@screens/CV/CvPage';
import { CvApiDataProps } from '@screens/CV/types';
import { Backend } from 'src/services/Backend';

const Cv: React.FC<CvApiDataProps> = (props) => <CvPage {...props} />;

export async function getStaticProps() {
  const [cv, personalInfo] = await Promise.all([
    Backend.fetch('cv'),
    Backend.fetch('personal-information'),
  ]);

  return {
    props: {
      cv,
      personalInfo,
    },
    revalidate: 1,
  };
}

export default Cv;
