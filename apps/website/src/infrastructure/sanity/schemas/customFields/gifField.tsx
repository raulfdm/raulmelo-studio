import { defineField } from 'sanity';

import { GifIcon } from './Icons/GifIcon';

export const gifField = defineField({
  type: `object`,
  name: `gif`,
  title: `GIF`,
  icon: () => <GifIcon width={20} />,
  fields: [
    {
      name: `src`,
      type: `url`,
    },
    {
      name: `caption`,
      type: `string`,
    },
    {
      name: `width`,
      type: `number`,
    },
    {
      name: `height`,
      type: `number`,
    },
  ],
  components: {
    preview: ({ src, caption }: any) => {
      return <img src={src} alt={caption} />;
    },
  },
  preview: {
    select: {
      src: `src`,
      caption: `caption`,
      width: `width`,
      height: `height`,
    },
  },
});
