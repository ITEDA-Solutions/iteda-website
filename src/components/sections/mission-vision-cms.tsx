/**
 * Mission and Vision component that renders CMS content
 */

import { renderRichText } from "@/lib/rich-text-renderer";
import { AboutContent } from "@/lib/payload-api";
import ErrorBoundary from "@/components/ui/error-boundary";

interface MissionVisionProps {
  about: AboutContent;
}

export default function MissionVisionCMS({ about }: MissionVisionProps) {
  if (!about.mission && !about.vision) {
    return null;
  }

  return (
    <ErrorBoundary fallback={
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">Failed to load mission and vision content.</p>
        </div>
      </div>
    }>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {about.mission && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
                <div className="prose prose-lg mx-auto text-center">
                  {renderRichText(about.mission)}
                </div>
              </div>
            )}
            
            {about.vision && (
              <div>
                <h2 className="text-3xl font-bold text-center mb-8">Our Vision</h2>
                <div className="prose prose-lg mx-auto text-center">
                  {renderRichText(about.vision)}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}