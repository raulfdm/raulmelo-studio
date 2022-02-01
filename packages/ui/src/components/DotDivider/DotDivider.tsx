//@ts-ignore
import styles from './DotDivider.module.css';

const Dot = () => (
  <div
    aria-hidden="true"
    className={`${styles.dot} w-1.5 h-1.5 lg:w[0.475rem] lg:h[0.475rem]`}
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
      className={`${styles.divider} my-[3.111em] md:my-[2.8em] lg:my-[3em]`}
    >
      <Dot />
      <Dot />
      <Dot />
    </div>
  );
};
