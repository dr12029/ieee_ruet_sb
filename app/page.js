import HeroSection from "@/components/HeroSection";
import FeaturedMembersCarousel from "@/components/FeaturedMembersCarousel";
import VisionMission from "@/components/VisionMission";
import AchievementsSection from "@/components/AchievementsSection";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";
import RecentEventsSection from "@/components/RecentEventsSection";
import PublicationsSection from "@/components/PublicationsSection";
import StatisticsSection from "@/components/StatisticsSection";
import {
  featuredAchievements,
  recentPublications,
  statistics,
} from "@/data/homePageData";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <VisionMission />
      <FeaturedMembersCarousel />
      <AchievementsSection achievements={featuredAchievements} />
      <UpcomingEventsSection />
      <RecentEventsSection />
      <PublicationsSection publications={recentPublications} />
      <StatisticsSection statistics={statistics} />
    </div>
  );
}
