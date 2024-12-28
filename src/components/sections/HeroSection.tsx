import React from 'react';

export const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-12 text-center">
      <div className="animate-fade-in space-y-6">
        {/* Logo Section */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/718b916a-f9d6-4ed6-bd92-7ae97e9bc016.png"
            alt="Cogito AI Logo"
            className="h-32 mx-auto animate-float hover:scale-105 transition-transform duration-300"
          />
          <p className="text-lg text-primary mt-4 font-semibold tracking-wider animate-glow">
            SEIZE THE MOMENT. MASTER THE MARKET
          </p>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Advanced Market Analysis
          <span className="text-primary block mt-2">Powered by AI</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Harness the power of artificial intelligence and institutional-grade analysis
          to make informed trading decisions.
        </p>
      </div>
    </section>
  );
};