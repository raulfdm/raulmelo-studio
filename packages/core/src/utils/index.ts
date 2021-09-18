import * as ramdaUtils from './ramda';
import * as utilities from './utilities';

export * from './fetcher';

export const utils = {
  ...utilities,
  ...ramdaUtils,
};
