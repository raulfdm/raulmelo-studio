<script lang="ts">
  import { refractor } from './configuredRefractor';
  import { toHtml } from 'hast-util-to-html';
  import { IconClipboard } from '@tabler/icons-svelte';
  import classNames from 'classnames';
  import { createPopperActions } from 'svelte-popperjs';
  import { useMachine } from '@xstate/svelte';
  import { copyMachine } from './copyMachine';

  export let code: string;
  export let language = 'plaintext';
  export let filename: string | undefined = undefined;
  export let copyTitle = 'Copy code';
  export let copyTooltipTitle = 'Copied!';

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

  if (!refractor.registered(language)) {
    language = 'plaintext';
  }

  const tree = refractor.highlight(code, language);
  const langClass = `language-${language}`;

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
  <pre class={`refractor ${langClass}`}><code class={langClass}
      >{@html toHtml(tree)}</code
    ></pre>
</div>
