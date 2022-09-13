<script lang="ts">
  import cookie from 'cookie';
  import { createMachine, assign, type EventObject } from 'xstate';
  import { useMachine } from '@xstate/svelte';
  import { SANITY_PROJECT_ID_COOKIE_KEY } from '$lib/utils/api';
  import { DEFAULT_PROJECT_ID } from '$lib/api';

  const machine = createMachine(
    {
      predictableActionArguments: true,
      preserveActionOrder: true,
      initial: 'idle',
      context: {
        projectId:
          cookie.parse(document.cookie)[SANITY_PROJECT_ID_COOKIE_KEY] || '',
      },
      states: {
        idle: {
          on: {
            SAVE: {
              target: 'saved',
              actions: ['onSave', 'updateProjectId'],
            },
            RESTORE: [
              {
                target: 'restored',
                actions: ['onRestore', 'updateProjectId'],
                cond: () => confirm('Are you sure you want to restore?'),
              },
              { target: 'idle' },
            ],
            SET_PROJECT_ID: {
              actions: ['setProjectId'],
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
        onRestore: assign({
          projectId: () => DEFAULT_PROJECT_ID,
        }),
        updateProjectId(context) {
          document.cookie = cookie.serialize(
            SANITY_PROJECT_ID_COOKIE_KEY,
            context.projectId,
          );
        },
        setProjectId: assign({
          projectId: (_, event) => {
            return (event as unknown as { projectId: string }).projectId;
          },
        }),
      },
    },
  );

  const { send, state } = useMachine(machine);

  function onInput(event: Event) {
    const { value } = event.target as HTMLInputElement;

    send({
      type: 'SET_PROJECT_ID',
      projectId: value,
    });
  }
</script>

<h1 class="mb-4 text-2xl font-bold">Connect another database</h1>

<div>
  <fieldset class="flex flex-col mb-4">
    <label for="projectId" class="italic font-semibold">Project ID</label>
    <input
      id="projectId"
      type="text"
      value={$state.context.projectId}
      disabled={$state.matches('idle') === false}
      class="px-3 py-1.5 border rounded w-48"
      on:input={onInput}
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

<style lang="scss">
  button.save {
    @apply text-pink-600 border-pink-600 bg-pink-50;
    @apply hover:bg-pink-200;
  }

  button.save[data-currentState='saved'] {
    @apply text-green-600 border-green-600 bg-green-50;
  }

  button.restore {
    @apply text-blue-600 border-blue-600 bg-white;
    @apply hover:bg-blue-200;
  }

  button.restore[data-currentState='restored'] {
    @apply text-green-600 border-green-600 bg-green-50;
  }
</style>
