<script lang="ts">
  import { CodePen } from 'sveltekit-embed';

  interface Props {
    directUrl: string;
    src: string | undefined;
    height: string | undefined;
  }

  let { directUrl, src, height }: Props = $props();

  const nextUrl = src || directUrl;
  const codePenId = nextUrl.split('/').at(-1)!;
</script>

<CodePen {codePenId} {height} />
