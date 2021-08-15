import { rehype } from 'rehype';
import { mdxPrism } from '../mdxPrism';

describe('mdx-prism-2 lib', () => {
  it('copies the language-* class to pre tag', () => {
    const desiredClass = 'language-css';

    processHtml(`
      <pre>
        <code class="${desiredClass}"></code>
      </pre>
    `);

    expect(document.querySelector('pre')?.className).toContain(desiredClass);
  });

  it('tokenizes snippet based on the language', () => {
    processHtml(`
      <div>
        <p>foo</p>
        <pre>
          <code class="language-css">
            p {
              color: red;
            }
          </code>
        </pre>
      </div>
    `);

    expect(document.querySelectorAll('span').length).toBe(7);

    expect(document.body.innerHTML).toMatchInlineSnapshot(`
      <div>
        <p>foo</p>
        <pre class="language-css">
          <code class="language-css">
            <span class="token selector">p</span>
            <span class="token punctuation">{</span>
            <span class="token property">color</span>
            <span class="token punctuation">:</span>
            <span class="token color">red</span>
            <span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
          </code>
        </pre>
      </div>
    `);
  });

  it('highlight code lines', () => {
    processHtml(`
      <div>
        <p>foo</p>
        <pre>
          <code class="language-css{2}">
            p {
              color: red;
              margin-top: 10px;
            }
          </code>
        </pre>
      </div>
    `);

    expect(document.querySelectorAll('.mdx-marker').length).toBe(1);
    expect(document.body.innerHTML).toMatchInlineSnapshot(`
      <div>
        <p>foo</p>
        <pre class="language-css">
          <code class="language-css{2}">
            <div class="mdx-marker">
              <span class="token selector">p</span>
              <span class="token punctuation">{</span>
            </div>
            <span class="token property">color</span>
            <span class="token punctuation">:</span>
            <span class="token color">red</span>
            <span class="token punctuation">;</span>
            <span class="token property">margin-top</span>
            <span class="token punctuation">:</span>
            <span class="token number">10</span>
            <span class="token unit">px</span>
            <span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
          </code>
        </pre>
      </div>
      `);
  });

  it('normalizes uppercase class for "pre" tag', () => {
    processHtml(`
      <div>
        <p>foo</p>
        <pre><code class="language-RUST">p { color: red }</code></pre>
      </div>
    `);

    expect(document.querySelector('pre')?.className).toContain('language-rust');
  });

  it('keeps uppercase class for "code" tag', () => {
    processHtml(`
      <div>
        <p>foo</p>
        <pre>
          <code class="language-RUST">
            fn main() {
                println!("Hello, world!");
            }
          </code>
        </pre>
      </div>
    `);

    expect(document.querySelector('span')).not.toBeNull();
    expect(document.querySelector('code')?.className).toContain(
      'language-RUST',
    );
  });

  it('does nothing to code block without language- class', () => {
    processHtml(`
      <pre><code>p { color: red }</code></pre>
    `);

    expect(document.querySelector('span')).toBeNull();
    expect(document.body.innerHTML).toMatchInlineSnapshot(`
      <pre>
        <code>p { color: red }</code>
      </pre>
    `);
  });

  it('throw error with fake language- class', () => {
    expect(() => {
      processHtml(`
        <pre><code class="language-thisisnotalanguage">p { color: red }</code></pre>
      `);
    }).toThrow(/Unknown language/);
  });

  it('with options.ignoreMissing, does nothing to code block with fake language- class', () => {
    processHtml(
      `<pre><code class="language-thisisnotalanguage">p { color: red }</code></pre>`,
      { ignoreMissing: true },
    );

    expect(document.querySelector('span')).toBeNull();
    expect(document.body.innerHTML).toMatchInlineSnapshot(`
      <pre class="language-thisisnotalanguage">
        <code class="language-thisisnotalanguage">p { color: red }</code>
      </pre>
    `);
  });
});

function processHtml(html: string, options = {}) {
  const result = rehype()
    .data('settings', { fragment: true })
    .use(mdxPrism as any, options)
    .processSync(html)
    .toString();

  document.body.innerHTML = result;
}
