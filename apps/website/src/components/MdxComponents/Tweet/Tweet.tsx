import { Tweet as TweetComp } from 'react-twitter-widgets';

export function Tweet({ tweetId }: { tweetId: string }) {
  return <TweetComp tweetId={tweetId} options={{ align: 'center' }} />;
}
