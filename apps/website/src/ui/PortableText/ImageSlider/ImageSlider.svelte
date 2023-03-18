<script lang="ts">
  import { isEmpty, isNil } from '@raulmelo/core/utils';

  export let images: {
    id: string;
    index: number;
    alt: string;
    caption: string;
    height: number;
    width: number;
    src: string;
  }[] = [];

  let activeIndex = 1;

  const isImageEmpty = isNil(images) || isEmpty(images);
</script>

{#if !isImageEmpty}
  <div class="carousel w-full">
    {#each images as { id, caption, alt, src, width, height }}
      <div {id} class="carousel-item w-full relative">
        <figure>
          <img {src} {alt} {width} {height} />
          {#if caption}
            <figcaption class="text-center" data-testid="caption">
              {caption || alt}
            </figcaption>
          {/if}
        </figure>
      </div>
    {/each}
  </div>

  <div class="flex justify-center w-full py-2 gap-2">
    {#each images as { id, index }}
      <a
        href={`#${id}`}
        class="sliderItem"
        class:active={activeIndex === index}
        on:click={() => (activeIndex = index)}
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
    &-vertical {
      @apply flex-col overflow-y-scroll;
      scroll-snap-type: y mandatory;
    }
    &-item {
      @apply box-content flex flex-none;
      scroll-snap-align: start;
    }
    &-center .carousel-item {
      scroll-snap-align: center;
    }
    &-end .carousel-item {
      scroll-snap-align: end;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      @apply hidden;
    }
  }
</style>
