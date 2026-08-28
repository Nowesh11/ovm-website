/* OVM technology lines. Drives `app/technologies/[slug]/page.tsx`, which
   pre-renders one route per slug, and the Navbar / Footer menus. */

/** Icon key resolved to a component at render time. Kept as a plain string so
    this module stays serialisable across the server/client boundary. */
export type TechIconKey =
  | "anchor"
  | "cable"
  | "layers"
  | "blocks"
  | "shield"
  | "activity"
  | "radar";

export type TechnologyType = {
  name: string;
  desc: string;
};

export type TechnologyProject = {
  name: string;
  location: string;
  detail: string;
};

export type Technology = {
  slug: string;
  name: string;
  icon: TechIconKey;
  /** Null where we have no curated photo — the page falls back to the icon. */
  heroImage: string | null;
  summary: string;
  types: TechnologyType[];
  galleryImages: string[];
  projects: TechnologyProject[];
};

export const technologies: Technology[] = [
  {
    slug: "post-tensioning-systems",
    name: "Post-Tensioning Systems",
    icon: "anchor",
    heroImage: "/technologies/post-tensioning-hero-algeria.jpg",
    summary:
      "OVM designs, manufactures, and installs advanced post-tensioning systems that meet international standards, ensuring enhanced durability and performance for bridges, high-rise buildings, solar farms, wind farms, and large-scale civil structures.",
    types: [
      {
        name: "Bonded post-tensioning system",
        desc: "Uses steel strands or bars encased in ducts, later filled with grout to provide full bond.",
      },
      {
        name: "Unbonded post-tensioning system",
        desc: "Each tendon is coated with grease and encased in plastic sheathing, allowing independent movement within the concrete.",
      },
      {
        name: "External post-tensioning system",
        desc: "Tendons run outside the concrete structure, allowing easy inspection, maintenance, and replacement.",
      },
      {
        name: "Pre-tensioning system",
        desc: "Strands or bars are tensioned before concrete casting and bonded directly into the structure.",
      },
      {
        name: "Stress bar system",
        desc: "High-strength post-tensioning bars used for structural reinforcement and stability.",
      },
    ],
    galleryImages: ["/technologies/post-tensioning-china-thailand-railway.jpg"],
    projects: [
      {
        name: "Central-Wan Chai Bypass",
        location: "Hong Kong, 2013",
        detail:
          "4,500m length. Erection of precast viaducts, transportation of segments on deck, supply and installation of post-tensioning.",
      },
      {
        name: "LNG Tank Project",
        location: "Tianjin, China",
        detail:
          "2×200,000m³ LNG steel storage tank, 8×220,000m³ LNG film tank. OVM supplied cryogenic prestressing system.",
      },
      {
        name: "Mohmand Hydropower Project",
        location: "Pakistan",
        detail: "OVM supplied ground cable system and stressing equipment.",
      },
      {
        name: "CBD Egypt",
        location: "New Capital, Egypt",
        detail:
          "Main business district of Egypt's new capital. OVM supplied PT system and equipment, supervision of prestressing works.",
      },
    ],
  },
  {
    slug: "cable-systems",
    name: "Cable Systems",
    icon: "cable",
    heroImage: "/technologies/cable-systems-hero-archbridge.jpg",
    summary:
      "OVM provides high-performance cable systems designed for bridges, buildings, and special structures, complying with international standards to ensure optimal load distribution, structural stability, and long-term performance.",
    types: [
      {
        name: "OVM250 cable system",
        desc: "A high-strength stay cable system designed for cable-stayed bridges and architectural structures.",
      },
      {
        name: "OVM280 cable system",
        desc: "A next-generation stay cable system with enhanced fatigue resistance and corrosion protection, ideal for long-span bridges.",
      },
      {
        name: "Extradosed cable system",
        desc: "Combines the benefits of stay cables and post-tensioning, allowing lower pylon heights while maintaining high load-carrying capacity.",
      },
      {
        name: "Parallel wire cable system",
        desc: "A high-strength parallel wire system used in suspension bridges and special cable-supported structures.",
      },
    ],
    galleryImages: [
      "/technologies/cable-systems-fast-telescope.jpg",
      "/technologies/cable-systems-night-bridge.jpg",
    ],
    projects: [
      {
        name: "Yavuz Sultan Selim Bridge",
        location: "Turkey",
        detail: "Main span 1,500m, the widest bridge in the world. OVM supplied 68 cables.",
      },
      {
        name: "Jiayu Bridge",
        location: "Hubei Province, China",
        detail:
          "Total length 4,660m, main span 920m. 208 PWS stay cables supplied by OVM.",
      },
      {
        name: "Kigamboni Bridge",
        location: "Tanzania",
        detail:
          "Total length 6,800m, main span 200m. Supply of PT system, bridge bearings, expansion joints, and OVM2250 cable system.",
      },
      {
        name: "FAST Telescope",
        location: "China",
        detail:
          "The world's biggest telescope. OVM supplied 6,670 strand cables forming the reflector panel cable network.",
      },
    ],
  },
  {
    slug: "bearing",
    name: "Bearing",
    icon: "layers",
    heroImage: "/technologies/bearing-anti-seismic-hero.jpg",
    summary:
      "OVM provides high-quality bearings designed to accommodate structural movements, ensure load transfer, and enhance the durability of bridges and buildings.",
    types: [
      {
        name: "Elastomeric bearings",
        desc: "Flexible bearings made of reinforced elastomer to absorb movements and distribute loads.",
      },
      {
        name: "Pot bearings",
        desc: "High-capacity bearings using a confined elastomer pad for rotation and load distribution.",
      },
      {
        name: "Spherical bearings",
        desc: "Bearings with a spherical sliding surface, allowing rotation and movement in multiple directions.",
      },
    ],
    galleryImages: [
      "/technologies/diagrams/bearing-elastomeric-diagram.jpg",
      "/technologies/diagrams/bearing-pot-diagram.jpg",
      "/technologies/diagrams/bearing-spherical-diagram.jpg",
    ],
    projects: [
      {
        name: "Hong Kong–Zhuhai–Macao Bridge",
        location: "China, 2016",
        detail:
          "The longest cross-sea bridge in the world at 55km. OVM supplied high damping bearings and lead-rod seismic bearings.",
      },
      {
        name: "El Ferdan Bridge",
        location: "Egypt",
        detail: "OVM supplied spherical bearings.",
      },
    ],
  },
  {
    slug: "expansion-joints",
    name: "Expansion Joints",
    icon: "blocks",
    heroImage: null,
    summary:
      "OVM provides durable expansion joints designed for seamless traffic flow and long-term performance, complying with JT, AASHTO, BS, and JIS standards.",
    types: [
      {
        name: "Modular expansion joints",
        desc: "Designed for large movement ranges, ensuring seamless traffic flow and long-term performance.",
      },
      {
        name: "Finger joints",
        desc: "High-durability joints designed to accommodate extensive movements while ensuring noise reduction.",
      },
      {
        name: "Strip seal joints",
        desc: "Waterproof and highly flexible rubber-sealed expansion joints designed for moderate movement structures.",
      },
    ],
    galleryImages: ["/technologies/diagrams/expansion-joint-diagram.jpg"],
    projects: [],
  },
  {
    slug: "anti-seismic-device",
    name: "Anti-Seismic Device",
    icon: "shield",
    heroImage: "/technologies/bearing-anti-seismic-hero.jpg",
    summary:
      "For structures in seismic zones, OVM introduces damping bearings with lead cores to absorb and dissipate seismic energy, protecting critical infrastructure during earthquake events.",
    types: [
      {
        name: "Lead-core damping bearing",
        desc: "A damping bearing with a lead core, introduced to projects especially in seismic zones to absorb shock during seismic events.",
      },
    ],
    galleryImages: ["/technologies/diagrams/anti-seismic-lead-core-diagram.jpg"],
    projects: [
      {
        name: "Hong Kong–Zhuhai–Macao Bridge",
        location: "China, 2016",
        detail:
          "OVM supplied high damping bearings and lead-rod seismic bearings for the world's longest cross-sea bridge.",
      },
    ],
  },
  {
    slug: "dampers",
    name: "Dampers",
    icon: "activity",
    heroImage: null,
    summary:
      "OVM's damper solutions absorb structural shock and control wind- and rain-induced vibration in cables, ensuring stability and long-term performance.",
    types: [
      {
        name: "Visco Damper",
        desc: "A simple, compact, tailor-made damper capable of sufficiently absorbing the shock of a structure.",
      },
      {
        name: "MR Damper",
        desc: "Provides a continuously controllable, economical solution to wind-rain-induced cable vibration.",
      },
    ],
    galleryImages: ["/technologies/diagrams/damper-diagram.jpg"],
    projects: [],
  },
  {
    slug: "structural-health-monitoring",
    name: "Structural Health Monitoring",
    icon: "radar",
    /* No dedicated monitoring photography, so the page uses the gradient +
       icon hero rather than a stand-in image. */
    heroImage: null,
    summary:
      "Structural health monitoring with live sensor data and load analytics, keeping watch over cable force, deflection and temperature across the asset lifecycle.",
    types: [
      {
        name: "Cable force monitoring",
        desc: "Real-time tracking of stress and vibration levels in cable-supported bridges.",
      },
      {
        name: "Deflection & movement monitoring",
        desc: "Detects structural displacement, tilt, and settlement to prevent long-term deterioration.",
      },
      {
        name: "Temperature & environmental monitoring",
        desc: "Tracks thermal and environmental conditions affecting structural performance over time.",
      },
      {
        name: "Load analytics & early warning",
        desc: "Continuous data collection with predictive analysis to flag risks before failure occurs.",
      },
    ],
    /* Reused from the cable systems set — no dedicated monitoring photo exists. */
    galleryImages: ["/technologies/cable-systems-night-bridge.jpg"],
    projects: [
      {
        name: "Yibin Bridge over Yangtze River",
        location: "China, 2008",
        detail:
          "Length 850m, main span 460m. Set up 2 GPRS online cable force monitoring systems, installed 80 magnetic flux sensors on selected stay cables.",
      },
    ],
  },
];

/* Product diagrams are studio shots on light backgrounds, so the template
   renders anything under /technologies/diagrams/ on a light card with a
   caption instead of the dark full-bleed treatment used for photography. */
export const isDiagram = (src: string) => src.includes("/technologies/diagrams/");

/** Caption shown under each product diagram, keyed by image path. */
export const DIAGRAM_CAPTIONS: Record<string, string> = {
  "/technologies/diagrams/bearing-elastomeric-diagram.jpg": "Elastomeric bearings",
  "/technologies/diagrams/bearing-pot-diagram.jpg": "Pot bearings",
  "/technologies/diagrams/bearing-spherical-diagram.jpg": "Spherical bearings",
  "/technologies/diagrams/expansion-joint-diagram.jpg": "Expansion joint assembly",
  "/technologies/diagrams/anti-seismic-lead-core-diagram.jpg": "Lead-core damping bearing",
  "/technologies/diagrams/damper-diagram.jpg": "Damper assembly",
};

export const getTechnology = (slug: string) =>
  technologies.find((tech) => tech.slug === slug);

/** Menu model shared by the Navbar dropdown and the Footer column. */
export const technologyLinks = technologies.map(({ slug, name }) => ({
  label: name,
  href: `/technologies/${slug}`,
}));
