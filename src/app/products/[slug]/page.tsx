import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sun, CreditCard, Check } from "lucide-react";
import type { Metadata } from "next";

const products = {
  "smart-solar-crop-dryer": {
    name: "Smart Solar Crop Dryer",
    icon: Sun,
    tagline: "Sustainable, Solar-Powered Crop Preservation",
    overview:
      "Our Smart Solar Crop Dryer is a revolutionary IoT-enabled system that uses solar energy to dry crops efficiently, reducing post-harvest losses and ensuring consistent quality. Perfect for small to medium-sized farms.",
    features: [
      "100% solar-powered operation - zero electricity costs",
      "Real-time temperature and humidity monitoring",
      "Automated climate control system",
      "Mobile app for remote monitoring and alerts",
      "Weather-resistant design",
      "Capacity: 100-500kg per batch",
      "Reduces drying time by 40%",
      "Maintains optimal moisture levels (10-12%)",
    ],
    specifications: {
      "Power Source": "Solar panels (300W)",
      "Drying Capacity": "100-500kg per batch",
      "Drying Time": "24-48 hours (weather dependent)",
      "Temperature Range": "40-65°C",
      "Humidity Control": "Automated ventilation system",
      "Connectivity": "4G/WiFi IoT module",
      "Dimensions": "3m x 2m x 2.5m",
      "Warranty": "2 years",
    },
    useCases: [
      "Grain drying (maize, rice, wheat)",
      "Fruit preservation (mangoes, bananas)",
      "Vegetable drying",
      "Coffee bean processing",
      "Herb and spice drying",
    ],
  },
  "bridge-payment-addon": {
    name: "bridGe Payment Add-on",
    icon: CreditCard,
    tagline: "Seamless Payments for Google Forms",
    overview:
      "bridGe is a powerful Google Forms add-on that enables secure payment collection directly within your forms. Perfect for agricultural equipment rentals, product sales, and service bookings.",
    features: [
      "Integrate payments into Google Forms",
      "Support for M-Pesa, card payments, and bank transfers",
      "Automatic payment confirmation emails",
      "Real-time transaction tracking",
      "Secure PCI-DSS compliant processing",
      "No coding required - easy setup",
      "Detailed transaction reports",
      "Multi-currency support",
    ],
    specifications: {
      "Platform": "Google Forms Add-on",
      "Payment Methods": "M-Pesa, Visa, Mastercard, Bank Transfer",
      "Transaction Fee": "2.5% + KES 10 per transaction",
      "Settlement Time": "T+1 business days",
      "Supported Currencies": "KES, USD, EUR",
      "Security": "PCI-DSS Level 1 compliant",
      "API Access": "Available on Business plan",
      "Support": "Email, Phone, Live Chat",
    },
    useCases: [
      "Equipment rental payments",
      "Product order forms with payment",
      "Service booking with deposits",
      "Event registration with fees",
      "Subscription collection",
    ],
  },
};

type ProductSlug = keyof typeof products;

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug as ProductSlug];

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | ITEDA Solutions`,
    description: product.overview,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products[slug as ProductSlug];

  if (!product) {
    notFound();
  }

  const Icon = product.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="border-b border-black/10 bg-gradient-to-br from-white via-white to-black/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex rounded-full bg-accent/10 p-6">
              <Icon className="h-16 w-16 text-accent" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
              {product.name}
            </h1>
            <p className="mb-8 text-xl text-black/70">{product.tagline}</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/#contact">Request Demo</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              Product Overview
            </h2>
            <p className="text-lg leading-relaxed text-black/80">
              {product.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-black/5 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold text-primary">
              Key Features
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {product.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg bg-white p-4"
                >
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-success" />
                  <span className="text-black/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold text-primary">
              Technical Specifications
            </h2>
            <div className="overflow-hidden rounded-lg border border-black/10">
              <table className="w-full">
                <tbody className="divide-y divide-black/10">
                  {Object.entries(product.specifications).map(
                    ([key, value], index) => (
                      <tr
                        key={index}
                        className="bg-white transition-colors hover:bg-black/5"
                      >
                        <td className="px-6 py-4 font-medium text-primary">
                          {key}
                        </td>
                        <td className="px-6 py-4 text-black/70">{value}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-black/5 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold text-primary">Use Cases</h2>
            <ul className="space-y-3">
              {product.useCases.map((useCase, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-lg text-black/80">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-black/10 bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-primary">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-black/70">
              Contact us today to learn more about {product.name} and how it can
              transform your operations.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/#contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}