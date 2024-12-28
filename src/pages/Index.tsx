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
      {/* Hero Section - Inspired by pocketbroker.com */}
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
          
          {/* Stats Section - Inspired by pocketbroker.com */}
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
        </div>
      </section>

      {/* Features Section - Glass morphism from octabroker.com */}
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

      {/* Pricing Section - Inspired by octabroker.com */}
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
    </div>
  );
};

export default Index;