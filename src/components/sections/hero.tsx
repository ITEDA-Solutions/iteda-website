import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-green-50 py-20 md:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-20 h-72 w-72 animate-pulse-slow rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-4 top-40 h-96 w-96 animate-pulse-slow rounded-full bg-accent/5 blur-3xl" style={{animationDelay: '1s'}} />
      </div>
      
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6 animate-slide-in-left">
            <h1 className="text-4xl font-bold leading-tight text-text md:text-5xl lg:text-6xl">
              Smart Solar{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Crop Dryer
              </span>
            </h1>
            <p className="text-lg text-text-light md:text-xl animate-fade-in animate-delay-200">
              Revolutionizing crop drying with solar-powered technology and
              real-time IoT monitoring
            </p>
            <div className="flex flex-col gap-4 sm:flex-row animate-fade-in animate-delay-300">
              <Button asChild size="lg" className="hover-glow">
                <Link href="/#products">Explore Solutions</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover:border-primary hover:text-primary">
                <Link href="#demo">Watch Demo</Link>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-xl hover-lift">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/hero-solar-dryer.jpg"
                  alt="Smart Solar Crop Dryer - ITEDA Solutions IoT agricultural technology"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              {/* IoT Badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-lg animate-scale-in animate-delay-400 hover-lift">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent animate-pulse-slow" />
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