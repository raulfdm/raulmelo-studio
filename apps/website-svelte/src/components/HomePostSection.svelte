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

<section class="wrapper">
  <h2 class="title">{title}</h2>
  <ul>
    {#each posts as post}
      <li>
        <PostBasic {...post} />
      </li>
    {/each}
  </ul>

  <a class="page-link" href={checkAllLink.href}>
    {checkAllLink.text}
    <span class="icon-wrapper">
      <ArrowRightIcon />
    </span>
  </a>
</section>

<style>
  .wrapper {
    grid-column: 1/-1;
  }

  .title {
    font-family: var(--font-sans);
    font-weight: 800;
    font-size: 1.333rem;
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  .page-link {
    font-size: 1.333rem;
    line-height: 1.3;
    text-decoration: underline;
    margin-top: 1.5rem;
    cursor: pointer;
    display: inline-flex;
    color: var(--color-secondary);
    font-family: var(--font-sans);
  }

  .icon-wrapper {
    width: 1.5rem;
    margin-left: 0.5rem;
    display: inline-flex;
  }

  @media screen and (min-width: 1024px) {
    .title {
      font-size: 1.777rem;
      line-height: 1.3;
      margin-bottom: 1.5rem;
    }
  }
</style>
