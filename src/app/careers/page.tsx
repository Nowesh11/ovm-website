import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareersContent from "@/components/CareersContent";

export const metadata: Metadata = {
  title: "Careers — OVM Malaysia",
  description:
    "Open roles at OVM Prestressing Technology (M) Sdn. Bhd. — join the team behind Malaysia's post-tensioning, bridge erection and structural monitoring projects.",
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <CareersContent />
      </main>
      <Footer />
    </>
  );
}
