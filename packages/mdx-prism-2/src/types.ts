/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefractorElement } from 'refractor';
import {
  Node as UnistNode,
  // Parent as UnistParent,
  VisitorResult,
} from 'unist-util-visit';
import { Parent as UnistParent, Literal as UnistLiteral } from 'unist';

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
  ignoreMissing?: true;
  lineHighlight?: {
    /**
     * Component to use to wrap the highlighted code.
     * @example 'div' | 'pre' | 'p' | 'span'
     * @default div
     */
    component?: keyof HTMLElementTagNameMap;
    /**
     * css class to apply to the highlighted code.
     * @default mdx-marker
     */
    className?: string;
  };
};

/**
 * Generic types
 */
export type Hash = { [key: string]: any };

export type MdxPrism2Visit = (tree: Node) => void;

export { VisitorResult } from 'unist-util-visit';

/**
 * Hast types
 */

export type Properties = Partial<Record<keyof HTMLElement, any>>;

export type Children = Node[];

export type Node = UnistNode & {
  properties?: Properties;
  [key: string]: any;
};

export type Parent = Node & {
  children: Children;
};

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
