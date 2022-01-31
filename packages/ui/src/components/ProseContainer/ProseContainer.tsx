import styles from './ProseContainer.module.css';

export const ProseContainer = (props) => (
  <article {...props} className={`${styles.container} prose-container`} />
);
