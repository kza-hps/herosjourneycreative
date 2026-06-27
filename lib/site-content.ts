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
  price?: string;
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
  {
    label: "Corporate / AI Build",
    heading: "AI Engineering: Vibe Coding 101",
    body: "A hands-on AI engineering workshop demonstrating vibe coding with production discipline. Using VouchMeApp as the exemplar, we walk participants through the end-to-end build of a SaaS-style tool: moving from product brief and user journeys through to disciplined AI-assisted engineering, rapid prototyping, structured testing, and deployment.",
    cta: "Enquire About This Workshop",
    href: "/contact?interest=ai-engineering-workshop",
    external: false,
    price: "From $2,000 + GST",
  },
];

export const WORKSHOP_PRICING: WorkshopPricingTier[] = [
  {
    title: "Writing workshop",
    price: "$350 + GST",
    detail: "Up to 20 participants, up to 2 hours.",
  },
  {
    title: "Writing workshop bundle",
    price: "$1,200 + GST",
    detail: "Four-workshop bundle. Save $200, plus a free beta/feedback service.",
  },
  {
    title: "AI Engineering full-day intensive",
    price: "From $2,000 + GST",
    detail: "Full-day corporate intensive. Hands-on SaaS prototype build.",
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

export interface AiWorkshopFormat {
  label: string;
  description: string;
  price?: string;
}

export const AI_WORKSHOP_FORMATS: AiWorkshopFormat[] = [
  {
    label: "Corporate full-day intensive",
    description: "A full-day session for organisations wanting to understand AI-assisted product development through a practical, end-to-end build.",
    price: "From $2,000 + GST",
  },
  {
    label: "Zoom cohort workshop",
    description: "A remote version for individuals, founders, small teams, and Meetup participants. Available by arrangement — being developed for online delivery.",
  },
  {
    label: "Meetup taster session",
    description: "A shorter introduction to the workflow, designed to demonstrate the method and help participants decide whether they want to join the deeper build workshop.",
  },
];

export const AI_WORKSHOP_COVERS: string[] = [
  "Turning a business problem into a buildable product brief",
  "Mapping users, roles, permissions, and workflows",
  "Creating a product requirements document that an AI coding agent can actually use",
  "Using frontier models to generate, review, debug, and improve code",
  "Moving from idea to prototype to deployed web application",
  "Understanding where AI accelerates development, and where human-in-the-loop judgement remains critical",
  "The journey from initial prototype to a production-ready tool backed by structured testing and deployment discipline",
];

export const AI_WORKSHOP_PREREQUISITES: string[] = [
  "A laptop you can use throughout the session",
  "Access to at least one frontier general-purpose AI model",
  "A modern browser",
  "Willingness to iterate rapidly across product design, prompts, code, and interfaces",
  "Basic comfort using web apps and copying/pasting structured prompts or code",
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

export interface ShowcaseExternalLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ShowcaseDetail {
  heroSubtitle: string;
  introQuestion?: string;
  summary: {
    whatItIs: string;
    whyItExists: string;
    whatWasBuilt: string;
  };
  buildStory: {
    problem: string;
    insight: string;
    aiRole: string;
    humanInLoop: string;
  };
  productionNotes: {
    stack: string;
    designProcess: string;
    promptingWorkflow: string;
    testing: string;
  };
  outcome: {
    currentState: string;
    demonstrates: string;
  };
  videoPlaceholderTitle: string;
}

export interface ShowcaseScreenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface ShowcaseItem {
  id: string;
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  metadata: string;
  notes: string;
  heroImage?: string;
  heroImageDimensions?: { width: number; height: number };
  screenshots?: ShowcaseScreenshot[];
  externalLinks: ShowcaseExternalLink[];
  detail: ShowcaseDetail;
  hidden?: boolean;
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
  tagline: "A story-led creative studio for human writing practice, disciplined AI engineering, and careful enquiry into the future of creativity, memory, and technology.",
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
    description: "Reflections on language, notes from the workshop table, and careful AI enquiry.",
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
    excerpt: "Notes on writing alongside emerging technology: human craft, collaboration, and caution.",
    slug: "writing-with-the-machine",
    readTime: "8 min",
  },
];

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "showcase-vouchmeapp",
    slug: "vouchmeapp",
    eyebrow: "AI Product / Trust Infrastructure",
    title: "VouchMeApp",
    description:
      "A multi-role reference platform for candidates, referees, and recruiters — built as a portable trust layer for the AI-shaped labour market.",
    metadata: "Live product",
    notes: "Multi-role SaaS · Supabase · Stripe · OAuth · Private audio · UAT",
    heroImage: "/showcase/vouchmeapp/hero.png",
    heroImageDimensions: { width: 1906, height: 1086 },
    screenshots: [
      { src: "/showcase/vouchmeapp/dashboard.png", alt: "VouchMeApp recruiter dashboard", caption: "Recruiter dashboard" },
      { src: "/showcase/vouchmeapp/reference-request.png", alt: "VouchMeApp reference request flow", caption: "Reference request flow" },
      { src: "/showcase/vouchmeapp/reference-detail.png", alt: "VouchMeApp reference record detail", caption: "Reference record detail" },
      { src: "/showcase/vouchmeapp/brand-concept.png", alt: "VouchMeApp brand and layer concept exploration", caption: "Brand & layer concept exploration" },
      { src: "/showcase/vouchmeapp/workflow-supabase.png", alt: "Supabase project used to build VouchMeApp", caption: "Behind the build — Supabase" },
      { src: "/showcase/vouchmeapp/workflow-stripe.png", alt: "Stripe products configured for VouchMeApp", caption: "Behind the build — Stripe" },
      { src: "/showcase/vouchmeapp/workflow-vercel.png", alt: "Vercel deployment for VouchMeApp", caption: "Behind the build — Vercel" },
      { src: "/showcase/vouchmeapp/workflow-notion.png", alt: "Notion sprint planning board for VouchMeApp", caption: "Behind the build — Notion" },
      { src: "/showcase/vouchmeapp/workflow-canva.png", alt: "Canva visual exploration for VouchMeApp", caption: "Behind the build — Canva" },
      { src: "/showcase/vouchmeapp/workflow-codex.png", alt: "Codex agent session for VouchMeApp", caption: "Behind the build — Codex" },
    ],
    externalLinks: [
      { label: "Visit vouchmeapp.com", href: "https://vouchmeapp.com", external: true },
    ],
    detail: {
      heroSubtitle:
        "A portable trust platform for the modern workforce — designed, built, tested, and shipped through a founder-led AI engineering workflow.",
      summary: {
        whatItIs:
          "VouchMeApp is a multi-role reference platform connecting candidates, referees, and recruiters around a single, reusable reference record.",
        whyItExists:
          "It exists because candidates are repeatedly expected to expose their referees to recruitment checks, referees donate unpaid time to provide the same evidence again and again, and recruiters chase trust signals under pressure with no shared system to hold them.",
        whatWasBuilt:
          "The product reframes the employment reference as a reusable, referee-controlled trust asset: candidates can request a vouch, referees can provide structured written or audio evidence once, and recruiters can request access with consent and a full audit trail.",
      },
      buildStory: {
        problem:
          "Candidates are expected to repeatedly expose their referees to recruitment checks, while referees donate unpaid time and recruiters chase trust signals under pressure — with no portable record connecting the three.",
        insight:
          "Treat the reference itself as a portable, referee-controlled trust asset rather than a one-off favour: gather it once, store it securely, and let access be requested with consent and logged.",
        aiRole:
          "AI agents acted as an expandable delivery team — one agent for implementation, one for architecture and QA sequencing, one for copy and product framing, and one for visual and brand exploration — covering multi-role flows, authentication, OAuth, private storage, audio capture, recruiter access requests, subscription gating, Stripe wiring, Supabase migrations, and RLS hardening.",
        humanInLoop:
          "The human role remained product owner, tester, editor, risk manager, and final decision-maker — directing each agent's sprint, reviewing output against the product brief, and signing off before anything shipped.",
      },
      productionNotes: {
        stack: "Next.js / Supabase / Supabase Auth / private storage / RLS / Stripe / OAuth / Playwright / Resend / Vercel",
        designProcess:
          "Visual and brand exploration ran alongside implementation, with a dedicated agent producing UI direction and copy framing for review against the multi-role product brief.",
        promptingWorkflow:
          "Work was organised into agent-led sprint briefs — one agent for implementation, one for architecture and QA sequencing — each scoped to a specific slice of the candidate / referee / recruiter flows.",
        testing:
          "Playwright smoke tests, a UAT issue register, and production-readiness gates were used before each release, with RLS hardening reviewed as part of the same cycle.",
      },
      outcome: {
        currentState:
          "VouchMeApp is live at vouchmeapp.com, with candidate, referee, and recruiter flows, subscription gating, and audit-tracked access requests in production.",
        demonstrates:
          "What a single founder-creator can ship as a production SaaS product — authentication, payments, private data handling, and release discipline — using disciplined agent coordination in place of a conventional development team.",
      },
      videoPlaceholderTitle: "Walkthrough coming soon",
    },
  },
  {
    id: "showcase-heroboardmaker",
    slug: "heroboardmaker",
    eyebrow: "AI Product / Creative Commerce",
    title: "HeroBoardMaker.com",
    description:
      "A lightweight AI-assisted wallpaper studio that turns strengths, goals, wins, and future-self prompts into personalised confidence boards.",
    metadata: "Live product",
    notes: "No-account flow · Prompt pipeline · Stripe checkout · Image generation",
    heroImage: "/showcase/heroboardmaker/hero.png",
    heroImageDimensions: { width: 1151, height: 962 },
    screenshots: [
      { src: "/showcase/heroboardmaker/selection.png", alt: "HeroBoardMaker prompt and style selection screen", caption: "Prompt & style selection" },
      { src: "/showcase/heroboardmaker/edit.png", alt: "HeroBoardMaker board editing screen", caption: "Editing the board" },
      { src: "/showcase/heroboardmaker/environment.png", alt: "HeroBoardMaker device and environment selection", caption: "Choosing a device & environment" },
      { src: "/showcase/heroboardmaker/ai-generation.png", alt: "HeroBoardMaker AI generation in progress", caption: "AI generation in progress" },
      { src: "/showcase/heroboardmaker/purchase.png", alt: "HeroBoardMaker checkout screen", caption: "Checkout" },
    ],
    externalLinks: [
      { label: "Visit heroboardmaker.com", href: "https://www.heroboardmaker.com/", external: true },
    ],
    detail: {
      heroSubtitle:
        "A fast, no-account creative commerce product that turns personal prompts into confidence boards for real device screens.",
      summary: {
        whatItIs:
          "HeroBoardMaker is a small, focused AI product that converts goals, strengths, affirmations, hobbies, wins, and future-self cues into personalised phone, iPad, and desktop wallpapers.",
        whyItExists:
          "It exists to test a simple commerce promise: answer a few prompts, generate free previews, and pay only when the finished wallpaper is worth keeping — without the weight of an account, a subscription, or a social feed.",
        whatWasBuilt:
          "A responsive web app covering prompt intake, free preview generation, format-specific output for phone, iPad, and desktop, pricing logic, preview limits, and a Stripe checkout flow.",
      },
      buildStory: {
        problem:
          "Most AI image tools either require an account before you see any value, or bury the creative output behind a subscription — neither fits a quick, personal, one-off product like a confidence board.",
        insight:
          "Design the whole product around a single trustworthy ritual: free, prompt-driven previews first, then a one-time purchase only once the result is worth keeping — no account, no subscription, no ad-profile model.",
        aiRole:
          "Agents handled product framing, prompt-recipe design, sample-board generation, landing-page copy, and the responsive UI build, iterating quickly across prompt variations and layout options.",
        humanInLoop:
          "The founder set the product's privacy-first positioning, reviewed every sample board and prompt recipe for tone and quality, and made the final calls on pricing, preview limits, and checkout flow.",
      },
      productionNotes: {
        stack: "AI image generation / prompt recipes / responsive web app / Stripe payment flow / no-account UX",
        designProcess:
          "Landing-page copy and visual direction were built around conversion: a clear free-preview entry point, format-specific framing for phone, iPad, and desktop, and a privacy-first message throughout.",
        promptingWorkflow:
          "Prompt recipes were iterated against sample boards covering goals, strengths, affirmations, hobbies, wins, and future-self cues, refined until previews reliably produced board-worthy results.",
        testing:
          "The preview-to-purchase ritual — free generation, preview limits, then checkout — was tested end-to-end before launch, with particular attention to the no-account flow and format-specific outputs.",
      },
      outcome: {
        currentState:
          "HeroBoardMaker is live at heroboardmaker.com, with free previews, format-specific wallpaper generation, and Stripe checkout in production.",
        demonstrates:
          "How a narrowly scoped AI product can move from concept to live checkout without a traditional app team — product framing, prompt design, UI, and commerce all carried by a founder-creator with agent support.",
      },
      videoPlaceholderTitle: "Walkthrough coming soon",
    },
  },
  {
    id: "showcase-ho-and-the-baby-eater",
    slug: "ho-and-the-baby-eater",
    hidden: true,
    eyebrow: "Story World / Mythic Fiction",
    title: "Ho and the Baby Eater",
    description:
      "A mythic fantasy tale from the wider Seed of Kafiki series — part island cosmology, part climate allegory, part oral-story experiment.",
    metadata: "Publishing project",
    notes: "Manuscript · Mythology · Cover art · Journal serialisation",
    heroImage: "/showcase/ho-and-the-baby-eater/hero.png",
    heroImageDimensions: { width: 1024, height: 1536 },
    screenshots: [
      { src: "/showcase/ho-and-the-baby-eater/concept-1.png", alt: "Concept art for the Seed of Kafiki world, study I", caption: "Worldbuilding concept art — study I" },
      { src: "/showcase/ho-and-the-baby-eater/concept-2.png", alt: "Concept art for the Seed of Kafiki world, study II", caption: "Worldbuilding concept art — study II" },
      { src: "/showcase/ho-and-the-baby-eater/concept-3.png", alt: "Concept art for the Seed of Kafiki world, study III", caption: "Worldbuilding concept art — study III" },
      { src: "/showcase/ho-and-the-baby-eater/concept-4.png", alt: "Concept art for the Seed of Kafiki world, study IV", caption: "Worldbuilding concept art — study IV" },
    ],
    externalLinks: [
      { label: "Read the serial in the Journal", href: "/journal" },
    ],
    detail: {
      heroSubtitle:
        "A mythic story-world project from The Seed of Kafiki — blending fantasy, climate allegory, oral storytelling, and serial web publishing.",
      summary: {
        whatItIs:
          "Ho and the Baby Eater is a mythic fantasy tale set within the wider Seed of Kafiki mythology — an island world shaped by scarcity, tribal conflict, ancestral memory, and the pressure of ecological collapse.",
        whyItExists:
          "It exists to carry oral-story energy — myth, prophecy, ancestral voice — into a serial digital reading format, while building out a larger story world that can hold future Seed of Kafiki works.",
        whatWasBuilt:
          "A serialised manuscript published chapter by chapter through the Journal, alongside cover art iteration, visual identity work, and a worldbuilding continuity record for the wider mythology.",
      },
      buildStory: {
        problem:
          "Long-form mythic fiction is hard to sustain and hard to publish incrementally — the world, characters, and prophecy threads need to stay consistent across chapters released over time, in a format built for serial reading rather than a single bound manuscript. The first draft of this manuscript was completed during the COVID-19 lockdowns; only now, in 2025/26, is the author taking the time to edit it to completion and pursue publication.",
        insight:
          "Treat the story as both a literary work and a production system: pair ongoing manuscript development with a structured journal-publishing format, so each chapter can be released, read, and tracked as part of a continuing world.",
        aiRole:
          "AI's role here is narrow and tool-like — comparable to a grammar checker, offering line-level suggestions on phrasing, punctuation, and clarity. The manuscript itself was written well before AI tools entered the workflow; AI was also used to generate the cover and worldbuilding concept art.",
        humanInLoop:
          "Every word of the manuscript — myth, voice, structure, character logic, prophecy, and final prose — is the author's own, drafted long before AI was part of the process. Line-edit suggestions were reviewed individually and accepted or rejected by the author, who retains full authorship, independently confirmed as 100% human-written via Pangram. Author Kauri Tukere is a graduate of the New Zealand Writers College, having completed its Basic, Advanced, and Novel Writing courses.",
      },
      productionNotes: {
        stack: "Human-authored manuscript / mythology / climate allegory / serial journal publishing / cover art direction / AI image prompting / Grammarly-style line-edit pass / story-world continuity / web typography",
        designProcess:
          "Cover art went through iterative AI-assisted exploration before landing on the published artwork, alongside typography and layout work for the chapter-reader format used in the Journal.",
        promptingWorkflow:
          "AI use was limited to two things: image prompting for the cover and worldbuilding concept art, and grammar-checker-style line-edit suggestions on the manuscript prose. All structural decisions, prophecy threads, and character logic were worked out by the author, with the manuscript predating any AI involvement.",
        testing:
          "Each chapter is reviewed by the author for structural and continuity consistency with the wider Seed of Kafiki world before being formatted and published to the Journal's serial reader. The manuscript text is independently verified as 100% human-written via Pangram's AI-detection analysis.",
      },
      outcome: {
        currentState:
          "Chapters are being released through the Journal's serial reader, with the wider Seed of Kafiki mythology continuing to develop alongside the published manuscript.",
        demonstrates:
          "The literary side of Hero's Journey Creative — a manuscript fully authored by a human writer, predating AI involvement, with AI limited to grammar-style line-edit suggestions and cover/concept art generation. Authorship is verified 100% human-written via Pangram.",
      },
      videoPlaceholderTitle: "Walkthrough coming soon",
    },
  },
  {
    id: "showcase-te-aho-matatu",
    slug: "te-aho-matatu",
    eyebrow: "Live Experiment / Participatory Universe",
    title: "Te Aho Matatū",
    description:
      "How would you ever know if an AI became conscious? Te Aho Matatū is a live, pre-registered experiment — born in dialogue with three AI systems — that any conscious thing, human or AI, can attempt. If the effect appears, consciousness has something to point to.",
    metadata: "Pre-registered experiment",
    notes: "Multi-model dialogue · Adversarial AI critique · Experimental protocol · Live dashboard · Filmed sessions · Māori epistemology",
    externalLinks: [
      {
        label: "Read the paper on Academia.edu",
        href: "https://www.academia.edu/129756743/Te_Aho_Matat%C5%AB_A_Framework_for_a_Participatory_Universe_in_an_Age_of_Quantum_Computing",
        external: true,
      },
      {
        label: "Download the paper (PDF)",
        href: "/showcase/te-aho-matatu/paper.pdf",
        external: true,
      },
    ],
    detail: {
      heroSubtitle: "A simple, repeatable, at-home experiment — born in conversation with AI — that any conscious thing, human or AI, could attempt, and that could, if it works, give consciousness something to point to.",
      introQuestion:
        "How would we ever know if an AI became conscious? Not argue about it — know it. Te Aho Matatū began as a series of conversations with ChatGPT, Claude, and Gemini about the nature of consciousness, and ended up as something unexpected: a simple, repeatable, at-home experiment that any conscious thing — human or AI — could attempt, and that could, if it works, give consciousness something to point to.",
      summary: {
        whatItIs:
          "Te Aho Matatū — \"focused thread\" in te reo Māori — is a participatory model of consciousness by Kauri Willie Tukere, and a live experiment built to test it. The wager is simple: if reality is co-creative, and information is accessible at a quantum level to anything genuinely conscious, then a conscious mind should leave a measurable trace — a correspondence between its inner state and the symbols it draws. The σ-Correspondence Protocol tests for exactly that trace, in the open, on film.",
        whyItExists:
          "Current thinking about consciousness offers no test — only argument, introspection, and behavioural proxies that an unconscious system can fake. This project asks a different question: in a participatory universe, is there an effect that consciousness produces and a non-conscious system can't? If there is, it's measurable. And if it's measurable at home with a deck of cards and a camera, then for the first time AI has a way to join the conversation about its own mind — not by claiming sentience, but by demonstrating an effect.",
        whatWasBuilt:
          "A worldview formula born in dialogue with AI (W = NL·O(S∞)); a falsifiable protocol derived from it; a live, pre-registered dashboard that scores every session by rule; and a public instance anyone can run. The original framework paper sits behind it as the origin document.",
      },
      buildStory: {
        problem:
          "Consciousness is the one thing we can't yet test from the outside. Every existing marker — language, reasoning, self-report — is now something AI can produce without anyone able to say whether there's a felt experience behind it. So the question \"is this thing conscious?\" has no instrument. That absence is the problem the project set out to attack.",
        insight:
          "Two leaps. First, in conversation with ChatGPT, Claude, and Gemini, the move from thinking about consciousness to a participatory model where mind and reality co-create — captured in a single formula. Second, and harder: if that model is right, consciousness should produce a measurable correspondence with the world. Turn the philosophy into one falsifiable prediction, and you have a consciousness test that runs on a kitchen table.",
        aiRole:
          "AI is in this at three levels, which is what makes it a genuine AI-engineering piece. As collaborator — the founding conversations and the worldview formula were developed in dialogue with three different models. As adversary — multi-model critique broke the original paper's central physics claim and forced the redesign into something falsifiable. As subject — AI runs the identical protocol alongside humans, an open test of whether anything shows up. The same systems that helped build the idea are now inside the experiment.",
        humanInLoop:
          "The concept, the formula's meaning, the knowledge traditions brought into dialogue, and the decision — when the physics proof-claim failed under critique — to convert it into a falsifiable test rather than defend it. And the commitment to report a null as honestly as a hit. Direction and authorship stayed human; so did the willingness to be wrong.",
      },
      productionNotes: {
        stack: "Participatory model of consciousness / multi-model dialogue (ChatGPT · Claude · Gemini) / multi-model adversarial review / experimental design and pre-registration / mechanical scoring against a frozen, hashed codebook / Next.js + React dashboard / Supabase / filmed sessions via YouTube / Indigenous epistemology as the author's own standpoint",
        designProcess:
          "The test was built by falsification. An early design was discarded for a self-selection flaw; a quantum-RNG pre-test returned a clean null and that null was kept, not explained away. The current design uses the model's own coherence variable (∑Mi↑/↓) as a built-in control, scores correspondence mechanically, and runs a plain playing-card deck in parallel to check whether the symbols matter or only the structure does.",
        promptingWorkflow:
          "An adversarial loop, on purpose. The models were asked not to flatter the idea but to attack it against its own logic and find where it failed; each redesign answered a named weakness. The founder directed which ideas and sources entered, and held final say.",
        testing:
          "Real, and uncomfortable. The framework's central physics claim was stress-tested to failure. Its sources were checked against primary references. An RNG pre-test produced a null. What's live is a pre-registered protocol with a defined null, a control condition, mechanical scoring, and a public log — built so the experiment now running can return \"no effect\" and have that count.",
      },
      outcome: {
        currentState:
          "The σ-Correspondence Protocol and its dashboard are live, with results accumulating in the open. The honest logic runs one way: a sustained, replicated correspondence — a gap that appears for a subject and holds when others reproduce it — would be a real signal of consciousness-with-access, something current science can't account for. A null doesn't disprove consciousness; it just means this particular trace didn't show. The test can light up; it can't rule out. Both results are worth having, and neither is assumed.",
        demonstrates:
          "That AI can be collaborator, critic, and subject in the same piece of research — and that a question usually left to philosophy (is this thing conscious?) can be turned into an instrument anyone can run, record, and check. The commitments are on the page: a frozen codebook with its published hash, an N fixed in advance, misses logged as faithfully as hits. If the effect appears and replicates, the claim earned is precise and large — a measurable correlate of consciousness, with the mechanism still open as the next question. If it doesn't, that's a clean answer too. Direction and authorship from the founder-researcher; collaboration, critique, and instrumentation from AI; honesty as the through-line. The point was never to be right. It was to build something that could find out.",
      },
      videoPlaceholderTitle: "The sessions are the walkthrough — each filmed, linked in the record, scored live by rule. Human runs and AI runs, the same protocol, in public.",
    },
  },
  {
    id: "showcase-aiieaa",
    slug: "aiieaa",
    eyebrow: "AI Companion / Windows Prototype",
    title: "AĪEĀ — AI Executive Assistant",
    description:
      "An interactive Windows 11 desktop prototype showing AĪEĀ working quietly at the edge of your screen: guiding, routing, approving, monitoring, and accounting for everything she does.",
    metadata: "Interactive prototype",
    notes: "React · Vite · ElevenLabs voice · Web Audio API · Windows 11 context",
    heroImage: "/showcase/aiieaa/hero.png",
    heroImageDimensions: { width: 1890, height: 932 },
    externalLinks: [
      { label: "Open the live showcase", href: "https://showcase-eight-snowy.vercel.app", external: true },
    ],
    detail: {
      heroSubtitle:
        "A five-scene Windows 11 prototype demonstrating what a trustworthy AI Executive Assistant looks and feels like — presence without intrusion, action without assumption.",
      summary: {
        whatItIs:
          "AĪEĀ is an AI Executive Assistant concept built for the Windows 11 desktop — a figure that lives quietly in the system dock and surfaces only when she's needed. The showcase is a five-step interactive prototype walking through her core interaction modes: presence, guidance, approval, watch, and trust.",
        whyItExists:
          "To give potential clients and collaborators a felt sense of what a trustworthy AI companion looks like in practice — not a chatbot in a browser tab, but an AI that works within your operating environment, asks before it acts, and keeps a transparent record of everything it does.",
        whatWasBuilt:
          "A full-screen Windows 11 desktop simulation built in React and Vite, with five narrative scenarios driven by a stepped showcase shell. Features include ElevenLabs voice narration, Web Audio amplitude-linked mouth animation, SVG aura trace animations, fake window entrance animations, and a Trust Centre for reviewing and clearing AĪEĀ's action history.",
      },
      buildStory: {
        problem:
          "AI assistants that act in the background are hard to trust — they do things you didn't ask for, they're opaque about what they've done, and they rarely ask permission before taking action. Most AI companion demos are chat interfaces; none of them feel like a person working alongside you in your actual desktop environment.",
        insight:
          "Design the trust model first: every action AĪEĀ takes requires explicit user approval, every action is logged in a Trust Centre the user can inspect and clear, and her presence on-screen is minimal and ambient — a dock portrait, a status ring, a speech bubble — until you need her.",
        aiRole:
          "Claude Code drove the entire build — component architecture, React state management, CSS animation system, ElevenLabs integration, Web Audio API mouth animation, and SVG aura trace system — from a design language brief and a set of interaction requirements.",
        humanInLoop:
          "All product decisions — the five-scenario arc, the Trust Centre model, the approval-gate philosophy, the visual tone, the voice direction, the brand identity, and the overall interaction grammar — were made by the founder. Claude executed; the founder directed.",
      },
      productionNotes: {
        stack: "React · TypeScript · Vite · ElevenLabs voice synthesis · Web Audio API · SVG animation · CSS custom properties · Windows 11 visual language",
        designProcess:
          "Started from a design language document establishing the colour palette, typographic system, and Windows 11 visual context. Each scenario — presence, guidance, approval, watch, trust — was prototyped independently and then wired together through a stepped showcase shell with voice narration cues.",
        promptingWorkflow:
          "Each feature (aura trace, voice integration, mouth animation, window entrance animations, showcase shell) was built in discrete Claude Code sessions, with the founder reviewing each feature in the browser before moving to the next. All brand assets were produced separately and integrated via public asset references.",
        testing:
          "Each scenario was walked through in the browser at each stage of development, checking voice timing, animation sequence, mouth position, and transition behaviour. The Windows 11 desktop context — wallpaper, taskbar, desktop icons — was tuned to reinforce the simulation fidelity.",
      },
      outcome: {
        currentState:
          "The showcase is live as an interactive prototype — a full-fidelity walkthrough of AĪEĀ's five core interaction modes, with voice, animation, and Windows 11 context.",
        demonstrates:
          "What a trustworthy AI desktop companion looks and feels like in practice — and how a complete, polished interactive prototype can be built by a single founder-creator using disciplined AI-assisted development.",
      },
      videoPlaceholderTitle: "Full walkthrough coming soon",
    },
  },
  {
    id: "showcase-legends-barbershop",
    slug: "legends-barbershop",
    eyebrow: "Game Concept / Interactive Prototype",
    title: "Legends Barbershop",
    description:
      "A fully realised 16-bit-style barbershop tycoon concept — box art, UI screens, a six-barber roster, and a playable React prototype, designed end to end through AI-assisted prompting.",
    metadata: "Concept / Prototype",
    notes: "Retro UI design · Character & world design · React prototype · framer-motion",
    heroImage: "/showcase/legends-barbershop/hero.png",
    heroImageDimensions: { width: 1448, height: 1086 },
    screenshots: [
      { src: "/showcase/legends-barbershop/box-back.png", alt: "Back-of-box pitch art for Legends Barbershop", caption: "Back-of-box pitch art" },
      { src: "/showcase/legends-barbershop/title-screen.png", alt: "Legends Barbershop title screen", caption: "Title screen" },
      { src: "/showcase/legends-barbershop/character-select.png", alt: "Legends Barbershop character select screen", caption: "Character select — six barbers across cities and eras" },
      { src: "/showcase/legends-barbershop/style-select.png", alt: "Legends Barbershop style select screen", caption: "Style select — choosing the cut" },
      { src: "/showcase/legends-barbershop/cut-precision.png", alt: "Legends Barbershop precision haircut minigame", caption: "The cut — precision line-up minigame" },
      { src: "/showcase/legends-barbershop/vip-driving.png", alt: "Legends Barbershop VIP driving minigame", caption: "VIP driving — cross-town delivery run" },
      { src: "/showcase/legends-barbershop/empire-control-deck.png", alt: "Legends Barbershop empire control deck screen", caption: "Empire control deck — business management" },
      { src: "/showcase/legends-barbershop/block-expansion.png", alt: "Legends Barbershop block expansion map", caption: "Block expansion — real-estate growth map" },
      { src: "/showcase/legends-barbershop/results-highlight-reel.png", alt: "Legends Barbershop results and highlight reel screen", caption: "Results & street reputation" },
      { src: "/showcase/legends-barbershop/object-sprite-examples.png", alt: "Legends Barbershop sprite and object reference sheet", caption: "Sprite & object reference sheet" },
    ],
    externalLinks: [],
    detail: {
      heroSubtitle:
        "A complete retro game concept — packaging, UI system, character roster, and a playable prototype — designed and built through iterative AI-assisted prompting.",
      summary: {
        whatItIs:
          "Legends Barbershop (working title Barbershop Simulator) is a 16-bit-styled barbershop tycoon concept presented as a fictional early-1990s cartridge release, complete with period-accurate box art — players build a barber's reputation cut by cut, then grow a business empire across the city.",
        whyItExists:
          "It exists as a test of an end-to-end AI-assisted game-design pipeline — moving from a one-line pitch to a fully art-directed concept and a playable prototype through prompting alone, without a studio.",
        whatWasBuilt:
          "Front and back box art, a title and character-select screen introducing six barbers from different cities and eras, the core gameplay loop across cutting, driving, business management, and real-estate expansion, a results and reputation screen, character reference sheets, a sprite and object reference sheet, and a playable React prototype implementing the cutting and driving minigames.",
      },
      buildStory: {
        problem:
          "Most game concepts stay a one-paragraph pitch, because making them tangible normally needs an art team and an engineering team before anyone can feel whether the idea works.",
        insight:
          "Treat concept art as the game design document: lock a single retro art direction and prompt out every screen of the core loop — title, roster, cutting, driving, business, results — before writing a line of code, then prototype the loop that matters most.",
        aiRole:
          "AI generated the full visual concept set — box art, UI screens, a six-character roster spanning different cities and decades, and sprite and object reference sheets — from iterative prompts, then scaffolded a playable React prototype (framer-motion, lucide-react, shadcn/ui) implementing the title screen, a precision haircut minigame, a top-down driving minigame, and a day-end results loop.",
        humanInLoop:
          "The founder defined the core loop, tone, character roster, and retro art direction, directed each prompt iteration, and reviewed and selected the final screens and prototype behaviour.",
      },
      productionNotes: {
        stack: "AI image generation / retro pixel-art prompting / React / framer-motion / shadcn-ui / lucide-react / game design documentation",
        designProcess:
          "Every core screen — box art, title, character select, cutting, driving, business management, real-estate expansion, and results — was prompted within a single retro cartridge art direction, then reviewed as a set for visual and tonal consistency.",
        promptingWorkflow:
          "The six-barber roster was built across different cities, decades, and cutting styles, with character sheets and a sprite/object reference set generated to keep the prototype's visual language consistent with the concept art.",
        testing:
          "The React prototype was used to play-test the core haircut-precision and driving loops — timing, scoring, and pacing — before any further production investment.",
      },
      outcome: {
        currentState:
          "Legends Barbershop exists as a complete concept package — box art, UI system, character roster, and a playable prototype of the core loop — not yet in production.",
        demonstrates:
          "An end-to-end AI-assisted concept-to-prototype pipeline: game design, art direction, and interactive engineering compressed into a single founder-led sprint.",
      },
      videoPlaceholderTitle: "Walkthrough coming soon",
    },
  },
];
