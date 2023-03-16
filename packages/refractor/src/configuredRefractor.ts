import bash from 'refractor/lang/bash';
import css from 'refractor/lang/css';
import cssExtras from 'refractor/lang/css-extras';
import csv from 'refractor/lang/csv';
import diff from 'refractor/lang/diff';
import git from 'refractor/lang/git';
import go from 'refractor/lang/go';
import goModule from 'refractor/lang/go-module';
import graphql from 'refractor/lang/graphql';
import js from 'refractor/lang/javascript';
import jsExtra from 'refractor/lang/js-extras';
import json from 'refractor/lang/json';
import jsx from 'refractor/lang/jsx';
import markdown from 'refractor/lang/markdown';
/**
 * markup is rss, svg, xml, html and others
 */
import markup from 'refractor/lang/markup';
import markupTemplate from 'refractor/lang/markup-templating';
import regex from 'refractor/lang/regex';
import rust from 'refractor/lang/rust';
import tsx from 'refractor/lang/tsx';
import typescript from 'refractor/lang/typescript';
import yaml from 'refractor/lang/yaml';
import { refractor } from 'refractor/lib/core';

import svelte from './lang/svelte';

/**
 * For some reason, sanity pass me the "title" (e.g., Plain Text) of the language
 * instead its value (e.g. "plaintext").
 *
 * This map will help me to generate language list but also retrieve the value.
 */
export const CODE_LANGUAGES_MAP = new Map<string, string>();

CODE_LANGUAGES_MAP.set('Plain Text', 'plaintext');

refractor.register(bash);
CODE_LANGUAGES_MAP.set('Bash', 'bash');

refractor.register(css);
refractor.register(cssExtras);
CODE_LANGUAGES_MAP.set('CSS', 'css');

refractor.register(csv);
CODE_LANGUAGES_MAP.set('CSV', 'csv');

refractor.register(diff);
CODE_LANGUAGES_MAP.set('Diff', 'diff');

refractor.register(git);
CODE_LANGUAGES_MAP.set('Git', 'git');

refractor.register(go);
CODE_LANGUAGES_MAP.set('Go', 'go');

refractor.register(goModule);
CODE_LANGUAGES_MAP.set('Go Module', 'go-mod');

refractor.register(graphql);
CODE_LANGUAGES_MAP.set('GraphQL', 'graphql');

refractor.register(js);
refractor.register(jsExtra);
CODE_LANGUAGES_MAP.set('JavaScript', 'js');

refractor.register(json);
CODE_LANGUAGES_MAP.set('JSON', 'json');
/**
 * For some reason I'm having trouble with this one:
 * cannot read "source" property of undefined
 */
refractor.register(jsx);
CODE_LANGUAGES_MAP.set('JSX', 'jsx');

refractor.register(markdown);
CODE_LANGUAGES_MAP.set('Markdown', 'md');

refractor.register(markup);
refractor.register(markupTemplate);
CODE_LANGUAGES_MAP.set('HTML', 'html');
CODE_LANGUAGES_MAP.set('RSS', 'rss');
CODE_LANGUAGES_MAP.set('SVG', 'svg');
CODE_LANGUAGES_MAP.set('XML', 'xml');

refractor.register(regex);
CODE_LANGUAGES_MAP.set('Regex', 'regex');

refractor.register(rust);
CODE_LANGUAGES_MAP.set('Rust', 'rust');

refractor.register(svelte);
CODE_LANGUAGES_MAP.set('Svelte', 'svelte');

refractor.register(tsx);
CODE_LANGUAGES_MAP.set('TSX', 'tsx');

refractor.register(typescript);
CODE_LANGUAGES_MAP.set('TypeScript', 'ts');

refractor.register(yaml);
CODE_LANGUAGES_MAP.set('YAML', 'yaml');

export { refractor };
