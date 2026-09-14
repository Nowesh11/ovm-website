import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TechCTA from "@/components/TechCTA";
import TechnologyDetail from "@/components/TechnologyDetail";
import { getTechnology, technologies } from "@/data/technologies";

export function generateStaticParams() {
  return technologies.map(({ slug }) => ({ slug }));
}

/* Anything outside the known slugs is a 404, not an on-demand render. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/technologies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tech = getTechnology(slug);

  if (!tech) return {};

  return {
    title: `${tech.name} — OVM Malaysia`,
    description: tech.summary,
    openGraph: {
      title: tech.name,
      description: tech.summary,
      ...(tech.heroImage ? { images: [tech.heroImage] } : {}),
    },
  };
}

export default async function TechnologyPage({
  params,
}: PageProps<"/technologies/[slug]">) {
  const { slug } = await params;
  const tech = getTechnology(slug);

  if (!tech) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <TechnologyDetail tech={tech} />
        <TechCTA technologyName={tech.name} />
      </main>
      <Footer />
    </>
  );
}
