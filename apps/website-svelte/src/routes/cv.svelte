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

<style lang="postcss">
  header {
    @apply leading-normal col-span-full lg:col-span-8;
  }
  header h1 {
    @apply text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6;
  }
  header p {
    @apply mb-4 text-base md:text-md lg:text-lg;
  }

  .image-container {
    @apply col-span-full lg:col-span-4;
    @apply w-full max-w-[250px] md:max-w-[380px];
    @apply shadow-md;
    @apply bg-white;
    @apply relative;
    @apply grid place-items-center;
    @apply mx-auto;
  }

  figure {
    @apply relative h-full w-full;
  }

  .cta {
    @apply bg-secondary transition-theme;
    @apply rounded-md;
    @apply py-2 px-3 md:py-4 md:px-6;
    @apply text-base md:text-lg;
    @apply font-extrabold;
    @apply text-white dark:text-black;
    @apply absolute;
  }
  .cta .icon-wrapper {
    @apply w-4 inline-block mb-2 md:mb-4;
  }
</style>
