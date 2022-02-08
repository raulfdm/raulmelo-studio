//@ts-ignore
import styles from './ProseContainer.module.css';

export const ProseContainer = (props: any) => (
  <article {...props} className={`${styles.container} prose-container`} />
);
