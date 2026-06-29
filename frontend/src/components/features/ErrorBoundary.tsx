import React from 'react';

export const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setHasError(true);
    window.addEventListener('error', handler);
    return () => window.removeEventListener('error', handler);
  }, []);

  if (hasError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <h3 className="font-semibold text-red-900">Something went wrong</h3>
        <p className="mt-2 text-sm text-red-700">Please refresh the page and try again.</p>
        <button
          onClick={() => {
            setHasError(false);
            window.location.reload();
          }}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Refresh
        </button>
      </div>
    );
  }

  return <>{children}</>;
};
