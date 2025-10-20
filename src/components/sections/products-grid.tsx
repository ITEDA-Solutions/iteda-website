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
        "Real-time monitoring",
        "Automated climate control",
        "Mobile app integration",
      ],
    },
    {
      id: 2,
      name: "bridGe Payment Add-on",
      slug: "bridge-payment-addon",
      description:
        "Seamless payment solution integrated with agricultural equipment, enabling easy transactions and financial tracking for farmers.",
      icon: CreditCard,
      features: [
        "Secure transactions",
        "Multiple payment methods",
        "Transaction history",
        "Low fees",
      ],
    },
  ];

  return (
    <section id="products" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-text md:text-4xl">
            Our Products
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-light">
            Innovative solutions designed for modern agriculture
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-xl"
              >
                {/* Image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100" />
                
                <div className="p-8">
                  <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-text">
                    {product.name}
                  </h3>
                  <p className="mb-6 text-text-light">{product.description}</p>
                  <ul className="mb-6 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-text-light">
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">
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