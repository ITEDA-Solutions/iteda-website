/**
 * Products listing component that renders CMS content
 */

import { renderRichText } from "@/lib/rich-text-renderer";
import { Product } from "@/lib/payload-api";
import ErrorBoundary from "@/components/ui/error-boundary";
import Image from "next/image";

interface ProductsListingProps {
  products: Product[];
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {product.image && (
        <div className="relative h-48">
          <Image
            src={product.image.url}
            alt={product.image.alt || product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
        <div className="prose prose-sm mb-4">
          {renderRichText(product.description)}
        </div>
        {product.link && (
          <a
            href={product.link}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProductsListingCMS({ products }: ProductsListingProps) {
  if (!products || products.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Products</h2>
          <p className="text-gray-600">No products available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <ErrorBoundary fallback={
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Products</h2>
          <p className="text-red-600">Failed to load products.</p>
        </div>
      </div>
    }>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
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