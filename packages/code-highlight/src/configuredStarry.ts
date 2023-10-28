import { createStarryNight } from '@wooorm/starry-night';
import etc from '@wooorm/starry-night/etc';
import sourceGoMod from '@wooorm/starry-night/go.mod';
// @ts-ignore
import sourceAstro from '@wooorm/starry-night/source.astro';
import sourceCss from '@wooorm/starry-night/source.css';
import sourceDiff from '@wooorm/starry-night/source.diff';
import sourceGo from '@wooorm/starry-night/source.go';
import sourceGraphQL from '@wooorm/starry-night/source.graphql';
import sourceJs from '@wooorm/starry-night/source.js';
import sourceMiniYaml from '@wooorm/starry-night/source.miniyaml';
import sourceRegex from '@wooorm/starry-night/source.regexp';
import sourceRegexExtended from '@wooorm/starry-night/source.regexp.extended';
import sourceRegexPosix from '@wooorm/starry-night/source.regexp.posix';
import sourceRust from '@wooorm/starry-night/source.rust';
import sourceShell from '@wooorm/starry-night/source.shell';
import sourceSvelte from '@wooorm/starry-night/source.svelte';
import sourceSy from '@wooorm/starry-night/source.sy';
import sourceTs from '@wooorm/starry-night/source.ts';
import sourceTsx from '@wooorm/starry-night/source.tsx';
import textHtmlBasic from '@wooorm/starry-night/text.html.basic';
import sourceGfm from '@wooorm/starry-night/text.md';
import textXML from '@wooorm/starry-night/text.xml';
import textXMLSVG from '@wooorm/starry-night/text.xml.svg';

export const CODE_LANGUAGES_MAP = new Map<string, string>();

type StarryNight = Awaited<ReturnType<typeof createStarryNight>>;

export const starryNight: StarryNight = await createStarryNight([
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
