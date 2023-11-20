<script lang="ts">
  import { useMachine } from '@xstate/svelte';
  import { copyMachine } from './copyMachine';
  import { IconClipboard, IconClipboardCheck } from '@/ui/icons';

  export let code: string;
  export let codeHtml: string;
  export let copyTitle = 'Copy code';
  export let filename: string | null = null;
  export let showLineNumbers: boolean;

  const { state, send } = useMachine(copyMachine, {
    actions: {
      copyCode: () => {
        navigator.clipboard.writeText(code);
      },
    },
  });

  function onCopyCode() {
    send({ type: 'COPY', code });
  }
</script>

<div class="relative code-snippet">
  <div class="actions">
    {#if filename}
      <span class="filename">{filename}</span>
    {/if}

    <button
      type="button"
      title={copyTitle}
      class="copy-btn focus:outline-white hover:text-gray-300"
      on:click={onCopyCode}
    >
      {#if $state.matches('copied')}
        <IconClipboardCheck stroke={1.5} />
      {:else}
        <IconClipboard stroke={1.5} />
      {/if}
    </button>
  </div>

  <pre><code class:showLines={showLineNumbers}>{@html codeHtml}</code></pre>
</div>

<style lang="postcss">
  .code-snippet {
    --padding: 20px;

    @apply border border-neutral-200 dark:border-gray-700 rounded-lg;
    @apply mb-8;
  }

  .actions {
    @apply bg-neutral-300 dark:bg-gray-800;
    @apply rounded-t-lg py-2 px-[var(--padding)];
    @apply justify-between items-center flex;
    @apply border-b border-b-neutral-200 dark:border-b-gray-700;
  }

  .filename {
    @apply text-[14px] text-gray-800 dark:text-gray-200;
  }

  .copy-btn {
    @apply p-0.5 text-gray-500 transition-colors rounded;
    @apply ml-auto;
  }

  pre {
    @apply bg-neutral-100 dark:bg-gray-800;
    @apply rounded-t-none;
    @apply px-0 m-0;
  }

  code {
    @apply inline-grid w-full px-[var(--padding)] text-primary;
  }
</style>
