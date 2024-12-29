import React from 'react';
import { SubscriptionTier } from '@/components/SubscriptionTier';

const tiers = [
  {
    name: "Free",
    price: "0",
    priceId: "price_free",
    features: [
      "10% access to all features",
      "Basic market analysis",
      "Limited historical data",
      "Basic forecasts",
    ],
  },
  {
    name: "Silver",
    price: "29",
    priceId: "price_silver",
    features: [
      "50% access to all features",
      "Advanced market analysis",
      "Extended historical data",
      "Priority support",
    ],
  },
  {
    name: "Gold",
    price: "79",
    priceId: "price_gold",
    features: [
      "75% access to all features",
      "Premium data visualizations",
      "Detailed market reports",
      "1-on-1 consultation",
    ],
    popular: true,
  },
  {
    name: "Platinum",
    price: "199",
    priceId: "price_platinum",
    features: [
      "100% access to all features",
      "Institutional-grade analysis",
      "Custom API access",
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