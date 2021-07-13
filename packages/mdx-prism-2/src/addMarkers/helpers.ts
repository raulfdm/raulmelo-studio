import groupBy from 'lodash.groupby';
import type { Children, Hash, NodeWithLine } from '../types';
import type { AddMarkersOptions, Marker } from './types';

export function wrapLines(
  treeNodes: NodeWithLine[],
  markers: Marker[],
  options: AddMarkersOptions,
): Children {
  if (markers.length === 0 || treeNodes.length === 0) {
    return treeNodes;
  }

  const nodesByLine = groupBy(
    treeNodes,
    (node: NodeWithLine) => node.lineStart,
  );

  const newAst: NodeWithLine[] = [];

  const REGEX_BREAKLINE_CHAR = /\n\s*\w/gm;
  const WHITE_SPACE_REGEX = /\s/gm;

  Object.entries(nodesByLine).forEach(([line, nodes]) => {
    const wrapperFn = options.wrapLines
      ? wrapEverySingleLine
      : wrapOnlyHighlight;

    wrapperFn(nodes, line);
  });

  return newAst;

  function wrapEverySingleLine(nodes: NodeWithLine[], line: string): void {
    const lineNumber = parseInt(line);

    for (const node of nodes) {
      if (node.value?.match(REGEX_BREAKLINE_CHAR)) {
        node.value = node.value.replace(WHITE_SPACE_REGEX, '');
      }
    }
    newAst.push(wrapBatch(nodes, { line: lineNumber }, options));
  }

  function wrapOnlyHighlight(nodes: NodeWithLine[], line: string): void {
    const lineNumber = parseInt(line);

    if (options.markers.includes(lineNumber)) {
      for (const node of nodes) {
        if (node.value?.match(REGEX_BREAKLINE_CHAR)) {
          node.value = node.value.replace(WHITE_SPACE_REGEX, '');
        }
      }
      newAst.push(wrapBatch(nodes, { line: lineNumber }, options));
    } else {
      newAst.push(...nodes);
    }
  }
}

function wrapBatch(
  children: Children,
  marker: Marker,
  options: AddMarkersOptions,
) {
  // const className = options lineHighlight?.className || 'mdx-marker';
  const component = options.wrapperComponent || 'div';

  // TODO: fix here
  const className = '';

  const properties: Partial<Hash> = { ...options };

  delete properties.lineHighlight;
  delete properties.markers;

  return {
    type: 'element',
    tagName: component,
    properties: Object.assign({}, properties, { className }),
    children,
    lineStart: marker.line,
    lineEnd: children[children.length - 1].lineEnd,
    isMarker: true,
  };
}
