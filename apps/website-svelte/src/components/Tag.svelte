<li>
  <slot />
</li>

<style>
  li {
    font-family: var(--font-sans);
    cursor: default;
    color: var(--color-secondary);
  }

  li:not(:last-child) {
    margin-right: 1rem;
  }
</style>
