import useMeasureHook from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer';

export const useMeasure = () => useMeasureHook({ polyfill: ResizeObserver });
