import styles from './DotDivider.module.css';

const Dot = () => (
  <div
    aria-hidden="true"
    className={`${styles.dot} w-1.5 h-1.5 lg:width[0.475rem] lg:height[0.475rem]`}
  />
);
/**
 * I'm currently use 3 sizes of tailwind typography:
 * - lg => lower than md:
 * - xl => md:
 * - 2xl => lg:
 *
 * Since I'm fully replacing `hr` element with this custom divider,
 * I have to specify the margins and sizes based on that.
 */

export const DotDivider = () => {
  return (
    <div
      role="separator"
      data-testid="dot-divider"
      className={`${styles.divider} margin[3.111em 0px] md:margin[2.8em 0px] lg:margin[3em 0px]`}
    >
      <Dot />
      <Dot />
      <Dot />
    </div>
  );
};
