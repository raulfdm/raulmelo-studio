<script lang="ts">
  import { page } from '$app/stores';
  export let onSideMenuItemClick: () => void;

  const sideList: {
    title: string;
    items: {
      title: string;
      href: string;
    }[];
  }[] = [
    {
      title: 'Intermittent Fasting',
      items: [
        {
          title: 'Backwards',
          href: '/tools/intermittent-fasting/backwards',
        },
        {
          title: 'Forward',
          href: '/tools/intermittent-fasting/forward',
        },
      ],
    },
    {
      title: 'Manipulating Dates',
      items: [
        {
          title: 'Add',
          href: '/tools/dates/add',
        },
        {
          title: 'Subtract',
          href: '/tools/dates/subtract',
        },
      ],
    },
    {
      title: 'Manipulating Time',
      items: [
        {
          title: 'Timezone',
          href: '/tools/times/timezone',
        },
        {
          title: 'Time',
          href: '/tools/times/time',
        },
      ],
    },
    {
      title: 'Miscellaneous',
      items: [
        {
          title: 'Rule of Three',
          href: '/tools/rule-of-three',
        },
        {
          title: 'Average',
          href: '/tools/average',
        },
      ],
    },
  ];

  $: classesActive = (href: string) =>
    href === $page.url.pathname ? '!bg-primary-500' : '';
</script>

<section class="p-4 pb-20 space-y-4 overflow-y-auto">
  {#each sideList as { items, title }, index}
    <div
      class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4"
    >
      {title}
    </div>
    <nav class="list-nav">
      <ul>
        {#each items as item}
          <li>
            <a
              href={item.href}
              class={classesActive(item.href)}
              on:click={onSideMenuItemClick}>{item.title}</a
            >
          </li>
        {/each}
      </ul>

      {#if index !== sideList.length - 1}
        <hr class="!my-6 opacity-50" />
      {/if}
    </nav>
  {/each}
</section>
