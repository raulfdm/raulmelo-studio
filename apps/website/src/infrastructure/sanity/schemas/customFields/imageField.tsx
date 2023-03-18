import { IconPhoto } from '@tabler/icons-react';

export const detailedImageField = {
  type: `object`,
  name: `detailedImage`,
  title: `Image`,
  icon: () => <IconPhoto size={20} />,
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
