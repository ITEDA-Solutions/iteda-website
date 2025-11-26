import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ImageGallery } from "@/components/ui/image-gallery";
import Link from "next/link";
import Image from "next/image";
import { Sun, CreditCard, Check, Smartphone, Leaf, Zap } from "lucide-react";
import type { Metadata } from "next";

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3001";

// Map icon names to Lucide components
const iconMap: Record<string, any> = {
  sun: Sun,
  "credit-card": CreditCard,
  smartphone: Smartphone,
  leaf: Leaf,
  zap: Zap,
};

// Fetch product from CMS
async function getProduct(slug: string) {
  try {
    const res = await fetch(`${PAYLOAD_URL}/api/products?where[slug][equals]=${slug}&depth=2`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data.docs?.[0] || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Fetch all products for static generation
async function getAllProducts() {
  try {
    const res = await fetch(`${PAYLOAD_URL}/api/products?limit=100`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      return [];
    }
    
    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  
  return products.map((product: any) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const metaTitle = product.seo?.metaTitle || `${product.name} | ITEDA Solutions`;
  const metaDescription = product.seo?.metaDescription || product.overview;
  const ogImage = product.seo?.ogImage?.url || product.featuredImage?.url;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
      url: `https://itedasolutions.com/products/${slug}`,
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Get icon component
  const Icon = iconMap[product.icon] || Sun;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <section className="border-b border-black/10 bg-white py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "Products", href: "/#products" },
              { label: product.name },
            ]}
          />
        </div>
      </section>

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
                <Link href={product.ctaLink || "/#contact"}>
                  {product.ctaText || "Request Demo"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {product.featuredImage?.url && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="relative aspect-video overflow-hidden rounded-lg border border-black/10">
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.alt || product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-primary">
              Product Overview
            </h2>
            <p className="text-lg leading-relaxed text-black/80 whitespace-pre-line">
              {product.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {product.gallery && product.gallery.length > 0 && (
        <section className="bg-black/5 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-3xl font-bold text-primary">
                Product Gallery
              </h2>
              <ImageGallery images={product.gallery} productName={product.name} />
            </div>
          </div>
        </section>
      )}

      {/* Key Features */}
      {product.features && product.features.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-3xl font-bold text-primary">
                Key Features
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {product.features.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg bg-black/5 p-4"
                  >
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-success" />
                    <span className="text-black/80">{item.feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technical Specifications */}
      {product.specifications && product.specifications.length > 0 && (
        <section className="bg-black/5 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-3xl font-bold text-primary">
                Technical Specifications
              </h2>
              <div className="overflow-hidden rounded-lg border border-black/10">
                <table className="w-full">
                  <tbody className="divide-y divide-black/10">
                    {product.specifications.map((item: any, index: number) => (
                      <tr
                        key={index}
                        className="bg-white transition-colors hover:bg-black/5"
                      >
                        <td className="px-6 py-4 font-medium text-primary">
                          {item.spec}
                        </td>
                        <td className="px-6 py-4 text-black/70">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      {product.useCases && product.useCases.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-3xl font-bold text-primary">Use Cases</h2>
              <ul className="space-y-3">
                {product.useCases.map((item: any, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span className="text-lg text-black/80">{item.useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

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
                <Link href={product.ctaLink || "/#contact"}>
                  {product.ctaText || "Contact Us"}
                </Link>
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
