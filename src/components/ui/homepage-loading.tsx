/**
 * Loading component for homepage content
 */

import LoadingSpinner from "./loading-spinner";

export default function HomepageLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero placeholder */}
      <div className="h-96 bg-gray-200 animate-pulse"></div>
      
      {/* Mission/Vision loading */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <LoadingSpinner className="py-8" />
            <p className="text-gray-600 mt-4">Loading mission and vision...</p>
          </div>
        </div>
      </section>

      {/* Products loading */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-48 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 animate-pulse rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded mb-4 w-3/4"></div>
                  <div className="h-10 bg-gray-200 animate-pulse rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional sections loading */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-64 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg p-8 shadow-md">
                <div className="h-6 bg-gray-200 animate-pulse rounded mb-4 w-48"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}