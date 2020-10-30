import { parseAcceptLanguage } from '../headers';

describe('fn: parseAcceptLanguage', () => {
  it('returns an array with all languages', () => {
    expect(
      parseAcceptLanguage('fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5'),
    ).toEqual(['fr', 'en', 'de', '*']);
  });

  it('remove languages without weight', () => {
    expect(
      parseAcceptLanguage('fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5'),
    ).toEqual(['fr', 'en', 'de', '*']);
  });
});
