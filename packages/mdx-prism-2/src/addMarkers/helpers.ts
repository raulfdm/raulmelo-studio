import { filter } from 'unist-util-filter';
import { visitParents } from 'unist-util-visit-parents';

import { Hash } from '../types';
import { Ast, Marker, Node, Options } from './types';

export function wrapLines(treeNodes: any[], markers: Marker[], options: any) {
  if (markers.length === 0 || treeNodes.length === 0) {
    return treeNodes;
  }

  const ast = markers.reduce(
    (acc: any, marker: any) => unwrapLine(marker.line, acc),
    treeNodes,
  );

  // Container for the new AST
  const wrapped = [];

  // Note: Markers are already sorted by line number (ascending)
  let astIndex = 0;
  for (let m = 0; m < markers.length; m++) {
    const marker = markers[m];

    // Start by eating all AST nodes with line numbers up to the given marker
    for (
      let node = ast[astIndex];
      node && node.lineEnd < marker.line;
      node = ast[++astIndex]
    ) {
      wrapped.push(node);
    }

    // Now proceed to find all _contiguous_ nodes on the same line
    const batch = [];
    for (
      let node = ast[astIndex];
      node && node.lineEnd === marker.line;
      node = ast[++astIndex]
    ) {
      batch.push(node);
    }

    // Now add that batch, if we have anything
    if (batch.length > 0) {
      wrapped.push(wrapBatch(batch, marker, options));
    }
  }

  // Now add the remaining AST nodes
  while (astIndex < ast.length) {
    wrapped.push(ast[astIndex++]);
  }

  return wrapped;
}

function unwrapLine(markerLine: Marker['line'][], nodes: Ast) {
  const tree = { type: 'root', children: nodes } as Node;

  const headMap = new Map<Node, Node>();
  const lineMap = new Map<Node, Node>();
  const tailMap = new Map<Node, Node>();
  const cloned: Ast = [];

  type IMap = typeof headMap;

  function addCopy(map: IMap, node: Node, ancestors: Ast) {
    cloned.push(node);

    ancestors.forEach((ancestor) => {
      if (!map.has(ancestor)) {
        map.set(ancestor, Object.assign({}, ancestor, { children: [] }));

        if (ancestor !== tree) {
          cloned.push(ancestor);
        }
      }
    });

    let i = ancestors.length;
    while (i--) {
      const ancestor = map.get(ancestors[i]);
      const child = ancestors[i + 1];
      const leaf = map.get(child) || node;
      if (ancestor?.children?.indexOf(leaf) === -1) {
        ancestor.children.push(leaf);
      }
    }
  }

  visitParents(tree as Node, (node: any, ancestors: any) => {
    if (node.children) {
      return;
    }

    // These nodes are on previous lines, but nested within the same structure
    if (node.lineStart < markerLine) {
      addCopy(headMap, node, ancestors);
      return;
    }

    // These nodes are on the target line
    if (node.lineStart === markerLine) {
      addCopy(lineMap, node, ancestors);
      return;
    }

    // If we have shared ancestors with some of the cloned elements,
    // create another tree of the remaining nodes
    if (
      node.lineEnd > markerLine &&
      cloned.some((clone) => ancestors.indexOf(clone) !== -1)
    ) {
      addCopy(tailMap, node, ancestors);
    }
  });

  // Get the remaining nodes - the ones who were not part of the same tree
  const filtered = filter(
    tree as any,
    (node: any) => cloned.indexOf(node) === -1,
  );

  const getChildren = (map: any) => {
    const rootNode = map.get(tree as any);
    if (!rootNode) {
      return [];
    }

    visitParents(rootNode, (leaf: any, ancestors: any) => {
      if (leaf.children) {
        leaf.lineStart = 0;
        leaf.lineEnd = 0;
        return;
      }

      ancestors.forEach((ancestor: any) => {
        ancestor.lineStart = Math.max(ancestor.lineStart, leaf.lineStart);
        ancestor.lineEnd = Math.max(ancestor.lineEnd, leaf.lineEnd);
      });
    });

    return rootNode.children;
  };

  const merged = [].concat(
    getChildren(headMap),
    getChildren(lineMap),
    getChildren(tailMap),
    filtered ? (filtered as any).children : [],
  );

  headMap.clear();
  lineMap.clear();
  tailMap.clear();

  return merged;
}

function wrapBatch(children: any, marker: any, options: Options) {
  const className =
    marker.className || options.lineHighlight?.className || 'mdx-marker';
  const component =
    marker.component || options.lineHighlight?.component || 'div';

  const properties: Partial<Hash> = { ...options };

  delete properties.lineHighlight;
  delete properties.markers;

  return {
    type: 'element',
    tagName: component || 'div',
    properties: marker.component
      ? Object.assign({}, properties, { className })
      : { className },
    children,
    lineStart: marker.line,
    lineEnd: children[children.length - 1].lineEnd,
    isMarker: true,
  };
}
