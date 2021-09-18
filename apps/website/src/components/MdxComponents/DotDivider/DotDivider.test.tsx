import React from 'react';
import { render, screen } from '@testing-library/react';

import { DotDivider } from '.';

describe('<DotDivider />', () => {
  it('matches snapshot', () => {
    render(<DotDivider />);

    expect(screen.getByTestId('dot-divider')).toMatchInlineSnapshot(`
.emotion-0 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  margin: 3.111em 0px;
}

.emotion-0>:not([hidden])~:not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}

@media (min-width: 768px) {
  .emotion-0 {
    margin: 2.8em 0px;
  }
}

@media (min-width: 1024px) {
  .emotion-0 {
    margin: 3em 0px;
  }
}

.emotion-1 {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
  --hr-color: var(--color-secondary);
  background-color: var(--hr-color);
}

@media (min-width: 1024px) {
  .emotion-1 {
    width: 0.475rem;
    height: 0.475rem;
  }
}

@media screen and (-ms-high-contrast: active) {
  .emotion-1 {
    --hr-color: windowText;
  }
}

@media screen and (forced-colors: active) {
  .emotion-1 {
    --hr-color: CanvasText;
  }
}

.emotion-1+* {
  margin-top: 0;
}

<div
  class="emotion-0"
  data-testid="dot-divider"
  role="separator"
>
  <div
    aria-hidden="true"
    class="emotion-1 emotion-2"
  />
  <div
    aria-hidden="true"
    class="emotion-1 emotion-2"
  />
  <div
    aria-hidden="true"
    class="emotion-1 emotion-2"
  />
</div>
`);
  });
});
