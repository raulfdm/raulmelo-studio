<script>
  import ExternalLinkIcon from '@components/Icons/ExternalLinkIcon.svelte';
</script>

<header>
  <h1>Curriculum</h1>
  <p>
    To provide a better experience and ease the maintainability of a single
    source of true, I keep my CV in a public Google Docs file.
  </p>
  <p>
    From there, you'll be able to print or export in the extension you need.
  </p>
</header>

<aside class="image-container">
  <figure>
    <img
      src="https://res.cloudinary.com/duzei21zt/image/upload/v1617789904/site/cv_cover_dbad9dd714.png"
      alt="cv"
    />
  </figure>
  <a
    class="cta"
    href="https://docs.google.com/document/d/1xk0ChmPckqW85xtM1Hizx2tVbo2B61xjcpz-_dAH3f8"
    target="_blank"
    rel="noopener noreferrer"
  >
    Go to the document <span class="icon-wrapper"><ExternalLinkIcon /></span>
  </a>
</aside>

<style>
  header {
    grid-column: 1 / -1;
    line-height: 1.5;
  }

  header h1 {
    font-size: 2.369rem;
    line-height: 1.3;
    font-weight: 900;
    margin-bottom: 1rem;
  }

  header p {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.3;
  }

  .image-container {
    max-width: 380px;

    grid-column: 1 / -1;
    width: 100%;
    max-width: 250px;
    --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
    position: relative;
    display: grid;
    place-items: center;
    margin-left: auto;
    margin-right: auto;
  }

  figure {
    position: relative;
    height: 100%;
    width: 100%;
  }

  figure img {
    width: 100%;
  }

  .cta {
    background-color: var(--color-secondary);
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    line-height: 1.3;
    font-weight: 800;
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
    position: absolute;
  }

  .icon-wrapper {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    position: relative;
    top: -2px;
  }

  :global(html.dark) .cta {
    color: var(--color-black);
  }

  @media (min-width: 768px) {
    header h1 {
      font-size: 3.157rem;
      line-height: 1.3;
      margin-bottom: 1.5rem;
    }

    .image-container {
      max-width: 380px;
    }

    .cta {
      font-size: 1.333rem;
      line-height: 1.3;
      padding: 1rem 1.5rem;
    }

    .icon-wrapper {
      top: -6px;
      width: 1.2rem;
    }
  }

  @media (min-width: 1024px) {
    header {
      grid-column: span 8 / span 8;
    }

    header h1 {
      font-size: 4.209rem;
      line-height: 1.3;
    }

    header p {
      font-size: 1.333rem;
      line-height: 1.3;
    }

    .image-container {
      grid-column: span 4 / span 4;
    }
  }
</style>
