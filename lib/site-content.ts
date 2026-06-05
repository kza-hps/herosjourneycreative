// Static content for Hero's Journey Creative.

export const WORKSHOPS_MEETUP_URL =
  "https://www.meetup.com/auckland-creative-writing-sprint-workshops/";

export interface WorkshopPathwayCard {
  label: string;
  heading: string;
  body: string;
  cta: string;
  href: string;
  external?: boolean;
}

export interface WorkshopPricingTier {
  title: string;
  price: string;
  detail: string;
}

export interface SprintRow {
  session: string;
  focus: string;
  whatWeDo: string;
}

export const WORKSHOP_PATHWAY_CARDS: WorkshopPathwayCard[] = [
  {
    label: "Public / Auckland",
    heading: "Auckland Live Sprint-Workshops",
    body: "Drop-in writing sprint sessions held in Auckland. Timed prompts, group energy, and a structured container for stories you haven't written yet.",
    cta: "View on Meetup",
    href: WORKSHOPS_MEETUP_URL,
    external: true,
  },
  {
    label: "Public / Zoom",
    heading: "Zoom Sprint-Workshops",
    body: "The same guided sprint format, open to writers anywhere in Aotearoa and internationally. Join live from wherever you write.",
    cta: "View on Meetup",
    href: WORKSHOPS_MEETUP_URL,
    external: true,
  },
  {
    label: "Private / Group Booking",
    heading: "Creative & Legacy Writing Workshops",
    body: "Bespoke workshops tailored for your team, school, community group, marae, or care setting. We design the session around your people and purpose.",
    cta: "Enquire About a Private Workshop",
    href: "/contact?interest=private-workshop",
    external: false,
  },
];

export const WORKSHOP_PRICING: WorkshopPricingTier[] = [
  {
    title: "On-site workshop",
    price: "$350 + GST",
    detail: "Up to 20 participants, up to 2 hours",
  },
  {
    title: "4-workshop bundle",
    price: "$1,200 + GST",
    detail: "Save $200, plus a free beta/feedback service",
  },
];

export const SPRINT_FORMAT_ROWS: SprintRow[] = [
  {
    session: "Welcome",
    focus: "Settling in",
    whatWeDo: "Brief introductions, prompt framing, and a warm-up exercise to get words moving.",
  },
  {
    session: "Sprints 1–5",
    focus: "Five focused sprints",
    whatWeDo: "Five timed 10-minute writing bursts, each opened with a short prompt. You follow where it leads.",
  },
  {
    session: "Break",
    focus: "Reset",
    whatWeDo: "A short pause to stretch, breathe, and let the writing settle.",
  },
  {
    session: "Share",
    focus: "Reading aloud",
    whatWeDo: "Opt-in sharing of a passage. The group listens without critique — just attention.",
  },
  {
    session: "Wrap-Up",
    focus: "Closing reflection",
    whatWeDo: "What surfaced, what to carry forward, and next steps for your writing practice.",
  },
];

export const PRIVATE_AUDIENCE_GROUPS: string[] = [
  "Teams & workplaces",
  "Schools & universities",
  "Marae, iwi & community groups",
  "Libraries & arts centres",
  "Aged-care & retirement communities",
  "Hospice & wellbeing settings",
  "Private writing groups",
];

export const WHAT_TO_BRING: string[] = [
  "A notebook and pen — or a laptop",
  "A topic, memory, or character you're curious about",
  "An open mind — first drafts are allowed to be messy",
  "Nothing else. All prompts and structure are provided.",
];

export interface NavLink {
  label: string;
  href: string;
}

export interface LaneItem {
  no: string;
  id: string;
  title: string;
  description: string;
  href: string;
}

export interface JournalItem {
  id: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  slug: string;
  readTime: string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  description: string;
  slug: string;
  year: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Workshops", href: "/workshops" },
  { label: "Legacy Writing", href: "/legacy-writing" },
  { label: "Personal Myth Authoring", href: "/personal-myth-authoring" },
  { label: "Journal", href: "/journal" },
  { label: "Showcase", href: "/showcase" },
  { label: "Contact", href: "/contact" },
];

export const BRAND_INFO = {
  name: "Hero's Journey Creative",
  tagline: "A creative studio for writing, workshops, story worlds, and human-centred AI experiments.",
  location: "Based in Aotearoa New Zealand. Built for people turning memory, experience, and imagination into story.",
  copyright: "© 2026 Hero's Journey Creative",
  email: "kauri@herosjourneycreative.co.nz",
  phone: "",
  address: "Aotearoa New Zealand",
};

export const LANE_ITEMS: LaneItem[] = [
  {
    no: "01",
    id: "workshops",
    title: "Workshops",
    description: "Guided sessions and structured writing environments: morning journal cohorts, world and myth architecture.",
    href: "/workshops",
  },
  {
    no: "02",
    id: "legacy",
    title: "Legacy & Personal Story",
    description: "Bespoke memoir, family-archive structuring, and personal-myth writing that captures a lifetime.",
    href: "/legacy-writing",
  },
  {
    no: "03",
    id: "journal",
    title: "Journal",
    description: "Reflections on language, notes from the workshop table, and human-centred AI experiments.",
    href: "/journal",
  },
  {
    no: "04",
    id: "showcase",
    title: "Showcase",
    description: "Selected case studies: hand-bound archives, interactive portals, and community programmes.",
    href: "/showcase",
  },
];

export const JOURNAL_ITEMS: JournalItem[] = [
  {
    id: "journal-1",
    title: "On narrative as infrastructure",
    publishedAt: "Field note",
    excerpt: "Why we treat story as the load-bearing structure of a life, not its decoration.",
    slug: "narrative-as-infrastructure",
    readTime: "6 min",
  },
  {
    id: "journal-2",
    title: "The morning page, revisited",
    publishedAt: "Field note",
    excerpt: "What a daily journaling practice surfaces when you read it as raw material.",
    slug: "morning-page-revisited",
    readTime: "4 min",
  },
  {
    id: "journal-3",
    title: "Writing with the machine",
    publishedAt: "Field note",
    excerpt: "Notes from our human-centred AI experiments: collaboration, not replacement.",
    slug: "writing-with-the-machine",
    readTime: "8 min",
  },
];

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "showcase-1",
    title: "A hand-bound family archive",
    category: "Memoir",
    description: "A multi-generational memoir, structured and printed as a private volume.",
    slug: "family-archive",
    year: "Private",
  },
  {
    id: "showcase-2",
    title: "A walkable story world",
    category: "Interactive",
    description: "A branching narrative portal mapping a community's shared history.",
    slug: "story-world-portal",
    year: "Studio",
  },
  {
    id: "showcase-3",
    title: "A regional writing cohort",
    category: "Programme",
    description: "A season of workshops turning lived experience into publishable structure.",
    slug: "regional-cohort",
    year: "Cohort",
  },
];
