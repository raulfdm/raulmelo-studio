export function clickAway(node: HTMLElement) {
  function handleClick(event: Event) {
    if (node && !node.contains(event.target as Node)) {
      node.dispatchEvent(new CustomEvent(`click_away`));
    }
  }

  document.addEventListener(`scroll`, handleClick);
  document.addEventListener(`mousedown`, handleClick);
  document.addEventListener(`touchstart`, handleClick);

  return {
    destroy() {
      document.removeEventListener(`scroll`, handleClick);
      document.removeEventListener(`mousedown`, handleClick);
      document.removeEventListener(`touchstart`, handleClick);
    },
  };
}
