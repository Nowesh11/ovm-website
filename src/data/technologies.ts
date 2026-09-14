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
  /**
   * Plate the image sits on. Studio shots are cut out on white and need the
   * light plate (the default); the 2026 profile-deck renders carry their own
   * dark blue ground and are swallowed by it, so they take "dark".
   */
  plate?: "light" | "dark";
};

/** A labelled technical drawing, shown in the "Technical Reference" section. */
export type TechnologyDiagram = {
  name: string;
  image: string;
};

/** A product line on a combined page — its own heading, types and parts. */
export type TechnologyGroup = {
  /** In-page anchor, e.g. `/technologies/…#bearing`. */
  id: string;
  name: string;
  icon: TechIconKey;
  summary: string;
  types: TechnologyType[];
  components: TechnologyComponent[];
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
  /** Line drawings, rendered in their own section above the parts list. */
  diagrams?: TechnologyDiagram[];
  /** Set where several product lines share one page. Each group renders its
      own types and parts; the top-level `types` / `components` stay empty. */
  groups?: TechnologyGroup[];
  galleryImages: string[];
};

export const technologies: Technology[] = [
  {
    slug: "post-tensioning-systems",
    name: "Post-Tensioning Systems",
    icon: "anchor",
    /* An in-market project leads the page; the Algeria photo moved into the
       gallery below. */
    heroImage: "/technologies/post-tensioning-ecrl-malaysia.jpg",
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
        name: "Jack Type YCW",
        image: "/technologies/system-supply/pt-jack-type-ycw.jpg",
      },
      /* From the 2026 profile deck — complete systems rather than single
         parts, and rendered on the deck's own dark ground. */
      
      /* 2026 render set. */
      {
        name: "Anchor Head Assembly",
        image: "/technologies/renders-2026/post-tensioning/pt-anchor-head-assembly.png",
      },
      {
        name: "Complete Tendon System",
        image: "/technologies/renders-2026/post-tensioning/pt-full-tendon-system.png",
      },
      {
        name: "Hydraulic Pump Unit",
        image: "/technologies/renders-2026/post-tensioning/pt-hydraulic-pump-unit-large.png",
      },
      {
        name: "Compact Pump Unit",
        image: "/technologies/renders-2026/post-tensioning/pt-hydraulic-pump-unit-small.png",
      },
      /* pt-protective-cap-device.png is held back until the client confirms
         what the part is called. */
    ],
    /* Construction equipment. There is no dedicated equipment page, and this
       system's scope already covers construction services, so the plant sits
       here rather than on a page of its own. */
    diagrams: [
      {
        name: "Segment Launching Gantry",
        image: "/technologies/renders-2026/equipment/equipment-segment-launching-gantry.png",
      },
      {
        name: "Cable Tightening Machine",
        image: "/technologies/renders-2026/equipment/equipment-cable-tightening-machine.png",
      },
      {
        name: "Girder Lifting Gantry",
        image: "/technologies/renders-2026/equipment/equipment-girder-lifting-gantry.png",
      },
    ],
    galleryImages: [
      "/technologies/post-tensioning-hero-algeria.jpg",
      "/technologies/post-tensioning-china-thailand-railway.jpg",
    ],
  },
  {
    slug: "cable-systems",
    name: "Cable Systems",
    icon: "cable",
    /* A live Malaysian project leads the page; the arch bridge moved into
       the gallery below. */
    heroImage: "/technologies/cable-systems-jepak-malaysia.jpg",
    summary:
      "OVM provides complete cable system design, installation, monitoring and maintenance services. Products meet FIB, PTI and CIP international standards, with test reports from CTL and EMPA. Available in steel strand stay cable, high-strength wire stay cable, and carbon fiber cable types.",
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
    /* Suspension-bridge hardware from the 2026 profile deck. These replaced
       four guessed labels on unlabelled product shots — every name below is
       the caption printed against the photo in the deck. */
    components: [
      {
        name: "Main Cable",
        image: "/technologies/profile-2026/sus-main-cable.jpg",
      },
      {
        name: "Anchor Blocks System",
        image: "/technologies/profile-2026/sus-anchor-blocks-system.jpg",
      },
      {
        name: "Hanger",
        image: "/technologies/profile-2026/sus-hanger.jpg",
      },
      {
        name: "Saddle",
        image: "/technologies/profile-2026/sus-saddle.jpg",
      },
      {
        name: "Cable Splay Saddle",
        image: "/technologies/profile-2026/sus-cable-splay-saddle.jpg",
      },
      {
        name: "Cable Clamp",
        image: "/technologies/profile-2026/sus-cable-clamp.jpg",
      },
      {
        name: "Cable Tightening Machine",
        image: "/technologies/profile-2026/sus-cable-tightening-machine.jpg",
      },
      {
        name: "Cable Supported Crane",
        image: "/technologies/profile-2026/sus-cable-supported-crane.jpg",
      },
      {
        name: "Wire Winding Machine",
        image: "/technologies/profile-2026/sus-wire-winding-machine.jpg",
      },
      /* 2026 render set. cable-layer-diagram-partial-chinese.png is held back
         until an English version exists, or the client confirms it as-is. */
      {
        name: "Anchor Head, Wedge & Socket Assembly",
        image: "/technologies/renders-2026/cable-systems/cable-anchor-head-labeled-diagram.png",
        desc: "Anchor head, wedge, socket, nut, sealing set, and PE-sheathed strand.",
      },
      {
        name: "Stay Cable Cross-Section",
        image: "/technologies/renders-2026/cable-systems/cable-strand-cross-section.png",
      },
      {
        name: "Complete Cable Assembly",
        image: "/technologies/renders-2026/cable-systems/cable-full-assembly.png",
      },
      {
        name: "Stressing Anchorage Detail",
        image: "/technologies/renders-2026/cable-systems/cable-stressing-anchorage-closeup.png",
      },
    ],
    diagrams: [
      {
        name: "Stay Cable Anchorage Assembly",
        image: "/technologies/profile-2026/cable-anchorage-diagram.jpg",
      },
      {
        name: "Saddle & Pylon Configuration",
        image: "/technologies/profile-2026/cable-saddle-diagram.jpg",
      },
      {
        name: "Stay Cable Cross-Section",
        image: "/technologies/profile-2026/cable-strand-crosssection.jpg",
      },
      {
        name: "Anchor Head Assembly (Exploded View)",
        image: "/technologies/profile-2026/cable-anchor-plate-exploded.jpg",
      },
      {
        name: "Galvanized Wire Stay Cable — Schematic",
        image: "/technologies/profile-2026/cable-galvanized-wire-diagram.jpg",
      },
    ],
    galleryImages: [
      "/technologies/cable-systems-hero-archbridge.jpg",
      "/technologies/cable-systems-fast-telescope.jpg",
      "/technologies/cable-systems-night-bridge.jpg",
    ],
  },
  {
    /* One page for the three lines — they share standards, certification and
       most of their reference projects. The old per-line URLs redirect to the
       matching group anchor (see next.config.ts). */
    slug: "bearing-expansion-joints-anti-seismic-device",
    name: "Bearing, Expansion Joints & Anti-Seismic Device",
    icon: "layers",
    heroImage: "/technologies/bearing-anti-seismic-hero.jpg",
    summary:
      "OVM provides durable bearings, expansion joints and anti-seismic devices to bridges and buildings of every kind, complying with the specifications of JT, AASHTO, BS, JIS and other international standards — from elastomeric, pot and spherical bearings, through modular, finger and strip seal joints, to lead-core damping bearings for structures in seismic zones.",
    types: [],
    components: [],
    groups: [
      {
        id: "bearing",
        name: "Bearing",
        icon: "layers",
        summary:
          "Natural rubber and neoprene type bearings are available, while spherical and pot bearings feature high performance — accommodating structural movements, ensuring load transfer, and enhancing the durability of bridges and buildings.",
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
          {
            name: "Bearings",
            image: "/technologies/profile-2026/bearing-photo-real.jpg",
            desc: "Types: elastomeric, pot, spherical, lead rubber, high damping rubber, and pendulum bearing. Designed and manufactured to AASHTO LRFD, EN1337, EN15129, BS5400, with CE certification and test reports from CTL (USA), MILANO (Italy), and KIT (Germany).",
            plate: "dark",
          },
          /* 2026 render set. */
          {
            name: "Laminated Elastomeric Bearing (Square)",
            image: "/technologies/renders-2026/bearing/bearing-elastomeric-laminated-square.png",
          },
          {
            name: "Laminated Elastomeric Bearing (Round)",
            image: "/technologies/renders-2026/bearing/bearing-elastomeric-laminated-round.png",
          },
          {
            name: "Load Testing Rig",
            image: "/technologies/renders-2026/bearing/bearing-load-testing-rig.png",
            desc: "Bearing performance is verified under controlled load testing before deployment.",
          },
        ],
      },
      {
        id: "expansion-joints",
        name: "Expansion Joints",
        icon: "blocks",
        summary:
          "Natural rubber and neoprene type joints are available across the movement range, engineered for seamless traffic flow and long-term performance alongside OVM's bearing and damper lines.",
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
          {
            name: "Expansion Joints",
            image: "/technologies/profile-2026/expansion-joint-photo-real.jpg",
            desc: "Types: rubber expansion joint, strip seal expansion joint, modular expansion joint, finger expansion joint. Same international standards compliance and CE certification as our bearing products.",
            plate: "dark",
          },
          /* 2026 render set. */
          {
            name: "Expansion Joint — Deck Cross-Section",
            image: "/technologies/renders-2026/expansion-joints/expansion-joint-deck-cutaway.png",
          },
          {
            name: "Modular Expansion Joint Hardware",
            image: "/technologies/renders-2026/expansion-joints/expansion-joint-modular-hardware.png",
          },
        ],
      },
      {
        id: "anti-seismic-device",
        name: "Anti-Seismic Device",
        icon: "shield",
        summary:
          "For structures in seismic zones, damping bearings with lead cores are introduced to absorb and dissipate seismic energy, protecting critical infrastructure during earthquake events.",
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
      },
    ],
    galleryImages: [],
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
      {
        name: "Dampers",
        image: "/technologies/profile-2026/damper-photo-real.jpg",
        desc: "Types: viscous fluid damper, permanent magnet adjustable magnetorheological damper, eddy current tuned mass damper.",
        plate: "dark",
      },
      /* 2026 render set. */
      {
        name: "Cylindrical Damper",
        image: "/technologies/renders-2026/dampers/damper-cylindrical-gold-pair.png",
      },
    ],
    galleryImages: [],
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
  },
];

export const getTechnology = (slug: string) =>
  technologies.find((tech) => tech.slug === slug);

/** Menu model shared by the Navbar dropdown and the Footer column. */
export const technologyLinks = technologies.map(({ slug, name }) => ({
  label: name,
  href: `/technologies/${slug}`,
}));
