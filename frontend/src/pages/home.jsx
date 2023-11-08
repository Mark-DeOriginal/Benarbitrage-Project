import HeroSection from "../components/HeroSection";
import BrandsSection from "../components/BrandsSection";
import StatisticsSection from "../components/StatisticsSection";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import WatchListSection from "../components/WatchListSection";
import TradingMadeEasier from "../components/TradingMadeEasierSection";
import ReviewsSection from "../components/ReviewsSection";
import { MetaData } from "../metadata";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandsSection />
      <StatisticsSection />
      <TradingMadeEasier />
      <WhyChooseUsSection />
      <ReviewsSection />
      <WatchListSection />
    </>
  );
}
