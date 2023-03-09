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
// import jsTemplate from 'refractor/lang/js-templates';
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

refractor.register(bash);
refractor.register(css);
refractor.register(cssExtras);
refractor.register(csv);
refractor.register(diff);
refractor.register(git);
refractor.register(go);
refractor.register(goModule);
refractor.register(graphql);
refractor.register(js);
refractor.register(jsExtra);
refractor.register(json);
/**
 * For some reason I'm having trouble with this one:
 * cannot read "source" property of undefined
 */
// refractor.register(jsTemplate);
refractor.register(jsx);
refractor.register(markdown);
refractor.register(markup);
refractor.register(markupTemplate);
refractor.register(regex);
refractor.register(rust);
// refractor.register(svelte);
refractor.register(tsx);
refractor.register(typescript);
refractor.register(yaml);

export { refractor };
