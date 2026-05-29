// Static content for Hero's Journey Creative scaffold

export interface NavLink {
  label: string;
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
  name: "Hero’s Journey Creative",
  tagline: "A creative studio for writing, workshops, story worlds, and human-centred AI experiments.",
  location: "Based in Aotearoa New Zealand. Built for people turning memory, experience, and imagination into story.",
  copyright: "© 2026 Hero’s Journey Creative. Built in Aotearoa New Zealand.",
  email: "Contact details to be confirmed.",
  phone: "Contact details to be confirmed.",
  address: "Aotearoa New Zealand",
};

export const JOURNAL_ITEMS: JournalItem[] = [
  {
    id: "journal-1",
    title: "Journal Entry Placeholder",
    publishedAt: "Date to be confirmed",
    excerpt: "Journal excerpt placeholder. Reflective notes and essay content to be confirmed.",
    slug: "journal-placeholder-1",
    readTime: "Read time placeholder",
  },
  {
    id: "journal-2",
    title: "Journal Entry Placeholder",
    publishedAt: "Date to be confirmed",
    excerpt: "Journal excerpt placeholder. Reflective notes and essay content to be confirmed.",
    slug: "journal-placeholder-2",
    readTime: "Read time placeholder",
  },
  {
    id: "journal-3",
    title: "Journal Entry Placeholder",
    publishedAt: "Date to be confirmed",
    excerpt: "Journal excerpt placeholder. Reflective notes and essay content to be confirmed.",
    slug: "journal-placeholder-3",
    readTime: "Read time placeholder",
  },
];

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "showcase-1",
    title: "Project Example Placeholder",
    category: "Service details to be confirmed.",
    description: "Project description placeholder. Specific case study details to be confirmed.",
    slug: "project-placeholder-1",
    year: "Year to be confirmed",
  },
  {
    id: "showcase-2",
    title: "Project Example Placeholder",
    category: "Service details to be confirmed.",
    description: "Project description placeholder. Specific case study details to be confirmed.",
    slug: "project-placeholder-2",
    year: "Year to be confirmed",
  },
  {
    id: "showcase-3",
    title: "Project Example Placeholder",
    category: "Service details to be confirmed.",
    description: "Project description placeholder. Specific case study details to be confirmed.",
    slug: "project-placeholder-3",
    year: "Year to be confirmed",
  },
];
