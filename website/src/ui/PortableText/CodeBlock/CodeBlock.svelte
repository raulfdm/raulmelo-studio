<script lang="ts">
  import { useMachine } from '@xstate/svelte';
  import { copyMachine } from './copyMachine';
  import { ClipboardIcon, ClipboardCheckIcon } from 'lucide-svelte';
  import { mergeClasses } from '@/infrastructure/utils/misc';

  interface Props {
    code: string;
    codeHtml: string;
    copyTitle?: string;
    filename?: string | null;
    showLineNumbers: boolean;
  }

  let {
    code,
    codeHtml,
    copyTitle = 'Copy code',
    filename = null,
    showLineNumbers,
  }: Props = $props();

  const { snapshot, send } = useMachine(copyMachine);

  function onCopyCode() {
    send({ type: 'COPY', code });
  }
</script>

<div
  class={mergeClasses(
    'code-snippet',
    'relative',
    'border border-neutral-200 dark:border-gray-700 rounded-lg',
    'mb-8',
  )}
>
  <div
    class={mergeClasses(
      ' bg-neutral-100 dark:bg-gray-800',
      'rounded-t-lg py-2 px-[var(--padding)]',
      'justify-between items-center flex',
      'border-b border-b-neutral-200 dark:border-b-gray-700',
    )}
  >
    {#if filename}
      <span class="text-[14px] text-gray-800 dark:text-gray-200"
        >{filename}</span
      >
    {/if}

    <button
      type="button"
      title={copyTitle}
      class={mergeClasses(
        'focus:outline-white hover:text-gray-300',
        'p-0.5 text-gray-500',
        'transition-colors',
        'rounded',
        'ml-auto',
      )}
      onclick={onCopyCode}
    >
      {#if $snapshot.matches('copied')}
        <ClipboardCheckIcon stroke="1.5" />
      {:else}
        <ClipboardIcon stroke="1.5" />
      {/if}
    </button>
  </div>

  <pre
    class={mergeClasses(
      'bg-neutral-100 dark:bg-gray-800',
      'rounded-t-none',
      'px-0 m-0',
    )}><code
      class:showLines={showLineNumbers}
      class={mergeClasses(
        'inline-grid w-full px-[var(--padding)] text-primary',
      )}>{@html codeHtml}</code
    ></pre>
</div>

<style lang="postcss">
  .code-snippet {
    --padding: 20px;
  }
</style>
