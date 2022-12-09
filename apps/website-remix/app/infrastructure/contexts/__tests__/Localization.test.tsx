import { getNextPathname } from '../Localization';

describe(`getNextPathname`, () => {
  it(`returns the same pathname if locale is the same`, () => {
    const pathname = `/pt/whatever`;
    const locale = `pt`;

    expect(getNextPathname(locale, pathname)).toBe(pathname);
  });

  it(`replaces the locale in the path name`, () => {
    const pathname = `/pt`;
    const locale = `en`;

    expect(getNextPathname(locale, pathname)).toBe(`/en`);
  });

  it(`replaces the locale in the path name (case 2)`, () => {
    const pathname = `/pt/whatever`;
    const locale = `en`;

    expect(getNextPathname(locale, pathname)).toBe(`/en/whatever`);
  });
});
