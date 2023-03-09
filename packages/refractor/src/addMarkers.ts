/** TODO: Fix any's
 *
 *
 * This code was copied from:
 * https://github.com/rexxars/react-refractor/blob/2a3476e55a4aaf979c7deec9f73babefcc9b7bbf/src/addMarkers.js
 */
import {
  type RefractorElement,
  type RefractorRoot,
  type Text,
} from 'refractor/lib/core';
import { filter } from 'unist-util-filter';
import { visitParents } from 'unist-util-visit-parents';

type RefractorRootChildren = RefractorRoot['children'];

type WithLineNumber = {
  lineStart?: number;
  lineEnd?: number;
};

type EnhancedRefractorNode = RefractorElement & WithLineNumber;

type EnhancedText = Text & WithLineNumber;

type Node = EnhancedRefractorNode | EnhancedText;
type Nodes = Node[];

function lineNumberify(
  ast: RefractorRootChildren,
  context = { lineNumber: 1 },
) {
  return ast.reduce(
    (result, node) => {
      const lineStart = context.lineNumber;

      if (node.type === `text`) {
        if (node.value.indexOf(`\n`) === -1) {
          const nextNode: EnhancedText = {
            ...node,
            lineStart,
            lineEnd: lineStart,
          };

          result.nodes.push(nextNode);

          return result;
        }

        const lines = node.value.split(`\n`);

        for (let i = 0; i < lines.length; i++) {
          const lineNum = i === 0 ? context.lineNumber : ++context.lineNumber;

          result.nodes.push({
            type: `text`,
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
        const [firstChild] = processed.nodes;
        const lastChild = processed.nodes[processed.nodes.length - 1];
        const nextNode: EnhancedRefractorNode = {
          ...node,
          lineStart: firstChild ? firstChild.lineStart : lineStart,
          lineEnd: lastChild ? lastChild.lineEnd : lineStart,
        };

        nextNode.children = processed.nodes;
        result.lineNumber = processed.lineNumber;
        result.nodes.push(nextNode);
        return result;
      }

      result.nodes.push(node);

      return result;
    },
    {
      nodes: [] as (EnhancedRefractorNode | EnhancedText)[],
      lineNumber: context.lineNumber,
    },
  );
}

function unwrapLine(markerLine: number, nodes: Nodes) {
  const tree = { type: `root`, children: nodes } as any;

  const headMap = new WeakMap();
  const lineMap = new WeakMap();
  const tailMap = new WeakMap();
  const cloned: Nodes = [];

  function addCopy(map: any, node: any, ancestors: any) {
    cloned.push(node);

    ancestors.forEach((ancestor: any) => {
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
      if (ancestor.children.indexOf(leaf) === -1) {
        ancestor.children.push(leaf);
      }
    }
  }

  visitParents(tree, (node: any, ancestors) => {
    if ('children' in node) {
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
  const filtered = filter(tree, (node: any) => cloned.indexOf(node) === -1);
  const getChildren = (map: any) => {
    const rootNode = map.get(tree);
    if (!rootNode) {
      return [];
    }

    visitParents(rootNode, (leaf, ancestors) => {
      if (leaf.children) {
        leaf.lineStart = 0;
        leaf.lineEnd = 0;
        return;
      }

      ancestors.forEach((ancestor) => {
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
    filtered ? filtered.children : [],
  );

  // headMap.clear();
  // lineMap.clear();
  // tailMap.clear();

  return merged;
}

function wrapBatch(children: any, marker: any, options: any) {
  const className = marker.className || `refractor-marker`;
  return {
    type: `element`,
    tagName: marker.component || `div`,
    properties: marker.component
      ? Object.assign({}, options, { className })
      : { className },
    children,
    lineStart: marker.line,
    lineEnd: children[children.length - 1].lineEnd,
    isMarker: true,
  };
}

function wrapLines(
  treeNodes: (EnhancedRefractorNode | EnhancedText)[],
  markers: Marker[],
  options: AddMarkersOptions,
) {
  if (markers.length === 0 || treeNodes.length === 0) {
    return treeNodes;
  }

  const ast = markers.reduce(
    (acc, marker) => unwrapLine(marker.line, acc),
    treeNodes,
  );

  // Container for the new AST
  const wrapped: any[] = [];

  // Note: Markers are already sorted by line number (ascending)
  let astIndex = 0;
  for (let m = 0; m < markers.length; m++) {
    const marker = markers[m];

    // Start by eating all AST nodes with line numbers up to the given marker
    for (
      let node = ast[astIndex] as any;
      node && node.lineEnd < marker.line;
      node = ast[++astIndex]
    ) {
      wrapped.push(node);
    }

    // Now proceed to find all _contiguous_ nodes on the same line
    const batch: any[] = [];

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

type AddMarkersOptions = {
  markers: number[];
};

type Marker = {
  line: number;
};

export function addMarkers(
  ast: RefractorRootChildren,
  options: AddMarkersOptions,
) {
  const markers = options.markers
    .map((marker) => ({ line: marker }))
    .sort((nodeA, nodeB) => nodeA.line - nodeB.line);

  const numbered = lineNumberify(ast).nodes;

  return wrapLines(numbered, markers, options);
}
