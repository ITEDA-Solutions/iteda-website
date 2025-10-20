import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-text md:text-5xl lg:text-6xl">
              Smart Solar IoT for{" "}
              <span className="text-primary">Sustainable Agriculture</span>
            </h1>
            <p className="text-lg text-text-light md:text-xl">
              Revolutionizing crop drying with solar-powered technology and
              real-time IoT monitoring
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/#products">Explore Solutions</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#demo">Watch Demo</Link>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-xl">
              <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-green-100 to-blue-100">
                {/* Placeholder for product image */}
                <div className="flex h-full items-center justify-center text-center">
                  <div className="space-y-2">
                    <div className="mx-auto h-24 w-24 rounded-full bg-primary/20" />
                    <p className="text-sm text-text-light">
                      Smart Solar Crop Dryer
                    </p>
                  </div>
                </div>
              </div>
              {/* IoT Badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-md">
                <div className="h-8 w-8 rounded-lg bg-primary" />
                <div>
                  <p className="text-xs font-semibold text-text">
                    IoT Connected
                  </p>
                  <p className="text-xs text-text-light">Real-time monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;