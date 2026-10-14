# Thrixo Agency: Next.js rebuild

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis · Radix/shadcn-style UI

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Change the brand colours (one place)
`src/app/globals.css` → `@theme { --color-brand, --color-brand-soft, --color-lime, --color-coral, --color-sky, --color-paper, --color-ink }`.
The whole site follows. `--color-brand` is currently a PLACEHOLDER violet. Replace it with Thrixo's exact brand hex.

## Content
Everything editable lives in `src/lib/data.ts` (services, projects, testimonials, pricing, FAQs, team, contact details).
Testimonials, FAQs, process steps and stats come from the live site. Case studies, team, pricing and the contact email are placeholders.

## Routes
`/` · `/services` · `/work` · `/work/[slug]` · `/about` · `/contact` · `/api/contact` (stub, wire to Supabase/email) · 404

## Component map
- `components/ui/`: shadcn-style primitives (button, accordion, input, badge) built on Radix + cva
- `components/fx/`: custom/Aceternity- and Kokonut-style effects: spotlight-card, tilt-card (3D), marquee, magnetic, split-text reveal, count-up, custom cursor (`data-cursor="Label"`), preloader, Lenis smooth scroll, scroll progress, draggable "wall" (Gut Feeling-inspired)
- `components/sections/`: hero, clients, manifesto (scroll-linked text reveal), services-list (hover preview), bento, work-showcase (pinned horizontal scroll), process (sticky stack), stats, testimonials, pricing (animated toggle), faq, cta
- `components/layout/`: navbar (hide on scroll + full-screen mobile menu), footer (live Lagos clock)

## Using the official registries
These components are hand-written in the same style. To use the official versions instead, run
`npx shadcn@latest init`, then add components from the shadcn, Aceternity and Kokonut registries and swap the imports.
