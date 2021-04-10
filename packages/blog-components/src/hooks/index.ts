export * from './useCircularIndexes';
export * from './useControlled';

/**
 * To prevent the bundle gets bigger, any hook from react-use
 * should be exported from "lib" and them reused anywhere
 */
export { default as useClickAway } from 'react-use/lib/useClickAway';
