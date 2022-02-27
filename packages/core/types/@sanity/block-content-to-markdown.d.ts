declare module '@sanity/block-content-to-markdown' {
  export default function toMarkdown(
    body: PortableTextBlock,
    options?: any,
  ): string;
}
