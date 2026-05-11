---
Task ID: 15-b
Agent: Full-Stack Developer
Task: Create LegalResources component

Work Log:
- Created LegalResources.tsx with 6 downloadable legal guide/checklist resource cards
- Section background: bg-brand-parchment with subtle gold gradient accent lines (top + bottom)
- Heading: "Legal Resources" in Playfair Display with gold underline via GoldLine
- Subheading: "Free guides and checklists to help you navigate common legal matters"
- 6 resource cards in responsive grid (1-col mobile, 2-col sm, 3-col lg):
  1. Divorce Guide (FileIcon)
  2. RAF Claim Checklist (ClipboardCheck)
  3. Bail Application Guide (Shield)
  4. Estate Planning Checklist (FileText)
  5. Commercial Contract Basics (Briefcase)
  6. Know Your Rights (Scale)
- Each card: white bg, rounded-xl, p-6, shadow-sm to hover:shadow-lg, hover:-translate-y-0.5
- Gold icon container (w-12 h-12 rounded-lg bg-brand-gold/10), font-display title, muted description
- Footer per card: "PDF Guide" badge (text-xs text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full) + "Download" button with Download icon
- Bottom CTA: "Need a resource not listed here? Contact us" with #contact link
- ScrollReveal for heading, StaggerContainer + staggerChildVariants for card grid
- Follows existing coding patterns from LegalInsights.tsx

Stage Summary:
- New component: /src/components/im/LegalResources.tsx
- Fully responsive grid layout (1→2→3 col), 6 cards with hover animations
- Lint passes clean (0 errors)
- Note: worklog.md append failed due to file permissions (root-owned)
