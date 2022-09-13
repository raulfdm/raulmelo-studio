<script lang="ts">
  import cookie from 'cookie';
  import { createMachine } from 'xstate';
  import { useMachine } from '@xstate/svelte';
  import { SANITY_PROJECT_ID_COOKIE_KEY } from '$lib/utils/api';
  import { DEFAULT_PROJECT_ID } from '$lib/api';

  let projectId =
    cookie.parse(document.cookie)[SANITY_PROJECT_ID_COOKIE_KEY] || '';

  const machine = createMachine(
    {
      predictableActionArguments: true,
      preserveActionOrder: true,
      initial: 'idle',
      states: {
        idle: {
          on: {
            SAVE: {
              target: 'saved',
              actions: ['onSave'],
            },
            RESTORE: {
              target: 'restored',
              actions: ['onRestore'],
            },
          },
        },
        saved: {
          after: {
            5000: 'idle',
          },
        },
        restored: {
          after: {
            3000: 'idle',
          },
        },
      },
    },
    {
      actions: {
        onSave: () => {
          document.cookie = cookie.serialize(
            SANITY_PROJECT_ID_COOKIE_KEY,
            projectId,
          );
        },
        onRestore: () => {
          projectId = DEFAULT_PROJECT_ID;
        },
      },
    },
  );

  const { send, state } = useMachine(machine);
</script>

<h1 class="mb-4 text-2xl font-bold">Connect another database</h1>

<div>
  <fieldset class="flex flex-col mb-4">
    <label for="projectId" class="italic font-semibold">Project ID</label>
    <input
      id="projectId"
      type="text"
      bind:value={projectId}
      disabled={$state.matches('saved')}
      class="px-3 py-1.5 border rounded w-48"
    />
  </fieldset>

  <button
    on:click={() => send('SAVE')}
    data-currentState={$state.value}
    class="px-3 py-1.5 rounded border transition-colors save"
    >{#if $state.matches('saved')}
      Saved
    {:else}
      Save
    {/if}
  </button>
  <button
    on:click={() => send('RESTORE')}
    data-currentState={$state.value}
    class="px-3 py-1.5 rounded border transition-colors restore"
    >{#if $state.matches('restored')}
      Restored
    {:else}
      Restore
    {/if}
  </button>
</div>

<style lang="postcss">
  button.save {
    @apply text-pink-600 border-pink-600 bg-pink-50;
  }

  button.save[data-currentState='saved'] {
    @apply text-green-600 border-green-600 bg-green-50;
  }

  button.restore {
    @apply text-blue-600 border-blue-600 bg-blue-50;
  }

  button.restore[data-currentState='restored'] {
    @apply text-green-600 border-green-600 bg-green-50;
  }
</style>
