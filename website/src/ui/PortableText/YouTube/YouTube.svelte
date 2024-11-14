<script lang="ts">
  import { YouTube } from 'sveltekit-embed';

  interface Props {
    youTubeId: string;
  }

  let { youTubeId }: Props = $props();
</script>

<YouTube {youTubeId} />
