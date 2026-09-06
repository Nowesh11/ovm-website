/* Open roles at OVM Malaysia. Consumed by the Careers page
   (`components/CareersContent.tsx`) and nothing else — the homepage teaser
   only links here, it does not list roles.

   Some listings arrived from the client truncated mid-sentence. Those keep
   only their complete bullets and carry `incomplete: true`, which renders a
   "Full role details available on request" note instead of implying the list
   is the whole job description. Clear the flag once the full copy lands. */

export type ResponsibilityGroup = {
  heading: string;
  items: string[];
};

export type JobOpening = {
  slug: string;
  title: string;
  /** Optional meta — only the roles the client detailed carry these. */
  location?: string;
  employmentType?: string;
  industry?: string;
  summary: string;
  /** Flat bullet list. Mutually exclusive with `responsibilityGroups`. */
  responsibilities?: string[];
  /** Bulleted under sub-headings, for roles supplied that way. */
  responsibilityGroups?: ResponsibilityGroup[];
  requirements?: string[];
  /** True while the client still owes us the rest of the description. */
  incomplete: boolean;
};

/* Company-level copy, not tied to any one role — it heads the page above the
   listings rather than sitting inside a card. */
export const CAREERS_INTRO =
  "Founded in 1966, OVM is China's premier supplier and sub-contractor in prestressing technology, renowned for reliability, innovation, and professionalism. Our cutting-edge products are trusted in thousands of key infrastructure projects worldwide, including bridges, highways, railways, buildings, dams, and nuclear power plants. OVM entered Malaysia in 2015 and has widely participated in the country's significant projects such as DASH Highway, SUKE Highway, EKVE, DUKE 3, Pan Borneo Highway, Double Track, RTS project, IOI City Mall, Bintulu-Jepak Cable-Stayed Bridge, Rambungan Cable-Stayed Bridge, Igan Bridge, Muara Lassa Bridge, Batang Lupar 1 Bridge, and Saribas 1 Bridge.";

export const jobOpenings: JobOpening[] = [
  {
    slug: "business-development-engineer-manager",
    title: "Business Development Engineer / Manager",
    summary:
      "We are a leading specialist in post-tensioning systems and bridge erection works, delivering innovative solutions for highways, MRT/LRT projects, viaducts, and complex infrastructure. With a strong track record in engineering excellence, we are expanding our footprint and seeking a dynamic Business Development Engineer / Manager to drive growth and partnerships.",
    responsibilities: [
      "Identify and secure new infrastructure projects across Malaysia and the region.",
      "Build strong relationships with project owners, consultants, contractors, and government agencies.",
      "Lead tendering and proposal preparation, ensuring technical and commercial competitiveness.",
    ],
    incomplete: true,
  },
  {
    slug: "site-supervisor",
    title: "Site Supervisor",
    summary:
      "OVM Prestressing Technology (M) Sdn Bhd — OVM Malaysia — provides innovative engineering solutions for infrastructure projects, including bridges, buildings, water conservancy, hydropower, geological engineering, containment structures, and renewable energy.",
    responsibilities: ["Oversee and supervise daily site activities."],
    incomplete: true,
  },
  {
    slug: "site-engineer",
    title: "Site Engineer",
    summary:
      "As a Site Engineer, you will be in charge of on-site technical management, construction supervision and QA/QC for prestressing (PT) works. You will coordinate with main contractors and consultants, monitor site execution progress, ensure construction complies with project specifications and local regulatory requirements, and complete relevant technical documentation and project handover.",
    responsibilities: [
      "Interpret structural & PT drawings and specifications; prepare method statements, ITP and technical submittals, conduct pre-installation site survey and setting-out verification.",
      "Supervise full PT installation, stressing and grouting works; calculate tendon elongation and verify actual stressing results against theoretical values.",
    ],
    incomplete: true,
  },
  {
    slug: "finance-manager",
    title: "Finance Manager (Engineering)",
    location: "Malaysia (Kuala Lumpur / Selangor / Project Sites)",
    employmentType: "Full-time",
    industry: "Engineering / Construction",
    summary:
      "We are looking for a Finance Manager to strengthen our client's financial leadership within the engineering division. The role involves managing financial operations, project costing and financial reporting, supporting engineering project teams with accurate financial insights, and ensuring compliance with Malaysian regulations.",
    responsibilityGroups: [
      {
        heading: "Financial Planning, Reporting & Compliance",
        items: [
          "Lead preparation of monthly, quarterly, and annual financial statements (MFRS compliant).",
          "Oversee budgeting, forecasting, cash flow management, and variance analysis.",
          "Maintain statutory compliance including SST, corporate tax, EPF/SOCSO filings and audit readiness.",
        ],
      },
      {
        heading: "Project Finance & Cost Control",
        items: [
          "Monitor project budgets and costs for engineering / construction / technical services.",
          "Work closely with project managers to ensure profitability tracking and cost optimization.",
          "Conduct project financial risk assessments and advise on cost recovery strategies.",
        ],
      },
      {
        heading: "Strategic Support",
        items: [
          "Provide financial modelling and scenario analysis for tenders, proposals, and contracts.",
          "Support senior leadership with insights on financial performance, ROI, and strategic planning.",
        ],
      },
      {
        heading: "Team Leadership & Stakeholder Engagement",
        items: [
          "Coordinate with internal departments (engineering, procurement, operations) to align financial targets with project delivery.",
        ],
      },
    ],
    requirements: [
      "Bachelor's degree in Finance, Accounting, or a related field (ACCA, CPA, CIMA preferred).",
      "Minimum 4–7 years' finance experience ideally within engineering, construction, manufacturing or EPC industries.",
      "Strong knowledge of project accounting and cost control practices.",
      "Excellent proficiency in accounting systems and MS Excel (ERP experience preferred).",
      "Strategic thinker with strong communication and leadership skills.",
    ],
    incomplete: false,
  },
];

/** Pre-fills the subject line so applications land tagged with the role. */
export function applyHref(mailtoBase: string, title: string) {
  return `${mailtoBase}?subject=${encodeURIComponent(`Application: ${title}`)}`;
}
