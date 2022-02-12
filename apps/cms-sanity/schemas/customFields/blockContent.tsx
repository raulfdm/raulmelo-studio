import '@raulmelo/ui/dist/style.css?raw';

import {
  BigQuote,
  ExternalLinkIcon,
  H2,
  H3,
  H4,
  H5,
  H6,
  ImageIcon,
  LinkIcon,
} from '@raulmelo/ui';
import React from 'react';

import { memoizeAndRemoveStyle } from '../../utils/schema';
import { highlightMarker } from './highlightMarker';

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
        {
          title: 'H3',
          value: 'h3',
          blockEditor: {
            render: memoizeAndRemoveStyle(H3),
          },
        },
        {
          title: 'H4',
          value: 'h4',
          blockEditor: {
            render: memoizeAndRemoveStyle(H4),
          },
        },
        {
          title: 'H5',
          value: 'h5',
          blockEditor: {
            render: memoizeAndRemoveStyle(H5),
          },
        },
        {
          title: 'H6',
          value: 'h6',
          blockEditor: {
            render: memoizeAndRemoveStyle(H6),
          },
        },
        { title: 'Quote', value: 'blockquote' },
        {
          title: 'Big Quote',
          value: 'bigQuote',
          blockEditor: {
            render: memoizeAndRemoveStyle(BigQuote),
          },
        },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          highlightMarker,
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal Link',
            icon: () => <LinkIcon width={20} />,
            fields: [
              {
                name: 'item',
                type: 'reference',
                to: [
                  {
                    type: 'post',
                  },
                  {
                    type: 'til',
                  },
                ],
              },
            ],
          },
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            icon: () => <ExternalLinkIcon width={20} />,
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
              {
                title: 'Open in new window',
                name: 'blank',
                type: 'boolean',
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
      type: 'image',
      options: { hotspot: true },
      icon: () => <ImageIcon width={20} />,
    },
    {
      type: 'code',
    },
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
    {
      type: 'divider',
    },
  ],
};
