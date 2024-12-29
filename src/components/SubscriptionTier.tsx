import { Check } from "lucide-react";
import { StripeCheckout } from "./StripeCheckout";

interface SubscriptionTierProps {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
  priceId: string;
}

export const StripeCheckout = ({ name, price, features, popular, priceId }: SubscriptionTierProps) => {
  return (
    <div className={`subscription-card relative ${popular ? 'border-primary/50' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="h-5 w-5 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <StripeCheckout priceId={priceId} buttonText="Get Started" />
    </div>
  );
};