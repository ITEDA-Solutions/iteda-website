/**
 * Homepage sections component that renders CMS content with proper ordering
 */

import { renderRichText } from "@/lib/rich-text-renderer";
import { HomepageSection } from "@/lib/payload-api";
import ErrorBoundary from "@/components/ui/error-boundary";

interface HomepageSectionsProps {
  sections: HomepageSection[];
}

function SectionCard({ section }: { section: HomepageSection }) {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md">
      <h3 className="text-2xl font-semibold mb-4 capitalize">
        {section.sectionType.replace(/([A-Z])/g, ' $1').trim()}
      </h3>
      <div className="prose prose-lg">
        {renderRichText(section.content)}
      </div>
    </div>
  );
}

export default function HomepageSectionsCMS({ sections }: HomepageSectionsProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  // Sort sections by order to ensure proper ordering
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <ErrorBoundary fallback={
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">Failed to load additional content sections.</p>
        </div>
      </div>
    }>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Additional Content</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {sortedSections.map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}