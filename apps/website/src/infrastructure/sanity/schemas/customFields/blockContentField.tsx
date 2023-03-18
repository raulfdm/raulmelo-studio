import { IconExternalLink, IconLink } from '@tabler/icons-react';
import { defineField } from 'sanity';

import { highlightMarkerField } from './highlightMarkerField';
import { strikeThroughMarkerField } from './strikeThroughMarkerField';

export const blockContentField = defineField({
  title: `Block Content`,
  name: `blockContent`,
  type: `array`,
  of: [
    {
      title: `Block`,
      type: `block`,
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: `Normal`, value: `normal` },
        {
          title: `H2`,
          value: `h2`,
        },
        {
          title: `H3`,
          value: `h3`,
        },
        {
          title: `H4`,
          value: `h4`,
        },
        {
          title: `H5`,
          value: `h5`,
        },
        {
          title: `H6`,
          value: `h6`,
        },
        { title: `Quote`, value: `blockquote` },
        {
          title: `Big Quote`,
          value: `bigQuote`,
          component: ({ children }) => (
            <blockquote className="text-2xl">{children}</blockquote>
          ),
        },
      ],
      lists: [
        { title: `Bullet`, value: `bullet` },
        { title: `Number`, value: `number` },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: `Strong`, value: `strong` },
          { title: `Emphasis`, value: `em` },
          strikeThroughMarkerField,
          highlightMarkerField,
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: `internalLink`,
            type: `object`,
            title: `Internal Link`,
            icon: () => <IconLink size={20} />,
            fields: [
              {
                name: `item`,
                type: `reference`,
                to: [
                  {
                    type: `post`,
                  },
                  {
                    type: `til`,
                  },
                ],
              },
            ],
          },
          {
            title: `URL`,
            name: `link`,
            type: `object`,
            icon: () => <IconExternalLink size={20} />,
            fields: [
              {
                title: `URL`,
                name: `href`,
                type: `url`,
              },
              {
                title: `Open in new window`,
                name: `blank`,
                type: `boolean`,
                initialValue: false,
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: `detailedImage`,
    },
    {
      type: `code`,
    },
    {
      type: `gif`,
    },
    {
      type: `youtubeVideo`,
    },
    {
      type: `tweet`,
    },
    {
      type: `codePen`,
    },
    {
      type: `imageSlider`,
    },
    {
      type: `divider`,
    },
  ],
});
