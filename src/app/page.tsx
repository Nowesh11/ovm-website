import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      <StatsSection />
      <Services />
      <div className="h-[80vh] bg-ink" />
    </main>
  );
}
