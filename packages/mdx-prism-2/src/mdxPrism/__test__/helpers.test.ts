import { extractClassInformationFromNode } from '../helpers';

describe('fn: extractClassInformationFromNode', () => {
  it('returns undefined if className does not exist', () => {
    const node = { properties: {} } as never;

    expect(extractClassInformationFromNode(node)).toBe(undefined);
  });

  it('returns undefined if className is empty', () => {
    const node = { properties: { className: [] } } as never;

    expect(extractClassInformationFromNode(node)).toBe(undefined);
  });

  it('extract all information from node className', () => {
    const node = { properties: { className: ['language-css'] } } as never;

    expect(extractClassInformationFromNode(node)).toEqual({
      language: 'css',
      languageClassName: 'language-css',
      markers: undefined,
      originalClassName: 'language-css',
    });
  });

  it('returns markers when present', () => {
    const node = {
      properties: { className: ['language-css{2,10,12-15}'] },
    } as never;

    expect(extractClassInformationFromNode(node)).toEqual({
      language: 'css',
      languageClassName: 'language-css',
      markers: [2, 10, 12, 13, 14, 15],
      originalClassName: 'language-css{2,10,12-15}',
    });
  });

  it('keeps the original class exactly as it is', () => {
    const node = {
      properties: { className: ['language-RUST{1}'] },
    } as never;

    expect(extractClassInformationFromNode(node)).toEqual({
      language: 'rust',
      languageClassName: 'language-rust',
      markers: [1],
      originalClassName: 'language-RUST{1}',
    });
  });
});
