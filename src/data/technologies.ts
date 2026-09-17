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

/** One labelled callout on an OVM assembly drawing, kept in drawing order so
    the part numbers on the page match the numbers on the drawing. */
export type TechnologyAssembly = {
  name: string;
  parts?: string[];
  /** Applicability limits printed against the drawing (strand area, concrete
      grade, and so on). */
  notes?: string[];
};

/** A named system within a product line — "OVM Slab Post-tensioning" under
    Post-Tensioning Systems, say. Richer than a `TechnologyType`: it carries
    its own features, drawings and applications. */
export type TechnologySubProduct = {
  /** In-page anchor, e.g. `/technologies/…#slab-post-tensioning`. */
  id: string;
  name: string;
  summary?: string;
  features?: string[];
  assemblies?: TechnologyAssembly[];
  /** Structure types the system is specified for. */
  applications?: string[];
};

/** A published standard the line is designed, tested and certified against. */
export type TechnologyStandard = {
  code: string;
  title: string;
};

/** Plant OVM supplies for installing, stressing and grouting the system. */
export type TechnologyEquipment = {
  name: string;
  desc?: string;
};

/** The content blocks a product line can carry, shared by a whole technology
    page and by a single group on a combined page. */
type TechnologyContent = {
  /** Headline capabilities, rendered as a checked list. */
  features?: string[];
  standards?: TechnologyStandard[];
  /** Standards OVM sat on the drafting committee for — a stronger claim than
      compliance, so they render separately. */
  authoredStandards?: TechnologyStandard[];
  certifications?: string[];
  subProducts?: TechnologySubProduct[];
  equipment?: TechnologyEquipment[];
  /* Deliberately no project list here: `data/projects.ts` is the single
     source of project truth for the site, and it holds only the Malaysian
     portfolio. Global references from the OVM catalogue were retired, and
     `tests/reference-projects.spec.ts` keeps them out. */
  /** Contracting scope OVM undertakes for this line. */
  services?: string[];
};

/** A product line on a combined page — its own heading, types and parts. */
export type TechnologyGroup = TechnologyContent & {
  /** In-page anchor, e.g. `/technologies/…#bearing`. */
  id: string;
  name: string;
  icon: TechIconKey;
  summary: string;
  types: TechnologyType[];
  components: TechnologyComponent[];
};

export type Technology = TechnologyContent & {
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
      "As one of the earliest post-tensioning systems in China, OVM has extensive experience in prestressing technology, and the reliability of the OVM system is extensively acknowledged worldwide. The system is applied from bridges, buildings and geotechnical engineering through to nuclear power plants, water conservancy and hydropower facilities, and renewable energy projects.",
    features: [
      "Matched strands in every common diameter — 12.5 / 12.7 / 12.9 mm, 15.24 / 15.7 mm, 21.8 mm and 28.6 mm.",
      "Adaptable to strand of 1,860 MPa through to 2,400 MPa tensile strength.",
      "Full range of tendon sizes: 1 to 55 strands, with larger and custom sizes available on request.",
      "High anchoring coefficient — reliable and stable under high, low and negative stress conditions.",
      "A complete range of identical accessories available against particular project requirements.",
      "Backed by OVM's own equipment for installation, tensioning and grouting.",
    ],
    standards: [
      { code: "AASHTO", title: "American Association of State Highway and Transportation Officials" },
      { code: "ASTM", title: "American Society for Testing and Materials" },
      { code: "BS", title: "British Standards" },
      { code: "EAD 160004-00-0301", title: "Post-tensioning kits for prestressing of structures" },
      { code: "ETAG 013", title: "Guideline for European Technical Approval of post-tensioning kits" },
      { code: "FIP / fib", title: "Fédération Internationale du Béton recommendations" },
      { code: "GB/T 14370", title: "Anchorage, grip and coupler for prestressing tendons" },
      { code: "JIS", title: "Japanese Industrial Standards" },
      { code: "PTI", title: "Post-Tensioning Institute specifications" },
    ],
    authoredStandards: [
      {
        code: "GB/T 14370-2015",
        title:
          "National standard — Anchorages, grips and couplers for prestressing tendons",
      },
      {
        code: "JT/T 329-2010",
        title:
          "Industry standard — Anchorages, grips and couplers for prestressed steel strands of highway bridges",
      },
      {
        code: "JGJ 85-2010",
        title:
          "Industry standard — Technical specification for application of anchorages, grips and couplers for prestressing tendons",
      },
    ],
    certifications: [
      "Guangxi Famous Brand Product Certificate — OVM Post-Tensioning System products",
      "Award Certificate — The Wedge Type Multi-Anchor Stayed Cable System and its installation method",
      "Science and Technology Achievement Appraisal Certificate — OVM Post-Tensioning System",
      "Anchor System Certification",
      "Manufacturing Single Champion Demonstration Enterprise",
    ],
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
    subProducts: [
      {
        id: "multistrand-post-tensioning",
        name: "OVM Multistrand Post-Tensioning",
        summary:
          "The core system: anchorage (stressing-end and dead-end), coupler, strand and duct, assembled as one tendon. Tendons can be stressed at one or both ends as the design requires.",
        assemblies: [
          {
            name: "Integral assembly — stressing end",
            parts: [
              "Tool anchorage",
              "Jack",
              "Spacer",
              "Wedge",
              "Anchor head",
              "Spiral reinforcement",
              "Strand",
              "Bearing plate",
            ],
          },
          {
            name: "Complete tendon layout",
            parts: [
              "Grouting tube",
              "Duct",
              "Vent",
              "Coupler",
              "Dead-end anchorage type P (alternatively)",
              "Anchor plate",
              "Grouting / drainage",
              "Stressing-end anchorage",
            ],
          },
          {
            name: "Stressing-end Anchorage OVM.M13TA",
            parts: [
              "Wedge",
              "Anchor head",
              "Bearing plate",
              "Spiral reinforcement",
              "Strand",
              "Duct",
            ],
            notes: [
              "Applicable only to strands with Ap = 98.7 mm² or Ap = 100 mm².",
              "Applicable to concrete strength of 40/50 MPa (fc,cylinder / fc,cube) or above.",
              "At 32/40 MPa, mesh reinforcement must be added. Contact OVM for other working conditions.",
            ],
          },
          {
            name: "Dead-end Anchorage Type P — OVM.P15 / P13",
            parts: [
              "Duct",
              "Restraining ring",
              "Vent",
              "Spiral reinforcement",
              "Strand",
              "Anchor plate",
              "Swaged end",
            ],
            notes: [
              "The swaged end is formed by a GYJC50-150 swaging machine, which plastically deforms a swage socket lined with a swage spring to grip the strand.",
              "Tension load transfers directly to the concrete through bond and the anchor plate.",
              "OVM.P15 suits Ap = 140 / 150 mm²; OVM.P13 suits Ap = 98.7 / 100 mm².",
            ],
          },
          {
            name: "Dead-end Anchorage Type H — OVM.H15 / H13",
            parts: [
              "Duct",
              "Restraining ring",
              "Vent",
              "Spiral reinforcement",
              "Spacer",
              "Bulb",
            ],
            notes: [
              "The most convenient fixed-end solution for on-site operation: force transfers partly by bond and partly through a bulb formed by the YH3 bulb machine.",
              "OVM.H15 suits Ap = 140 / 150 mm²; OVM.H13 suits Ap = 98.7 / 100 mm².",
            ],
          },
          {
            name: "Dead-end Anchorage Type PT — OVM.M15A-nPT",
            parts: [
              "Bolt 1",
              "Plate",
              "Swaged end",
              "Spring",
              "Anchor head",
              "Bolt 2",
              "Bearing plate",
              "Spiral reinforcement",
              "Duct",
              "Strand",
            ],
            notes: [
              "Applicable to strands with Ap = 140 mm² or Ap = 150 mm².",
              "Applicable to concrete strength of 32/40 MPa (fc,cylinder / fc,cube) or above.",
            ],
          },
          {
            name: "Dead-end Anchorage Type KP — OVM.M15A-nKP",
            parts: [
              "Spiral reinforcement",
              "Bearing plate",
              "Anchor head",
              "Wedge",
              "Spring",
              "Plate 1",
              "Bolt 1",
              "Bolt 2",
              "Plate 2",
            ],
            notes: [
              "Applicable to strands with Ap = 140 mm² or Ap = 150 mm².",
              "Applicable to concrete strength of 32/40 MPa (fc,cylinder / fc,cube) or above.",
            ],
          },
          {
            name: "Coupler OVM.L15 / L13",
            parts: [
              "Duct",
              "Spiral reinforcement",
              "Bearing plate",
              "Coupler block",
              "Swaged end",
              "Protective cover I",
              "Bolt",
              "Nut",
              "Restraining ring",
              "Strand",
              "Protective cover II",
              "Wedge",
            ],
            notes: [
              "Couplers elongate tendons that, because of length or construction method, cannot be installed or tensioned in one unit.",
              "OVM.L15 suits Ap = 140 / 150 mm²; OVM.L13 suits Ap = 98.7 / 100 mm².",
            ],
          },
          {
            name: "Mono-Strand Coupler — OVM15L-F / 13L-F",
            parts: [
              "Spiral reinforcement",
              "Bearing plate",
              "Anchor head",
              "Wedge",
              "Mono-strand coupler",
              "Protective sleeve",
              "Plate",
              "Restraining ring",
            ],
            notes: [
              "Connects and elongates single strands: n mono-couplers set in parallel inside one protective sleeve.",
              "OVM15L-F suits Ap = 140 / 150 mm²; OVM13L-F suits Ap = 98.7 / 100 mm².",
            ],
          },
        ],
      },
      {
        id: "slab-post-tensioning",
        name: "OVM Slab Post-Tensioning",
        summary:
          "Flat anchorages for post-tensioned slabs, where the shallow depth of the member rules out a circular anchor head. Flat steel duct carries the strand group.",
        assemblies: [
          {
            name: "Stressing-end Slab Anchorage OVM.BM15/13",
            parts: [
              "Wedge",
              "Slab anchor head",
              "Slab bearing plate",
              "Spiral reinforcement",
              "Steel flat duct",
              "Strand",
            ],
          },
          {
            name: "Stressing-end Anchorage OVM.BM15TA",
            parts: [
              "Wedge",
              "Slab anchor head",
              "Slab bearing plate",
              "Strand",
              "Spiral reinforcement",
              "Steel flat duct",
            ],
          },
          {
            name: "Stressing-end Anchorage OVM.BM13C",
            parts: [
              "Wedge",
              "Slab anchor head",
              "Slab bearing plate",
              "Strand",
              "Duct",
              "Spiral reinforcement",
            ],
          },
          {
            name: "Dead-end Slab Anchorage Type BP",
            parts: [
              "Swaged end",
              "P-bearing plate",
              "Spiral reinforcement",
              "Vent",
              "Restraining ring",
              "Flat duct",
              "Strand",
            ],
          },
          {
            name: "Dead-end Slab Anchorage Type BH",
            parts: [
              "Flat duct",
              "Spiral reinforcement",
              "Restraining ring",
              "Vent",
              "Strand",
              "Spacer",
              "Bulb",
            ],
          },
          { name: "Coupler of Slab Anchorage Type BL" },
        ],
      },
      {
        id: "special-post-tensioning",
        name: "OVM Special Post-Tensioning",
        summary:
          "Ring anchoring, nuclear containment and cryogenic LNG systems — the anchorages OVM developed where a standard linear tendon will not serve.",
        features: [
          "Ring Anchoring System OVM.HM applies prestress to circular structures: both the stressing end and the dead end of the ring tendon combine at one anchor head, which doubles as the coupler.",
          "HM15A fully leak-tight ring anchorage uses a double axial extrusion seal and a radial seal to give every strand its own independent anti-corrosion structure — no leakage after 96 hours immersed under 3 m of hydrostatic head.",
          "Friction loss is lower than bonded prestressing, and construction efficiency is higher, shortening the programme.",
          "Nuclear PT system suits third-generation containment, with a full set of dedicated nuclear tensioning jacks and duct forming plant — pipe expanding, bending and making machines.",
          "Cryogenic LNG anchorage performs stably at −196 °C, with a reduced strand deviation angle that lowers local stress concentration. Typical hole counts: 12, 15, 19, 22, 27 and 31.",
        ],
        assemblies: [
          {
            name: "Ring Anchoring System HM15 (bonded)",
            parts: [
              "HM anchor head",
              "Wedge",
              "Spacer",
              "Deviator A",
              "Deviator B",
              "Transfer block",
              "Stretch tube",
              "Stressing jack",
              "Strand",
              "Tool anchor head",
              "Tool wedge",
            ],
          },
          {
            name: "Nuclear power plant post-tensioning anchorage",
            parts: [
              "Grouting cap",
              "Strand",
              "Wedge",
              "Anchor head",
              "Bearing plate",
              "Grouting connector",
            ],
          },
        ],
        applications: [
          "Round PC storage tanks — silos, liquid gas tanks and sewage treatment tanks",
          "PC containment of nuclear reactors",
          "PC hydrodynamic tunnels and wells",
          "LNG storage tanks operating at cryogenic temperature",
          "Other similar round prestressed concrete structures",
        ],
      },
      {
        id: "external-prestressing",
        name: "OVM External Prestressing System",
        summary:
          "Tendons carried outside the concrete section, where inspection, maintenance and replacement matter as much as the prestress itself.",
        features: [
          "Durable, with excellent anti-corrosive and anti-fatigue properties; a damping device can be fitted to reduce tendon vibration.",
          "Easy to inspect and maintain, and fully replaceable over the life of the structure.",
          "The individual strand deviator reduces stress concentration through the deviation zone.",
        ],
        assemblies: [
          {
            name: "Basic components",
            parts: [
              "External cables, ducts and grouting materials",
              "Anchorage system",
              "Deviating device",
              "Anti-corrosion system",
              "Damping device",
            ],
          },
        ],
      },
      {
        id: "electrical-isolation",
        name: "Electrical Isolation PT System — PL2 / PL3",
        summary:
          "Protection-level tendons for aggressive environments, where the tendon must be electrically isolated from the structure and testable over its service life.",
        features: [
          "Meets EAD 160004, GB/T 14370, fib and ASTRA 12 010.",
          "Strong anti-corrosion capability across PL2 and PL3 protection levels.",
          "Extends the effective service life of the prestressed structure.",
        ],
      },
    ],
    equipment: [
      { name: "Mono-jack YDC", desc: "Single-strand stressing jack." },
      { name: "Hydraulic Jack YCW", desc: "Multi-strand through-centre stressing jack." },
      { name: "Built-in Jack YDCN" },
      { name: "Hollow Piston Jack YC (L)" },
      {
        name: "Hydraulic Pump",
        desc: "ZB4-500, ZB10/320-4/800B, ZB2-500AZ and ZPB-505B/175B units.",
      },
      { name: "Bulb Machine YH3B", desc: "Forms the bulb for Type H dead-end anchorages." },
      { name: "Swaging Machine GYJC50-150", desc: "Forms the swaged end for Type P anchorages and couplers." },
      { name: "Heading Machine" },
      { name: "Intelligent Grouting System LGSTC-700B" },
      { name: "Integrated Mix and Grouting Machine GS300" },
      { name: "High Speed Mixer JC500" },
      { name: "Screw Pump LGB3" },
      { name: "Mortar Pump UB3" },
      { name: "Vacuum Pump ZKB" },
      {
        name: "Smart Prestressing Tensioning System (OVM-SPT)",
        desc: "Records force and elongation automatically across the stressing sequence.",
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
    /* Structure types rather than product lines — the individual systems get
       their own detailed treatment in `subProducts` below, so listing them
       twice would only repeat the same names. */
    types: [
      {
        name: "Cable-stayed bridges",
        desc: "Multi-strand and parallel wire stay cables from OVM250 and OVM280 through to PWS, with single-strand installation, adjustment and replacement.",
      },
      {
        name: "Extradosed bridges",
        desc: "The OVMAT saddle system, applied on more than 500 bridges worldwide, carrying the cable over the pylon without a separate anchorage.",
      },
      {
        name: "Suspension bridges",
        desc: "PPWS main cable, hangers, saddles, cable clamps and replaceable anchor block systems, plus the erection plant to install them.",
      },
      {
        name: "Arch bridges",
        desc: "Tie bars and hanger cables with anchorage types for the arch end, beam end and deck end, including adjustable fork anchorages.",
      },
      {
        name: "Buildings & space structures",
        desc: "GJ prefabricated strand cables and flexible cable systems for roofs, footbridges and architectural structures.",
      },
    ],
    features: [
      "Cables are prefabricated on a production line in the factory and packed in reels for transport.",
      "Integral tensioning gives accurate tensile tonnage and uniform cable force; adjustment is convenient and verified by sensor.",
      "Extension products — external dampers and load cells — can be applied to the system for special requirements.",
      "Anti-corrosion design graded to C5-M, the highest ISO 12944 class for harsh marine environments.",
      "Single-strand installation and replacement, with real-time cable force monitoring across the service life.",
    ],
    standards: [
      { code: "GB/T 14370", title: "Anchorage, grip and coupler for prestressing tendons" },
      {
        code: "PTI DC45.1 / PTI-2007",
        title: "Recommendations for stay cable design, testing and installation",
      },
      { code: "fib Bulletin 30", title: "Acceptance of stay cable systems using prestressing steels" },
      { code: "CIP", title: "Cable stay system recommendations" },
      {
        code: "GB/T 18365",
        title: "Hot-extruded PE protected high-strength wire cable for cable-stayed bridges",
      },
      { code: "CJ/T 297-2008", title: "High density polyethylene sheathing compounds for bridge cable" },
      {
        code: "ASTM A416",
        title: "Steel strand, uncoated seven-wire, for prestressed concrete",
      },
      { code: "GB/T 5224", title: "Steel strand for prestressed concrete" },
      { code: "GB/T 25823-2010", title: "Individual epoxy-coated wire prestressing steel strand" },
      { code: "ISO 12944", title: "Corrosion protection of steel structures by protective paint systems" },
    ],
    certifications: [
      "Test reports from CTL (USA) and EMPA (Switzerland)",
      "Static load, fatigue performance and watertightness testing on completed cable assemblies",
    ],
    subProducts: [
      {
        id: "ovm250",
        name: "OVM250 Multi-Strand Stay Cable System",
        summary:
          "The established OVM multi-strand stay cable, built around a wedge-type multi-anchor head and individually sheathed, greased strands. Rated to a 250 MPa fatigue stress amplitude and applied across cable-stayed bridges worldwide.",
      },
      {
        id: "ovm280",
        name: "OVM280 Multi-Strand Stay Cable System",
        summary:
          "An innovative development of the OVM250 strand cable, with superior fatigue resistance and durability. Optimising the anchorage unit, reducing the strand transition-section angle and improving the strand base metal raises the comprehensive fatigue stress amplitude to 280 MPa.",
        features: [
          "From the S-N curve of cable fatigue testing, fatigue life is close to 4× that of a 200 MPa stress-amplitude cable and 1.71× that of a 250 MPa cable.",
          "The free length carries a multi-layered, uninterrupted anti-corrosion structure — more than four layers from the outside in.",
          "Metal components of the anchorage unit are coated in multiple alloy and sealed coatings; strands in the anchor cavity are filled with oil-based wax.",
          "The complete system meets rigorous dynamic watertightness standards, with an anti-corrosion grade of C5-M under ISO 12944.",
          "Advanced wind-resistance and vibration-reduction measures, fire prevention technology and smart monitoring extend the reach of long-span cable-stayed structures.",
        ],
      },
      {
        id: "ovmat",
        name: "OVMAT Stay Cable System for Extradosed Bridges",
        summary:
          "Developed specifically for extradosed cable-stayed bridges and applied on more than 500 bridges worldwide. An innovative saddle simplifies the structure at the pylon and reduces cost, while single strands remain individually adjustable and replaceable.",
        features: [
          "Outstanding anti-fatigue performance, compliant with CIP, fib and PTI recommendations.",
          "Multi-barrier corrosion protection across the free length and the anchorage.",
          "Saddle design removes the need for separate anchorages at the pylon.",
          "Single-strand adjustment and replacement without decommissioning the cable.",
          "Real-time cable force monitoring integrated into the system.",
        ],
      },
      {
        id: "parallel-wire",
        name: "Parallel Wire Stay Cable System (PWS)",
        summary:
          "Hot-extruded HDPE-protected high-strength wire cable with cold-cast heading anchorage, applied to arch bridges, cable-stayed bridges, roof space structures and suspension bridges.",
        features: [
          "Galvanized steel wires are drawn parallel into a bundle, then twisted concentrically 2–4° to the right, wrapped with high-strength polyester and hot-extruded with an HDPE sheath.",
          "Cables are cut and marked to the confirmed unstressed length, normally referenced at 20 °C.",
          "Epoxy-coated wire is available, electrostatically sprayed with a special epoxy powder to build a protective coating with strong anti-corrosion properties.",
          "Two double-layer PE sheath structures are offered: double-layer PE, and PE with a double helix for aerodynamic stability.",
        ],
        assemblies: [
          {
            name: "Type I — Anchorage with nut (arch end, deck end and beam end)",
            parts: [
              "Stressing-end or dead-end anchorage",
              "Bearing plate",
              "Arch rib or beam",
              "Pre-embedded pipe",
              "Cable",
            ],
          },
          {
            name: "Type II — Dead-end anchorage with fork (arch end and beam end)",
            parts: ["Pin", "Fork", "Connecting socket", "Sealing sleeve", "Cable"],
          },
          {
            name: "Type III — Adjustable anchorage with fork (mainly deck end)",
            parts: [
              "Pin roll",
              "Adjusting fork",
              "Adjusting rod",
              "Connecting sleeve",
              "Connecting socket",
              "Sealing sleeve",
              "Cable",
            ],
          },
          {
            name: "Arch bridge hanger — design guidance",
            notes: [
              "Hanger safety factor n = 2.5–3.",
              "The shortest free length of a hanger should be not less than 2 metres.",
              "The lower embedded pipe must extend 100–150 mm beyond the deck structure to ensure waterproofing at the base.",
            ],
          },
        ],
      },
      {
        id: "gj-prefabricated",
        name: "GJ Prefabricated Strand Cable System",
        summary:
          "OVM's proprietary cable with integral swaging anchorage: the whole strand bundle is swaged together at both ends, giving reliable anchoring, a compact head, and easy stressing and adjustment. Epoxy-coated, galvanized or bare strand can be used.",
        features: [
          "Strands are integrally swaged and anchored at both ends, so they will not slide under high stress, low stress, or even negative stress conditions.",
          "Swaging anchorage is at least 30% smaller than cold-cast or hot-cast anchorage of the same capacity, reducing the reserved holes in the structure.",
          "Each strand is individually greased, PE sheathed and isolated; the bundle is then taped with high-strength polyester belt and hot-extruded with HDPE — three anti-corrosion layers, so rust on one wire cannot spread.",
          "Individual PE sheathing raises structural damping above that of steel wire cable, giving excellent anti-vibration performance.",
          "A special technique reduces tensile stress in the HDPE outer layer, preventing stress cracking and improving durability.",
        ],
        assemblies: [
          {
            name: "Pylon end integral swaging anchorage",
            parts: [
              "Cap",
              "Integral swaging anchorage",
              "Spherical nut",
              "Spherical bearing plate",
              "Bearing plate",
              "Pre-embedded tube",
              "Upper damper",
              "Baffler",
              "Completed strand cable",
            ],
          },
          {
            name: "Girder end integral swaging anchorage",
            parts: [
              "Cap",
              "Integral swaging anchorage",
              "Spherical nut",
              "Spherical bearing plate",
              "Bearing plate",
              "Pre-embedded tube",
              "Lower damper",
              "Water-proof cover",
              "Completed strand cable",
            ],
          },
          {
            name: "Verification testing",
            parts: [
              "Static load test",
              "Fatigue performance test",
              "Watertightness performance test",
            ],
          },
        ],
      },
      {
        id: "suspension-bridge",
        name: "Suspension Bridge Cable System",
        summary:
          "A complete product range for suspension bridges: PPWS main cable and hangers with outstanding anti-corrosion properties, replaceable anchor block systems, saddles and clamps — supported by three major construction equipment sets.",
        features: [
          "Advanced replaceable anchor block system at the anchorage chamber.",
          "PPWS main cable and hangers with outstanding anti-corrosion properties.",
          "Three major construction equipment sets: cable crane, wrapping machine and main cable compressor.",
        ],
      },
      {
        id: "other-cable",
        name: "External & Flexible Cable Systems",
        summary:
          "Tie cables for arch bridges, external cables for box girders, and flexible cable systems for roof and space structures, drawn from the same anchorage and corrosion-protection technology as the stay cable range.",
      },
    ],
    services: [
      "Design consultation for strand, wire and extradosed stay cable systems",
      "Fabrication and installation of multi-strand, PWS and extradosed stay cables",
      "Monitoring and adjustment of cable force during and after erection",
      "Repair, replacement and maintenance of existing cable systems",
      "Design, fabrication and operation of deck erection cranes and hanging baskets",
      "Main beam segment lifting and assembly for cable-stayed bridges",
      "Installation of main cable saddles, cable clamps and hangers on suspension bridges",
      "Coating protection and maintenance of suspension bridge main cables",
      "Tied arch bridge work — cable lifting systems, fastening stays, arch rib and deck beam lifting",
      "Lease of special tools and equipment for stay cable works",
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
        standards: [
          { code: "AASHTO LRFD", title: "Bridge design specifications" },
          { code: "EN 1337", title: "Structural bearings" },
          { code: "EN 15129", title: "Anti-seismic devices" },
          { code: "BS 5400", title: "Steel, concrete and composite bridges" },
          { code: "JT / JTG", title: "Chinese highway industry standards" },
        ],
        certifications: [
          "CE certification",
          "Test reports from CTL (USA), MILANO (Italy) and KIT (Germany)",
        ],
        subProducts: [
          {
            id: "elastomeric-bearing",
            name: "Elastomeric Bearing",
            summary:
              "A rubber block of vulcanised elastomer with inner reinforcement steel plates, forming the connection between superstructure and substructure.",
            features: [
              "Sufficient vertical rigidity to bear and transmit normal loads.",
              "Good flexibility for rotation in any direction.",
              "Considerable shear deformation to satisfy horizontal movement.",
              "Strong anti-vibration behaviour, reducing the impact of dynamic load.",
              "Can be bonded with a PTFE plate to satisfy large horizontal movement in one or two directions.",
            ],
          },
          {
            id: "pot-bearing",
            name: "Pot Bearing",
            summary:
              "Available as fixed, guided sliding and free sliding. Satisfies requirements for large load capacity in three directions, great horizontal displacement and large rotation.",
            features: [
              "Designed and manufactured to AASHTO, EN 1337 and BS 5400, or to customer specification.",
              "Confined elastomer pad transfers high vertical load while permitting rotation.",
            ],
          },
          {
            id: "spherical-bearing",
            name: "Spherical Bearing",
            summary:
              "Available as fixed, guided sliding and free sliding. Combines great capacity and large displacement with a rotation angle of 0.05 rad or more in all directions, which suits wide and curved bridges.",
            features: [
              "Designed and manufactured to AASHTO, EN 1337 and BS 5400, or to customer specification.",
              "Spherical sliding surface accommodates rotation about any axis.",
            ],
          },
        ],
        /* Empty by design: every bearing type is covered in full by this
           group's `subProducts`, so a types grid would only repeat them. */
        types: [],
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
        standards: [
          { code: "AASHTO LRFD", title: "Bridge design specifications" },
          { code: "EN 1337", title: "Structural bearings" },
          { code: "BS 5400", title: "Steel, concrete and composite bridges" },
          { code: "JT / JTG", title: "Chinese highway industry standards" },
        ],
        certifications: ["CE certification"],
        subProducts: [
          {
            id: "strip-seal-joint",
            name: "Strip Seal Expansion Joint",
            summary:
              "Small in height and simple in structure, which suits both old bridge replacement and new bridge construction.",
            features: [
              "Simple structure",
              "Easy installation",
              "Excellent durability and reliability",
            ],
          },
          {
            id: "rubber-joint",
            name: "Rubber Expansion Joint",
            summary:
              "A rubber-bodied joint for moderate movement ranges, sealed against water and de-icing salts.",
            features: [
              "Convenient installation",
              "Smooth driving",
              "Low noise",
              "Light in weight",
            ],
          },
          {
            id: "modular-joint",
            name: "Modular Expansion Joint",
            summary:
              "Multiple sealed cells share the total movement, extending the range well beyond a single-gap joint.",
            features: [
              "Convenient installation",
              "Smooth driving",
              "Low noise",
              "Light in weight",
            ],
          },
          {
            id: "finger-joint",
            name: "Finger Expansion Joint",
            summary:
              "OVM prestressed multi-directional displacement finger joints meet requirements for large and multi-directional displacement, which makes them especially suitable for long-span cable-stayed bridges. Maximum displacement reaches 1,600 mm.",
            features: [
              "Long service life",
              "Convenient installation",
              "Low noise",
              "Excellent waterproofing",
            ],
          },
        ],
        /* Empty by design — see the bearing group above. */
        types: [],
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
          "For structures in seismic zones, isolation bearings are introduced to absorb and dissipate seismic energy, protecting critical infrastructure during earthquake events.",
        standards: [
          { code: "EN 15129", title: "Anti-seismic devices" },
          { code: "AASHTO LRFD", title: "Guide specification for seismic isolation design" },
        ],
        subProducts: [
          {
            id: "lead-rubber-bearing",
            name: "Lead Rubber Bearing (LRB) & High-Damping Rubber Bearing (HDRB)",
            summary:
              "Collectively referred to as isolation rubber bearings, composed of compounded rubber layers, reinforcement steel plates and — in the LRB — a lead bar.",
            features: [
              "Combines good vertical load capacity with excellent energy-dissipating capacity and great durability.",
              "Suitable for seismic isolation of bridges, buildings and other large structures.",
            ],
          },
          {
            id: "pendulum-bearing",
            name: "Pendulum Bearing",
            summary:
              "A special spherical bearing with isolation function. It extends the period of the superstructure and reduces seismic response on the principle of pendulum motion.",
            features: [
              "Dissipates seismic energy through its own friction.",
              "Uses the self-weight of the superstructure to re-centre after an event.",
            ],
          },
        ],
        /* Empty by design — see the bearing group above. */
        types: [],
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
      {
        name: "Eddy Current Tuned Mass Damper",
        desc: "A tuned mass system using eddy current damping in place of fluid viscous damping.",
      },
    ],
    subProducts: [
      {
        id: "viscous-fluid-damper",
        name: "Viscous Fluid Damper",
        summary:
          "A hydraulic device with no initial stiffness and no additional internal force applied to the structure, so it does not affect the structure's period or vibration modes. Under the rapid deformation caused by an earthquake it consumes energy quickly, reducing both acceleration and displacement.",
        features: [
          "Smaller size than equivalent devices, with convenient installation and maintenance.",
          "Great durability, and insensitive to temperature.",
          "No initial stiffness, so the design period and mode shapes are unchanged.",
        ],
      },
      {
        id: "mr-damper",
        name: "Permanent Magnet Adjustable Magnetorheological Damper",
        summary:
          "An assembled vibration damper that uses magnetorheological fluid to provide damping force and permanent magnets for regulation.",
        features: [
          "Stable and reliable between −45 °C and 150 °C.",
          "Well suited to high-frequency, small-displacement vibration — bridge cable vibration control in particular.",
          "Continuously adjustable damping without an external power supply.",
        ],
      },
      {
        id: "eddy-current-tmd",
        name: "Eddy Current Tuned Mass Damper",
        summary:
          "A vibration system of mass block, elastic element and damping element, supported or suspended on the structure. When the structure vibrates under external excitation the mass block moves out of phase with it, producing opposing forces that reduce the structural response.",
        features: [
          "Uses eddy current damping in place of traditional fluid viscous damping.",
          "Ideal linear viscous damping behaviour with a definite damping coefficient.",
          "No additional stiffness and no abrasion over the service life.",
        ],
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
