import type { Node } from 'unist-util-visit-parents';
import type { MdxPrismOptions } from '../types';

export interface AstNode extends Node {
  value: string;
  children?: AstNode[];
}

export type Ast = AstNode[];

type LineNumber = number;

export type Marker = {
  line: LineNumber;
};

export type Options = {
  markers: (Marker | LineNumber)[];
  lineHighlight?: MdxPrismOptions['lineHighlight'];
};
