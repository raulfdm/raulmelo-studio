import React from 'react';

import classNames from 'classnames';

const sharedClasses = [
  'sans',
  'leading-snug' /* line-height: 1.375rem */,
  'tracking-normal' /* letter-spacing: 0em */,
];

type Font = {
  defaultComponent: React.ElementType;
  classes: string;
};

type FontVariant =
  | 'headline1'
  | 'headline2'
  | 'headline3'
  | 'headline4'
  | 'headline5'
  | 'headline6'
  | 'paragraph'
  | 'link';

type Fonts = {
  [font in FontVariant]: Font;
};

const fonts: Fonts = {
  headline1: {
    defaultComponent: 'h1',
    classes: classNames([sharedClasses, 'font-bold', 'text-[4.209rem]']),
  },
  headline2: {
    defaultComponent: 'h2',
    classes: classNames([sharedClasses, 'font-bold', 'text-[3.157rem]']),
  },
  headline3: {
    defaultComponent: 'h3',
    classes: classNames([sharedClasses, 'font-bold', 'text-[2.369rem]']),
  },
  headline4: {
    defaultComponent: 'h4',
    classes: classNames([sharedClasses, 'font-semi-bold', 'text-[1.777rem]']),
  },
  headline5: {
    defaultComponent: 'h5',
    classes: classNames([sharedClasses, 'font-bold', 'text-[1.333rem]']),
  },
  headline6: {
    defaultComponent: 'h6',
    classes: classNames([
      sharedClasses,
      'tracking-wider',
      'font-bold',
      'text-[1rem]',
    ]),
  },
  paragraph: {
    defaultComponent: 'p',
    classes: classNames([
      sharedClasses,
      'normal',
      'text-[1rem]',
      'leading-normal',
    ]),
  },
  link: {
    defaultComponent: 'a',
    get classes() {
      return classNames([fonts.paragraph.classes, 'underline']);
    },
  },
};

/**
 * TODO: implement more flexible and strict type
 * https://www.benmvp.com/blog/polymorphic-react-components-typescript/
 */
export type TypographyProps = {
  children: React.ReactNode;
  component?: React.ElementType;
  className?: string;
  variant: FontVariant;
} & Record<string, unknown>;

export const Typography = ({
  variant,
  component,
  children,
  className,
  ...props
}: TypographyProps) => {
  const { defaultComponent, classes } = fonts[variant];

  const Element = component ?? defaultComponent;

  return (
    <Element className={classNames([classes, className])} {...props}>
      {children}
    </Element>
  );
};
