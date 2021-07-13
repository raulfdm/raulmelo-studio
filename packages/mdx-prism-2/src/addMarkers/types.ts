import type { MdxPrismOptions, Node } from '../types';

type LineNumber = number;

export type Marker = {
  line: LineNumber;
};

export type UnsanitizedMarker = Marker | LineNumber;

export type AddMarkersOptions = MdxPrismOptions & {
  markers: Array<UnsanitizedMarker>;
};

export type NodeWithLine = Node & {
  lineStart: number;
  lineEnd: number;
};
