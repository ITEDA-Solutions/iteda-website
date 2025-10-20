import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ITEDA Solutions Terms of Service",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-primary">
            Terms of Service
          </h1>
          <p className="mb-8 text-black/70">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed text-black/80">
                By accessing or using ITEDA Solutions products and services, you
                agree to be bound by these Terms of Service. If you do not agree
                to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                2. Use of Services
              </h2>
              <p className="mb-4 leading-relaxed text-black/80">
                You agree to use our services only for lawful purposes and in
                accordance with these Terms. You agree not to:
              </p>
              <ul className="list-inside list-disc space-y-2 text-black/80">
                <li>
                  Use the services in any way that violates applicable laws
                </li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the services</li>
                <li>Use the services to transmit harmful or malicious code</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                3. Product Warranties
              </h2>
              <p className="leading-relaxed text-black/80">
                Our products come with standard warranties as specified in product
                documentation. We strive to ensure all products meet quality
                standards and perform as described.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                4. Limitation of Liability
              </h2>
              <p className="leading-relaxed text-black/80">
                To the maximum extent permitted by law, ITEDA Solutions shall not
                be liable for any indirect, incidental, special, consequential, or
                punitive damages resulting from your use of our products or
                services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                5. Payment Terms
              </h2>
              <p className="leading-relaxed text-black/80">
                Payment terms are specified in individual product agreements. All
                fees are due as specified and are non-refundable except as
                required by law or explicitly stated in product agreements.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                6. Modifications to Terms
              </h2>
              <p className="leading-relaxed text-black/80">
                We reserve the right to modify these Terms at any time. We will
                notify users of any material changes. Your continued use of our
                services after such modifications constitutes acceptance of the
                updated Terms.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                7. Contact Information
              </h2>
              <p className="leading-relaxed text-black/80">
                For questions about these Terms, please contact us at:{" "}
                <a
                  href="mailto:legal@itedasolutions.com"
                  className="text-link hover:underline"
                >
                  legal@itedasolutions.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}