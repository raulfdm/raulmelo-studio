import { DividerIcon, DotDivider } from '@raulmelo/ui';

export const dividerField = {
  name: `divider`,
  type: `object`,
  title: `Section Divider`,
  icon: () => <DividerIcon width={20} />,
  fields: [
    {
      initialValue: true,
      name: `hr`,
      type: `boolean`,
    },
  ],
  components: {
    preview: DotDivider,
  },
};
