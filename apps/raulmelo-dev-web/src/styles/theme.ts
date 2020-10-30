import { SiteTheme } from '@types-app';

const fontFallback = {
  serif(font: string) {
    return `'${font}', serif`;
  },
  sansSerif(font: string) {
    return `'${font}', sans-serif;`;
  },
};

export const FONTS = {
  contentSans: 'Open Sans',
  contentSerif: 'Merriweather',
  contentTitle: 'content-title',
};

export const theme: SiteTheme = {
  isDarkTheme: false,
  font: {
    contentSans: fontFallback.sansSerif(FONTS.contentSans),
    contentSerif: fontFallback.serif(FONTS.contentSerif),
    contentTitle: fontFallback.serif(FONTS.contentTitle),
  },
  color: {
    background: 'var(--background)',
    font: 'var(--font)',
    fontMedium: 'var(--font-medium)',
    fontLight: 'var(--font-light)',
    border: 'var(--border)',
    shadow: 'var(--shadow)',
    shadowLight: 'var(--shadowLight)',
    shadowBright: 'var(--shadowBright)',
    shadowMenu: 'var(--shadowMenu)',
    infoBox: 'var(--infoBox)',
  },
  sizes: {
    menuBar: {
      height: '65px',
    },
  },
};
