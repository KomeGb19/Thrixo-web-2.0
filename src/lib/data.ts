export const site = {
  name: "Thrixo",
  url: "https://www.thrixoagency.com.ng",
  whatsapp: "https://wa.link/271fs7",
  email: "Thrixoagency@gmail.com", // TODO: confirm real inbox
  city: "Lagos, Nigeria",
  tagline: "Building tools of the future",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X", href: "https://x.com/" },
    { label: "GitHub", href: "https://github.com/" },
  ],
};

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  id: string;
  n: string;
  title: string;
  short: string;
  long: string;
  deliverables: string[];
  tools: string[];
  accent: string; // tailwind bg class
  image?: string; // optional image path for service
};

export const services: Service[] = [
  {
    id: "web",
    n: "01",
    title: "Web Design",
    short: "Bespoke, high-performance websites that turn visitors into loyal users.",
    long: "We don't just build websites. We build digital experiences with a point of view: sharp typography, motion with intent, and engineering that keeps Lighthouse scores green. Every build is mobile-first, accessible and wired for conversion from day one.",
    deliverables: ["Brand websites & landing pages", "E-commerce & booking flows", "Web apps & customer portals", "CMS setup & editor training", "SEO foundations & analytics", "Speed, a11y & QA audits"],
    tools: ["Next.js", "React", "AWS", "Node.js", "Express", "React Native", "TypeScript", "Tailwind", "Supabase", "Framer Motion", "Vercel"],
    accent: "bg-lime",
    image: "/webdesign.png",
  },
  {
    id: "graphics",
    n: "02",
    title: "Graphics & Brand Development",
    short: "Identities, campaigns and visuals that look like nobody else.",
    long: "From a logo mark to a full visual language, we design brands that hold together across every touchpoint, from a WhatsApp status to a 12-metre billboard. Systems first, decoration second.",
    deliverables: ["Logo & identity systems", "Brand guidelines", "Social Media & campaign kits", "Packaging & print", "Pitch & sales decks", "Illustration & iconography"],
    tools: ["Figma", "Illustrator", "Photoshop", "After Effects", "Blender"],
    accent: "bg-coral",
    image: "/graphics.png",
  },
  {
    id: "pm",
    n: "03",
    title: "Product & Project Management",
    short: "From zero to launch, MVPs, PRDs, Stand-ups, agile methodologies,",
    long: "Creative work dies in vague briefs and endless feedback loops. Our project leads run tight sprints, keep one source of truth, and make sure you always know what's done, what's next and what's blocked.",
    deliverables: ["Scoping & roadmapping", "Sprint planning & delivery", "Stakeholder reporting", "Vendor & freelancer coordination", "Launch checklists", "Post-launch retros"],
    tools: ["Notion", "Linear", "Slack", "Loom", "Google Workspace"],
    accent: "bg-sky",
    image: "/project.png",
  },
  {
    id: "video",
    n: "04",
    title: "Video & Motion",
    short: "Brand films, product explainers and social-first cuts that stop the scroll.",
    long: "Story-led video from concept to final grade. We script, shoot, edit and animate, building content libraries that keep your channels fed long after launch week.",
    deliverables: ["Brand & campaign films", "Product explainers", "Short-form social edits", "Motion graphics & logo stings", "Event & behind-the-scenes", "Colour, sound & subtitling"],
    tools: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Cinema 4D"],
    accent: "bg-brand text-white",
    image: "/video.png",
  },
  {
    id: "ai",
    n: "05",
    title: "AI Content",
    short: "AI-assisted, human-directed content at a pace and scale agencies can't match.",
    long: "We pair generative tools with real creative direction: on-brand copy, imagery, voice and video produced in volume, then edited by people with taste. You get speed without the soulless sameness.",
    deliverables: ["AI-assisted copy & scripts", "AI Film-making", "UGC", "Video Ads", "Generative imagery & ad creative", "Voice-over & avatar video", "Content calendars at scale", "Brand-tuned prompt libraries", "Team training & workflows"],
    tools: ["Claude", "Midjourney", "Higgsfield", "ElevenLabs", "Runway", "Python"],
    accent: "bg-paper-2",
    image: "/intelligence.png",
  },
  {
    id: "infra",
    n: "06",
    title: "Automation & Infrastructure",
    short: "Systems that run themselves: pipelines, integrations and always-on support.",
    long: "The original Thrixo promise. We build the resilient backend that keeps your operations running: cloud architecture, automated pipelines, 100+ tool integrations, MCP-connected APIs and monitoring that never sleeps.",
    deliverables: ["Workflow automation", "API & MCP integrations", "Cloud & CI/CD pipelines", "WhatsApp & comms automation", "Dashboards & reporting", "Monitoring & support"],
    tools: ["Python", "Node", "Postgres", "n8n", "Docker", "MCP"],
    accent: "bg-ink text-paper",
    image: "/auto.png",
  },
];

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "Web" | "Brand" | "Video" | "AI" | "Systems";
  year: string;
  blurb: string;
  role: string[];
  bg: string;
  fg: string;
  results: { k: string; v: string }[];
  challenge: string;
  solution: string;
  image?: string; // optional image path for project
};

// NOTE: placeholder case studies. Replace with real client work.
export const projects: Project[] = [
  {
    slug: "rica-marine-website",
    title: "Rica Marine Website",
    client: "Rica Marine",
    category: "Web",
    year: "2026",
    blurb: "A Marketing website for a global maritime services company.",
    role: ["Product design", "Web app", "Automation"],
    bg: "bg-brand",
    fg: "text-white",
    results: [{ k: "Manual work removed", v: "80%" }, { k: "Time to deploy", v: "< 1 week" }, { k: "Integrations", v: "24" }],
    challenge: "Migrating Old Website from Wordpress and maintaing existing database, Building new modern  website and Knowledge-based Chatbot for customer support",
    solution: "We centralised everything into one workflow layer with a live dashboard, automated handoffs and alerts, so the system now reveals what's happening instead of hiding it.",
    image: "projects/rica.png"
  },
  {
    slug: "palisglobal",
    title: "Palis System Global",
    client: "Palis System Global",
    category: "Web",
    year: "2026",
    blurb: "A marketing website for a real estate company with property showcase.",
    role: ["AI workflows", "API integration", "Dashboard"],
    bg: "bg-lime",
    fg: "text-ink",
    results: [{ k: "Sprint tasks automated", v: "Entire" }, { k: "Review time", v: "-64%" }, { k: "Uptime", v: "99.9%" }],
    challenge: "Engineers were burning whole sprints on repetitive, rules-heavy workflows.",
    solution: "We designed an AI-assisted pipeline with human review gates, wired into their existing tools through MCP-connected APIs.",
    image: "projects/palis.png"
  },
  {
    slug: "pwan-support-hub",
    title: "PWAN Support Hub",
    client: "PWAN",
    category: "Web",
    year: "2026",
    blurb: "An IT support experience people actually enjoy using.",
    role: ["UX", "Web design", "Next.js build"],
    bg: "bg-coral",
    fg: "text-ink",
    results: [{ k: "Manual workflows replaced", v: "80%" }, { k: "Ticket deflection", v: "+41%" }, { k: "Launch", v: "7 days" }],
    challenge: "A support desk drowning in repeat requests and a site nobody could navigate.",
    solution: "A redesigned self-serve hub with smart routing and automation that resolves the repeatable stuff before a human sees it.",
  },
  {
    slug: "nuva-tech-launch",
    title: "Nuva Tech Brand Launch",
    client: "Nuva Tech",
    category: "Brand",
    year: "2025",
    blurb: "A fresh identity and launch site for a team that needed to move fast.",
    role: ["Identity", "Website", "Launch film"],
    bg: "bg-sky",
    fg: "text-ink",
    results: [{ k: "Conversion rate", v: "+51.4%" }, { k: "Launch speed", v: "Faster than ever" }, { k: "Brand assets", v: "120+" }],
    challenge: "A capable team with a forgettable look, racing to launch before a funding window closed.",
    solution: "We built the identity, site and launch content in parallel sprints, on a system that scales and adapts instantly.",
  },
  {
    slug: "luma-labs-reel",
    title: "Luma Labs Product Film",
    client: "Luma Labs",
    category: "Video",
    year: "2025",
    blurb: "A 60-second film that explains a complex product without a single bullet point.",
    role: ["Concept", "Motion", "Edit & sound"],
    bg: "bg-ink",
    fg: "text-paper",
    results: [{ k: "Watch-through rate", v: "72%" }, { k: "Cutdowns delivered", v: "14" }, { k: "Demo requests", v: "+38%" }],
    challenge: "A deeply technical product that kept losing people in the first ten seconds.",
    solution: "We turned the architecture into a visual story, then cut it into short-form versions for every channel.",
  },
  {
    slug: "forge-content-engine",
    title: "Forge AI Content Engine",
    client: "Forge Studio",
    category: "AI",
    year: "2026",
    blurb: "A month of on-brand content, generated, edited and scheduled in a week.",
    role: ["Brand voice", "Prompt systems", "Content ops"],
    bg: "bg-brand-soft",
    fg: "text-ink",
    results: [{ k: "Posts per month", v: "120" }, { k: "Production cost", v: "-58%" }, { k: "Engagement", v: "+2.3x" }],
    challenge: "Great ideas, no capacity. Content went out late, inconsistent and off-voice.",
    solution: "A brand-tuned prompt library plus a human editing loop that keeps quality high while volume goes up.",
  },
];

export const process = [
  { n: "01", title: "Strategy & Architecture", body: "We run a deep-dive analysis of your business requirements and design a blueprint that bridges your vision with resilient technical infrastructure.", tag: "Weeks 1-2", bg: "bg-lime" },
  { n: "02", title: "Agile Build & Design", body: "We build your product in modular sprints so the design stays intuitive and the code stays fast, scalable and easy to change.", tag: "Weeks 3-6", bg: "bg-coral" },
  { n: "03", title: "Automation & Deployment", body: "Automated workflows and robust systems that evolve and stay in sync on their own, so your digital infrastructure works as hard as you do.", tag: "Weeks 6-8", bg: "bg-sky" },
  { n: "04", title: "Support & Growth", body: "We don't hand over keys and vanish. We monitor performance, optimise, and keep everything secure, fast and in step with your growth.", tag: "Ongoing", bg: "bg-brand text-white" },
];

export const testimonials = [
  { q: "The most valuable thing it gives us is space. We spend less time coordinating and more time thinking. The system reveals what's happening instead of hiding it, and that transparency changes everything.", name: "Samuel Sammy", role: "CTO", co: "Rica Marine" },
  { q: "The AI-driven logic feels effortless. It automates complex workflows that used to take entire sprints.", name: "Leo Martins", role: "Product Engineer", co: "Blockwell" },
  { q: "We replaced 80% of our manual workflows in under a week.", name: "Jessica Onyekachi", role: "IT Support", co: "PWAN" },
  { q: "We launched faster than ever. Having a system that scales and adapts instantly changed how we build.", name: "Marco Vega", role: "Operations Lead", co: "Nuva Tech" },
  { q: "Before, our automation stack was scattered across scripts, services and manual handoffs. Centralising everything into one workflow layer made operations predictable and easy to maintain.", name: "Emma Park", role: "Operations Manager", co: "Rica Marine" },
  { q: "Honestly, I forgot half our automations existed. That's when you know it's working.", name: "Sofia Li", role: "Head of Engineering", co: "Luma Labs" },
];

export const clients = [
  { id: 1, name: "Rica Marine", logo: "/clients/rica.png" },
  { id: 2, name: "Blockwell Integrated", logo: "/clients/blockwell.png" },
  { id: 3, name: "PWAN", logo: "/clients/pwan.png" },
  { id: 4, name: "ProsLanding", logo: "/clients/pros.png" },
  { id: 5, name: "Palis Global", logo: "/clients/palis.png" },
];
  
export const stats = [
  { to: 100, suffix: "+", label: "Connected tools & integrations" },
  { to: 51.4, suffix: "%", prefix: "+", label: "Average conversion lift", decimals: 1 },
  { to: 80, suffix: "%", label: "Manual workflows replaced" },
  { to: 24, suffix: "/7", label: "Monitoring & support built in" },
];

export const pricing = {
  banner: "10% off your first build, ongoing.",
  projects: [
    { name: "Launch", price: "₦350k", note: "from", blurb: "A sharp, fast site for founders getting started.", features: ["Up to 5 pages", "Custom design & motion", "CMS & basic SEO", "2 revision rounds", "14-day launch support"], hot: false },
    { name: "Growth", price: "₦950k", note: "from", blurb: "Brand + site + content, built as one system.", features: ["Identity & brand kit", "10+ page website or web app", "Video / motion starter pack", "Analytics & conversion setup", "60-day launch support"], hot: true },
    { name: "Scale", price: "Custom", note: "", blurb: "Full products, automation and infrastructure.", features: ["Product design & engineering", "Workflow automation & APIs", "AI content pipeline", "Dedicated project lead", "SLA-backed support"], hot: false },
  ],
  retainers: [
    { name: "Studio", price: "₦250k", note: "/ month", blurb: "A reliable creative bench on call.", features: ["~20 design hours", "Social & ad creative", "Monthly strategy call", "48h turnaround", "Pause anytime"], hot: false },
    { name: "Partner", price: "₦600k", note: "/ month", blurb: "Your embedded creative + tech team.", features: ["~60 design & dev hours", "Video & AI content", "Weekly sprints", "Dedicated project lead", "Priority queue"], hot: true },
    { name: "Embedded", price: "Custom", note: "", blurb: "We become your in-house agency.", features: ["Cross-discipline squad", "Automation & infra ownership", "Quarterly roadmap", "Exec reporting", "24/7 monitoring"], hot: false },
  ],
};

export const faqs = [
  { q: "What services does Thrixo offer?", a: "We cover web design, graphics and brand, project management, video and motion, AI content, and the automation and infrastructure that keeps it all running. One team, one roadmap." },
  { q: "What does \"systems that run themselves\" actually mean?", a: "It means we build automated workflows and resilient backend foundations that evolve and operate with minimal manual intervention, so your team spends time on decisions instead of busywork." },
  { q: "Do you work with existing platforms or build from scratch?", a: "Both. We can migrate legacy architectures to a modern stack or build entirely new systems from the ground up." },
  { q: "How does your design process differ from other agencies?", a: "We keep design aesthetics and scalable technical architecture aligned from day one. Pretty things that can't scale, and scalable things that aren't pretty, are both failures to us." },
  { q: "Do you provide long-term support after launch?", a: "Yes. We monitor performance and optimise your systems so they stay secure, fast and in sync with your growth." },
  { q: "What is your experience with API integrations?", a: "Extensive. We use modern protocols like MCP and AI-assisted tooling to build secure, well-governed, connected API ecosystems." },
  { q: "Can you help with automation for business communication?", a: "Yes. We build custom automation tools, such as Python-based solutions for WhatsApp and other communication workflows." },
  { q: "How do you determine project pricing?", a: "Scope, complexity and timeline. We offer fixed-price projects and monthly retainers, and the first build always gets a 10% discount. Tell us what you need and we'll quote within 48 hours." },
];

export const values = [
  { t: "Taste is a skill", b: "Everything we ship is edited by someone who cares about the last 5%." },
  { t: "Systems over one-offs", b: "A brand, a site and a workflow should feel like one machine, not three vendors." },
  { t: "Speed with receipts", b: "Fast doesn't mean sloppy. We show our work, weekly." },
  { t: "Built in Lagos, built for anywhere", b: "African ambition, global standards. No apology, no adjustment." },
];

export const team = [
  { name: "Creative Director", role: "Brand & motion", color: "bg-lime" },
  { name: "Lead Engineer", role: "Web & infrastructure", color: "bg-sky" },
  { name: "Project Lead", role: "Delivery & ops", color: "bg-coral" },
  { name: "AI Content Lead", role: "Voice & generative", color: "bg-brand-soft" },
];
