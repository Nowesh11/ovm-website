import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsArticle from "@/components/NewsArticle";
import { getNewsItem, getOtherNews, newsItems } from "@/data/news";

/* One static route per article, built ahead of time. */
export function generateStaticParams() {
  return newsItems.map(({ slug }) => ({ slug }));
}

/* Anything outside that set is a 404 rather than an on-demand render. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsItem(slug);

  if (!item) return {};

  return {
    title: `${item.title} — OVM Malaysia`,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [item.image],
      type: "article",
      publishedTime: item.date,
    },
  };
}

export default async function NewsArticlePage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const item = getNewsItem(slug);

  if (!item) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <NewsArticle item={item} others={getOtherNews(slug)} />
      </main>
      <Footer />
    </>
  );
}
