import styles from './NotFound.module.scss';

export default function NotFound() {
  return (
    <div role="alert" className={styles.notfound}>
      <h1 className={styles.notfound__title}>404</h1>
      <p className={styles.notfound__message}>
        Page not found. Try a cocktail from the sidebar.
      </p>
    </div>
  );
}
