import { Global } from '@emotion/react';
import tw, { css } from 'twin.macro';

export const PrismStyles = () => <Global styles={prismStyles} />;

const prismStyles = css`
  html {
    --prism-black: #292a2b;
    --prism-yellow: #d9d336;
    --prism-orange: #ffb86c;
    --prism-gray-light: #e6e6e6;
    --prism-gray: #676b79;
    --prism-gray-dark: #5b5d5f;
    --prism-blue: #45a9f9;
    --prism-blue-green: #19f9d8;
    --prism-rosy: #ff75b5;
    --prism-pink: #ff4b82;
    --prism-font-family: 'Fira Code', 'Operator Mono', 'Source Sans Pro', Menlo,
      Monaco, Consolas, Courier New, monospace;
  }

  code[class*='language-'],
  pre[class*='language-'],
  .remark-code-title {
    background: var(--prism-black);
    color: var(--prism-gray-light);
    font-family: var(--prism-font-family);
    direction: ltr;
    white-space: pre;
    word-wrap: normal;
    word-spacing: normal;
    tab-size: 4;
    hyphens: none;

    ${tw`
      whitespace-pre
      w-full
      text-left
    `}
  }

  pre[class*='language-'] code {
    ${tw`relative float-left`}
  }

  pre[class*='language-'],
  :not(pre) > code[class*='language-'] {
    background: var(--prism-black);
  }

  pre[class*='language-'] {
    ${tw`p-4 pt-6 overflow-auto rounded relative`}
  }

  /* Inline code */

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    ${tw`italic`}
    color: var(--prism-gray);
  }

  .token.selector,
  .token.operator,
  .token.punctuation {
    color: var(--prism-gray-light);
  }

  .token.namespace {
    ${tw`opacity-70`}
  }

  .token.tag,
  .token.boolean {
    color: var(--prism-orange);
  }

  .token.atrule,
  .token.attr-value,
  .token.hex,
  .token.string {
    color: var(--prism-blue-green);
  }

  .token.property,
  .token.entity,
  .token.url,
  .token.attr-name,
  .token.keyword {
    color: var(--prism-rosy);
  }

  .token.regex {
    color: var(--prism-blue-green);
  }

  .token.function,
  .token.class-name {
    color: var(--prism-blue);
  }

  .token.constant {
    color: var(--prism-rosy);
  }

  .token.variable {
    color: var(--prism-rosy);
  }

  .token.number {
    color: var(--prism-blue-green);
  }

  .token.important,
  .token.deliminator {
    color: var(--prism-pink);
  }

  pre[data-line] {
    ${tw`relative py-4 pl-12`}
  }

  /* Line highlight */
  /* This class come from "mdx-prism" package and these styles are adapted
    to the way it's rendered.
    */
  .mdx-marker {
    ${tw`
      relative
      left-0
      right-0
      pointer-events-none
      whitespace-pre
      block
      -mx-8
      pl-3
      border-l-4
    `};
    line-height: inherit;
    background-color: var(--prism-gray-dark);
    border-color: var(--prism-rosy);
  }

  /* END Line highlight */

  .line-numbers-rows {
    margin: 0;
  }

  .line-numbers-rows span {
    padding-right: 10px;
    border-right: 3px var(--prism-yellow) solid;
  }

  /* Styles for File name */
  .remark-code-title {
    padding: 0.5rem 1rem;
    background-color: var(--prism-black);
    font-size: 0.75rem;
    border-bottom: 1px solid rgb(217, 215, 224, 0.2);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .remark-code-title + pre {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    margin-top: 0;
  }
  /* End:Styles for File name */

  /* Styles for Language label */
  pre[class*='language-']::before {
    background: #d9d7e0;
    border-radius: 0px 0px 4px 4px;
    color: #232129;
    font-size: 0.65rem;
    font-family: var(--prism-font-family);
    letter-spacing: 0.045em;
    line-height: 1;
    padding: 0.25rem 0.5rem;
    position: absolute;
    left: 1.5rem;
    text-align: right;
    text-transform: uppercase;
    top: 0px;
  }

  .remark-code-title + pre[class*='language-']::before {
    top: -1px;
  }

  pre[class='language-javascript']::before,
  pre[class='language-js']::before {
    content: 'js';
    background: #f7df1e;
  }

  pre[class='language-jsx']::before {
    content: 'jsx';
    background: #61dafb;
  }

  pre[class='language-typescript']::before,
  pre[class='language-ts']::before,
  pre[class='language-tsx']::before {
    content: 'ts';
    background: #294e80;
    color: white;
  }

  pre[class='language-tsx']::before {
    content: 'tsx';
  }

  pre[class='language-graphql']::before {
    content: 'GraphQL';
    background: #e10098;
    color: white;
  }

  pre[class='language-html']::before {
    content: 'html';
    background: #005a9c;
    color: white;
  }

  pre[class='language-css']::before {
    content: 'css';
    background: #ff9800;
    color: white;
  }

  pre[class='language-mdx']::before {
    content: 'mdx';
    background: #f9ac00;
    color: white;
  }

  pre[class='language-shell']::before {
    content: 'shell';
  }

  pre[class='language-sh']::before {
    content: 'sh';
  }

  pre[class='language-bash']::before {
    content: 'bash';
  }

  pre[class='language-yaml']::before,
  pre[class='language-yml']::before {
    content: 'yaml';
    background: #ffa8df;
  }

  pre[class='language-markdown']::before {
    content: 'md';
  }

  pre[class='language-json']::before,
  pre[class='language-json5']::before {
    content: 'json';
    background: linen;
  }

  pre[class='language-diff']::before {
    content: 'diff';
    background: #e6ffed;
  }

  pre[class='language-text']::before {
    content: 'text';
    background: white;
  }

  pre[class='language-flow']::before {
    content: 'flow';
    background: #e8bd36;
  }
`;
