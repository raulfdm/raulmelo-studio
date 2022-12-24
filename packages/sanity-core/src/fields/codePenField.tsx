import { CodePenIcon, CodePenIframe } from '@raulmelo/ui';

export const codePenField = {
  type: `object`,
  name: `codePen`,
  title: `CodePen`,
  icon: () => <CodePenIcon width={20} />,
  fields: [
    {
      name: `directUrl`,
      type: `url`,
      title: `CodePen URL`,
    },
    {
      name: `height`,
      type: `number`,
      title: `Iframe height`,
    },
  ],
  components: {
    component: CodePenIframe,
  },
  preview: {
    select: {
      directUrl: `directUrl`,
    },
  },
};
