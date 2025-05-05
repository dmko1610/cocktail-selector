import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className={styles.error}>
      <p className={styles.error__message}>{error}</p>
      <button className={styles.error__button} onClick={onRetry}>
        Retry the request
      </button>
    </div>
  );
}
