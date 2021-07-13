import { filter } from 'unist-util-filter';
import { visitParents } from 'unist-util-visit-parents';
import type {
  Children,
  Hash,
  Root,
  NodeWithLine,
  ParentWithLine,
} from '../types';
import type { Marker, AddMarkersOptions } from './types';

export function wrapLines(
  treeNodes: NodeWithLine[],
  markers: Marker[],
  options: AddMarkersOptions,
): Children {
  if (markers.length === 0 || treeNodes.length === 0) {
    return treeNodes;
  }

  const ast = markers.reduce(
    (acc, marker) => unwrapLine(marker.line, acc),
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

function unwrapLine(markerLine: Marker['line'], nodes: NodeWithLine[]) {
  const tree = { type: 'root', children: nodes } as Root;

  const headMap = new Map<NodeWithLine | Root, NodeWithLine>();
  const lineMap = new Map<NodeWithLine | Root, NodeWithLine>();
  const tailMap = new Map<NodeWithLine | Root, NodeWithLine>();
  const cloned: Array<NodeWithLine> = [];

  type IMap = typeof headMap;

  visitParents(tree, (node, ancestors) => {
    if (node.children) {
      return;
    }
    const nodeWithLine = node as NodeWithLine;
    const ancestorsWithLine = ancestors as ParentWithLine[];

    // These nodes are on previous lines, but nested within the same structure
    if (nodeWithLine.lineStart < markerLine) {
      addCopy(headMap, nodeWithLine, ancestorsWithLine);
      return;
    }

    // These nodes are on the target line
    if (nodeWithLine.lineStart === markerLine) {
      addCopy(lineMap, nodeWithLine, ancestorsWithLine);
      return;
    }

    // If we have shared ancestors with some of the cloned elements,
    // create another tree of the remaining nodes
    if (
      nodeWithLine.lineEnd > markerLine &&
      cloned.some((clone) => ancestorsWithLine.indexOf(clone as any) !== -1)
    ) {
      addCopy(tailMap, nodeWithLine, ancestorsWithLine);
    }
  });

  // Get the remaining nodes - the ones who were not part of the same tree
  const filtered = filter(
    tree,
    (node) => cloned.indexOf(node as NodeWithLine) === -1,
  ) as NodeWithLine;

  function addCopy(map: IMap, node: NodeWithLine, ancestors: ParentWithLine[]) {
    cloned.push(node);

    ancestors.forEach((ancestor: Root) => {
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

  const getChildren = (map: IMap) => {
    const rootNode = map.get(tree);
    if (!rootNode) {
      return [];
    }

    visitParents(rootNode, (leaf, ancestors): void => {
      const leafWithLines = leaf as NodeWithLine;
      const ancestorsWithLines = ancestors as ParentWithLine[];

      if (leafWithLines.children) {
        leafWithLines.lineStart = 0;
        leafWithLines.lineEnd = 0;
        return;
      }

      ancestorsWithLines.forEach((ancestor) => {
        ancestor.lineStart = Math.max(
          ancestor.lineStart,
          (leaf as NodeWithLine).lineStart,
        );
        ancestor.lineEnd = Math.max(ancestor.lineEnd, leafWithLines.lineEnd);
      });
    });

    return rootNode.children;
  };

  const merged = [
    ...getChildren(headMap),
    ...getChildren(lineMap),
    ...getChildren(tailMap),
    ...(filtered?.children ?? []),
  ];

  headMap.clear();
  lineMap.clear();
  tailMap.clear();

  return merged;
}

function wrapBatch(
  children: Children,
  marker: Marker,
  options: AddMarkersOptions,
) {
  const className = options.lineHighlight?.className || 'mdx-marker';
  const component = options.lineHighlight?.component || 'div';

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
