import { $ } from 'bun';
// GITHUB_REF_NAME: e.g., renovate/bits-ui-1.x
invariant(process.env.GITHUB_REF_NAME, 'GITHUB_REF_NAME is not defined');

if (!process.env.GITHUB_REF_NAME.includes('renovate')) {
  console.log('Not a renovate branch, skipping');
  process.exit(0);
}

await $`bun i`;

await $`ls -la`;

function invariant<T>(
  value: T | undefined | null,
  message: string = 'Invariant failed',
): asserts value is T {
  if (value === undefined || value === null || value === false) {
    throw new Error(message);
  }
}
