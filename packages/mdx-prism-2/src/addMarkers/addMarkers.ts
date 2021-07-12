// https://github.com/rexxars/react-refractor/blob/2ef6b5cd98a3af124aad8bd26b3888f1613a09df/src/addMarkers.js

import type { Children } from '../types';
import { Ast, Options, Marker, AstNode } from './types';

import { wrapLines } from './helpers';

export function addMarkers(ast: Ast, options: Options): Children {
  const markers = options.markers
    .map(transformMarkers)
    .sort(sortMarkersByLinesAsc);

  const { nodes: nodesWithLines } = lineNumberify(ast);

  return wrapLines(nodesWithLines, markers, options);
}

function transformMarkers(marker: Options['markers'][0]): Marker {
  const finalMarker =
    typeof marker === 'number'
      ? {
          line: marker,
        }
      : marker;

  return finalMarker;
}

function sortMarkersByLinesAsc(markerA: Marker, markerB: Marker): number {
  return markerA.line - markerB.line;
}

function lineNumberify(
  ast: Ast,
  context = { lineNumber: 1 },
): { nodes: AstNode[]; lineNumber: number } {
  const nodes = [];
  let currentLine = context.lineNumber;

  for (const node of ast) {
    if (node.type === 'text') {
      const isNodeValueABreakLine = node.value.indexOf('\n') !== -1;

      if (isNodeValueABreakLine) {
        const lines = node.value.split('\n');

        lines.forEach((line, index) => {
          /**
           * We want to start with `1` instead 0.
           */
          const lineNumber = index === 0 ? currentLine : ++currentLine;

          const nodeValue = index === lines.length - 1 ? line : `${line}\n`;

          nodes.push({
            type: 'text',
            value: nodeValue,
            lineStart: lineNumber,
            lineEnd: lineNumber,
          } as AstNode);
        });
      } else {
        node.lineStart = currentLine;
        node.lineEnd = currentLine;
      }
    } else if (node.children) {
      /**
       * Updating children recursively
       */
      const childrenWithNumber = lineNumberify(node.children, {
        lineNumber: currentLine,
      });

      const [firstChild] = childrenWithNumber.nodes;
      const lastChild =
        childrenWithNumber.nodes[childrenWithNumber.nodes.length - 1];

      node.lineStart = firstChild ? firstChild.lineStart : currentLine;
      node.lineEnd = lastChild ? lastChild.lineEnd : currentLine;

      node.children = childrenWithNumber.nodes;

      currentLine = childrenWithNumber.lineNumber;
    }

    nodes.push(node);
  }

  return {
    nodes,
    lineNumber: currentLine,
  };
}
