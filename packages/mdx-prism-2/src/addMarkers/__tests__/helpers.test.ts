import { rehype } from 'rehype';

import { treeNodes } from '../__fixtures__/treeNodes';
import { wrapLines } from '../helpers';

describe('fn: wrapLines', () => {
  it('returns the same treeNodes if list of nodes is empty', () => {
    const result = wrapLines([], [{ line: 2 }, { line: 1 }], {
      markers: [1, 2],
    });

    expect(result).toEqual([]);
  });

  it('returns the same untouched treeNodes if markers are empty', () => {
    const result = wrapLines(treeNodes, [], {
      markers: [],
    });

    expect(result).toEqual(treeNodes);
  });

  it('wraps the marker line with a highlight element', () => {
    const result = wrapLines(treeNodes, [{ line: 2 }], {
      markers: [2],
    });

    const [, secondResult] = result;

    const nodesOnLineTwo = treeNodes.filter((n) => n.lineStart === 2);

    expect(secondResult.children).toEqual(nodesOnLineTwo);

    const renderedResult = rehype().stringify({
      type: 'root',
      children: result,
    });

    document.body.innerHTML = renderedResult;

    expect(document.querySelectorAll('.mdx-marker')).toHaveLength(1);
  });

  it('wraps the marker line with a highlight element (multiple lines)', () => {
    const result = wrapLines(
      treeNodes,
      [{ line: 1 }, { line: 2 }, { line: 4 }],
      {
        markers: [1, 2, 4],
      },
    );

    const [, secondResult] = result;

    const nodesOnLineTwo = treeNodes.filter((n) => n.lineStart === 2);

    expect(secondResult.children).toEqual(nodesOnLineTwo);

    const renderedResult = rehype().stringify({
      type: 'root',
      children: result,
    });

    document.body.innerHTML = renderedResult;

    expect(document.querySelectorAll('.mdx-marker')).toHaveLength(3);
  });

  it('renders wrapper with custom class', () => {
    const customClass = 'my-line-highlight';
    const result = wrapLines(
      treeNodes,
      [{ line: 1 }, { line: 2 }, { line: 4 }],
      {
        markers: [1, 2, 4],
        lineHighlight: {
          className: customClass,
        },
      },
    );

    const [, secondResult] = result;

    const nodesOnLineTwo = treeNodes.filter((n) => n.lineStart === 2);

    expect(secondResult.children).toEqual(nodesOnLineTwo);

    const renderedResult = rehype().stringify({
      type: 'root',
      children: result,
    });

    document.body.innerHTML = renderedResult;

    expect(document.getElementsByClassName(customClass)).toHaveLength(3);
    expect(document.getElementsByClassName('mdx-marker')).toHaveLength(0);
  });

  it('renders wrapper with custom tag', () => {
    const result = wrapLines(treeNodes, [{ line: 2 }], {
      markers: [2],
      lineHighlight: {
        component: 'span',
      },
    });

    const [, secondResult] = result;

    const nodesOnLineTwo = treeNodes.filter((n) => n.lineStart === 2);

    expect(secondResult.children).toEqual(nodesOnLineTwo);

    const renderedResult = rehype().stringify({
      type: 'root',
      children: result,
    });

    document.body.innerHTML = renderedResult;
    const [marker] = Array.from(document.getElementsByClassName('mdx-marker'));

    expect(marker.tagName).toBe('SPAN');
  });
});
