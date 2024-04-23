import HeroSection from "../components/HeroSection";
import StatisticsSection from "../components/StatisticsSection";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import WatchListSection from "../components/WatchListSection";
import TradingMadeEasier from "../components/TradingMadeEasierSection";
import TokenLaunch from "../components/TokenLaunch";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* <BrandsSection /> */}
      <StatisticsSection />
      <TradingMadeEasier />
      <WhyChooseUsSection />
      <TokenLaunch />
      {/* <ReviewsSection /> */}
      <WatchListSection />
    </>
  );
}
