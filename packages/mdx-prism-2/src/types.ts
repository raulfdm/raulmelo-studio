/* eslint-disable @typescript-eslint/no-explicit-any */

import { Node as UnistNode, VisitorResult } from 'unist-util-visit';
import { Literal as UnistLiteral } from 'unist';

export type Visitor = (
  node: Node,
  index: number | null,
  parent: Parent | null,
) => VisitorResult;

// export type Children = Array<RefractorElement | Text>;

/**
 * Lib options
 */
export type MdxPrismOptions = {
  /**
   * If true it won't throw an error if the language is not supported.
   */
  ignoreMissing?: boolean;
  /**
   * Defines if every code line will be wrapped in an element
   */
  wrapLines?: boolean;
  /**
   * css class for the wrapper element (when `wrapLines` is true).
   * @example code-line
   * @default token-line
   */
  wrapperClassName?: string;
  /**
   * Component to use to wrap the highlighted code.
   * @example 'div' | 'pre' | 'p' | 'span'
   * @default div
   */
  wrapperComponent?: keyof HTMLElementTagNameMap;
  /**
   * css class to apply to the highlighted code.
   * @example highlight-line
   * @default mdx-marker
   */
  lineHighlightClassName?: string;
};

/**
 * Generic types
 */
export type Hash = { [key: string]: any };

export type MdxPrism2Visit = (tree: Node) => void;

export { VisitorResult } from 'unist-util-visit';

type LineMarker = {
  lineStart: number;
  lineEnd: number;
};

/**
 * Hast types
 */

export type Properties = Partial<Record<keyof HTMLElement, any>>;

export type Children = Node[];

export type Node = UnistNode & {
  properties?: Properties;
  [key: string]: any;
};

export type UnistHastNode = Node & {
  position: {
    start: { line: number; column: number; offset: number };
    end: { line: number; column: number; offset: number };
  };
};

export type UnistHastChildren = UnistHastNode[];

export type NodeWithLine = Node & LineMarker;

export type Parent = Node & {
  children: Children;
};

export type ParentWithLine = Parent & LineMarker;

export type Literal = UnistLiteral & {
  value: string;
};

export type Root = Parent & {
  type: 'root';
};

export type Element = Parent & {
  type: 'element';
  tagName: string;
  properties?: Hash;
  content?: Root;
  children: Array<Element | Comment | Text>;
};

export type Comment = Literal & {
  type: 'comment';
};

export type Text = Literal & {
  type: 'text';
};
