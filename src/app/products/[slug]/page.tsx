'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Loader2 } from 'lucide-react';

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';

interface Product {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  overview?: string;
  featuredImage?: {
    url: string;
    alt?: string;
  };
  features?: Array<{
    title: string;
    description?: string;
  }>;
  specifications?: Array<{
    label: string;
    value: string;
  }>;
  useCases?: Array<{
    title: string;
  }>;
  cta?: {
    title?: string;
    description?: string;
  };
}

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${PAYLOAD_URL}/api/products?where[slug][equals]=${slug}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.docs && data.docs.length > 0) {
          setProduct(data.docs[0]);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-text-light">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="border-b border-black/10 bg-gradient-to-br from-white via-white to-black/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            {product.featuredImage && (
              <div className="mb-8 relative h-64 md:h-96 rounded-2xl overflow-hidden">
                <Image
                  src={
                    product.featuredImage.url.startsWith('http')
                      ? product.featuredImage.url
                      : `${PAYLOAD_URL}${product.featuredImage.url}`
                  }
                  alt={product.featuredImage.alt || product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
              {product.name}
            </h1>
            {product.tagline && (
              <p className="mb-8 text-xl text-black/70">{product.tagline}</p>
            )}
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
      {product.overview && (
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
      )}

      {/* Key Features */}
      {product.features && product.features.length > 0 && (
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
                    <div>
                      <p className="font-semibold text-text">{feature.title}</p>
                      {feature.description && (
                        <p className="text-sm text-black/70 mt-1">{feature.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technical Specifications */}
      {product.specifications && product.specifications.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-3xl font-bold text-primary">
                Technical Specifications
              </h2>
              <div className="overflow-hidden rounded-lg border border-black/10">
                <table className="w-full">
                  <tbody className="divide-y divide-black/10">
                    {product.specifications.map((spec, index) => (
                      <tr
                        key={index}
                        className="bg-white transition-colors hover:bg-black/5"
                      >
                        <td className="px-6 py-4 font-medium text-primary">
                          {spec.label}
                        </td>
                        <td className="px-6 py-4 text-black/70">{spec.value}</td>
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
        <section className="bg-black/5 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-3xl font-bold text-primary">Use Cases</h2>
              <ul className="space-y-3">
                {product.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span className="text-lg text-black/80">{useCase.title}</span>
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
              {product.cta?.title || 'Ready to Get Started?'}
            </h2>
            <p className="mb-8 text-lg text-black/70">
              {product.cta?.description || `Contact us today to learn more about ${product.name} and how it can transform your operations.`}
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