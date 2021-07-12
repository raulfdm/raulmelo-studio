/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefractorElement } from 'refractor';
import { Node, Parent } from 'unist-util-visit';
import { VisitorResult } from 'unist-util-visit';

export { VisitorResult } from 'unist-util-visit';

export type Visitor = (
  node: Node,
  index: number | null,
  parent: Parent | null,
) => VisitorResult;

export type Children = Array<RefractorElement | Text>;

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

export type Hash = { [key: string]: any };

export type NodeWithProperties = Node & {
  properties: Hash;
};

export type ParentWithProperties = NodeWithProperties & {
  children: NodeWithProperties[];
};

export type MdxPrism2Visit = (tree: NodeWithProperties) => void;

export type ClassNames = string[];

export type ClassInformation = {
  originalClassName: string;
  language: string;
  languageClassName: string;
  markers: number[] | undefined;
};
