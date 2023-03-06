<script lang="ts">
  import { IconClipboard } from '@tabler/icons-svelte';
  import classNames from 'classnames';
  import { createPopperActions } from 'svelte-popperjs';
  import { useMachine } from '@xstate/svelte';
  import { copyMachine } from './copyMachine';
  import { highlight } from '@raulmelo/refractor';

  export let code: string;
  export let language = 'plaintext';
  export let filename: string | undefined = undefined;
  export let copyTitle = 'Copy code';
  export let copyTooltipTitle = 'Copied!';
  export let highlightedLines: string | undefined = undefined;

  const [popperRef, popperContent] = createPopperActions({
    placement: 'bottom-end',
  });
  const extraOpts = {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  };

  const { state, send } = useMachine(copyMachine);

  const { classLang, html } = highlight(code, language, highlightedLines);

  function onCopyCode() {
    send({ type: 'COPY', code });
  }
</script>

<div class="relative code-snippet">
  <button
    use:popperRef
    type="button"
    title={copyTitle}
    class="absolute p-1 text-gray-500 transition-colors focus:outline-white top-1 right-1 hover:text-gray-300"
    style="background-color: var(--syntax-bg);"
    on:click={onCopyCode}
  >
    <IconClipboard />
  </button>
  {#if $state.matches('copied')}
    <span
      use:popperContent={extraOpts}
      style="fontFamily: 'monospace';"
      class={classNames(
        'px-2 py-1 text-sm font-bold bg-green-600 rounded text-gray-50 transition-all',
        {
          'opacity-0': $state.matches('notCopied'),
          'opacity-100': $state.matches('copied'),
        },
      )}
    >
      {copyTooltipTitle}
    </span>
  {/if}

  {#if filename}
    <div class="filename">
      <span>{filename}</span>
    </div>
  {/if}
  <pre class={`refractor ${classLang}`}><code class={classLang}
      >{@html html}</code
    ></pre>
</div>
