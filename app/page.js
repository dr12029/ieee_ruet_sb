import HeroSection from "@/components/HeroSection";
import FeaturedMembersCarousel from "@/components/FeaturedMembersCarousel";
import VisionMission from "@/components/VisionMission";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedMembersCarousel />
      <VisionMission />
    </div>
  );
}
