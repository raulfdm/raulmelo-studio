import { styled } from '@screens/CV/styled';
import { CourseList } from '@screens/CV/components/shared/Ui';

export const Period = styled.p`
  display: inline;
  font-weight: bold;
  ::after {
    content: ' - ';
  }
`;

export const Company = styled.p`
  display: inline;
`;

export const StyledCourseList = styled(CourseList)`
  padding: 1rem 0;
`;
