/* OVM construction equipment. Drives `app/equipment/[slug]/page.tsx`, which
   pre-renders one route per slug, and the sidebar that navigates between
   them. Unlike the technology pages — one long scroll each — an equipment
   item is a single spec block, so the set is indexed by that sidebar
   instead. */

/** A named sub-unit of a larger system, each with its own photo and specs.
    Only the tunnel package is split this way today. */
export type EquipmentSubItem = {
  name: string;
  image: string;
  bullets: string[];
};

export type EquipmentItem = {
  slug: string;
  name: string;
  /** Present on single-unit items; items with `subItems` carry the photo per sub-item. */
  image?: string;
  /** Lead paragraph, used where the system needs framing before its parts. */
  intro?: string;
  bullets?: string[];
  subItems?: EquipmentSubItem[];
  /** Footage exists for this unit but is not yet on the site — renders a placeholder. */
  hasVideo: boolean;
  comingSoon: boolean;
};

export const equipmentItems: EquipmentItem[] = [
  {
    slug: "680t-hydraulic-gantry-crane",
    name: "680t Hydraulic Gantry Crane",
    image: "/equipment/680t-hydraulic-gantry-crane.png",
    bullets: [
      "Multi-section jacking design with a maximum lifting height of 10.8m.",
      "Modular jacking tower design with integrated hydraulic control for easy on-site installation and transportation.",
      "No reduction in jacking force with multi-section design.",
      "Automatic load transition during multi-stage jacking.",
      "Realizes automatic synchronous control of jacking movement with an accuracy of ±5mm.",
      "Compared to similar equipment in the industry, it has faster jacking and travel speeds, ensuring efficient operation.",
      "Wireless remote control enables the control of single gantry and double gantries of a single tower or any two towers.",
    ],
    hasVideo: true,
    comingSoon: false,
  },
  {
    slug: "large-diameter-wire-rope-tension-jack-system",
    name: "Large Diameter Wire Rope Tension Jack System",
    image: "/equipment/large-diameter-wire-rope-tension-jack-system.png",
    bullets: [
      "The first large-diameter wire rope traction and lifting super-large tonnage tension jack available in China.",
      "The wire rope is corrosion-resistant, highly flexible, and steerable, suitable for offshore lifting and traction.",
      "The wire rope can be installed vertically or longitudinally, offering flexible and convenient installation.",
      "The accumulator clamp piece automatically adjusts to ensure safe and reliable clamping under variable load conditions.",
      "Cluster displacement synchronization and load balancing control algorithms ensure stable and safe operation.",
      "Wireless transmission of big data enables remote monitoring.",
      "The winch features a modular design, offering high versatility and easy maintenance.",
    ],
    hasVideo: false,
    comingSoon: false,
  },
  {
    slug: "lzdj1000t-cable-supported-crane",
    name: "LZDJ1000t Cable-Supported Crane",
    image: "/equipment/lzdj1000t-cable-supported-crane.png",
    bullets: [
      "The world's largest load capacity cable-supported crane — the first domestic major technical equipment certified in Guangxi.",
      "Currently the only intelligent cable-supported crane in China with an automatic cable clamp crossing function.",
      "Self-adaptive traction angle adjustment ensures safe traveling.",
      "Large visual display screen with intelligent cloud platform.",
      "Hydraulic motor coordinated taking-up and paying-off, with steel strand anti-dent protection.",
      "Maximum average lifting speed: 30–35m/h. Maximum average traveling speed: 30m/h (roller traveling).",
      "The maximum speed of hydraulic power lowering sling can reach 80m/h.",
      "Integrated diesel engine pump station — compact and lightweight.",
      "The steel truss has a modular design with high versatility and flexible modification.",
    ],
    hasVideo: false,
    comingSoon: false,
  },
  {
    slug: "walking-incremental-launching-equipment",
    name: "Walking Incremental Launching Equipment with Distributed Bearing and Reaction Forces",
    image: "/equipment/walking-incremental-launching-equipment.png",
    bullets: [
      "Stress during the incremental launching process is dispersed and controllable, ensuring high component safety.",
      "The truss beam enables efficient walking incremental launching.",
      "Split-type walking machine structure reduces beam falling height and risk.",
      "Adopting a 64MPa ultra-high pressure hydraulic system, it features a compact structure and lightweight equipment.",
      "High-precision synchronous control of the beam lowering position and load, ensuring high safety for beam lowering.",
      "Achieves incremental launching with equal force and dead load through hydraulic control, providing extremely high safety adaptability for incremental launching buttresses sensitive to unbalanced horizontal forces.",
      "Currently the ultra-high-pressure walking system with the fastest comprehensive speed in China.",
    ],
    hasVideo: false,
    comingSoon: false,
  },
  {
    slug: "tunnel-construction-equipment",
    name: "Tunnel Construction Equipment",
    intro:
      "In a single-hole double-track shield tunnel, the lower part uses prefabricated arc components as the roadbed and the middle part uses prefabricated mid-partition wall components to separate the tunnel. After some progress in the installation of the lower arc, the mid-partition wall can be installed synchronously, thus shortening the overall construction period.",
    subItems: [
      {
        name: "Self-Propelled Arc Component Installation Equipment",
        image: "/equipment/tunnel-arc-component-installation.png",
        bullets: [
          "Features include on-load traveling, small radian steering, height adjustment, longitudinal and transverse slope adjustment, and horizontal rotation adjustment.",
        ],
      },
      {
        name: "Compact Mid-Partition Wall Equipment",
        image: "/equipment/tunnel-midpartition-wall-equipment.png",
        bullets: [
          "Features X/Y/Z three-dimensional translation and rotation (six degrees of freedom) adjustment functions, capable of executing tasks such as pin insertion and extraction, jacking, rotation, transverse movement, longitudinal and transverse slope adjustment, and lowering.",
          "Innovative gantry-type lightweight compact mid-partition wall equipment features a small structural section that does not obstruct the passage of vehicles on either side or interfere with other construction processes.",
          "Prefabricated wall elements can be quickly unloaded and precisely positioned with a button press, then longitudinally moved to the assembly location. After continuously assembling 4 prefabricated wall sections, the equipment is shifted, enhancing operational efficiency.",
        ],
      },
    ],
    hasVideo: false,
    comingSoon: false,
  },
];

export const getEquipmentItem = (slug: string) =>
  equipmentItems.find((item) => item.slug === slug);

/** Sidebar / nav model — label plus its own route. */
export const equipmentLinks = equipmentItems.map(({ slug, name }) => ({
  label: name,
  href: `/equipment/${slug}`,
}));
