/* Reference projects in Malaysia. Drives the homepage carousel
   (`components/FeaturedProjects.tsx`), whose cards carry a
   `project-${slug}` DOM id so the technology pages can deep-link to one. */

export type Project = {
  /** Kebab-case, and the anchor target: `/#project-${slug}`. */
  slug: string;
  title: string;
  location: string;
  scope: string;
  image: string;
};

export const projects: Project[] = [
  {
    slug: "duke-3-highway",
    title: "DUKE 3 Highway",
    location: "Klang Valley",
    scope: "PT system & prestressing equipment to 60m T-Beam",
    image: "/projects/duke3-highway.jpg",
  },
  {
    slug: "dash-highway",
    title: "DASH Highway",
    location: "Klang Valley",
    scope: "PT system & prestressing equipment",
    image: "/projects/dash-highway.jpg",
  },
  {
    slug: "suke-highway",
    title: "SUKE Highway",
    location: "Klang Valley",
    scope: "PT system & prestressing equipment",
    image: "/projects/suke-highway.jpg",
  },
  {
    slug: "sg-pulai-balanced-cantilever-bridge",
    title: "Sg. Pulai Balanced Cantilever Bridge",
    location: "Johor",
    scope: "PT system & prestressing equipment",
    image: "/projects/sg-pulai-bridge.jpg",
  },
  {
    slug: "lrt-3",
    title: "LRT 3",
    location: "Klang Valley",
    scope: "PT system & prestressing equipment",
    image: "/projects/lrt3.jpg",
  },
  {
    slug: "ioi-city-mall-phase-2",
    title: "IOI City Mall Phase 2",
    location: "Putrajaya",
    scope: "PT system & prestressing equipment",
    image: "/projects/ioi-city-mall.jpg",
  },
  {
    slug: "jalan-ums",
    title: "Jalan UMS",
    location: "Kota Kinabalu, Sabah",
    scope: "PT system & prestressing equipment",
    image: "/projects/jalan-ums-kota-kinabalu.jpg",
  },
  {
    slug: "batang-rajang-bridge",
    title: "Batang Rajang Bridge",
    location: "Pan Borneo WPC 7, Sibu, Sarawak",
    scope: "PT system, prestressing equipment & incremental launching",
    image: "/projects/batang-rajang-bridge.jpg",
  },
  {
    slug: "muara-lassa-bridge",
    title: "Muara Lassa Bridge",
    location: "Sarawak",
    scope: "Expansion joints",
    image: "/projects/muara-lassa-bridge.jpg",
  },
  {
    slug: "batang-igan-bridge",
    title: "Batang Igan Bridge",
    location: "Sarawak",
    scope: "PT system, bearings, expansion joints & stay cables",
    image: "/projects/batang-igan-bridge.jpg",
  },
  {
    slug: "batang-saribas-bridge-no-2",
    title: "Batang Saribas Bridge No. 2",
    location: "Sarawak",
    scope: "Bearings & expansion joints",
    image: "/projects/batang-saribas-bridge-2.jpg",
  },
  {
    slug: "rts-link",
    title: "RTS Link",
    location: "Johor–Singapore",
    scope: "PL2 PT system",
    image: "/projects/rts-link-johor.jpg",
  },
  {
    slug: "east-coast-rail-link-ecrl",
    title: "East Coast Rail Link (ECRL)",
    location: "Malaysia, 665km",
    scope:
      "Anchorage, intelligent tensioning equipment, intelligent grouting equipment, elastomeric bearing, expansion joint. Project total length approximately 665 kilometers.",
    image: "/technologies/profile-2026/ecrl-aerial-pptx.jpg",
  },
  {
    slug: "bintulu-jepak-bridge",
    title: "Bintulu-Jepak Bridge",
    location: "Sarawak",
    scope:
      "Stay cable subcontractor, PT systems, PT bars, expansion joints — main span 267.6m",
    image: "/projects/bintulu-jepak-bridge.jpg",
  },
  /* NOTE: possibly the same structure as "Bintulu-Jepak Bridge" above — both
     are Sarawak cable-stayed bridges with matching H-pylons, and the 267.6m
     main span is identical. Kept as a separate entry pending confirmation
     from the client; merge the two if she confirms it was renamed. */
  {
    slug: "tun-abdul-taib-mahmud-bridge",
    title: "Tun Abdul Taib Mahmud Bridge",
    location: "Sarawak, Malaysia",
    scope:
      "Supply and installation of 96 stay cables, supply of post-tensioning systems, high-strength PT bars, and expansion joints. Total length 3,586.234m, span arrangement 108.4m + 267.6m + 108.4m.",
    image: "/technologies/profile-2026/tun-abdul-taib-mahmud-bridge.jpg",
  },
  {
    slug: "batang-rambungan-bridge",
    title: "Batang Rambungan Bridge",
    location: "Sarawak",
    scope: "Stay cables, installation supervision, PT systems — main span 160m",
    image: "/projects/batang-rambungan-bridge.jpg",
  },
  {
    slug: "batang-lupar-1-bridge",
    title: "Batang Lupar 1 Bridge",
    location: "Sarawak",
    scope: "Stay cable subcontractor, PT bars, expansion joints — main span 324.4m",
    image: "/projects/batang-lupar-1-bridge.jpg",
  },
  {
    slug: "sejingkat-bridge",
    title: "Sejingkat Bridge",
    location: "Sarawak",
    scope: "Stay cable subcontractor, PT system & expansion joint — main span 400m",
    image: "/projects/sejingkat-bridge.jpg",
  },
  {
    slug: "kuts-red-line",
    title: "KUTS Red Line",
    location: "Sarawak",
    scope: "PT specialist sub-contractor",
    image: "/projects/kuts-red-line.jpg",
  },
  {
    slug: "kuts-blue-line-2",
    title: "KUTS Blue Line 2",
    location: "Sarawak",
    scope: "PT materials & supervision",
    image: "/projects/kuts-blue-line-2.jpg",
  },
  {
    slug: "bandar-lawas-bridge",
    title: "Bandar Lawas Bridge",
    location: "Sarawak",
    scope: "PT system, suspension bridge solution & installation supervision",
    image: "/projects/bandar-lawas-bridge.jpg",
  },
  {
    slug: "tg-aru-ums-pedestrian-cyclist-bridge",
    title: "Tg. Aru–UMS Pedestrian & Cyclist Bridge",
    location: "Sabah",
    scope: "PT system, suspension bridge solution & installation supervision",
    image: "/projects/tg-aru-ums-bridge.jpg",
  },
  {
    slug: "sungai-paku-bridge",
    title: "Sungai Paku Bridge",
    location: "Sarawak",
    scope: "PT system, hanger system for arch bridge",
    image: "/projects/sungai-paku-bridge.jpg",
  },
  {
    slug: "lrt-mutiara-line",
    title: "LRT Mutiara Line",
    location: "Penang",
    scope: "PL3 PT system, equipment & installation supervision, 5km package SLS2",
    image: "/projects/lrt-mutiara-line-penang.jpg",
  },
  {
    slug: "pan-borneo-highway-sabah",
    title: "Pan Borneo Highway Sabah",
    location: "WP19 & WP33",
    scope: "PT specialist sub-contractor for all bridges & ground anchors",
    image: "/projects/pan-borneo-sabah.jpg",
  },
];

/** The DOM id the homepage carousel puts on a project card. */
export const projectAnchorId = (slug: string) => `project-${slug}`;

const normalise = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Resolves a technology page's project name to a carousel slug.
 *
 * Exact match first; then a whole-segment containment check, so the cable
 * page's "Jepak Bridge" finds "Bintulu-Jepak Bridge" while a bare word like
 * "Bridge" cannot match anything. Returns null when the project has no
 * carousel entry — the caller then renders the card as plain text rather
 * than a link that scrolls to nothing.
 */
export function findProjectSlug(name: string): string | null {
  const key = normalise(name);

  const exact = projects.find((p) => normalise(p.title) === key);
  if (exact) return exact.slug;

  /* Guard: two or more words, so short generic names never match. */
  if (key.split("-").length < 2) return null;

  const contained = projects.filter((p) => {
    const title = normalise(p.title);
    return title === key || title.endsWith(`-${key}`) || title.startsWith(`${key}-`);
  });

  /* Ambiguous names stay unlinked rather than guessing wrong. */
  return contained.length === 1 ? contained[0].slug : null;
}
