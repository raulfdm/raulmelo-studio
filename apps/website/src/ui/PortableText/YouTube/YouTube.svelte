<script lang="ts">
  import { YouTube } from 'sveltekit-embed';

  export let youTubeId: string;
</script>

<YouTube {youTubeId} />
