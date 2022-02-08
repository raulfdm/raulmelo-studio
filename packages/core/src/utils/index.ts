import * as imageUtils from './image';
import * as ramdaUtils from './ramda';
import * as utilities from './utilities';

export const utils = {
  ...utilities,
  ...ramdaUtils,
  ...imageUtils,
};
