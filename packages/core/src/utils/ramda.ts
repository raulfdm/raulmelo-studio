/**
 * For those modules we don't need to import with file extension.
 */
import Rhead from 'ramda/src/head';
import RisEmpty from 'ramda/src/isEmpty';
import RisNil from 'ramda/src/isNil';
import Rnot from 'ramda/src/not';
import Romit from 'ramda/src/omit';

export const isNil = RisNil;
export const not = Rnot;
export const head = Rhead;
export const isEmpty = RisEmpty;
export const omit = Romit;
