/**
 * Products listing component that renders CMS content
 */

import { renderRichText } from "@/lib/rich-text-renderer";
import { Product } from "@/lib/payload-api";
import ErrorBoundary from "@/components/ui/error-boundary";
import Image from "next/image";
import Link from "next/link";

interface ProductsListingProps {
  products: Product[];
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all hover:scale-105 block group"
    >
      {product.image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={product.image.url}
            alt={product.image.alt || product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-primary-dark transition-colors">{product.name}</h3>
        <div className="prose prose-sm mb-4 text-text-light line-clamp-3">
          {renderRichText(product.description)}
        </div>
        <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
          View Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function ProductsListingCMS({ products }: ProductsListingProps) {
  if (!products || products.length === 0) {
    return (
      <section className="py-16" id="products">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-primary">Our Products</h2>
          <p className="text-text-light">No products available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <ErrorBoundary fallback={
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-primary">Our Products</h2>
          <p className="text-danger">Failed to load products.</p>
        </div>
      </div>
    }>
      <section className="py-16 bg-gradient-to-br from-white to-green-50/30" id="products">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-primary">Our Products</h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Explore our innovative IoT solutions for sustainable agriculture
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}