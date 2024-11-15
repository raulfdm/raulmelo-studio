<script lang="ts">
  import { isEmpty } from '@/infrastructure/utils/isEmpty';
  import { isNil } from '@/infrastructure/utils/isNil';
  import type { GetImageResult } from 'astro';

  interface Props {
    images?: ({
      id: string;
      index: number;
      caption: string;
      alt: string;
    } & GetImageResult)[];
  }

  let { images = [] }: Props = $props();

  let activeIndex = $state(1);

  const isImageEmpty = isNil(images) || isEmpty(images);
</script>

{#if !isImageEmpty}
  <div class="w-full carousel">
    {#each images as { id, caption, src, alt, attributes }}
      <div {id} class="relative w-full carousel-item">
        <figure>
          <img {src} {alt} {...attributes} />
          {#if caption}
            <figcaption class="text-center" data-testid="caption">
              {caption || alt}
            </figcaption>
          {/if}
        </figure>
      </div>
    {/each}
  </div>

  <div class="flex justify-center w-full gap-2 py-2">
    {#each images as { id, index }}
      <a
        href={`#${id}`}
        class="sliderItem"
        class:active={activeIndex === index}
        onclick={() => (activeIndex = index)}
      >
        {index}
      </a>
    {/each}
  </div>
{/if}

<style lang="postcss">
  figure {
    @apply mb-2;
  }

  .sliderItem {
    @apply grid place-items-center;
    @apply text-md;
    @apply rounded-xl;
    @apply w-8 h-8;
    @apply no-underline;
    @apply border border-secondary;
  }

  .sliderItem.active {
    @apply bg-secondary;
    @apply text-white;
  }

  .carousel {
    @apply flex overflow-x-scroll;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    &-item {
      @apply box-content flex flex-none;
      scroll-snap-align: start;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      @apply hidden;
    }
  }
</style>
