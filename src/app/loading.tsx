import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner className="mb-4" />
        <p className="text-gray-600">Loading content...</p>
      </div>
    </div>
  );
}