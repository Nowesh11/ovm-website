import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import Services from "@/components/Services";
import LatestNews from "@/components/LatestNews";
import FeaturedProjects from "@/components/FeaturedProjects";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsSection />
        <Services />
        <LatestNews />
        <FeaturedProjects />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
