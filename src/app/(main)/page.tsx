import { CategorySection } from "@/components/home/CategorySection";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { SeasonalBanner } from "@/components/home/SeasonalBanner";
import { WhyFarmGo } from "@/components/home/WhyFarmGo";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategorySection />
      <ProductShowcase />
      <SeasonalBanner />
      <WhyFarmGo />
      <NewsletterCTA />
    </main>
  );
}
