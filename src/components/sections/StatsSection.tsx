import React from 'react';

export const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      <div className="glass-card p-6 animate-float">
        <div className="text-3xl font-bold text-primary mb-2">500K+</div>
        <div className="text-muted-foreground">Data Points Analyzed</div>
      </div>
      <div className="glass-card p-6 animate-float [animation-delay:200ms]">
        <div className="text-3xl font-bold text-primary mb-2">98%</div>
        <div className="text-muted-foreground">Accuracy Rate</div>
      </div>
      <div className="glass-card p-6 animate-float [animation-delay:400ms]">
        <div className="text-3xl font-bold text-primary mb-2">24/7</div>
        <div className="text-muted-foreground">Market Monitoring</div>
      </div>
    </div>
  );
};