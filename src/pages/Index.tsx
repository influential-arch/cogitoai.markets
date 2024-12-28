import { BarChart3, TrendingUp, LineChart, Brain } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { SubscriptionTier } from "@/components/SubscriptionTier";

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

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Advanced Market Analysis
          <span className="text-primary"> Powered by AI</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Harness the power of artificial intelligence and institutional-grade analysis
          to make informed trading decisions.
        </p>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Trading Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Choose Your Trading Edge
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => (
            <SubscriptionTier key={index} {...tier} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;