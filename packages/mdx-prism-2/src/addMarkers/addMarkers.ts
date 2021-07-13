// https://github.com/rexxars/react-refractor/blob/2ef6b5cd98a3af124aad8bd26b3888f1613a09df/src/addMarkers.js

import rehype from 'rehype';
import parse from 'rehype-parse';
import unified from 'unified';

import type {
  Children,
  NodeWithLine,
  UnistHastChildren,
  UnistHastNode,
} from '../types';
import { wrapLines } from './helpers';
import type { AddMarkersOptions, Marker, UnsanitizedMarker } from './types';

export function addMarkers(
  children: Children,
  options: AddMarkersOptions,
): Children {
  const processedHtmlString = childrenToProcessedHtmlString(children);

  const hastChildren = processedHtmlToHastChildren(processedHtmlString);

  const markers = options.markers
    .map(sanitizeMarkers)
    .sort(sortMarkersByLinesAsc);

  const { nodes: nodesWithLines } = lineNumberify(hastChildren);

  return wrapLines(nodesWithLines, markers, options);
}

function processedHtmlToHastChildren(
  processedHtmlString: string,
): UnistHastNode[] {
  const hast = unified()
    .use(parse, { emitParseErrors: true, fragment: true })
    .parse(processedHtmlString);

  return hast.children as UnistHastNode[];
}

function childrenToProcessedHtmlString(children: Children): string {
  /**
   * This blocks attempts this fix:
   * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-prismjs/src/directives.js#L113-L119
   */
  const PLAIN_TEXT_WITH_LF_TEST =
    /<span class="token plain-text">[^<]*\n[^<]*<\/span>/g;

  return rehype()
    .stringify({ type: 'root', children })
    .toString()
    .replace(PLAIN_TEXT_WITH_LF_TEST, (match) =>
      match.replace(/\n/g, '</span>\n<span class="token plain-text">'),
    );
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

function lineNumberify(ast: UnistHastChildren): {
  nodes: NodeWithLine[];
} {
  const nodes: NodeWithLine[] = [];

  for (const node of ast) {
    const newNode = { ...node } as NodeWithLine;
    if (node.children) {
      const { nodes: childrenNodes } = lineNumberify(node.children);

      newNode.lineStart = childrenNodes[0].lineStart;
      newNode.lineEnd = childrenNodes[childrenNodes.length - 1].lineEnd;
    } else {
      newNode.lineStart = node.position.start.line;
      newNode.lineEnd = node.position.end.line;
    }

    nodes.push(newNode);
  }

  return {
    nodes,
  };
}
