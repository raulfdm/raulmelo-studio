export const body = {
  preventScroll() {
    document.querySelector('body').style.overflow = 'hidden';
  },
  allowScroll() {
    document.querySelector('body').style.overflow = 'auto';
  },
};
