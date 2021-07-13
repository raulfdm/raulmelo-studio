import type { MdxPrismOptions } from '../types';

type LineNumber = number;

export type Marker = {
  line: LineNumber;
};

export type UnsanitizedMarker = Marker | LineNumber;

export type AddMarkersOptions = MdxPrismOptions & {
  markers: Array<UnsanitizedMarker>;
};
