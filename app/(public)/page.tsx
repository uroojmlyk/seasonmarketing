




import HeroSection from "@/features/home/components/HeroSection";
import MarqueeStrip from "@/features/home/components/MarqueeStrip";
import CategoriesSection from "@/features/home/components/CategoriesSection";
import CitiesSection from "@/features/home/components/CitiesSection";
import FeaturedSection from "@/features/home/components/FeaturedSection";
import NewProjectsSection from "@/features/home/components/NewProjectsSection";
import ProjectsSection from "@/features/home/components/ProjectsSection";
import HowItWorksSection from "@/features/home/components/HowItWorksSection";
import SellCtaSection from "@/features/home/components/SellCtaSection";
import WantedSection from "@/features/home/components/WantedSection";
import TrustSection from "@/features/home/components/TrustSection";
import GuidesSection from "@/features/home/components/GuidesSection";
import AppCtaSection from "@/features/home/components/AppCtaSection";

export default function HomePage() {
  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <HeroSection />
      <MarqueeStrip />
      <CategoriesSection />
      <CitiesSection />
      <FeaturedSection />
      <NewProjectsSection />
      <ProjectsSection />
      <HowItWorksSection />
      <SellCtaSection />
      <WantedSection />
      <TrustSection />
      <GuidesSection />
      <AppCtaSection />
    </>
  );
}