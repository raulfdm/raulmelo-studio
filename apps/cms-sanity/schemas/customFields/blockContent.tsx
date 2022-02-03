import '@raulmelo/ui/dist/style.css?raw';

import { BigQuote, DotDivider, H2 } from '@raulmelo/ui';

import { memoizeAndRemoveStyle } from '../../utils/schema';

export const blockContentField = {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        {
          title: 'H2',
          value: 'h2',
          blockEditor: {
            render: memoizeAndRemoveStyle(H2),
          },
        },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
        {
          title: 'Big Quote',
          value: 'big-quote',
          blockEditor: {
            render: memoizeAndRemoveStyle(BigQuote),
          },
        },
        {
          title: 'Divider',
          value: 'dotDivider',
          blockEditor: {
            render: DotDivider,
          },
        },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Bullet', value: 'bullet' },
        { title: 'Break', value: 'break' },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
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
      type: 'image',
      options: { hotspot: true },
    },
    {
      type: 'code',
    },
    /**
     * TODO:
     * - ImageSlider;
     * - hr
     */
    {
      type: 'gif',
    },
    {
      type: 'youtubeVideo',
    },
    {
      type: 'tweet',
    },
    {
      type: 'codePen',
    },
    {
      type: 'imageSlider',
    },
  ],
};
