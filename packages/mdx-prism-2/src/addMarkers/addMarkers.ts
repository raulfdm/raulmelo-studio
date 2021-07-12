// https://github.com/rexxars/react-refractor/blob/2ef6b5cd98a3af124aad8bd26b3888f1613a09df/src/addMarkers.js

import { Node as UnistNode } from 'unist-util-visit-parents';
import { Children, MdxPrismOptions } from '../types';
import { wrapLines } from './helpers';

interface Node extends UnistNode {
  value: string;
  children?: Node[];
}

type Ast = Node[];

type LineNumber = number;
type Marker = {
  line: number;
};

type Options = {
  markers: (Marker | LineNumber)[];
  lineHighlight?: MdxPrismOptions['lineHighlight'];
};

export function addMarkers(ast: any, options: Options): Children {
  const markers = options.markers
    .map((marker) => {
      const finalMarker =
        typeof marker === 'number'
          ? {
              line: marker,
            }
          : marker;

      return { ...finalMarker, ...options.lineHighlight };
    })
    .sort((nodeA: Marker, nodeB: Marker) => {
      return nodeA.line - nodeB.line;
    });

  const numbered = lineNumberify(ast).nodes;

  return wrapLines(numbered, markers, options);
}

function lineNumberify(ast: Ast, context = { lineNumber: 1 }) {
  return ast.reduce(
    (result, node) => {
      const lineStart = context.lineNumber;

      if (node.type === 'text') {
        if (node.value.indexOf('\n') === -1) {
          node.lineStart = lineStart;
          node.lineEnd = lineStart;
          result.nodes.push(node);
          return result;
        }

        const lines = node.value.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const lineNum = i === 0 ? context.lineNumber : ++context.lineNumber;
          result.nodes.push({
            type: 'text',
            value: i === lines.length - 1 ? lines[i] : `${lines[i]}\n`,
            lineStart: lineNum,
            lineEnd: lineNum,
          });
        }

        result.lineNumber = context.lineNumber;
        return result;
      }

      if (node.children) {
        const processed = lineNumberify(node.children, context);
        const firstChild = processed.nodes[0];
        const lastChild = processed.nodes[processed.nodes.length - 1];
        node.lineStart = firstChild ? firstChild.lineStart : lineStart;
        node.lineEnd = lastChild ? lastChild.lineEnd : lineStart;
        node.children = processed.nodes;
        result.lineNumber = processed.lineNumber;
        result.nodes.push(node);
        return result;
      }

      result.nodes.push(node);
      return result;
    },
    { nodes: [], lineNumber: context.lineNumber } as {
      nodes: Ast;
      lineNumber: number;
    },
  );
}
