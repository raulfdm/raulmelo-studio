import { createStarryNight } from '@wooorm/starry-night';

import etc from '@wooorm/starry-night/lang/etc';
import sourceAstro from '@wooorm/starry-night/lang/source.astro';
import sourceCss from '@wooorm/starry-night/lang/source.css.js';
import sourceDiff from '@wooorm/starry-night/lang/source.diff';
import sourceGfm from '@wooorm/starry-night/lang/source.gfm';
import sourceGo from '@wooorm/starry-night/lang/source.go';
import sourceGoMod from '@wooorm/starry-night/lang/go.mod';
import sourceGraphQL from '@wooorm/starry-night/lang/source.graphql';
import sourceJs from '@wooorm/starry-night/lang/source.js';
import sourceMiniYaml from '@wooorm/starry-night/lang/source.miniyaml';
import sourceRegex from '@wooorm/starry-night/lang/source.regexp';
import sourceRegexExtended from '@wooorm/starry-night/lang/source.regexp.extended';
import sourceRegexPosix from '@wooorm/starry-night/lang/source.regexp.posix';
import sourceRust from '@wooorm/starry-night/lang/source.rust';
import sourceShell from '@wooorm/starry-night/lang/source.shell';
import sourceSvelte from '@wooorm/starry-night/lang/source.svelte';
import sourceSy from '@wooorm/starry-night/lang/source.sy';
import sourceTs from '@wooorm/starry-night/lang/source.ts';
import sourceTsx from '@wooorm/starry-night/lang/source.tsx';
import textHtmlBasic from '@wooorm/starry-night/lang/text.html.basic';
import textXML from '@wooorm/starry-night/lang/text.xml';
import textXMLSVG from '@wooorm/starry-night/lang/text.xml.svg';

export const CODE_LANGUAGES_MAP = new Map<string, string>();

export const starryNight = await createStarryNight([
  etc,
  sourceAstro,
  sourceCss,
  sourceDiff,
  sourceGfm,
  sourceGo,
  sourceGoMod,
  sourceGraphQL,
  sourceJs,
  sourceMiniYaml,
  sourceRegex,
  sourceRegexExtended,
  sourceRegexPosix,
  sourceRust,
  sourceShell,
  sourceSvelte,
  sourceSy,
  sourceTs,
  sourceTsx,
  textHtmlBasic,
  textXML,
  textXMLSVG,
]);

CODE_LANGUAGES_MAP.set('Astro', 'astro'); // sourceAstro
CODE_LANGUAGES_MAP.set('Bash/Shell', 'bash'); // sourceShell
CODE_LANGUAGES_MAP.set('CSS', 'css'); // sourceCss
CODE_LANGUAGES_MAP.set('Diff', 'diff'); // sourceDiff
CODE_LANGUAGES_MAP.set('Go Module', 'go.mod'); // sourceGoMod
CODE_LANGUAGES_MAP.set('Go', 'go'); // sourceGo
CODE_LANGUAGES_MAP.set('GraphQL', 'graphql'); // sourceGraphQL
CODE_LANGUAGES_MAP.set('HTML', 'html'); // textHTMLBasic
CODE_LANGUAGES_MAP.set('JavaScript', 'js'); // sourceJS
CODE_LANGUAGES_MAP.set('JSON', 'jsonc'); // sourceJS
CODE_LANGUAGES_MAP.set('JSX', 'jsx'); // sourceJS
CODE_LANGUAGES_MAP.set('Markdown', 'md'); // sourceGfm
CODE_LANGUAGES_MAP.set('MDX', 'mdx'); // sourceGfm
CODE_LANGUAGES_MAP.set('RegEx', 'regex'); // sourceRegex
CODE_LANGUAGES_MAP.set('RSS', 'rss'); // textXML
CODE_LANGUAGES_MAP.set('Rust', 'rs'); // sourceRust
CODE_LANGUAGES_MAP.set('Svelte', 'svelte'); // sourceSvelte
CODE_LANGUAGES_MAP.set('SVG', 'svg'); // textXMLSVG
CODE_LANGUAGES_MAP.set('TSX', 'tsx'); // sourceTsx
CODE_LANGUAGES_MAP.set('TypeScript', 'ts'); // sourceTs
CODE_LANGUAGES_MAP.set('XML', 'xml'); // textXML
CODE_LANGUAGES_MAP.set('YAML', 'yaml'); // sourceMiniYaml
