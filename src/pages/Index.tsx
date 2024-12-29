import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { NavBar } from "@/components/NavBar";

export default function Index() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="pt-16">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <PricingSection />
      </div>
    </div>
  );
}