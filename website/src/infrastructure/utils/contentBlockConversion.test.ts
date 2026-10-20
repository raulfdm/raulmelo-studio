import type { PortableTextBlock } from '@portabletext/types';
import { createClient } from '@sanity/client';
import { describe, expect, it } from 'vitest';

import { mockAllBlocks } from './__fixtures__/allBlocks';
import { contentBlockToMarkdown } from './contentBlockToMarkdown';
import { contentBlockToRawText } from './contentBlockToRawText';

const blocks = mockAllBlocks as unknown as PortableTextBlock[];
const sanityClient = createClient({
  projectId: 'gc3hakk3',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: false,
});

describe('Portable Text conversion', () => {
  it('keeps custom image, code, and mark output in Markdown', async () => {
    const markdown = await contentBlockToMarkdown(blocks, { sanityClient });

    expect(markdown).toContain('![ssdf](https://cdn.sanity.io/images/');
    expect(markdown).toContain('```js\nconst foo\n```');
    expect(markdown).toContain('~~strikethrough~~');
    expect(markdown).toContain('`highlighted text`');
    expect(markdown).not.toContain('sdfdswr1');
  });

  it('keeps readable text while excluding embedded media and code', async () => {
    const text = await contentBlockToRawText(blocks);

    expect(text).toContain('Heading 2');
    expect(text).toContain('External Link');
    expect(text).not.toContain('const foo');
    expect(text).not.toContain('cdn.sanity.io');
  });
});
