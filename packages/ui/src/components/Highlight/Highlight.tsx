//@ts-ignore
import styles from './Highlight.module.css';

export const Highlight = ({ children }: HighlightProps) => (
  <span className={styles.highlight}>`{children}`</span>
);

export type HighlightProps = React.ComponentPropsWithoutRef<'span'>;
