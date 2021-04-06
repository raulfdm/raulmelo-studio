import classNames from 'classnames';

export const sharedClasses = {
  baseContainer: 'max-w-7xl container mx-auto px-4 md:px-8',
  topSpaceForMenu: 'pt-24 md:pt-32',
  bottomSpace: 'pb-24 md:pb-32',
  get sectionContainer(): string {
    return classNames([
      sharedClasses.baseContainer,
      sharedClasses.bottomSpace,
      sharedClasses.topSpaceForMenu,
    ]);
  },
};
