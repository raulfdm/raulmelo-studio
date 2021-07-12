import type { Node as UnistNode } from 'unist-util-visit-parents';
import type { MdxPrismOptions } from '../types';

export interface Node extends UnistNode {
  value: string;
  children?: Node[];
}

export type Ast = Node[];

type LineNumber = number;

export type Marker = {
  line: LineNumber;
};

export type Options = {
  markers: (Marker | LineNumber)[];
  lineHighlight?: MdxPrismOptions['lineHighlight'];
};
