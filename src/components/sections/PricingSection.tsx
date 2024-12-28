import React from 'react';
import { SubscriptionTier } from '@/components/SubscriptionTier';

const tiers = [
  {
    name: "Free",
    price: "0",
    features: [
      "Basic market analysis",
      "Limited historical data",
      "Daily market summary",
      "Community access",
    ],
  },
  {
    name: "Silver",
    price: "29",
    features: [
      "Advanced market analysis",
      "Full historical data",
      "Real-time alerts",
      "Priority support",
    ],
  },
  {
    name: "Gold",
    price: "79",
    features: [
      "Premium market insights",
      "AI-powered forecasting",
      "Custom alerts",
      "1-on-1 consultation",
    ],
    popular: true,
  },
  {
    name: "Platinum",
    price: "199",
    features: [
      "Institutional-grade analysis",
      "API access",
      "Custom reporting",
      "Dedicated account manager",
    ],
  },
];

export const PricingSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Choose Your Trading Edge
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <SubscriptionTier {...tier} />
          </div>
        ))}
      </div>
    </section>
  );
};