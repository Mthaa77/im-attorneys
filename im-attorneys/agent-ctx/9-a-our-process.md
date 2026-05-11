---
Task ID: 9-a
Agent: Component Builder
Task: Create OurProcess.tsx — "How We Work" client journey section

Work Log:
- Read worklog.md to understand project context (8 prior task cycles, 29+ components)
- Read ScrollReveal.tsx to understand animation primitives (ScrollReveal, StaggerContainer, staggerChildVariants, GoldLine)
- Read globals.css to understand available utility classes (card-glass, bg-crosshatch, wave-divider-bottom, section-number, font-display, font-body, corner-gold-*, etc.)
- Created /src/components/im/OurProcess.tsx with full design spec implementation
- Ran `bun run lint` — 0 errors
- Verified dev server compiles successfully (200 OK on /)

Component Summary:
- **File**: /src/components/im/OurProcess.tsx (~195 lines)
- **Export**: Named export `OurProcess`
- **Directive**: "use client"
- **Section ID**: `#process`
- **Background**: bg-brand-cream + bg-crosshatch pattern + wave-divider-bottom
- **Section number**: "04" watermark via .section-number class
- **Header**: "OUR PROCESS" label, "How We Work" heading in Playfair Display, gold GoldLine accent, subtitle
- **4 Steps**: Consultation (MessageSquare), Strategy (Lightbulb), Execution (Gavel), Resolution (Award)
- **Step cards**: card-glass morphism, step number watermark (01-04) with pulse animation, gold icon in circular container, title + description
- **Hover effects**: translateY(-4px) lift via card-glass CSS + gold border highlight via group-hover
- **Timeline connector (desktop)**: Horizontal gold gradient line that scales from left to right with ArrowRight endpoint
- **Timeline connector (mobile)**: Vertical gold gradient line that scales from top to bottom with ArrowDown endpoint
- **Animations**: ScrollReveal for header elements, StaggerContainer + staggerChildVariants for step cards, useInView for timeline line growth, subtle pulse on step numbers
- **Responsive**: Single column on mobile, 4-column grid on lg: breakpoint
- **Padding**: py-20 md:py-28
- **Dependencies**: framer-motion, lucide-react, @/components/im/ScrollReveal

Lint: ✅ 0 errors
Dev server: ✅ Compiles successfully
