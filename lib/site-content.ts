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

export interface ShowcaseExternalLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ShowcaseDetail {
  heroSubtitle: string;
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
      "A speculative research framework subjected to adversarial critique — and then converted into a falsifiable, filmed, pre-registered experiment testing whether inner state corresponds to drawn symbols.",
    metadata: "Pre-registered experiment",
    notes: "Framework design · Adversarial AI critique · Experimental protocol · Live dashboard · Filmed sessions · Māori epistemology",
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
      heroSubtitle: "A falsifiable, filmed, public experiment: does the symbol drawn correspond to inner state more when coherent than scattered?",
      summary: {
        whatItIs:
          "Te Aho Matatū — \"focused thread\" in te reo Māori — began as a speculative research framework by Kauri Willie Tukere connecting participatory universe theory, consciousness, and Indigenous epistemology. It has since become something more interesting: a single, falsifiable experiment, run and filmed in the open, that tests one specific claim the framework rests on — whether the symbol a person draws corresponds to their inner state more when they are coherent than when they are scattered. The thread is now both the idea and the experimental signal.",
        whyItExists:
          "Most speculative frameworks of this kind stay as assertion — compelling to their author, untestable by anyone else. This project exists to do the harder thing: take a big cross-disciplinary idea, subject it to genuine adversarial critique, and reduce it to a single prediction that could come out either way. If the prediction fails, that's a real and honest answer. If it holds — and holds when others run it too — it points at something current science has no account of. The experiment is built so that both outcomes count.",
        whatWasBuilt:
          "Four artifacts, in sequence: the original framework paper (the origin document); an adversarial critique, run through multiple AI models, that identified where the central physics argument fails; a redesigned, pre-registerable empirical protocol — the σ-Correspondence Protocol — built around a real control and mechanical scoring; and a live dashboard that logs every filmed session, scores it by rule, and shows the running result, hits and misses alike.",
      },
      buildStory: {
        problem:
          "The framework set out to bring quantum computing, consciousness, synchronicity, and Māori cosmology into one conversation. But its strongest claim — that the existence of quantum computers proves a participatory, consciousness-involving universe — was the kind of claim that sounds like proof and functions like belief: nothing about it could ever be measured, and nothing could ever count against it. The real problem wasn't interdisciplinary scope. It was falsifiability.",
        insight:
          "Two insights, one early and one late. Early: name a single focused thread that can hold these traditions together rather than leaving them in occasional contact. Late, and more important: when the physics proof-claim didn't survive scrutiny, don't defend it — convert it. Drop the metaphysical proof, isolate the one thing the framework actually predicts about the world, and turn it into an open test anyone can run, film, and check. A failed thesis became a falsifiable experiment.",
        aiRole:
          "This is where the project is really an AI-engineering case study. AI was used in three distinct roles. As collaborator — literature synthesis, structural drafting, formal presentation of the original paper. As adversary — a multi-model critique pass that found the load-bearing flaws the author couldn't see from inside the idea: the conflation of \"observer\" with consciousness, mis-applied sources, an unfalsifiable test design. And as engineer — co-designing the corrected protocol, deriving the control condition from the framework's own notation, and building the live scoring dashboard. The same tools that helped build the claim were turned on it to break it.",
        humanInLoop:
          "The human decisions were the ones that mattered most, and the hardest. Bringing the original idea, the operating formula, and the first test design. Then, at the point of critique: choosing to accept that the central argument failed rather than argue around it. Choosing to pivot from proof to falsifiable test. Committing — on the record — to report a null result as a real finding. Authorship, direction, and the willingness to be wrong stayed human throughout.",
      },
      productionNotes: {
        stack: "Framework design / multi-model adversarial review / experimental design and pre-registration / falsifiability engineering / mechanical scoring and base-rate statistics / Next.js + React dashboard / Supabase / filmed session logging via YouTube / research synthesis / Indigenous epistemology as the author's own standpoint",
        designProcess:
          "The protocol was developed by iterative falsification. An early design (predicting a watched reading) was discarded for a self-selection confound. A quantum RNG pre-test was run over hundreds of trials and returned a clean null — and that null was kept, not explained away. The current design uses the framework's own ∑Mi(↑/↓) coherence operator as a built-in control, scores correspondence mechanically against a frozen table, and runs a plain playing-card deck in parallel to test whether the symbols matter or only the structure does.",
        promptingWorkflow:
          "An adversarial loop. The founder-researcher directed which traditions and sources entered the work and held final say on framing; the AI was repeatedly asked not to flatter the idea but to attack it against its own internal logic, surface where it failed, and propose the smallest design that could fail honestly. Each redesign was a response to a specific, named weakness — not a polish pass.",
        testing:
          "Genuine, and genuinely uncomfortable. The framework's central physics claim was stress-tested to failure under critique. Its sources were checked against primary references. An RNG pre-test produced a null. The result is a pre-registered protocol with a defined null, a control condition, mechanical scoring, and a public log — designed so that the experiment now running can return \"no effect\" and have that count.",
      },
      outcome: {
        currentState:
          "The original framework paper remains publicly available as the origin document. The proof-claim it made does not hold, and the project says so. What's live now is the σ-Correspondence Protocol and its dashboard — an open, filmed, pre-registered test, with results accumulating in public. Two outcomes are possible, and both are worth having. A flat result — no gap between the coherent and scattered arms — would show the apparent \"mirroring\" was interpretation and chance all along: a clean, honest null. A sustained gap, holding across the full pre-registered run and reproduced by others running the same protocol, would be something current science has no account of — a real, measurable link between a person's inner state and the symbol they draw. The point is to run it in the open and let the result decide.",
        demonstrates:
          "That agent-assisted research can include agents as critics, not just collaborators — used to falsify the author's own claim rather than reinforce it — and that a speculative idea can be engineered into a testable, instrumented, public experiment without erasing the human source of the work. The commitments are on the page, not just asserted: a frozen scoring codebook published with its SHA-256 hash, an N fixed in advance, and a record that logs misses as faithfully as hits. Direction and authorship from the founder-researcher; synthesis, adversarial critique, and instrumentation from AI; and epistemic honesty as the through-line. The demonstration isn't that the theory is true. It's that the work was willing to find out — in public, by rules set before the first card was drawn.",
      },
      videoPlaceholderTitle: "Build walkthrough coming — filmed sessions are in the record above",
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
