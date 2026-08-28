import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact — OVM Malaysia",
  description:
    "Get in touch with OVM Prestressing Technology (M) Sdn. Bhd. in Kota Damansara, Petaling Jaya, Selangor.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
