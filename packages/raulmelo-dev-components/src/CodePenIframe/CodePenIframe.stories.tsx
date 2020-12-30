import React from 'react';

import { CodePenIframe } from '.';

export default {
  title: 'Mdx Components/CodePenIframe',
  component: CodePenIframe,
};

export const defaultCase = () => (
  <CodePenIframe src="https://codepen.io/raulfdm/embed/VzmoRM?height=350&theme-id=light&default-tab=css,result" />
);

export const withDirectUrl = () => (
  <CodePenIframe directUrl="https://codepen.io/raulfdm/pen/VzmoRM" />
);
