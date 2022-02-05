import Refractor from 'react-refractor';
import bash from 'refractor/lang/bash';
import css from 'refractor/lang/css';
import cssExtras from 'refractor/lang/css-extras';
import diff from 'refractor/lang/diff';
import js from 'refractor/lang/javascript';
import jsExtra from 'refractor/lang/js-extras';
import jsTemplate from 'refractor/lang/js-templates';
import json from 'refractor/lang/json';
import markdown from 'refractor/lang/markdown';
/**
 * markup is rss, svg, xml, html and others
 */
import markup from 'refractor/lang/markup';
import markupTemplate from 'refractor/lang/markup-templating';
import regex from 'refractor/lang/regex';
import rust from 'refractor/lang/rust';
import typescript from 'refractor/lang/typescript';
import yaml from 'refractor/lang/yaml';

Refractor.registerLanguage(bash);
Refractor.registerLanguage(css);
Refractor.registerLanguage(cssExtras);
Refractor.registerLanguage(diff);
Refractor.registerLanguage(js);
Refractor.registerLanguage(jsExtra);
Refractor.registerLanguage(json);
Refractor.registerLanguage(jsTemplate);
Refractor.registerLanguage(markdown);
Refractor.registerLanguage(markup);
Refractor.registerLanguage(markupTemplate);
Refractor.registerLanguage(regex);
Refractor.registerLanguage(rust);
Refractor.registerLanguage(typescript);
Refractor.registerLanguage(yaml);

export const ConfiguredRefractor = Refractor;
