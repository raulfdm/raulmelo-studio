import tw, { styled } from 'twin.macro';

export const ProseContainer = styled.article`
  ${tw`prose dark:prose-dark`};
  ${tw`prose-lg md:prose-xl lg:prose-2xl`};
  ${tw`max-w-full`};
`;
