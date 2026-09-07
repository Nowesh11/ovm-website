/* Headline company figures. Single source of truth for the stats band, which
   the homepage and the About page both render through `StatsSection`. */

/** Icon key resolved to a component at render time, so this module stays a
    plain data file with no client-only imports. */
export type CompanyStatIconKey = "turnover" | "employees" | "patents" | "countries";

export type CompanyStat = {
  icon: CompanyStatIconKey;
  /** The figure as written. `prefix + count + suffix` composes to this — keep
      the two in step when a number is revised. */
  value: string;
  /** Count-up target and the fixed text either side of it. */
  count: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const COMPANY_STATS: CompanyStat[] = [
  {
    icon: "turnover",
    value: "USD 450M",
    count: 450,
    prefix: "USD ",
    suffix: "M",
    label: "Turnover 2025",
  },
  { icon: "employees", value: "1,700+", count: 1700, suffix: "+", label: "Skilled employees" },
  { icon: "patents", value: "1,350+", count: 1350, suffix: "+", label: "Patents held" },
  { icon: "countries", value: "80+", count: 80, suffix: "+", label: "Countries served" },
];
