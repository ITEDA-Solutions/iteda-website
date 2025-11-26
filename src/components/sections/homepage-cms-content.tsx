/**
 * Homepage CMS content wrapper with loading and error states
 */

'use client';

import { useEffect, useState } from 'react';
import { getHomepageContent } from '@/lib/payload-api';
import MissionVisionCMS from './mission-vision-cms';
import ProductsListingCMS from './products-listing-cms';
import HomepageSectionsCMS from './homepage-sections-cms';
import HomepageLoading from '@/components/ui/homepage-loading';
import CMSErrorFallback from '@/components/ui/cms-error-fallback';
import ErrorBoundary from '@/components/ui/error-boundary';

interface HomepageContent {
  sections: any[];
  about: any;
  products: any[];
  siteSettings: any;
}

export default function HomepageCMSContent() {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getHomepageContent();
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load content'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  if (loading) {
    return <HomepageLoading />;
  }

  if (error || !content) {
    return <CMSErrorFallback error={error || undefined} retry={fetchContent} />;
  }

  const { sections, about, products } = content;

  return (
    <ErrorBoundary fallback={<CMSErrorFallback retry={fetchContent} />}>
      <MissionVisionCMS about={about} />
      <ProductsListingCMS products={products} />
      <HomepageSectionsCMS sections={sections} />
    </ErrorBoundary>
  );
}