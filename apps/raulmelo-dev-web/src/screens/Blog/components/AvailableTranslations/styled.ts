import { styled } from '@styles/styled';
import { Container } from '@components/Ui';

export const Wrapper = styled(Container)`
  margin-top: 1rem;
`;

export const Phrase = styled.p`
  margin: 0;
  padding: 1em;
  background-color: ${({ theme }) => theme.color.infoBox};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 0.75em;
  font-size: 14px;
`;
