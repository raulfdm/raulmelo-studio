import { BigQuote } from '@components/MdxComponents/BigQuote';
import { DotDivider } from '@components/MdxComponents/DotDivider';
import { Gif } from '@components/MdxComponents/Gif';
import * as Headings from '@components/MdxComponents/Headings';
import { ImageSliderFactory } from '@components/MdxComponents/ImageSlider';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { ProseContainer } from './ProseContainer';

const meta: Meta = {
  title: 'components/ProseContainer',
  component: ProseContainer,

  decorators: [
    (Story: React.ElementType) => (
      <>
        <Story />
        <br />
        <br />
      </>
    ),
  ],
};

export default meta;

const ConfiguredImageSlider = ImageSliderFactory();

export const defaultCase: Story = () => (
  <ProseContainer>
    <Headings.H1>H1. Heading</Headings.H1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum natus
      aperiam et asperiores quidem temporibus blanditiis debitis esse id
      veritatis nisi doloribus, molestiae laboriosam nemo architecto. Error
      aliquid sint nisi.
    </p>
    <Headings.H2>H2. Heading</Headings.H2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
      omnis iure itaque est. Libero quisquam aliquid quis nobis ducimus ea quas,
      illo odio amet nesciunt esse beatae minima, perspiciatis rem.
    </p>
    <BigQuote>"Some big quote"</BigQuote>
    <Headings.H3>H3. Heading</Headings.H3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <a href="#">Click here</a>
    <DotDivider />
    <Headings.H4>H4. Heading</Headings.H4>
    <pre
      className="language-jsx"
      dangerouslySetInnerHTML={{
        __html: `
<code class="language-jsx"><span class="token keyword module">import</span> <span class="token imports"><span class="token maybe-class-name">React</span></span> <span class="token keyword module">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> sanitizeText <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">"../../helpers/text"</span><span class="token punctuation">;</span>

<span class="token keyword module">export</span> <span class="token keyword">const</span> <span class="token function-variable function"><span class="token maybe-class-name">Button</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> text <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword control-flow">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span><span class="token function">sanitizeText</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code>
        `,
      }}
    />
    <Headings.H5>H5. Heading</Headings.H5>
    <Gif
      src="https://media.giphy.com/media/YqnXSeq7AFSYjAAhpU/giphy.gif"
      width="300"
      height="400"
    />
    <ConfiguredImageSlider
      images={[
        {
          src: 'https://picsum.photos/id/100/2500/1656',
          alt: 'A random image',
        },
        {
          src: 'https://picsum.photos/id/1/5616/3744',
          alt: 'A random image 2',
          noCaption: true,
        },
        {
          src: 'https://picsum.photos/id/10/2500/1667',
          alt: 'A random image3',
          width: 3000,
          height: 4000,
        },
      ]}
    />
  </ProseContainer>
);
