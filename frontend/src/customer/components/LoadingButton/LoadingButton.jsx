function LoadingButton({
  loading,
  children,
  className = "",
  ...props
}) {
  return (
    <button
      disabled={loading}
      {...props}
      className={`${className} ${
        loading
          ? "cursor-not-allowed opacity-80"
          : ""
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default LoadingButton;