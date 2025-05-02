import './NotFound.scss';

export default function NotFound() {
  return (
    <div role='alert' className="notfound">
      <h1 className="notfound__title">404</h1>
      <p className="notfound__message">
        Page not found. Try a cocktail from the sidebar.
      </p>
    </div>
  );
}
