import "../styles/loading-overlay.scss";

const LoadingOverlay = ({ visible, message }) => {
  if (!visible) return null;

  return (
    <div className="loading-overlay">
      <div className="loader">
        <div className="spinner"></div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default LoadingOverlay;
