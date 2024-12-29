import React from 'react';
import { SubscriptionTier } from '@/components/SubscriptionTier';

const tiers = [
  {
    name: "Free",
    price: "0",
    priceId: "", // Free tier doesn't need a price ID
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
    priceId: "price_silver", // Replace with your actual Stripe price ID
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
    priceId: "price_gold", // Replace with your actual Stripe price ID
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
    priceId: "price_platinum", // Replace with your actual Stripe price ID
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