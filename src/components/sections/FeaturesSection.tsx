import React from 'react';
import { FeatureCard } from '@/components/FeatureCard';
import { BarChart3, TrendingUp, LineChart, Brain } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "COT Analysis",
    description: "Deep insights into market positioning from Commitment of Traders reports",
  },
  {
    icon: TrendingUp,
    title: "Smart Money Concepts",
    description: "Track institutional trading patterns and market structure",
  },
  {
    icon: LineChart,
    title: "Similar Years Analysis",
    description: "Historical pattern recognition for market forecasting",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Advanced algorithms for market sentiment and trend analysis",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Powerful Trading Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <FeatureCard {...feature} />
          </div>
        ))}
      </div>
    </section>
  );
};