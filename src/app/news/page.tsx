import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import NewsIndex from "@/components/NewsIndex";

export const metadata: Metadata = {
  title: "News — OVM Malaysia",
  description:
    "Project milestones, certifications and engineering notes from OVM Prestressing Technology (M) Sdn. Bhd. and the wider OVM network.",
};

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <NewsIndex />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
