import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: "ITEDA Solutions | IoT Innovation for Agriculture",
    template: "%s | ITEDA Solutions",
  },
  description:
    "Transforming agriculture with innovative IoT solutions. Discover our Smart Solar Crop Dryer and bridGe payment system.",
  keywords: [
    "IoT",
    "agriculture",
    "solar crop dryer",
    "smart farming",
    "bridGe payment",
    "ITEDA Solutions",
  ],
  authors: [{ name: "ITEDA Solutions" }],
  creator: "ITEDA Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://itedasolutions.com",
    siteName: "ITEDA Solutions",
    title: "ITEDA Solutions | IoT Innovation for Agriculture",
    description:
      "Transforming agriculture with innovative IoT solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ITEDA Solutions | IoT Innovation for Agriculture",
    description:
      "Transforming agriculture with innovative IoT solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
