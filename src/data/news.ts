/* Shared newsroom content. Consumed by the homepage teaser
   (`components/LatestNews.tsx`) and the article pages
   (`app/news/[slug]/page.tsx`), which pre-renders one route per slug. */

export type NewsItem = {
  slug: string;
  title: string;
  category: string;
  /** ISO date — formatted for display at the render site. */
  date: string;
  excerpt: string;
  /** Cover image used by the teaser card and the article hero. */
  image: string;
  /** Crop anchor for the cover, as a CSS object-position value. */
  focus: string;
  gallery: string[];
  /** Full post text, one string per paragraph. */
  body: string[];
  tags: string[];
  /** Permalink to the original LinkedIn post this article came from. */
  linkedinUrl: string;
};

export const newsItems: NewsItem[] = [
  {
    slug: "greener-coastline-mangrove-planting",
    title: "Together for a Greener Coastline",
    category: "Sustainability",
    date: "2026-08-21",
    excerpt:
      "We joined a CSR Mangrove Planting Programme at Taman Rekreasi Paya Bakau, Kampung Sijangkang — because building a better future also means caring for the environment we share.",
    image: "/news/mangrove-planting/mangrove-forest-wide-cover.jpg",
    focus: "50% 55%",
    gallery: [
      "/news/mangrove-planting/mangrove-team-planting-ovm-banner.jpg",
      "/news/mangrove-planting/mangrove-forest-wide-cover.jpg",
      "/news/mangrove-planting/mangrove-team-group-1.jpg",
      "/news/mangrove-planting/mangrove-planting-boardwalk.jpg",
      "/news/mangrove-planting/mangrove-planting-closeup.jpg",
      "/news/mangrove-planting/mangrove-cecc-signboard.jpg",
      "/news/mangrove-planting/mangrove-park-entrance.jpg",
    ],
    body: [
      "At OVM Prestressing Technology (M) Sdn Bhd, we believe that building a better future goes beyond engineering and infrastructure — it also means taking care of the environment we share.",
      "We were proud to participate in a CSR Mangrove Planting Programme at Taman Rekreasi Paya Bakau, Kampung Sijangkang, joining fellow organisations and community members in contributing to the conservation of our coastal ecosystem.",
      "Getting our hands in the mud, planting mangrove saplings and working together reminded us that every small effort can make a meaningful difference.",
      "A meaningful day of teamwork, community engagement and environmental responsibility — because sustainability is something we build together. Together for a Greener Coastline.",
    ],
    tags: ["CSR", "Sustainability", "Community"],
    linkedinUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7495406778470559744",
  },
  {
    slug: "easec19-platinum-sponsor",
    title: "OVM Malaysia at EASEC-19 as Platinum Sponsor",
    category: "Events",
    date: "2026-07-28",
    excerpt:
      "We joined the 19th East Asia-Pacific Conference on Structural Engineering and Construction as a Platinum Sponsor, showcasing our solutions to researchers, partners and clients from across the region.",
    image: "/news/easec19/easec19-team-booth-cover.jpg",
    focus: "50% 50%",
    gallery: [
      "/news/easec19/easec19-team-booth-cover.jpg",
      "/news/easec19/easec19-booth-display.jpg",
      "/news/easec19/easec19-speaker-presentation.jpg",
      "/news/easec19/easec19-product-display-1.jpg",
      "/news/easec19/easec19-product-display-2.jpg",
    ],
    body: [
      "We are proud to have participated in the 19th East Asia-Pacific Conference on Structural Engineering and Construction (EASEC-19) as a Platinum Sponsor.",
      "Over the past three days, our team had the opportunity to showcase OVM Malaysia's innovative structural engineering solutions, connect with industry professionals, and exchange valuable insights with researchers, partners, and clients from across the region.",
      "A heartfelt thank you to everyone who visited Booth #03, attended our technical presentation, and engaged with our team. Your support, interest, and meaningful conversations made this event a great success.",
      "We also extend our sincere appreciation to the EASEC-19 organizing committee for hosting such an outstanding platform for knowledge sharing and collaboration. We look forward to building new partnerships and continuing to drive innovation in the structural engineering and construction industry.",
    ],
    tags: ["Sponsorship", "Conference", "Structural Engineering"],
    linkedinUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7483353683481624576/",
  },
];

export const getNewsItem = (slug: string) =>
  newsItems.find((item) => item.slug === slug);

/** The other articles, for "More updates" cross-links. */
export const getOtherNews = (slug: string) =>
  newsItems.filter((item) => item.slug !== slug);

/* Fixed locale + UTC so server and client render the same string. */
const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export const formatNewsDate = (iso: string) =>
  DATE_FORMAT.format(new Date(`${iso}T00:00:00Z`));
