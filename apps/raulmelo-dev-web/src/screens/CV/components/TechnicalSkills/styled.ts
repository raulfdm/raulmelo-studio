import { styled } from '@screens/CV/styled';

export const Group = styled.div`
  flex-direction: column;
  padding: 2px 0;
  display: flex;
  align-items: baseline;
`;

export const Title = styled.h3`
  font-weight: bold;
  ::after {
    content: ':';
  }
`;

export const List = styled.ul``;

export const Skill = styled.li`
  &:not(:last-child) {
    ::after {
      content: ', ';
    }
  }
`;
