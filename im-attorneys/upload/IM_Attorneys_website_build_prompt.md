# IM Attorneys Inc — Premium Website Build Prompt
> Prepared by: Carter Digitals (Pty) Ltd
> Date: April 2026
> For: Ingrid Mtsweni Attorneys Incorporated
> Website: iminc.co.za

---

## SECTION 1 — BRIEF OVERVIEW

Build a multi-page, cinematic, ultra-premium legal website for **IM Attorneys Inc** — a 100% female black-owned boutique law firm founded by Ingrid Mtsweni, located in the prestigious Pegasus Building, Menlyn Maine, Pretoria. The site must feel like a **luxury South African brand that happens to practice law** — authoritative, empowering, and culturally grounded. Think less "generic law firm template", more **Thebe Magugu meets Constitutional Court gravitas**: deep navy, champagne gold, immaculate typography, and a presence that immediately communicates that this firm is serious, prestigious, and personal.

The site's single most important job: **convert a person in legal distress into a booked consultation** — fast, with zero friction, and total confidence.

**Founder's brand mantra to embed throughout:** *"I Am Attorneys. We wear the law on our sleeve."*

---

## SECTION 2 — TECH STACK

| Layer | Technology |
|---|---|
| Framework | Next.js 15+ (App Router, React Server Components) |
| Styling | Tailwind CSS with custom CSS design tokens |
| Animation | Framer Motion (page transitions, scroll reveals, parallax) |
| Forms | React Hook Form + Zod validation |
| Fonts | Via `next/font` — Playfair Display + Outfit |
| Icons | Lucide React |
| Carousel | Embla Carousel |
| Map | Google Maps Embed API (contact page) |
| Deployment | Vercel (free tier) |
| Domain | iminc.co.za (existing — connect after approval) |

---

## SECTION 3 — DESIGN PHILOSOPHY

### Named Aesthetic Direction: **"Prestige Noir Africana"**
A law firm that lives in Pretoria's most premium building should *look* like it belongs there. Deep navy authority, champagne gold accents that echo the IM logo, warm cream for breathing room. The imagery references modern South African professional life — not stock-photo London or New York courtrooms. The typography is commanding but never cold.

### Colour Palette (CSS Variables)

```css
:root {
  --color-bg-primary:    #F9F8F5;   /* Warm cream — breathing room */
  --color-bg-secondary:  #EEE8DC;   /* Pale parchment */
  --color-bg-dark:       #0D1B2A;   /* Deep navy — authority, prestige */
  --color-bg-card:       #FFFFFF;
  --color-brand-gold:    #C6A84B;   /* Champagne gold — from IM logo */
  --color-brand-gold-lt: #E4D49A;   /* Pale gold tint */
  --color-brand-navy:    #1A3250;   /* Mid navy */
  --color-brand-navy-lt: #2A4A70;   /* Lighter navy for hover states */
  --color-text-primary:  #0D1B2A;   /* Deep navy text */
  --color-text-body:     #3A4A5C;   /* Softer body copy */
  --color-text-muted:    #7A8A9C;   /* Captions, labels */
  --color-text-inverse:  #F9F8F5;   /* White-ish on dark sections */
  --color-border:        #DDD6C8;
  --color-shadow:        rgba(13, 27, 42, 0.12);
  --color-gold-glow:     rgba(198, 168, 75, 0.2);
}
```

### Typography Pairing: **Modern Bold Authority**

```
Display (H1, H2, pull quotes): Playfair Display
  — Weights: 700, 800, 900
  — Italic variants for pull quotes and accent headlines
Body / UI / Labels:            Outfit
  — Weights: 300, 400, 500, 600

Type scale:
  Hero H1:     clamp(3rem,   7vw,  6rem)    — Playfair 800
  Section H2:  clamp(1.75rem,3.5vw,3rem)   — Playfair 700
  H3:          clamp(1.1rem, 2vw,  1.5rem)  — Outfit 600
  Body Large:  1.125rem / 1.75 lh           — Outfit 300
  Body:        1rem / 1.65 lh               — Outfit 400
  Label/Caps:  0.7rem / 0.18em tracking    — Outfit 500 UPPERCASE
```

### Motion Principles

```javascript
// Scroll reveal — apply to ALL sections
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Staggered children (service cards, team cards, etc.)
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

// Page transition (AnimatePresence)
const pageVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2 } }
}

// Gold line reveal (for section dividers)
// width: 0 → 60px, duration: 0.8s, triggered by useInView
```

---

## SECTION 4 — SITE STRUCTURE

```
Phase 1 (launch):
/                     → Homepage (cinematic, full conversion machine)
/about                → About the firm + founder story
/team                 → Team profiles
/services             → Services overview (bento grid)
/services/family-law  → Family Law detail page
/services/wills-estates → Wills & Estates detail page
/services/claims-against-state → Claims Against the State detail page
/services/criminal-law → Criminal Law detail page
/services/commercial-law → Commercial Law detail page
/services/general-litigation → General Litigation detail page
/vacation-programme   → Student Vacation Programme
/contact              → Contact form + map + emergency CTA

Phase 2 (future — do not build yet):
/blog                 → Legal resources / articles
/faq                  → Expanded FAQ hub
/book                 → Full booking/calendar integration
```

---

## SECTION 5 — PAGE-BY-PAGE SPECIFICATIONS

---

### PAGE: Homepage (`/`)

#### Section 1 — Hero (Full Screen, Split Layout)

**Layout:** 60/40 split. Left 60%: text. Right 40%: image panel (full-height, with slight dark vignette).
**Background:** Deep navy (`--color-bg-dark`) on the left text panel; professional photo of Ingrid (or Pegasus Building exterior) on the right.
**Overlap element:** Floating gold badge/card sitting on the split line — "Est. 2023 | Menlyn Maine, Pretoria" in Outfit 500 caps.

**Copy:**
```
[Label/caps, gold]: BOUTIQUE LAW FIRM · PRETORIA
[H1, Playfair 800, white]:
  "Legal Service
   Curated for You."
[Body large, Outfit 300, muted cream]:
  "Personal and business legal solutions from Pretoria's
   most prestigious address — Menlyn Maine."
[CTA 1 — gold button]: "Book a Consultation →"
  → mailto:attorneys@iminc.co.za?subject=Book%20a%20consultation
[CTA 2 — outline white]: "Explore Our Services"
  → /services
```

**Trust signal bar** (below CTAs, small caps, inline with divider dots):
`Family Law · Wills & Estates · Criminal Law · Commercial Law · RAF Claims`

**Animation:** H1 fades up (0.6s, 0.2s delay). Body fades up (0.6s, 0.4s delay). CTAs fade up (0.5s, 0.6s delay). Image panel slides in from right (0.8s).

**Mobile:** Stack vertically. Image becomes a 280px tall banner above text. CTAs go full-width stacked.

---

#### Section 2 — Stats Bar (Dark Strip)

**Layout:** Full-width, `--color-bg-dark`, 4 columns centered.
**Animate with CountUp on scroll into view.**

| Number | Label |
|---|---|
| 2023 | Year Founded |
| 6+ | Practice Areas |
| 3 | Team Members |
| 24/7 | Bail Applications |

---

#### Section 3 — The Firm (About Intro)

**Layout:** Asymmetric 2-column. Left: large Playfair italic pull quote. Right: 3 short paragraphs + "Read Our Story →" link.

**Pull quote (left, large italic Playfair, gold accent):**
> "I Am Attorneys. We wear the law on our sleeve."

**Right column copy:**
```
IM Attorneys Inc is a proudly South African, 100% female
black-owned boutique law firm. Founded by Ingrid Mtsweni,
the firm combines deep banking-sector legal experience with
a commitment to Ubuntu — bringing personalised, innovative
solutions to every client.

We are not a large, impersonal firm. We are a curated team
that knows your name, understands your circumstances, and
delivers strategic legal outcomes.

[Link]: Read Our Story →  (/about)
```

**Gold horizontal rule** above this section: `width: 60px, height: 2px, --color-brand-gold`.

---

#### Section 4 — Services Bento Grid

**Layout:** CSS Grid, 3 columns × 2 rows on desktop. Single column on mobile.
**Header above grid:**
```
[label caps, gold]: OUR PRACTICE
[H2, Playfair]: "Every Legal Matter,
                 Handled with Precision."
```

**Grid cards (6 total):**

Each card: white background, subtle shadow, dark navy title (Outfit 600), body copy (Outfit 400), small gold arrow CTA bottom-left.

**Hover behaviour:** Card lifts (y: -6px), thin gold left border slides in (height animation, 0.3s), overlay strip slides up from bottom with "Learn More →" in gold.

| Card | Title | Sub-copy (1 sentence) | Route |
|---|---|---|---|
| 1 (featured, col-span-2) | Family Law | "Divorce, custody, ANCs, protection orders — handled with care and expertise." | /services/family-law |
| 2 | Wills & Estates | "Protect your legacy. We ensure your assets are preserved and intentionally transferred." | /services/wills-estates |
| 3 | Claims Against the State | "RAF claims, wrongful arrests, medical malpractice — we hold the state accountable." | /services/claims-against-state |
| 4 | Criminal Law | "Bail available 24/7. Expert defence across all criminal matters." | /services/criminal-law |
| 5 (wide, col-span-2) | Commercial Law | "Contracts, M&A, corporate governance — legal solutions that make business sense." | /services/commercial-law |
| 6 | General Litigation | "Evictions, debt collection, debt review removal — we litigate what others avoid." | /services/general-litigation |

---

#### Section 5 — 24/7 Emergency CTA Strip

**Layout:** Full-width dark navy strip, high-contrast. Between services grid and team section.
**This is the bail application callout — make it unmissable.**

```
[Label caps, gold]: CRIMINAL MATTERS
[H3, Playfair, white]: "Need a Bail Attorney Right Now?"
[Body, Outfit, cream]:  "We are available 24 hours a day, 7 days a week
                         for bail applications across Pretoria."
[CTA, gold button, large]: "Call Us Now: 081 248 8048"
  → tel:+27812488048
[Secondary CTA, outline]: "WhatsApp Us →"
  → https://wa.me/270812488048
```

---

#### Section 6 — Meet the Director (Founder Feature)

**Layout:** Asymmetric. Left 45%: Ingrid's portrait photo (cropped to portrait, with navy/gold frame element). Right 55%: bio content.

**Right column:**
```
[Label caps, gold]: FOUNDER & DIRECTOR
[H2, Playfair]: "Ingrid Mtsweni"
[Body, Outfit 300]:
  Ingrid holds an LLB from the University of Johannesburg (2018).
  After completing her articles and being admitted as an Attorney,
  she joined the legal department of one of South Africa's leading
  banking institutions — building expertise across multiple areas
  of law before founding IM Attorneys Inc.

  IM Attorneys Inc is a product of passion meets skill and knowledge.
[Divider: 40px gold rule]
[Values row — 5 pills]:
  ✦ Ethical Integrity  ✦ Ubuntu  ✦ Passion  ✦ Excellence  ✦ Representation
[CTA link]: Meet the Full Team →  (/team)
```

---

#### Section 7 — Cinematic Parallax Quote

**Layout:** Full-bleed, 60% dark overlay over a background image of the Pegasus Building / Menlyn Maine skyline at dusk. Text centered.

```
[Large Playfair italic, white, clamp(2rem, 5vw, 4rem)]:
  "A good lawyer is going to try
   and protect her client."
[Caption, Outfit 400, gold]:
  — John F. Kennedy
```

**Animation:** Background image scrolls at 60% of page scroll speed (Framer Motion `useTransform`).

---

#### Section 8 — Testimonials Carousel

**Layout:** Embla Carousel, auto-scroll (40s loop), drag-to-scroll. Card min-width: 380px.
**Card style:** White, warm shadow, active card has gold left border (4px).
**Header:**
```
[Label caps, gold]: CLIENT EXPERIENCES
[H2, Playfair]: "What Our Clients Say"
```

**PLACEHOLDER — Client must provide testimonials before launch.**
Build with 3 placeholder cards using lipsum-style legal context:

```
Card 1:
"[Client review placeholder — to be provided by client]"
— [Client Name], [Matter Type]
★★★★★

Card 2:
"[Client review placeholder — to be provided by client]"
— [Client Name], [Matter Type]
★★★★★

Card 3:
"[Client review placeholder — to be provided by client]"
— [Client Name], [Matter Type]
★★★★★
```

---

#### Section 9 — Location & Contact Snapshot

**Layout:** 2 columns. Left: address/hours/contact details. Right: Google Maps embed (full height of section).

**Left column:**
```
[H3, Playfair]: "Find Us in Menlyn Maine"
[Body]:
  Pegasus Building, 210 Amarand Avenue
  Menlyn Maine, Pretoria, 0181

  Mon – Fri: 08:00 – 17:00
  Bail Applications: 24/7

[Icon row]:
  📞 081 248 8048
  ✉️ attorneys@iminc.co.za
  💬 WhatsApp →  (https://wa.me/270812488048)
```

**CTA below:**
```
[Gold button]: "Book a Consultation →"
  → mailto:attorneys@iminc.co.za?subject=Book%20a%20consultation
```

---

#### Section 10 — Footer

**Layout:** 4 columns on desktop, 2 on tablet, 1 on mobile. Dark navy background.

| Col 1 | Col 2 | Col 3 | Col 4 |
|---|---|---|---|
| IM Logo (white version) + tagline | Quick Links | Services Links | Contact Details |
| "Legal service curated for your personal and business needs" | Home, About, Team, Services, Vacation Programme, Contact | Family Law, Wills & Estates, Criminal Law, Commercial Law, Claims vs State, Litigation | 📞 081 248 8048 · ✉️ attorneys@iminc.co.za · 📍 Pegasus Building, 210 Amarand Ave, Menlyn Maine, Pretoria |

**Footer bottom bar:** Copyright © 2026 IM Attorneys Inc — All Rights Reserved. · [Instagram icon] · [Facebook icon] · [LinkedIn icon]

---

### PAGE: About (`/about`)

**Section 1:** Full-width hero banner. Deep navy. Large Playfair H1: "About IM Attorneys." Gold underline.

**Section 2 — Who We Are:**
```
[H2, Playfair]: "A Boutique Firm Built on
                 Passion, Skill, and Knowledge."

[Body copy — use verbatim from website]:
IM Attorneys Inc is a proudly South African law firm that offers a full suite
of legal and business solutions to clients in and around the borders of the
country. Our industry expertise, cross-practice and collaborative platform
ensure we meet our clients' evolving needs. As a boutique law firm, through
our integrated approach to delivering client-centric services, we offer
sophisticated legal and business advise that incent efficiency, leveraging
our immense knowledge and resources across our firm for an exceptional
service experience that provides solutions for our clients complex issues.
```

**Section 3 — Core Values:**
5 large cards in a row, each with an icon, value name (Playfair), and 1-sentence description:
- **Ethical Integrity** — "We operate with complete transparency and honesty in every engagement."
- **Ubuntu** — "We recognise our shared humanity. Your matter is personal to us."
- **Passion** — "We are driven by a genuine love for the law and for the people we serve."
- **Excellence** — "We hold ourselves to the highest professional and ethical standards."
- **Representation** — "We ensure your voice is heard — in every room, at every stage."

**Section 4 — Mission:**
Full-bleed cream section. Centered Playfair italic quote (large):
> "Our mission is to deliver strategic and innovative legal and business solutions for our clients, wherever their affairs may take them."

---

### PAGE: Team (`/team`)

**Section 1:** Banner, dark navy, Playfair H1: "Our Team."

**Section 2 — Team Cards:**
3 large cards, centered on desktop. Each card:
- Portrait photo (circular crop, gold border ring)
- Name (Playfair 700)
- Title (Outfit 500 caps, gold)
- Email icon link
- Phone icon link
- Bio paragraph (Outfit 300)

**Cards:**
```
Card 1: Ingrid Mtsweni — Founder & Director
  Email: attorneys@iminc.co.za · Phone: 081 248 8048
  Bio: [Full bio as per content scrape]

Card 2: Katlego Seitisho — Litigation Attorney
  Email: katlego@iminc.co.za · Phone: 071 234 1767
  Bio: [Request from client — placeholder: "Katlego is an experienced litigation
  attorney specialising in..."]

Card 3: Mmabatho Moncha — Legal Secretary
  Email: info@iminc.co.za · Phone: 064 510 9707
  Bio: [Request from client]
```

---

### PAGE: Services (`/services`)

**Section 1:** Banner, Playfair H1: "Our Practice Areas."

**Section 2 — Intro:**
```
[H3]: "Comprehensive Legal Coverage, Personal Delivery."
[Body]: "We provide extensive and comprehensive legal services with the
goal of meeting all our clients' expectations."
```

**Section 3 — Bento Grid:** Repeat the 6-service bento grid from homepage (same spec).

---

### PAGE: Individual Service Pages (`/services/[slug]`)

**Template structure (use for all 6 service pages):**

```
Section 1: Dark navy hero banner
  — Service name (Playfair H1)
  — 1-sentence description
  — "Book a Consultation →" CTA

Section 2: Service overview
  — Left: descriptive paragraph (from website copy)
  — Right: bullet list of all sub-services

Section 3: "How We Help You" — 3 mini-cards (icon, heading, body)

Section 4: Relevant FAQ (2–3 questions from FAQ list)

Section 5: Contact CTA strip
  — "Ready to Get Started? Let's Talk."
  — Phone + WhatsApp + Email buttons
```

**Family Law page — specific content:**
- Services list: Contested and Uncontested Divorce, Ante-nuptial contracts, Post-nuptial contracts, Child custody and support claims, Spousal maintenance claims, Legal advice on marital regimes, Protection Orders
- FAQ from website: "What is an Ante-nuptial Contract?", "Does lobola without Home Affairs registration make me married in community of property?", "Can I change my marital regime?"

**Wills & Estates page — specific content:**
- Services list: Drafting of wills, Legal services in will disputes, Winding up of deceased estates, Estate Planning, Registration of Trusts, Power of Attorney
- FAQ: "I am still young, do I need a will?"

**Claims Against the State page:**
- Services list: RAF claims, Wrongful arrests, Land claims, Personal injury claims, Medical malpractice claims
- Add urgency note: "Claims against the state are subject to strict time limits and specific procedural requirements. Contact us as soon as possible."

**Criminal Law page:**
- Services list: Bail applications (available 24/7), Fraud charges, Reckless and Negligent Driving, Common assault
- Prominent red/gold emergency banner: "Available 24/7 for Bail Applications — Call 081 248 8048 Now"

**Commercial Law page:**
- Services list: Drafting contracts, Commercial structuring, Contract reviews, Mergers and Acquisitions, Commercial Litigation, Corporate governance

**General Litigation page:**
- Services list: Evictions, Third party claims, Debt review removal, Application for recession of judgment, Debt collection

---

### PAGE: Vacation Programme (`/vacation-programme`)

**Section 1:** Banner, Playfair H1: "Student Vacation Programme."

**Section 2 — About:**
```
[H2]: "Shaping the Next Generation of South African Lawyers."
[Body]: [Verbatim from website — see content scrape Section 5]
```

**Section 3 — What You'll Do (6 icon cards):**
Practice Management Training | Drafting Legal Documents | Library Orientation | Legal Research | Court Visits | Client Consultation Observation

**Section 4 — FAQ Accordion:** 4 questions from site content.

**Section 5 — Application Form:**
```
[H2]: "Apply for Our 2025 Vacation Programme"
[Form fields]: Name, Phone, Email, University, Year of Study, CV Upload
[CTA button]: "Submit My Application →"
[Note]: "Applications are reviewed on a rolling basis."
```

---

### PAGE: Contact (`/contact`)

**Section 1 — Hero:** Narrow dark navy banner, Playfair H1: "Get in Touch."

**Section 2 — Split Layout:**

**Left 50% — Contact Details:**
```
[H3, Playfair]: "IM Attorneys Inc"

📍 Pegasus Building, 210 Amarand Avenue
   Menlyn Maine, Pretoria, 0181

📞 081 248 8048
✉️ attorneys@iminc.co.za
💬 WhatsApp: https://wa.me/270812488048

Monday – Friday: 08:00 – 17:00
[Confirm hours with client]

⚡ Available 24/7 for Bail Applications
```

**Right 50% — Contact Form:**
```
Fields: Full Name, Phone Number, Email Address, Area of Law
(dropdown: Family Law / Wills & Estates / Criminal Law /
Commercial Law / Claims Against State / General Litigation / Other),
Brief Description of Matter (textarea)

Submit CTA: "Send My Enquiry →"
```
Note: use React Hook Form + Zod. No `<form>` HTML tags — use event handlers.

**Section 3 — Google Maps Embed:**
Full-width map embed. Marker at: Pegasus Building, 210 Amarand Avenue, Menlyn Maine, Pretoria.

**Section 4 — FAQ Accordion:**
Pull all 5 FAQs from current contact page. Style as clean accordion with gold `+` icon.

---

## SECTION 6 — GLOBAL INTERACTIVE COMPONENTS

### Floating WhatsApp Button
```jsx
// Fixed bottom-right, z-50, all pages
// Resting: green circle, WhatsApp icon
// Hover: expands pill → "Chat with Us on WhatsApp"
// Mobile: always show label

<a href="https://wa.me/270812488048" target="_blank" rel="noopener noreferrer">
  <motion.div
    whileHover={{ width: 'auto', paddingRight: '16px' }}
    className="fixed bottom-6 right-6 z-50 flex items-center
               gap-2 bg-green-500 text-white rounded-full p-4 shadow-lg"
  >
    <WhatsAppIcon size={24} />
    <span className="overflow-hidden whitespace-nowrap hidden md:block">
      Chat with Us
    </span>
  </motion.div>
</a>
```

### 24/7 Bail Emergency Banner
```jsx
// Fixed top strip (below nav) on criminal law page
// Also appears on homepage 24/7 section
// Red urgent background, pulsing dot, phone link

<div className="bg-red-700 text-white text-sm py-2 text-center">
  <span className="inline-block w-2 h-2 rounded-full bg-white
                   animate-pulse mr-2" />
  Available 24/7 for Bail Applications —
  <a href="tel:+27812488048" className="font-bold ml-1 underline">
    Call 081 248 8048
  </a>
</div>
```

### Sticky Navigation
```javascript
// useScrollPosition hook
// scrollY > 60px: transition from transparent to
//   bg-[--color-bg-dark] + shadow-lg
// Start: bg-transparent, white text
// Scrolled: dark navy bg, white text, subtle shadow
// Transition: background-color 0.3s ease, box-shadow 0.3s ease

Layout: Logo (white version) LEFT | Nav links CENTER | "Book Consultation" CTA button RIGHT (gold)
Mobile: hamburger → full-screen dark navy overlay, staggered link reveals (Framer Motion)
```

### Scroll Reveal System
```javascript
// Apply to ALL sections using useInView
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}
// Stagger cards by 0.1s delay per child
```

### Page Transitions
```javascript
// Framer Motion AnimatePresence on root layout
// opacity + y slide, 0.3s enter / 0.2s exit
```

### Loading Screen
```javascript
// White screen with IM logo (gold monogram) centered
// Logo fades in (0.4s) then screen fades out (0.4s, delay 0.8s)
// Total: 1.2s
// sessionStorage flag — shows only on first visit per session
```

---

## SECTION 7 — PERFORMANCE & SEO

- `next/image` on ALL images with `priority` prop on hero images
- Fonts via `next/font` ONLY — no external `<link>` tags, zero layout shift
- Unique `<title>` and `<meta description>` per page

**Suggested titles/descriptions:**
```
Homepage:
  title: "IM Attorneys Inc | Boutique Law Firm in Menlyn Maine, Pretoria"
  description: "Expert legal services in family law, RAF claims, criminal law,
                wills & estates, and commercial law. Female-led boutique firm
                in Pretoria's Menlyn Maine. Book a consultation today."

About:
  title: "About Us | IM Attorneys Inc"
  description: "Learn about IM Attorneys Inc — a 100% female black-owned boutique
                law firm founded by Ingrid Mtsweni in Pretoria, South Africa."

Services:
  title: "Our Legal Services | IM Attorneys Inc"
  description: "Comprehensive legal services: family law, wills & estates, criminal
                law, commercial law, claims against the state, and general litigation."

Contact:
  title: "Contact IM Attorneys Inc | Pretoria Law Firm"
  description: "Get in touch with IM Attorneys Inc. Located at Pegasus Building,
                Menlyn Maine, Pretoria. Available 24/7 for bail applications."
```

- **JSON-LD Structured Data** on homepage (LegalService schema):
```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "IM Attorneys Inc",
  "description": "100% female black-owned boutique law firm in Menlyn Maine, Pretoria",
  "url": "https://iminc.co.za",
  "telephone": "+27812488048",
  "email": "attorneys@iminc.co.za",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "210 Amarand Avenue, Pegasus Building",
    "addressLocality": "Menlyn Maine, Pretoria",
    "postalCode": "0181",
    "addressCountry": "ZA"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00",
    "closes": "17:00"
  },
  "priceRange": "$$",
  "areaServed": "Gauteng, South Africa"
}
```

- Auto-generated `sitemap.xml` and `robots.txt`
- Target: LCP < 2.5s, CLS = 0

---

## SECTION 8 — ALL COPY VERBATIM

### Business Details
- **Business name:** IM Attorneys Inc / Ingrid Mtsweni Attorneys Incorporated
- **Tagline:** "Legal service curated for your personal and business needs"
- **Brand mantra:** "I Am Attorneys. We wear the law on our sleeve." — Ingrid Mtsweni
- **Founded:** February 2023
- **Classification:** 100% female black-owned boutique law firm

### Contact Details (confirmed)
- **Phone (main):** 081 248 8048 / +27 81 248 8048
- **WhatsApp:** https://wa.me/270812488048
- **Email (Director):** attorneys@iminc.co.za
- **Email (Litigation):** katlego@iminc.co.za
- **Email (Secretary):** info@iminc.co.za
- **Phone (Katlego):** 071 234 1767
- **Phone (Secretary):** 064 510 9707
- **Address:** 210 Amarand Avenue, Pegasus Building 1, Menlyn Maine Precinct, Waterkloof Glen Ext 2, Pretoria, 0181

⚠️ **Hours — CONFIRM WITH CLIENT:** Website shows 17:00, Facebook flyer shows 16:00.

### Team Bios (verbatim)
**Ingrid Mtsweni (Director):**
"Ingrid acquired her LLB degree from the University of Johannesburg in the year 2018. After having completed her articles and being admitted as an Attorney, she was appointed to join the legal department of the one of the leading banking institutions in South Africa. During that time, she gained a vast wealth of valuable experience and expanded her skills in different areas of the law, which subsequently led her to the decision to open her own practice. IM Attorneys Inc is a product of passion meets skill and knowledge."

**Katlego Seitisho (Litigation Attorney):** Bio not yet published — request from client.
**Mmabatho Moncha (Legal Secretary):** Bio not yet published — request from client.

### Social Media
- Instagram: https://www.instagram.com/mtsweniinc/
- Facebook: Not confirmed — request handle from client
- LinkedIn: Not confirmed — request URL from client

---

## SECTION 9 — IMAGE PLACEHOLDERS

| Use | URL or Direction |
|---|---|
| **Logo (IM monogram)** | https://img1.wsimg.com/isteam/ip/53d9d56f-19db-4b48-b7c6-ba9bb2b6070c/IMG_1223%202.PNG — request high-res PNG from client |
| **Ingrid portrait** | https://img1.wsimg.com/isteam/ip/53d9d56f-19db-4b48-b7c6-ba9bb2b6070c/Content-Creator-Project.png — request professional headshot |
| **Katlego portrait** | https://img1.wsimg.com/isteam/ip/53d9d56f-19db-4b48-b7c6-ba9bb2b6070c/IMG_0047.JPG |
| **Mmabatho portrait** | https://img1.wsimg.com/isteam/ip/53d9d56f-19db-4b48-b7c6-ba9bb2b6070c/FCA82DF0-0325-4635-AA2D-DA83D31697D0.PNG |
| **Hero image** | Pegasus Building exterior (Menlyn Maine at dusk) OR professional team photo in office. Unsplash direction: "modern office building Pretoria South Africa" or "South African business woman professional" |
| **Service — Family** | https://img1.wsimg.com/isteam/ip/53d9d56f-19db-4b48-b7c6-ba9bb2b6070c/IMG_4951.JPG |
| **Service — Wills** | https://img1.wsimg.com/isteam/ip/53d9d56f-19db-4b48-b7c6-ba9bb2b6070c/IMG_0997.JPG |
| **Service — Claims** | https://img1.wsimg.com/isteam/ip/53d9d56f-19db-4b48-b7c6-ba9bb2b6070c/IMG_1095.JPG |
| **Service — Criminal** | https://img1.wsimg.com/isteam/ip/53d9d56f-19db-4b48-b7c6-ba9bb2b6070c/IMG_1091.JPG |

**Stock photo direction:**
- Platform: Unsplash, Pexels, or Adobe Stock
- Style: Warm, natural light, editorial
- Subjects: Black South African professionals in corporate/office settings
- Do NOT use: generic stock photos of courtrooms, gavels, scales of justice, or predominantly white/western settings
- Background reference: Menlyn Maine precinct architecture (glass, steel, modern)

---

## SECTION 10 — "WHAT PREMIUM MEANS" CHECKLIST

**DO NOT build with:**
- ❌ Generic GoDaddy/Wix aesthetic — plain white background, flat sans-serif only
- ❌ Generic stock images of gavels, scales, or North American/European courtrooms
- ❌ Flat blue-and-white "typical law firm" colour scheme
- ❌ Inter, Roboto, or Arial as the only font
- ❌ Static pages with no scroll animation or depth
- ❌ CTA buttons labelled "Submit" or "Click Here" or "Learn More"
- ❌ A homepage that looks like a brochure printed on a screen
- ❌ Mobile menu that just shows/hides a list with no animation
- ❌ Footer with only copyright text
- ❌ The word "Brooklyn" to describe the location — use "Menlyn Maine"

**DO build with:**
- ✅ Playfair Display for all headlines — commanding, editorial, premium
- ✅ Deep navy + champagne gold as the primary colour story — from the IM logo
- ✅ The Pegasus Building as a visual trust signal — this location is prestigious
- ✅ The "I Am Attorneys. We wear the law on our sleeve." mantra woven in prominently
- ✅ Ubuntu as a design emotion, not just a value listed in a bullet point
- ✅ 24/7 bail availability as a visible, urgent element — not buried in body copy
- ✅ 100% female black-owned as a proud, prominent brand attribute
- ✅ Every CTA has a purpose and a verb: "Book My Consultation →", "Call Us Now →", "Chat on WhatsApp →"
- ✅ Scroll triggers a visual reward at every major section
- ✅ Mobile experience feels native and fast — not a desktop site squeezed small
- ✅ The homepage should feel like opening the annual report of South Africa's most exciting new law firm

---

## SECTION 11 — DEPLOYMENT

- **Platform:** Vercel (free tier)
- **Prototype URL:** `im-attorneys.vercel.app`
- **Production domain:** `iminc.co.za` (existing — DNS connect after client approval)
- **Process:** Share prototype link with Ingrid before going live
- **Client review note:** Confirm operating hours, request full team bios and high-res headshots, request at least 3 testimonials before launch

---

## OUTSTANDING CLIENT DELIVERABLES REQUIRED BEFORE LAUNCH

| Item | Priority | Note |
|---|---|---|
| Confirm operating hours (16:00 or 17:00?) | 🔴 Critical | |
| 3+ client testimonials (text + first name/matter type) | 🔴 Critical | |
| High-res logo file (PNG, transparent background) | 🔴 Critical | |
| Professional headshot of Ingrid (high-res) | 🔴 Critical | |
| Bio copy for Katlego Seitisho | 🟠 High | |
| Bio copy for Mmabatho Moncha | 🟠 High | |
| Facebook handle | 🟠 High | |
| LinkedIn profiles (Ingrid + Katlego) | 🟡 Medium | |
| Confirm free consultation policy | 🟡 Medium | |
| Payment options or free first consultation offer | 🟡 Medium | |

---

*Build prompt compiled by Carter Digitals — carterdigitals.co.za*
*Reference: IM_Attorneys_content_scrape.md (Phase 1 + 2)*
