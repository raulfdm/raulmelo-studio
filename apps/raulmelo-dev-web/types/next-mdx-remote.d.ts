/**
 * They still have no .d.ts
 * Isn't perfect either ideal but It's good for now
 * https://github.com/hashicorp/next-mdx-remote/blob/master
 */
type RenderToStringReturnType = {
  compiledSource: any;
  renderedOutput: any;
};

type Components = {
  [match: string]: React.ComponentType | any;
};

declare module 'next-mdx-remote/render-to-string' {
  export default function renderToString(
    content: string,
    opts?: {
      components?: Components;
      mdxOptions?: {
        remarkPlugins?: any[];
        rehypePlugins?: any[];
        compilers?: any[];
      };
    },
  ): Promise<RenderToStringReturnType>;
}

declare module 'next-mdx-remote/hydrate' {
  export default function hydrate(
    content: RenderToStringReturnType,
    opts?: {
      components: Components;
    },
  );
}
