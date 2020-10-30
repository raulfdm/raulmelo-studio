import { styled } from '@screens/CV/styled';

export const CourseList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.4rem 0;
`;

export const DescriptionList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const DescriptionItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 0.3rem;
  }
`;
