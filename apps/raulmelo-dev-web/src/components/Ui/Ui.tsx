import { styled, media, css } from '@styles/styled';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

export const Container = styled(motion.div)`
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  height: 100%;

  ${media.greaterThan('medium')`
    padding: 0;
  `}
`;

export const headingLinkStyle = css`
  cursor: text;
  display: inline-block;
  position: relative;

  &:hover {
    .copy-title-icon:after {
      visibility: visible;
    }
  }

  .copy-title-icon {
    display: inline-block;
    position: absolute;
    right: -20px;
    top: -2px;
  }

  .copy-title-icon:after {
    content: url('/icons/anchor.svg');
    width: 20px;
    display: block;
    visibility: hidden;
    transition: visibility 0.2s ease-in-out;
  }
`;

const StyledTag = styled.li`
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.contentSans};
  border-radius: 2px;
  text-align: center;
  transition: font-weight 0.2s ease-in-out;

  &:hover {
    font-weight: bold;
  }

  > a {
    display: inline-block;
    margin-right: 16px;
    text-decoration: underline;
  }
`;

export const Tag: React.FC<{ tag: string; slug: string }> = ({ tag, slug }) => (
  <StyledTag>
    <Link href={slug}>
      <a>#{tag}</a>
    </Link>
  </StyledTag>
);
export const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;

  && {
    padding: 16px 0;
  }
`;
