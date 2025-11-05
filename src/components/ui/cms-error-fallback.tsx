/**
 * Error fallback component for CMS content failures
 */

interface CMSErrorFallbackProps {
  error?: Error;
  retry?: () => void;
}

export default function CMSErrorFallback({ error, retry }: CMSErrorFallbackProps) {
  return (
    <div className="py-16 bg-red-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">Content Unavailable</h3>
          <p className="text-red-700 mb-4">
            We're having trouble loading content from our CMS. Please try again later.
          </p>
          {error && (
            <details className="text-sm text-red-600 mb-4">
              <summary className="cursor-pointer">Error Details</summary>
              <p className="mt-2 text-left bg-red-100 p-2 rounded">
                {error.message}
              </p>
            </details>
          )}
          {retry && (
            <button
              onClick={retry}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}