import { contentBlockToMarkdown } from '../contentBlockToMarkdown';
import { mockAllBlocks, mockMarkdownParsed } from './__fixtures__/allBlocks';

describe('fn: contentBlockToMarkdown', () => {
  it('parses blocks to markdown', () => {
    expect(contentBlockToMarkdown(mockAllBlocks as never)).toBe(
      mockMarkdownParsed,
    );
  });
});
