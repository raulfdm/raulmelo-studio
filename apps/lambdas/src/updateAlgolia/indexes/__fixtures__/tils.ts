export const tilsApiResponse = {
  data: {
    tils: [
      {
        id: '6081113c532c3c28f38780df',
        publishedAt: '2021-04-19',
        title: 'How to format Rust code "on save" in VSCODE',
        content:
          'For some reason, when we install Rust VSCODE extension the formatter does not work by default.\nTo do that I we need to enforce the formatter via `settings.json` (or User preference)\n\n```rust\n{\n    "[rust]": {\n        "editor.defaultFormatter": "rust-lang.rust", // Makes the magic\n        "editor.formatOnSave": true // Optional\n    },\n}\n``',
        locale: 'en',
        slug: 'how-to-format-rust-code-on-save-in-vscode',
      },
    ],
  },
};
