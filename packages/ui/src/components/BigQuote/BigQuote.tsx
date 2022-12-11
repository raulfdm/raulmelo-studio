import styles from './BigQuote.module.css';

export const BigQuote = ({ ...props }: BigQuoteProps) => (
  <blockquote data-testid="big-quote" className={styles.bigQuote} {...props} />
);

export type BigQuoteProps = React.ComponentPropsWithoutRef<'blockquote'>;
