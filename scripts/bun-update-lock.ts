import { $ } from 'bun';

// GITHUB_REF_NAME: e.g., renovate/bits-ui-1.x
invariant(process.env.GITHUB_REF_NAME, 'GITHUB_REF_NAME is not defined');

if (!process.env.GITHUB_REF_NAME.includes('renovate')) {
  console.log('Not a renovate branch, skipping');
  process.exit(0);
}

await $`bun i`;

const gitStatus = await $`git status`;

if (gitStatus.text().includes('modified:   bun.lockb')) {
  await $`git config --global user.email "bun-bot@raulmelo.me"`;
  await $`git config --global user.name "Bun Bot"`;

  await $`git add bun.lockb`;

  await $`git commit -m "chore: update bun.lock"`;

  await $`git push origin HEAD`;
} else {
  console.log('bun.lockb is not modified');
  process.exit(0);
}

function invariant<T>(
  value: T | undefined | null,
  message: string = 'Invariant failed',
): asserts value is T {
  if (value === undefined || value === null || value === false) {
    throw new Error(message);
  }
}
