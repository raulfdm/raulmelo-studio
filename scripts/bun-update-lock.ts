import { $ } from 'bun';
// GITHUB_REF_NAME: e.g., renovate/bits-ui-1.x
invariant(process.env.GITHUB_REF_NAME, 'GITHUB_REF_NAME is not defined');

if (!process.env.GITHUB_REF_NAME.includes('renovate')) {
  console.log('Not a renovate branch, skipping');
  process.exit(0);
}

await $`bun i`;

await $`git add bun.lockb`;

await $`git commit -m "chore: update bun.lock"`;

await $`git push origin HEAD`;

function invariant<T>(
  value: T | undefined | null,
  message: string = 'Invariant failed',
): asserts value is T {
  if (value === undefined || value === null || value === false) {
    throw new Error(message);
  }
}
