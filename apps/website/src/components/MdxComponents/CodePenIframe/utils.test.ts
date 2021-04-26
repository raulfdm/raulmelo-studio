import { parseCodePenDirectUrl } from './utils';

describe('fn: parseCodePenDirectUrl', () => {
  it('keeps the same URL if it is already embed', () => {
    const url =
      'https://codepen.io/raulfdm/embed/VzmoRM?height=265&theme-id=light&default-tab=css,result';

    expect(parseCodePenDirectUrl(url)).toBe(url);
  });

  it('converts a direct URL into a embed one', () => {
    const url = 'https://codepen.io/raulfdm/pen/VzmoRM';

    const expected = 'https://codepen.io/raulfdm/embed/VzmoRM';

    expect(parseCodePenDirectUrl(url)).toBe(expected);
  });
});
