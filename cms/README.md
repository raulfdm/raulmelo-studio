# Sanity Clean Content Studio

## Deployment

`pnpm run deploy` uses the pinned `sanity-deploy-cli` package. Sanity CLI 8.20 and
8.21 send the Studio archive as a Node stream, while their HTTP client rejects
that body type. CLI 7.18 uses the previous HTTP client and supports Studio v6.
Remove the separate deploy CLI once Sanity fixes the upload path upstream.

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)
