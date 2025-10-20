import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ITEDA Solutions Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-primary">
            Privacy Policy
          </h1>
          <p className="mb-8 text-black/70">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                1. Information We Collect
              </h2>
              <p className="mb-4 leading-relaxed text-black/80">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-inside list-disc space-y-2 text-black/80">
                <li>Name and contact information</li>
                <li>Email address and phone number</li>
                <li>Company name and business information</li>
                <li>Payment and transaction data (when applicable)</li>
                <li>Communications with us</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                2. How We Use Your Information
              </h2>
              <p className="mb-4 leading-relaxed text-black/80">
                We use the information we collect to:
              </p>
              <ul className="list-inside list-disc space-y-2 text-black/80">
                <li>Provide, maintain, and improve our products and services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                3. Information Sharing
              </h2>
              <p className="leading-relaxed text-black/80">
                We do not sell, trade, or otherwise transfer your personal
                information to third parties without your consent, except as
                required by law or as necessary to provide our services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                4. Data Security
              </h2>
              <p className="leading-relaxed text-black/80">
                We implement appropriate technical and organizational security
                measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                5. Your Rights
              </h2>
              <p className="mb-4 leading-relaxed text-black/80">
                You have the right to:
              </p>
              <ul className="list-inside list-disc space-y-2 text-black/80">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                6. Contact Us
              </h2>
              <p className="leading-relaxed text-black/80">
                If you have questions about this Privacy Policy, please contact us
                at:{" "}
                <a
                  href="mailto:privacy@itedasolutions.com"
                  className="text-link hover:underline"
                >
                  privacy@itedasolutions.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}