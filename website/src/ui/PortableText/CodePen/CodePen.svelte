<script lang="ts">
  import { CodePen } from 'sveltekit-embed';

  export let directUrl: string;
  export let src: string | undefined;
  export let height: string | undefined;

  const nextUrl = src || directUrl;
  const codePenId = nextUrl.split('/').at(-1)!;
</script>

<CodePen {codePenId} {height} />
