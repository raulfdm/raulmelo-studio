import {
  SectionTitle,
  Section,
  SectionBody,
} from '@screens/CV/components/shared/Section';
import { CvApiData } from '@types-api';

type TechnicalSkillsProps = Pick<CvApiData, 'technical_skills'>;

export const TechnicalSkills = ({ technical_skills }: TechnicalSkillsProps) => {
  return (
    <Section>
      <SectionTitle>Technical Skills</SectionTitle>
      <SectionBody className="space-y-3">
        {technical_skills!.map((skill) => {
          const { id, technologies, name } = skill!;

          return (
            <div key={id} className="flex flex-col flex-wrap align-baseline">
              <h3 className="font-bold font-cv-serif text-xl">{name}:</h3>
              <ul className="flex-1 flex flex-row space-x-1 flex-wrap">
                {technologies!.map((tech, index) => {
                  const { id, name } = tech;
                  const isNotLast = index !== technologies.length - 1;
                  const separator = isNotLast ? ', ' : null;

                  return (
                    <li key={id!}>
                      {name}
                      {separator}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </SectionBody>
    </Section>
  );
};
