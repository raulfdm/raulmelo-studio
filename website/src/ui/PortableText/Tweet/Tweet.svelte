<script lang="ts">
  import { Tweet } from 'sveltekit-embed';

  export let tweetId: string;

  $: tweetLink = `https://twitter.com/twitter/status/${tweetId}`;
</script>

<Tweet {tweetLink} />
