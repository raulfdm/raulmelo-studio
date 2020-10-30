import React from 'react';

import {
  SectionTitle,
  Section,
  SectionBody,
} from '@screens/CV/components/shared/Section';
import { CvApiData } from '@types-api';
import { Group, Skill, List, Title } from './styled';

type TechnicalSkillsProps = Pick<CvApiData, 'technical_skills'>;

export const TechnicalSkills = ({ technical_skills }: TechnicalSkillsProps) => {
  return (
    <Section>
      <SectionTitle>Technical Skills</SectionTitle>
      <SectionBody>
        {technical_skills!.map((skill) => {
          const { id, technologies, name } = skill!;

          return (
            <Group key={id!}>
              <Title>{name}</Title>
              <List>
                {technologies!.map((tech) => {
                  const { id, name } = tech!;
                  return <Skill key={id!}>{name}</Skill>;
                })}
              </List>
            </Group>
          );
        })}
      </SectionBody>
    </Section>
  );
};
