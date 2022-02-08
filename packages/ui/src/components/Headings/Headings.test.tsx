import { render } from '@testing-library/react';
import React from 'react';

import { H1, H2, H3, H4, H5, H6 } from '.';

describe('<Headings />', () => {
  it('has all headings defined ', () => {
    expect(H1).toBeDefined();
    expect(H2).toBeDefined();
    expect(H3).toBeDefined();
    expect(H4).toBeDefined();
    expect(H5).toBeDefined();
    expect(H6).toBeDefined();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <>
        <H1>Some weird Text</H1>
        <H2>Some weird Text</H2>
        <H3>Some weird Text</H3>
        <H4>Some weird Text</H4>
        <H5>Some weird Text</H5>
        <H6>Some weird Text</H6>
      </>,
    );

    expect(container).toMatchInlineSnapshot(`
.emotion-0 {
  position: relative;
  display: table;
  --icon-visible: hidden;
}

.emotion-0:hover {
  --icon-visible: unset;
}

.emotion-0 .copy-title-icon {
  position: absolute;
  right: -0.25rem;
  -webkit-transform: translate(100%, 50%);
  -moz-transform: translate(100%, 50%);
  -ms-transform: translate(100%, 50%);
  transform: translate(100%, 50%);
}

.emotion-0 .copy-title-icon .icon-link {
  display: block;
  background-color: var(--color-secondary);
  width: 0.7em;
  height: 0.7em;
  -webkit-mask: url(/icons/anchor.svg) no-repeat;
  mask: url(/icons/anchor.svg) no-repeat;
  -webkit-transition: visibility 0.2s ease-in-out;
  transition: visibility 0.2s ease-in-out;
  visibility: var(--icon-visible);
}

.emotion-2 {
  position: relative;
  display: table;
  --icon-visible: hidden;
}

.emotion-2:hover {
  --icon-visible: unset;
}

.emotion-2 .copy-title-icon {
  position: absolute;
  right: -0.25rem;
  -webkit-transform: translate(100%, 50%);
  -moz-transform: translate(100%, 50%);
  -ms-transform: translate(100%, 50%);
  transform: translate(100%, 50%);
}

.emotion-2 .copy-title-icon .icon-link {
  display: block;
  background-color: var(--color-secondary);
  width: 0.7em;
  height: 0.7em;
  -webkit-mask: url(/icons/anchor.svg) no-repeat;
  mask: url(/icons/anchor.svg) no-repeat;
  -webkit-transition: visibility 0.2s ease-in-out;
  transition: visibility 0.2s ease-in-out;
  visibility: var(--icon-visible);
}

.emotion-4 {
  position: relative;
  display: table;
  --icon-visible: hidden;
}

.emotion-4:hover {
  --icon-visible: unset;
}

.emotion-4 .copy-title-icon {
  position: absolute;
  right: -0.25rem;
  -webkit-transform: translate(100%, 50%);
  -moz-transform: translate(100%, 50%);
  -ms-transform: translate(100%, 50%);
  transform: translate(100%, 50%);
}

.emotion-4 .copy-title-icon .icon-link {
  display: block;
  background-color: var(--color-secondary);
  width: 0.7em;
  height: 0.7em;
  -webkit-mask: url(/icons/anchor.svg) no-repeat;
  mask: url(/icons/anchor.svg) no-repeat;
  -webkit-transition: visibility 0.2s ease-in-out;
  transition: visibility 0.2s ease-in-out;
  visibility: var(--icon-visible);
}

.emotion-6 {
  position: relative;
  display: table;
  --icon-visible: hidden;
}

.emotion-6:hover {
  --icon-visible: unset;
}

.emotion-6 .copy-title-icon {
  position: absolute;
  right: -0.25rem;
  -webkit-transform: translate(100%, 50%);
  -moz-transform: translate(100%, 50%);
  -ms-transform: translate(100%, 50%);
  transform: translate(100%, 50%);
}

.emotion-6 .copy-title-icon .icon-link {
  display: block;
  background-color: var(--color-secondary);
  width: 0.7em;
  height: 0.7em;
  -webkit-mask: url(/icons/anchor.svg) no-repeat;
  mask: url(/icons/anchor.svg) no-repeat;
  -webkit-transition: visibility 0.2s ease-in-out;
  transition: visibility 0.2s ease-in-out;
  visibility: var(--icon-visible);
}

.emotion-8 {
  position: relative;
  display: table;
  --icon-visible: hidden;
}

.emotion-8:hover {
  --icon-visible: unset;
}

.emotion-8 .copy-title-icon {
  position: absolute;
  right: -0.25rem;
  -webkit-transform: translate(100%, 50%);
  -moz-transform: translate(100%, 50%);
  -ms-transform: translate(100%, 50%);
  transform: translate(100%, 50%);
}

.emotion-8 .copy-title-icon .icon-link {
  display: block;
  background-color: var(--color-secondary);
  width: 0.7em;
  height: 0.7em;
  -webkit-mask: url(/icons/anchor.svg) no-repeat;
  mask: url(/icons/anchor.svg) no-repeat;
  -webkit-transition: visibility 0.2s ease-in-out;
  transition: visibility 0.2s ease-in-out;
  visibility: var(--icon-visible);
}

.emotion-10 {
  position: relative;
  display: table;
  --icon-visible: hidden;
}

.emotion-10:hover {
  --icon-visible: unset;
}

.emotion-10 .copy-title-icon {
  position: absolute;
  right: -0.25rem;
  -webkit-transform: translate(100%, 50%);
  -moz-transform: translate(100%, 50%);
  -ms-transform: translate(100%, 50%);
  transform: translate(100%, 50%);
}

.emotion-10 .copy-title-icon .icon-link {
  display: block;
  background-color: var(--color-secondary);
  width: 0.7em;
  height: 0.7em;
  -webkit-mask: url(/icons/anchor.svg) no-repeat;
  mask: url(/icons/anchor.svg) no-repeat;
  -webkit-transition: visibility 0.2s ease-in-out;
  transition: visibility 0.2s ease-in-out;
  visibility: var(--icon-visible);
}

<div>
  <h1
    class="emotion-0 emotion-1"
  >
    Some weird Text
  </h1>
  <h2
    class="emotion-2 emotion-3"
  >
    Some weird Text
  </h2>
  <h3
    class="emotion-4 emotion-5"
  >
    Some weird Text
  </h3>
  <h4
    class="emotion-6 emotion-7"
  >
    Some weird Text
  </h4>
  <h5
    class="emotion-8 emotion-9"
  >
    Some weird Text
  </h5>
  <h6
    class="emotion-10 emotion-11"
  >
    Some weird Text
  </h6>
</div>
`);
  });
});
