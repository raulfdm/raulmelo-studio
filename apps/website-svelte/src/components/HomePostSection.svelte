<script>
  import ArrowRightIcon from '@components/Icons/ArrowRightIcon.svelte';
  import PostBasic from '@components/PostBasic.svelte';

  // TODO: add types
  export let title = '';
  export let posts = [];
  export let checkAllLink = {
    href: '',
    text: '',
  };
</script>

<section class="col-span-full mb-6">
  <h2 class="font-sans font-extrabold text-lg lg:text-xl mb-4 lg:mb-6">
    {title}
  </h2>
  <ul class="grid grid-cols-1 ipad-pro:grid-cols-2 gap-6">
    {#each posts as post}
      <li>
        <PostBasic
          {post}
          titleClassName="text-xl"
          className="bg-white dark:bg-blue-800 p-6 rounded-sm shadow  transition-theme"
        />
      </li>
    {/each}
  </ul>

  <a
    class="text-lg underline mt-6 cursor-pointer inline-flex text-secondary"
    href={checkAllLink.href}
  >
    {checkAllLink.text}
    <span class="w-6 ml-2">
      <ArrowRightIcon />
    </span>
  </a>
</section>
