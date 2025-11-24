import Hero from "@/components/sections/hero";
import ContactForm from "@/components/sections/contact-form-enhanced";
import HomepageCMSContent from "@/components/sections/homepage-cms-content";
import { Suspense } from "react";
import HomepageLoading from "@/components/ui/homepage-loading";
import ErrorBoundary from "@/components/ui/error-boundary";
import CMSErrorFallback from "@/components/ui/cms-error-fallback";

export default function HomePage() {
  return (
    <>
      <Hero />
      
      <ErrorBoundary fallback={<CMSErrorFallback />}>
        <Suspense fallback={<HomepageLoading />}>
          <HomepageCMSContent />
        </Suspense>
      </ErrorBoundary>

      <ContactForm />
    </>
  );
}
