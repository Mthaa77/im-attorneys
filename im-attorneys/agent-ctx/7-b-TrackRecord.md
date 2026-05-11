---
Task ID: 7-b
Agent: Component Builder
Task: Create TrackRecord.tsx — animated stats + success progress bars section

Work Log:
- Read project worklog.md for full context (27 components, Prestige Noir Africana design system)
- Read ScrollReveal.tsx for animation primitives (ScrollReveal, StaggerContainer, staggerChildVariants, CountUp, GoldLine)
- Read StatsBar.tsx for CountUp usage patterns and stat card design approach
- Read globals.css for available CSS utilities (card-glass, glass-glass, brand color tokens, font classes)
- Created /src/components/im/TrackRecord.tsx with two-part layout:

  **Part 1 — Key Metrics (4 animated stat cards):**
  - 500+ Cases Handled (Trophy icon)
  - 98% Success Rate (TrendingUp icon)
  - R50M+ Recovered for Clients (Award icon)
  - 15+ Court Appearances Monthly (Scale icon)
  - Each card: gold icon in circular container, animated CountUp number, uppercase label
  - Glass-glass effect (semi-transparent brand-navy with blur backdrop)
  - Subtle gold border with hover: lift (-translate-y-1) + gold glow shadow
  - Staggered entrance animation via StaggerContainer + staggerChildVariants (0.12s delay)

  **Part 2 — Practice Area Success Bars (6 horizontal progress bars):**
  - Wills & Estates: 99%, Commercial Law: 98%, Family Law: 97%
  - Criminal Law: 96%, Claims Against State: 95%, General Litigation: 94%
  - Each bar: practice area name (left), animated percentage CountUp (right)
  - Animated fill bar growing from 0% to target width using framer-motion
  - Brand-gold gradient fill with shimmer overlay animation
  - 0.15s stagger delay between bars, smooth cubic-bezier easing
  - useInView trigger for scroll-based animation

  **Decorative Elements:**
  - Top/bottom gold accent gradient lines
  - Subtle grid pattern overlay (brand-gold at 3% opacity)
  - Four gold corner accent brackets
  - Two radial glow effects (top-right, bottom-left)

  **Styling:**
  - bg-brand-dark section background
  - font-display (Playfair) for headings, font-body (Outfit) for labels/body
  - Responsive: 1-col on mobile, 2-col sm, 4-col lg for stat cards
  - GoldLine animated accent above section heading

Stage Summary:
- New component: /src/components/im/TrackRecord.tsx (215 lines)
- Exported as named export: `export function TrackRecord()`
- Uses existing animation primitives (no new dependencies)
- Lint passes clean: 0 errors
- Dev server compiles successfully: 200 OK on /
- Note: Component is NOT yet integrated into page.tsx (per task scope)
