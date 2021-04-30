import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProseContainer } from '.';

describe('<ProseContainer />', () => {
  it('matches snapshot', () => {
    render(<ProseContainer>hey</ProseContainer>);

    expect(screen.getByRole('article')).toMatchInlineSnapshot(`
      .emotion-0 {
        font-size: 1rem;
        line-height: 1.75;
        color: var(--primary);
        max-width: 65ch;
        font-size: 1.125rem;
        line-height: 1.7777778;
        max-width: 100%;
      }

      .emotion-0 p {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .emotion-0 a {
        color: var(--secondary);
        -webkit-text-decoration: underline;
        text-decoration: underline;
        font-weight: 500;
      }

      .emotion-0 h6 {
        font-weight: 800;
        color: var(--primary);
      }

      .emotion-0 h5 {
        font-weight: 800;
        color: var(--primary);
      }

      .emotion-0 li {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .emotion-0 ul {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .emotion-0 ol {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .emotion-0 h4 {
        color: var(--primary);
        font-weight: 800;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .emotion-0 h3 {
        color: var(--primary);
        font-weight: 800;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .emotion-0 h2 {
        color: var(--primary);
        font-weight: 800;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .emotion-0 h1 {
        color: var(--primary);
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .emotion-0 hr {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .emotion-0 img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .emotion-0 pre {
        color: #e5e7eb;
        background-color: #1f2937;
        overflow-x: auto;
        font-size: 0.875em;
        line-height: 1.7142857;
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
        border-radius: 0.375rem;
        padding-top: 0.8571429em;
        padding-right: 1.1428571em;
        padding-bottom: 0.8571429em;
        padding-left: 1.1428571em;
      }

      .emotion-0 code {
        color: var(--secondary);
        font-weight: 600;
        font-size: 0.875em;
      }

      .emotion-0 video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .emotion-0 thead {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .emotion-0 table {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .emotion-0 h4+* {
        margin-top: 0;
      }

      .emotion-0 h3+* {
        margin-top: 0;
      }

      .emotion-0 h2+* {
        margin-top: 0;
      }

      .emotion-0 hr+* {
        margin-top: 0;
      }

      .emotion-0 figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .emotion-0 a code {
        color: #111827;
      }

      .emotion-0 strong {
        color: var(--secondary);
        font-weight: 600;
      }

      .emotion-0 h3 code {
        font-size: 0.9em;
      }

      .emotion-0 h2 code {
        font-size: 0.875em;
      }

      .emotion-0 ul>li {
        position: relative;
        padding-left: 1.75em;
      }

      .emotion-0 ol>li {
        position: relative;
        padding-left: 1.75em;
      }

      .emotion-0 tbody td {
        vertical-align: top;
        padding-top: 0.5714286em;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .emotion-0 tbody tr {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .emotion-0 thead th {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .emotion-0 pre code {
        background-color: transparent;
        border-width: 0;
        border-radius: 0;
        padding: 0;
        font-weight: 400;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
      }

      .emotion-0 figure>* {
        margin-top: 0;
        margin-bottom: 0;
      }

      .emotion-0 blockquote {
        font-weight: 900;
        font-style: italic;
        color: #111827;
        border-left-width: 0.25rem;
        border-left-color: var(--secondary);
        quotes: "\\201C""\\201D""\\2018""\\2019";
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1em;
      }

      .emotion-0>ul>li p {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .emotion-0 code::after {
        content: "\`";
      }

      .emotion-0 code::before {
        content: "\`";
      }

      .emotion-0 ol[type="1"] {
        --list-counter-style: decimal;
      }

      .emotion-0 ol[type="i"] {
        --list-counter-style: lower-roman;
      }

      .emotion-0 ol[type="I"] {
        --list-counter-style: upper-roman;
      }

      .emotion-0 ol[type="a"] {
        --list-counter-style: lower-alpha;
      }

      .emotion-0 ol[type="A"] {
        --list-counter-style: upper-alpha;
      }

      .emotion-0>:last-child {
        margin-bottom: 0;
      }

      .emotion-0>:first-child {
        margin-top: 0;
      }

      .emotion-0 ol[type="i s"] {
        --list-counter-style: lower-roman;
      }

      .emotion-0 ol[type="I s"] {
        --list-counter-style: upper-roman;
      }

      .emotion-0 ol[type="a s"] {
        --list-counter-style: lower-alpha;
      }

      .emotion-0 ol[type="A s"] {
        --list-counter-style: upper-alpha;
      }

      .emotion-0 pre code::after {
        content: none;
      }

      .emotion-0 ul>li::before {
        content: "";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .emotion-0 ol>li::before {
        content: counter(list-item, var(--list-counter-style, decimal)) ".";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .emotion-0 [class~="lead"] {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .emotion-0 pre code::before {
        content: none;
      }

      .emotion-0 figure figcaption {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .emotion-0 tbody td:last-child {
        padding-right: 0;
      }

      .emotion-0 thead th:last-child {
        padding-right: 0;
      }

      .emotion-0 tbody tr:last-child {
        border-bottom-width: 0;
      }

      .emotion-0 tbody td:first-child {
        padding-left: 0;
      }

      .emotion-0 thead th:first-child {
        padding-left: 0;
      }

      .emotion-0>ol>li>*:last-child {
        margin-bottom: 1.25em;
      }

      .emotion-0>ul>li>*:last-child {
        margin-bottom: 1.25em;
      }

      .emotion-0>ol>li>*:first-child {
        margin-top: 1.25em;
      }

      .emotion-0>ul>li>*:first-child {
        margin-top: 1.25em;
      }

      .emotion-0 blockquote p:last-of-type::after {
        content: close-quote;
      }

      .emotion-0 blockquote p:first-of-type::before {
        content: open-quote;
      }

      .emotion-0 ul ul {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .emotion-0 ul ol {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .emotion-0 ol ul {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .emotion-0 ol ol {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .dark .emotion-0 blockquote {
        color: #e5e7eb;
      }

      .dark .emotion-0 figure figcaption {
        color: #e5e7eb;
      }

      .emotion-0 p {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .emotion-0 hr {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .emotion-0 li {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .emotion-0 ul {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .emotion-0 ol {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .emotion-0 h4 {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .emotion-0 h3 {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .emotion-0 h2 {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .emotion-0 h1 {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .emotion-0 pre {
        font-size: 0.8888889em;
        line-height: 1.75;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.375rem;
        padding-top: 1em;
        padding-right: 1.5em;
        padding-bottom: 1em;
        padding-left: 1.5em;
      }

      .emotion-0 img {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .emotion-0 code {
        font-size: 0.8888889em;
      }

      .emotion-0 table {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .emotion-0 video {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .emotion-0 h4+* {
        margin-top: 0;
      }

      .emotion-0 h3+* {
        margin-top: 0;
      }

      .emotion-0 h2+* {
        margin-top: 0;
      }

      .emotion-0 hr+* {
        margin-top: 0;
      }

      .emotion-0 figure {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .emotion-0 ul>li {
        padding-left: 1.6666667em;
      }

      .emotion-0 ol>li {
        padding-left: 1.6666667em;
      }

      .emotion-0 h3 code {
        font-size: 0.875em;
      }

      .emotion-0 h2 code {
        font-size: 0.8666667em;
      }

      .emotion-0 tbody td {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .emotion-0 thead th {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .emotion-0 figure>* {
        margin-top: 0;
        margin-bottom: 0;
      }

      .emotion-0 blockquote {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .emotion-0>ul>li p {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .emotion-0>:last-child {
        margin-bottom: 0;
      }

      .emotion-0>:first-child {
        margin-top: 0;
      }

      .emotion-0 ul>li::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .emotion-0 ol>li::before {
        left: 0;
      }

      .emotion-0 [class~="lead"] {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .emotion-0 figure figcaption {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .emotion-0 tbody td:last-child {
        padding-right: 0;
      }

      .emotion-0 thead th:last-child {
        padding-right: 0;
      }

      .emotion-0 tbody td:first-child {
        padding-left: 0;
      }

      .emotion-0 thead th:first-child {
        padding-left: 0;
      }

      .emotion-0>ol>li>*:last-child {
        margin-bottom: 1.3333333em;
      }

      .emotion-0>ul>li>*:last-child {
        margin-bottom: 1.3333333em;
      }

      .emotion-0>ol>li>*:first-child {
        margin-top: 1.3333333em;
      }

      .emotion-0>ul>li>*:first-child {
        margin-top: 1.3333333em;
      }

      .emotion-0 ul ul {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .emotion-0 ul ol {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .emotion-0 ol ul {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .emotion-0 ol ol {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      @media (min-width: 768px) {
        .emotion-0 {
          font-size: 1.25rem;
          line-height: 1.8;
        }

        .emotion-0 p {
          margin-top: 1.2em;
          margin-bottom: 1.2em;
        }

        .emotion-0 hr {
          margin-top: 2.8em;
          margin-bottom: 2.8em;
        }

        .emotion-0 li {
          margin-top: 0.6em;
          margin-bottom: 0.6em;
        }

        .emotion-0 ul {
          margin-top: 1.2em;
          margin-bottom: 1.2em;
        }

        .emotion-0 ol {
          margin-top: 1.2em;
          margin-bottom: 1.2em;
        }

        .emotion-0 h4 {
          margin-top: 1.8em;
          margin-bottom: 0.6em;
          line-height: 1.6;
        }

        .emotion-0 h3 {
          font-size: 1.5em;
          margin-top: 1.6em;
          margin-bottom: 0.6666667em;
          line-height: 1.3333333;
        }

        .emotion-0 h2 {
          font-size: 1.8em;
          margin-top: 1.5555556em;
          margin-bottom: 0.8888889em;
          line-height: 1.1111111;
        }

        .emotion-0 h1 {
          font-size: 2.8em;
          margin-top: 0;
          margin-bottom: 0.8571429em;
          line-height: 1;
        }

        .emotion-0 pre {
          font-size: 0.9em;
          line-height: 1.7777778;
          margin-top: 2em;
          margin-bottom: 2em;
          border-radius: 0.5rem;
          padding-top: 1.1111111em;
          padding-right: 1.3333333em;
          padding-bottom: 1.1111111em;
          padding-left: 1.3333333em;
        }

        .emotion-0 img {
          margin-top: 2em;
          margin-bottom: 2em;
        }

        .emotion-0 code {
          font-size: 0.9em;
        }

        .emotion-0 table {
          font-size: 0.9em;
          line-height: 1.5555556;
        }

        .emotion-0 video {
          margin-top: 2em;
          margin-bottom: 2em;
        }

        .emotion-0 h4+* {
          margin-top: 0;
        }

        .emotion-0 h3+* {
          margin-top: 0;
        }

        .emotion-0 h2+* {
          margin-top: 0;
        }

        .emotion-0 hr+* {
          margin-top: 0;
        }

        .emotion-0 figure {
          margin-top: 2em;
          margin-bottom: 2em;
        }

        .emotion-0 ul>li {
          padding-left: 1.8em;
        }

        .emotion-0 ol>li {
          padding-left: 1.8em;
        }

        .emotion-0 h3 code {
          font-size: 0.9em;
        }

        .emotion-0 h2 code {
          font-size: 0.8611111em;
        }

        .emotion-0 tbody td {
          padding-top: 0.8888889em;
          padding-right: 0.6666667em;
          padding-bottom: 0.8888889em;
          padding-left: 0.6666667em;
        }

        .emotion-0 thead th {
          padding-right: 0.6666667em;
          padding-bottom: 0.8888889em;
          padding-left: 0.6666667em;
        }

        .emotion-0 figure>* {
          margin-top: 0;
          margin-bottom: 0;
        }

        .emotion-0 blockquote {
          margin-top: 1.6em;
          margin-bottom: 1.6em;
          padding-left: 1.0666667em;
        }

        .emotion-0>ul>li p {
          margin-top: 0.8em;
          margin-bottom: 0.8em;
        }

        .emotion-0>:last-child {
          margin-bottom: 0;
        }

        .emotion-0>:first-child {
          margin-top: 0;
        }

        .emotion-0 ul>li::before {
          width: 0.35em;
          height: 0.35em;
          top: calc(0.9em - 0.175em);
          left: 0.25em;
        }

        .emotion-0 ol>li::before {
          left: 0;
        }

        .emotion-0 [class~="lead"] {
          font-size: 1.2em;
          line-height: 1.5;
          margin-top: 1em;
          margin-bottom: 1em;
        }

        .emotion-0 figure figcaption {
          font-size: 0.9em;
          line-height: 1.5555556;
          margin-top: 1em;
        }

        .emotion-0 tbody td:last-child {
          padding-right: 0;
        }

        .emotion-0 thead th:last-child {
          padding-right: 0;
        }

        .emotion-0 tbody td:first-child {
          padding-left: 0;
        }

        .emotion-0 thead th:first-child {
          padding-left: 0;
        }

        .emotion-0>ol>li>*:last-child {
          margin-bottom: 1.2em;
        }

        .emotion-0>ul>li>*:last-child {
          margin-bottom: 1.2em;
        }

        .emotion-0>ol>li>*:first-child {
          margin-top: 1.2em;
        }

        .emotion-0>ul>li>*:first-child {
          margin-top: 1.2em;
        }

        .emotion-0 ul ul {
          margin-top: 0.8em;
          margin-bottom: 0.8em;
        }

        .emotion-0 ul ol {
          margin-top: 0.8em;
          margin-bottom: 0.8em;
        }

        .emotion-0 ol ul {
          margin-top: 0.8em;
          margin-bottom: 0.8em;
        }

        .emotion-0 ol ol {
          margin-top: 0.8em;
          margin-bottom: 0.8em;
        }
      }

      @media (min-width: 1024px) {
        .emotion-0 {
          font-size: 1.5rem;
          line-height: 1.6666667;
        }

        .emotion-0 p {
          margin-top: 1.3333333em;
          margin-bottom: 1.3333333em;
        }

        .emotion-0 hr {
          margin-top: 3em;
          margin-bottom: 3em;
        }

        .emotion-0 li {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }

        .emotion-0 ul {
          margin-top: 1.3333333em;
          margin-bottom: 1.3333333em;
        }

        .emotion-0 ol {
          margin-top: 1.3333333em;
          margin-bottom: 1.3333333em;
        }

        .emotion-0 h4 {
          margin-top: 1.6666667em;
          margin-bottom: 0.6666667em;
          line-height: 1.5;
        }

        .emotion-0 h3 {
          font-size: 1.5em;
          margin-top: 1.5555556em;
          margin-bottom: 0.6666667em;
          line-height: 1.2222222;
        }

        .emotion-0 h2 {
          font-size: 2em;
          margin-top: 1.5em;
          margin-bottom: 0.8333333em;
          line-height: 1.0833333;
        }

        .emotion-0 h1 {
          font-size: 2.6666667em;
          margin-top: 0;
          margin-bottom: 0.875em;
          line-height: 1;
        }

        .emotion-0 pre {
          font-size: 0.8333333em;
          line-height: 1.8;
          margin-top: 2em;
          margin-bottom: 2em;
          border-radius: 0.5rem;
          padding-top: 1.2em;
          padding-right: 1.6em;
          padding-bottom: 1.2em;
          padding-left: 1.6em;
        }

        .emotion-0 img {
          margin-top: 2em;
          margin-bottom: 2em;
        }

        .emotion-0 code {
          font-size: 0.8333333em;
        }

        .emotion-0 table {
          font-size: 0.8333333em;
          line-height: 1.4;
        }

        .emotion-0 video {
          margin-top: 2em;
          margin-bottom: 2em;
        }

        .emotion-0 h4+* {
          margin-top: 0;
        }

        .emotion-0 h3+* {
          margin-top: 0;
        }

        .emotion-0 h2+* {
          margin-top: 0;
        }

        .emotion-0 hr+* {
          margin-top: 0;
        }

        .emotion-0 figure {
          margin-top: 2em;
          margin-bottom: 2em;
        }

        .emotion-0 ul>li {
          padding-left: 1.6666667em;
        }

        .emotion-0 ol>li {
          padding-left: 1.6666667em;
        }

        .emotion-0 h3 code {
          font-size: 0.8888889em;
        }

        .emotion-0 h2 code {
          font-size: 0.875em;
        }

        .emotion-0 tbody td {
          padding-top: 0.8em;
          padding-right: 0.6em;
          padding-bottom: 0.8em;
          padding-left: 0.6em;
        }

        .emotion-0 thead th {
          padding-right: 0.6em;
          padding-bottom: 0.8em;
          padding-left: 0.6em;
        }

        .emotion-0 figure>* {
          margin-top: 0;
          margin-bottom: 0;
        }

        .emotion-0 blockquote {
          margin-top: 1.7777778em;
          margin-bottom: 1.7777778em;
          padding-left: 1.1111111em;
        }

        .emotion-0>ul>li p {
          margin-top: 0.8333333em;
          margin-bottom: 0.8333333em;
        }

        .emotion-0>:last-child {
          margin-bottom: 0;
        }

        .emotion-0>:first-child {
          margin-top: 0;
        }

        .emotion-0 ul>li::before {
          width: 0.3333333em;
          height: 0.3333333em;
          top: calc(0.8333333em - 0.1666667em);
          left: 0.25em;
        }

        .emotion-0 ol>li::before {
          left: 0;
        }

        .emotion-0 [class~="lead"] {
          font-size: 1.25em;
          line-height: 1.4666667;
          margin-top: 1.0666667em;
          margin-bottom: 1.0666667em;
        }

        .emotion-0 figure figcaption {
          font-size: 0.8333333em;
          line-height: 1.6;
          margin-top: 1em;
        }

        .emotion-0 tbody td:last-child {
          padding-right: 0;
        }

        .emotion-0 thead th:last-child {
          padding-right: 0;
        }

        .emotion-0 tbody td:first-child {
          padding-left: 0;
        }

        .emotion-0 thead th:first-child {
          padding-left: 0;
        }

        .emotion-0>ol>li>*:last-child {
          margin-bottom: 1.3333333em;
        }

        .emotion-0>ul>li>*:last-child {
          margin-bottom: 1.3333333em;
        }

        .emotion-0>ol>li>*:first-child {
          margin-top: 1.3333333em;
        }

        .emotion-0>ul>li>*:first-child {
          margin-top: 1.3333333em;
        }

        .emotion-0 ul ul {
          margin-top: 0.6666667em;
          margin-bottom: 0.6666667em;
        }

        .emotion-0 ul ol {
          margin-top: 0.6666667em;
          margin-bottom: 0.6666667em;
        }

        .emotion-0 ol ul {
          margin-top: 0.6666667em;
          margin-bottom: 0.6666667em;
        }

        .emotion-0 ol ol {
          margin-top: 0.6666667em;
          margin-bottom: 0.6666667em;
        }
      }

      <article
        class="emotion-0 emotion-1"
      >
        hey
      </article>
    `);
  });
});
