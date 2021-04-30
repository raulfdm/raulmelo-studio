import tw, { styled } from 'twin.macro';

export const Tags = styled.ul`
  ${tw`flex flex-row flex-wrap text-base`};
  > * {
    margin-right: 1rem;
  }
`;

export const Tag = styled.li`
  ${tw`
    font-sans text-center hover:font-bold
    cursor-default
    list-none
    text-secondary
  `};
`;
