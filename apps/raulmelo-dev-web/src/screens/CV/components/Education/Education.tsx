import {
  Section,
  SectionTitle,
  SectionBody,
} from '@screens/CV/components/shared/Section';
import { RangeDate } from '@screens/CV/components/shared/RangeDate';
import { CvApiData } from '@types-api';

type Education = CvApiData['education'];

type EducationProps = {
  education: Education;
};

export const Education: React.FC<EducationProps> = ({ education }) => {
  const { formal, languages } = education!;

  return (
    <Section>
      <SectionTitle>Education and Languages</SectionTitle>
      <SectionBody className="space-y-1">
        <Formal formal={formal} />
        <Languages languages={languages!} />
      </SectionBody>
    </Section>
  );
};

function Languages({ languages }: Pick<Education, 'languages'>) {
  return (
    <ul className="flex flex-col space-y-1">
      {languages!.map((lang) => {
        const { id, name, proficiency } = lang!;
        return (
          <li key={id!}>
            {name} - {proficiency}
          </li>
        );
      })}
    </ul>
  );
}

function Formal({ formal }: Pick<Education, 'formal'>) {
  return (
    <ul className="flex flex-col space-y-1">
      {formal!.map((edu) => {
        const { start_date, end_date, foundation, id, is_actual, title } = edu!;

        return (
          <li key={id!}>
            <span className="inline font-bold">
              <RangeDate
                endDate={end_date}
                startDate={start_date}
                isActual={is_actual!}
              />
            </span>
            {' - '}
            <p className="inline">{`${title} - ${foundation}`}</p>
          </li>
        );
      })}
    </ul>
  );
}
