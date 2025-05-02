interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="error">
      <p className="error__message">{error}</p>
      <button className="error__button" onClick={onRetry}>
        Retry the request
      </button>
    </div>
  );
}
