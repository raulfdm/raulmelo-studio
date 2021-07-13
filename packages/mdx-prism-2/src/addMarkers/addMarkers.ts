// https://github.com/rexxars/react-refractor/blob/2ef6b5cd98a3af124aad8bd26b3888f1613a09df/src/addMarkers.js

import rehype from 'rehype';
import parse from 'rehype-parse';
import unified from 'unified';

import type { Children } from '../types';
import { wrapLines } from './helpers';
import type {
  AddMarkersOptions,
  Marker,
  UnsanitizedMarker,
  NodeWithLine,
} from './types';

export function addMarkers(
  children: Children,
  options: AddMarkersOptions,
): Children {
  /**
   * This blocks attempts this fix:
   * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-prismjs/src/directives.js#L113-L119
   */
  const PLAIN_TEXT_WITH_LF_TEST =
    /<span class="token plain-text">[^<]*\n[^<]*<\/span>/g;

  const html_ = rehype()
    .stringify({ type: 'root', children })
    .toString()
    .replace(PLAIN_TEXT_WITH_LF_TEST, (match) =>
      match.replace(/\n/g, '</span>\n<span class="token plain-text">'),
    );

  const hast_ = unified()
    .use(parse, { emitParseErrors: true, fragment: true })
    .parse(html_);

  const markers = options.markers
    .map(sanitizeMarkers)
    .sort(sortMarkersByLinesAsc);

  const { nodes: nodesWithLines } = lineNumberify(hast_.children as Children);

  return wrapLines(nodesWithLines, markers, options);
}

function sanitizeMarkers(marker: UnsanitizedMarker): Marker {
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
  ast: Children,
  context = { lineNumber: 1 },
): { nodes: NodeWithLine[]; lineNumber: number } {
  const nodes: NodeWithLine[] = [];
  let currentLine = context.lineNumber;

  for (const node of ast) {
    if (node.type === 'text') {
      const isNodeValueABreakLine = (node.value as string).indexOf('\n') !== -1;

      if (isNodeValueABreakLine) {
        const lines = (node.value as string).split('\n');

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
          });
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

      node.lineStart = firstChild ? firstChild?.lineStart : currentLine;
      node.lineEnd = lastChild ? lastChild.lineEnd : currentLine;

      node.children = childrenWithNumber.nodes;

      currentLine = childrenWithNumber.lineNumber;
    }

    nodes.push(node as NodeWithLine);
  }

  return {
    nodes,
    lineNumber: currentLine,
  };
}
