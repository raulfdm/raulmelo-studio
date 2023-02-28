import { Gif, GifIcon } from '@raulmelo/ui';

export const gifField = {
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
    preview: Gif,
  },
  preview: {
    select: {
      src: `src`,
      caption: `caption`,
      width: `width`,
      height: `height`,
    },
  },
};
