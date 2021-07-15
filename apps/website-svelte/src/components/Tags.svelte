<ul>
  <slot />
</ul>

<style>
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style: none;

    font-size: 1rem;
    line-height: 1.5rem;
  }

  ul > * {
    margin-right: 1rem;
  }
</style>
