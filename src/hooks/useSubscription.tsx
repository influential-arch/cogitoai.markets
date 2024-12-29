import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export type SubscriptionTier = "free" | "silver" | "gold" | "platinum";

export const useSubscription = () => {
  const { data: session } = await supabase.auth.getSession();

  const { data: tier = "free" } = useQuery({
    queryKey: ["subscription", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return "free";
      
      const { data: subscription } = await supabase
        .from("user_subscriptions")
        .select("tier")
        .eq("user_id", session.user.id)
        .single();
      
      return subscription?.tier || "free";
    },
    enabled: !!session?.user?.id,
  });

  const getAccessPercentage = (userTier: SubscriptionTier) => {
    switch (userTier) {
      case "platinum":
        return 100;
      case "gold":
        return 75;
      case "silver":
        return 50;
      default:
        return 10;
    }
  };

  const hasAccess = (requiredTier: SubscriptionTier) => {
    const tiers: SubscriptionTier[] = ["free", "silver", "gold", "platinum"];
    const userTierIndex = tiers.indexOf(tier as SubscriptionTier);
    const requiredTierIndex = tiers.indexOf(requiredTier);
    return userTierIndex >= requiredTierIndex;
  };

  return {
    tier,
    hasAccess,
    getAccessPercentage,
  };
};