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

/** One physical part of the system, shown as a product shot in "System Supply". */
export type TechnologyComponent = {
  name: string;
  image: string;
  /** Optional one-liner; most parts are self-explanatory from the photo. */
  desc?: string;
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
  /** Parts list. Empty where we have no product photography — the page then
      skips the "System Supply" section entirely. */
  components: TechnologyComponent[];
  galleryImages: string[];
  projects: TechnologyProject[];
  /** PDF under /public/catalogues, offered as a download on the page. */
  catalogueUrl?: string;
};

export const technologies: Technology[] = [
  {
    slug: "post-tensioning-systems",
    name: "Post-Tensioning Systems",
    icon: "anchor",
    /* An in-market project leads the page; the Algeria photo moved into the
       gallery below. */
    heroImage: "/technologies/post-tensioning-ecrl-malaysia.jpg",
    catalogueUrl: "/catalogues/OVM-Post-Tensioning-System-2025.pdf",
    summary:
      "As one of the earliest post-tensioning systems in China, OVM has extensive experience in prestressing technology, and the reliability of the OVM system is extensively acknowledged worldwide.",
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
    components: [
      {
        name: "OVM Post-Tensioning System",
        image: "/technologies/system-supply/pt-system-full-assembly.jpg",
        desc: "The complete assembly — anchorage, strand, and duct working as one system.",
      },
      {
        name: "Fiber Anchorage",
        image: "/technologies/system-supply/pt-fiber-anchorage.jpg",
      },
      {
        name: "High-Strength Carbon Fiber Anchorage",
        image: "/technologies/system-supply/pt-carbon-fiber-anchorage.jpg",
      },
      {
        name: "Jack Type YCW",
        image: "/technologies/system-supply/pt-jack-type-ycw.jpg",
      },
    ],
    galleryImages: [
      "/technologies/post-tensioning-hero-algeria.jpg",
      "/technologies/post-tensioning-china-thailand-railway.jpg",
    ],
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
        name: "East Coast Rail Link (ECRL)",
        location: "Malaysia",
        detail:
          "OVM supplied PT system and equipment, elastomeric bearings and expansion joints.",
      },
      {
        name: "Fuqing Nuclear Power Plant",
        location: "China, 2009-2010",
        detail:
          "Supply of anchorage system for containments of Unit 1, 2, 3 and 4 (OVM15R-19K and OVM15R-30K).",
      },
      {
        name: "TWRP Tank",
        location: "Singapore",
        detail: "OVM provides PT materials and stressing equipment.",
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
    /* A live Malaysian project leads the page; the arch bridge moved into
       the gallery below. */
    heroImage: "/technologies/cable-systems-jepak-malaysia.jpg",
    catalogueUrl: "/catalogues/OVM250-OVMAT-Cable-System-2025.pdf",
    summary:
      "OVM stay cable system solutions are based on multi-strand cable, parallel steel wire cable, and strand cable with integral swaging anchorage. OVM has provided systems and erection services for more than 160 cable-stayed bridges worldwide.",
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
        desc: "Developed especially for extradosed stay-cable bridges, applied on more than 500 bridges worldwide. Features outstanding anti-fatigue performance (CIP/fib/PTI compliant), multi-barrier corrosion protection, an innovative saddle that simplifies structure and reduces cost, easy single-strand adjustment and replacement, and real-time cable force monitoring.",
      },
      {
        name: "Suspension bridge cable system",
        desc: "A complete cable product range for suspension bridges with advanced replaceable anchor block systems, PPWS main cable and hangers with outstanding anti-corrosion properties, and 3 major construction equipment sets: cable crane, wrapping machine, and main cable compressor.",
      },
      {
        name: "Parallel wire cable system",
        desc: "A high-strength parallel wire system used in suspension bridges and special cable-supported structures.",
      },
    ],
    /* NOTE: these four names describe what the product shots show — they are
       not printed labels from the source catalogue. Confirm against OVM's
       official part names before this goes in front of customers. */
    components: [
      {
        name: "Protective Duct",
        image: "/technologies/system-supply/cable-component-duct.jpg",
      },
      {
        name: "Cable Guide Saddle",
        image: "/technologies/system-supply/cable-component-saddle.jpg",
      },
      {
        name: "Anchor Head Assembly",
        image: "/technologies/system-supply/cable-component-anchor-head.jpg",
      },
      {
        name: "Stressing Anchorage Device",
        image: "/technologies/system-supply/cable-component-stressing-anchorage.jpg",
      },
    ],
    galleryImages: [
      "/technologies/cable-systems-hero-archbridge.jpg",
      "/technologies/cable-systems-fast-telescope.jpg",
      "/technologies/cable-systems-night-bridge.jpg",
    ],
    projects: [
      {
        name: "Jepak Bridge",
        location: "Sarawak, Malaysia (Under Construction)",
        detail:
          "OVM supplied stay cables, PT systems, high-strength PT bars and expansion joints.",
      },
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
      "OVM provides durable bearings to bridges and buildings of every kind, complying with the specifications of JT, AASHTO, BS, JIS and other international standards. Natural rubber and neoprene type bearings are available, spherical and pot bearings feature high performance, and damping bearings with lead cores are introduced to projects especially in seismic zones.",
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
    components: [
      {
        name: "Elastomeric Bearing",
        image: "/technologies/diagrams/bearing-elastomeric-diagram.jpg",
      },
      {
        name: "Pot Bearing",
        image: "/technologies/diagrams/bearing-pot-diagram.jpg",
      },
      {
        name: "Spherical Bearing",
        image: "/technologies/diagrams/bearing-spherical-diagram.jpg",
      },
    ],
    galleryImages: [],
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
      "OVM provides durable expansion joints to various structures, complying with the specifications of JT, AASHTO, BS, JIS and other international standards. Natural rubber and neoprene type joints are available across the movement range, engineered for seamless traffic flow and long-term performance alongside OVM's bearing and damper lines.",
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
    components: [
      {
        name: "Modular / Finger Expansion Joint",
        image: "/technologies/diagrams/expansion-joint-diagram.jpg",
      },
    ],
    galleryImages: [],
    projects: [],
  },
  {
    slug: "anti-seismic-device",
    name: "Anti-Seismic Device",
    icon: "shield",
    heroImage: "/technologies/bearing-anti-seismic-hero.jpg",
    summary:
      "OVM provides durable bearings, expansion joints and dampers to various structures, complying with the specifications of JT, AASHTO, BS, JIS and other international standards. For structures in seismic zones, damping bearings with lead cores are introduced to absorb and dissipate seismic energy, protecting critical infrastructure during earthquake events.",
    types: [
      {
        name: "Lead-core damping bearing",
        desc: "A damping bearing with a lead core, introduced to projects especially in seismic zones to absorb shock during seismic events.",
      },
    ],
    components: [
      {
        name: "Lead-Core Damping Bearing",
        image: "/technologies/diagrams/anti-seismic-lead-core-diagram.jpg",
      },
    ],
    galleryImages: [],
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
      "OVM provides durable bearings, expansion joints and dampers to various structures, complying with the specifications of JT, AASHTO, BS, JIS and other international standards. The damper range absorbs structural shock and controls wind- and rain-induced vibration in cables, ensuring stability and long-term performance.",
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
    components: [
      {
        name: "Visco / MR Damper",
        image: "/technologies/diagrams/damper-diagram.jpg",
      },
    ],
    galleryImages: [],
    projects: [],
  },
  {
    slug: "structural-health-monitoring",
    name: "Structural Health Monitoring",
    icon: "radar",
    /* Jianyi Bridge, where OVM installed the monitoring system listed below. */
    heroImage: "/technologies/monitoring-hero-jianyi-sunset.jpg",
    summary:
      "OVM structural health monitoring systems track cable force, pylon and girder stress, and structural data such as displacement, deformation, vibration, temperature and humidity — giving asset owners real-time visibility across the full lifecycle of a structure.",
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
    /* No product photography of the sensors and loggers, so the page skips
       the "System Supply" section rather than showing an empty grid. */
    components: [],
    /* Reused from the cable systems set — no dedicated monitoring photo exists. */
    galleryImages: ["/technologies/cable-systems-night-bridge.jpg"],
    projects: [
      {
        name: "Hong Kong Stonecutters Bridge",
        location: "China, 2009",
        detail:
          "Total length 1,596m, main span 1,018m. Supply and install magnetic flux sensors to monitor external cable force.",
      },
      {
        name: "Jiangxi Jianyi Bridge",
        location: "China, 2008",
        detail:
          "Set up bridge operation management system, monitoring force of stay cable, stress of pylon and girder, and structural data including displacement, deformation, vibration, temperature and humidity.",
      },
      {
        name: "Yibin Bridge over Yangtze River",
        location: "China, 2008",
        detail:
          "Length 850m, main span 460m. Set up 2 GPRS online cable force monitoring systems, installed 80 magnetic flux sensors on selected stay cables.",
      },
    ],
  },
];

export const getTechnology = (slug: string) =>
  technologies.find((tech) => tech.slug === slug);

/** Menu model shared by the Navbar dropdown and the Footer column. */
export const technologyLinks = technologies.map(({ slug, name }) => ({
  label: name,
  href: `/technologies/${slug}`,
}));
