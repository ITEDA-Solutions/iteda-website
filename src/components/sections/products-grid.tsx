import { Button } from "@/components/ui/button";
import { Sun, CreditCard } from "lucide-react";
import Link from "next/link";

const ProductsGrid = () => {
  const products = [
    {
      id: 1,
      name: "Smart Solar Crop Dryer",
      slug: "smart-solar-crop-dryer",
      description:
        "Solar-powered IoT crop drying system that optimizes moisture levels, reduces post-harvest losses, and ensures consistent quality.",
      icon: Sun,
      features: [
        "Solar-powered operation",
        "Remote monitoring",
        "Automated climate control",
        "Real-time Data Collection",
      ],
    },
    // {
    //   id: 2,
    //   name: "bridGe Payment Add-on",
    //   slug: "bridge-payment-addon",
    //   description:
    //     "Seamless payment solution integrated with agricultural equipment, enabling easy transactions and financial tracking for farmers.",
    //   icon: CreditCard,
    //   features: [
    //     "Secure transactions",
    //     "Multiple payment methods",
    //     "Transaction history",
    //     "Low fees",
    //   ],
    // },
  ];

  return (
    <section id="products" className="relative bg-gradient-to-b from-white to-green-50/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center animate-slide-up">
          <h2 className="mb-4 text-3xl font-bold text-text md:text-4xl">
            Our Products
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-light">
            Innovative solutions designed for modern agriculture
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {products.map((product, idx) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg hover-lift hover-glow animate-fade-in"
                style={{animationDelay: `${idx * 150}ms`}}
              >
                {/* Image placeholder with gradient */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-green-100 via-blue-100 to-green-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white/50 p-8 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-accent/10 to-primary/10 p-3 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-text transition-colors group-hover:text-primary">
                    {product.name}
                  </h3>
                  <p className="mb-6 text-text-light leading-relaxed">{product.description}</p>
                  <ul className="mb-6 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-text-light">
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full group-hover:shadow-lg transition-shadow">
                    <Link href={`/products/${product.slug}`}>Learn More →</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;