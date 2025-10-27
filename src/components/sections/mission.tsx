const Mission = () => {
  return (
    <section id="mission" className="relative bg-gradient-to-b from-background to-white py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl animate-pulse-slow" />
      <div className="absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl animate-pulse-slow" style={{animationDelay: '1.5s'}} />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 animate-slide-in-left">
            <div className="mb-6 inline-block">
              <h2 className="text-3xl font-bold text-text md:text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Our Mission
              </h2>
              <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>
            <p className="text-lg leading-relaxed text-text-light animate-fade-in animate-delay-200 border-l-4 border-primary pl-6">
              To empower agricultural communities with innovative IoT solutions
              that enhance productivity, reduce waste, and promote sustainable
              farming practices. We believe technology should be accessible,
              affordable, and transformative for farmers worldwide.
            </p>
          </div>

          <div className="animate-slide-in-right">
            <div className="mb-6 inline-block">
              <h2 className="text-3xl font-bold text-text md:text-4xl bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Our Vision
              </h2>
              <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-accent to-primary" />
            </div>
            <p className="text-lg leading-relaxed text-text-light animate-fade-in animate-delay-200 border-l-4 border-accent pl-6">
              A future where every farmer has access to smart, sustainable
              technology that maximizes yields while minimizing environmental
              impact. Through continuous innovation in IoT and solar technology,
              we're creating solutions that adapt to the unique challenges of
              modern agriculture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;