import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import FloatingCatalogueButton from "@/components/FloatingCatalogueButton";
import StatsSection from "@/components/StatsSection";
import AboutTimeline from "@/components/AboutTimeline";
import AboutContent, { AboutExpertise } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About — OVM Malaysia",
  description:
    "Founded in 1966, OVM has grown to become a leading specialist in prestressing technology and advanced construction techniques, and has partnered in Malaysia's infrastructure development since 2015.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <AboutContent />

        {/* StatsSection is built to tuck under a hero with a negative top
            margin; the wrapper's padding cancels that out here. */}
        <div className="pt-24 sm:pt-28 lg:pt-32">
          <StatsSection />
        </div>

        <AboutExpertise />
        <AboutTimeline />
        <CTASection />
      </main>
      <Footer />

      {/* The general engineering solutions catalogue, in the same floating
          treatment the technology pages use. Outside <main> so it is fixed
          against the viewport. */}
      <FloatingCatalogueButton catalogueUrl="/catalogues/OVM-Engineering-Solutions-2024.pdf" />
    </>
  );
}
