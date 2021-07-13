import nodeToString from 'hast-util-to-string';
import { refractor } from 'refractor/lib/all';
import rehype from 'rehype';
import parse from 'rehype-parse';
import { Ast } from 'src/addMarkers/types';
import unified from 'unified';
import { visit } from 'unist-util-visit';
import { addMarkers } from '../addMarkers';
import {
  Children,
  MdxPrism2Visit,
  MdxPrismOptions,
  Node,
  Parent,
  VisitorResult,
} from '../types';
import { extractClassInformationFromNode } from './helpers';

/**
 * This module walks through the node tree and does:
 * - get language class name (e.g. language-js) from the node
 * - parses the class and extracts the highlight lines directive and the language name
 * - tokenizes (transform code snippet and highlight) the code using refractor
 * - if line highlight (markers) are present then:
 *    - converts AST to HTML
 *    - then applies some fixes to make line highlighting work with JSX found here: https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-prismjs/src/directives.js#L113-L119
 *    - add markers using: https://github.com/rexxars/react-refractor/blob/master/src/addMarkers.js
 *    - converts the code back from HTML to AST
 *    - sets the updated code
 */

export function mdxPrismAttacher(
  options: MdxPrismOptions = {},
): MdxPrism2Visit {
  return function mdxPrism2Visit(tree: Node): void {
    visit(tree, 'element', visitor);
  };

  function visitor(
    node: Node,
    _index: number | null,
    parent: Parent | null,
  ): VisitorResult {
    if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
      return;
    }

    const classNameInfo = extractClassInformationFromNode(node);

    if (!classNameInfo) {
      return;
    }

    const { language, languageClassName, markers } = classNameInfo;

    let nextChildren: Children;

    /**
     * This try/catch prevents the throwing error when the language is not supported.
     * For those, if we pass option.ignoreMissing = true this error is just suppressed.
     */
    try {
      /**
       * Enforcing parent to have the language class, e.g.:
       * ['container','divider', 'language-css']
       *                          ^^^^^^^^^^^^
       */
      if (parent.properties) {
        const parentClassNames = parent.properties?.className || [];

        parent.properties.className = [...parentClassNames, languageClassName];
      }

      nextChildren = refractor.highlight(nodeToString(node), language)
        .children as Children;

      if (markers && markers.length > 0) {
        /**
         * This blocks attempts this fix:
         * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-prismjs/src/directives.js#L113-L119
         */
        const PLAIN_TEXT_WITH_LF_TEST =
          /<span class="token plain-text">[^<]*\n[^<]*<\/span>/g;

        const html_ = rehype()
          .stringify({ type: 'root', children: nextChildren })
          .toString()
          .replace(PLAIN_TEXT_WITH_LF_TEST, (match) =>
            match.replace(/\n/g, '</span>\n<span class="token plain-text">'),
          );

        const hast_ = unified()
          .use(parse, { emitParseErrors: true, fragment: true })
          .parse(html_);

        nextChildren = addMarkers(hast_.children as Ast, {
          markers,
          lineHighlight: options.lineHighlight,
        });
      }
    } catch (error) {
      /**
       * Only suppressing if it's unknown language
       */
      if (options.ignoreMissing && /unknown language/gi.test(error.message)) {
        return;
      }

      throw error;
    }

    node.children = nextChildren;
  }
}
