// https://github.com/rexxars/react-refractor/blob/2ef6b5cd98a3af124aad8bd26b3888f1613a09df/src/addMarkers.js
import { filter } from 'unist-util-filter';
import { visitParents, Node as UnistNode } from 'unist-util-visit-parents';
import { Children } from '../types';

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
};

export function addMarkers(ast: any, options: Options): Children {
  const markers = options.markers
    .map((marker) => {
      if (typeof marker === 'number') {
        return {
          line: marker,
        };
      }

      return marker;
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

function unwrapLine(markerLine: number[], nodes: Ast) {
  const tree: Partial<Node> = { type: 'root', children: nodes };

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

function wrapBatch(children: any, marker: any, options: any) {
  const className = marker.className || 'mdx-marker';
  return {
    type: 'element',
    tagName: marker.component || 'div',
    properties: marker.component
      ? Object.assign({}, options, { className })
      : { className },
    children,
    lineStart: marker.line,
    lineEnd: children[children.length - 1].lineEnd,
    isMarker: true,
  };
}

function wrapLines(treeNodes: any, markers: any, options: any) {
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
