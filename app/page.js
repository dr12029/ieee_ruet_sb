import HeroSection from "@/components/HeroSection";
import FeaturedMembersCarousel from "@/components/FeaturedMembersCarousel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedMembersCarousel />
    </div>
  );
}
