<script lang="ts">
  import { Tweet } from 'sveltekit-embed';

  interface Props {
    tweetId: string;
  }

  let { tweetId }: Props = $props();

  let tweetLink = $derived(`https://twitter.com/twitter/status/${tweetId}`);
</script>

<Tweet {tweetLink} />
