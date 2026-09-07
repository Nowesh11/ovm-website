import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EquipmentDetail from "@/components/EquipmentDetail";
import { equipmentItems, getEquipmentItem } from "@/data/equipment";

export function generateStaticParams() {
  return equipmentItems.map(({ slug }) => ({ slug }));
}

/* Anything outside the known slugs is a 404, not an on-demand render. */
export const dynamicParams = false;

/** First line of the item, used as the meta description where it has one. */
function summarise(slug: string) {
  const item = getEquipmentItem(slug);
  return item?.intro ?? item?.bullets?.[0] ?? "";
}

export async function generateMetadata({
  params,
}: PageProps<"/equipment/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getEquipmentItem(slug);

  if (!item) return {};

  const description = summarise(slug);

  return {
    title: `${item.name} — OVM Malaysia`,
    description,
    openGraph: {
      title: item.name,
      description,
      ...(item.image ? { images: [item.image] } : {}),
    },
  };
}

export default async function EquipmentPage({
  params,
}: PageProps<"/equipment/[slug]">) {
  const { slug } = await params;
  const item = getEquipmentItem(slug);

  if (!item) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <EquipmentDetail item={item} />
      </main>
      <Footer />
    </>
  );
}
