import { ImageIcon } from '@raulmelo/ui';

export const detailedImageField = {
  type: `object`,
  name: `detailedImage`,
  title: `Image`,
  icon: () => <ImageIcon width={20} />,
  fields: [
    { type: `image`, name: `image`, title: `Image` },
    {
      type: `string`,
      name: `caption`,
      title: `Image caption`,
      description: `Text to be shown bellow the image`,
    },
    { type: `string`, name: `alt`, title: `Alternative Text` },
    { type: `number`, name: `customWidth` },
  ],
};
