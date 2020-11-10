import Img from 'next/image';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 1.58rem;
`;

type ImageProps = {
  width: string | number;
  height: string | number;
  src: string;
  alt: string;
};

export const Image: React.FC<ImageProps> = (props) => {
  return (
    <Wrapper>
      <Img {...props} />
    </Wrapper>
  );
};
