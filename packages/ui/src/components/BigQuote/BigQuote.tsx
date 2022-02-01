//@ts-ignore
import styles from './BigQuote.module.css';

export const BigQuote = ({ ...props }: BigQuoteProps) => (
  <blockquote className={styles.bigQuote} {...props} />
);

export type BigQuoteProps = React.ComponentPropsWithoutRef<'blockquote'>;
