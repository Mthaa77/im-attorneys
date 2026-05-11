"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Award,
  Star,
  Trophy,
  Medal,
  Crown,
  Shield,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Quote,
  ExternalLink,
} from "lucide-react";
import {
  ScrollReveal,
  GoldLine,
} from "@/components/im/ScrollReveal";

/* ══════════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════════ */

interface AwardItem {
  title: string;
  organisation: string;
  year: string;
  icon: React.ElementType;
  description: string;
  featured?: boolean;
}

const awards: AwardItem[] = [
  {
    title: "Top 100 Lawyers in South Africa",
    organisation: "Mail & Guardian",
    year: "2024",
    icon: Trophy,
    description: "Recognised among the nation's most influential legal practitioners for outstanding contribution to access to justice and client advocacy.",
    featured: true,
  },
  {
    title: "Best Boutique Law Firm — Pretoria",
    organisation: "Legal 500 Africa",
    year: "2024",
    icon: Award,
    description: "Acknowledged as the leading boutique law firm in the Pretoria region for exceptional client service and legal outcomes.",
    featured: false,
  },
  {
    title: "Excellence in Family Law Practice",
    organisation: "SACLP Awards",
    year: "2024",
    icon: Star,
    description: "Awarded for demonstrating the highest standards of legal excellence and client-centred approach in family law matters.",
    featured: false,
  },
  {
    title: "Rising Star in Legal Practice",
    organisation: "Lawyer of the Year Awards",
    year: "2023",
    icon: Crown,
    description: "Celebrating the rapid rise of Ingrid Mtsweni as one of South Africa's most promising legal professionals.",
    featured: true,
  },
  {
    title: "BBBEE Level 1 Contributor",
    organisation: "SANAS Certified",
    year: "2024",
    icon: Shield,
    description: "Achieving the highest level of broad-based black economic empowerment certification, demonstrating our commitment to economic transformation.",
    featured: false,
  },
  {
    title: "Client Choice Award — Excellence",
    organisation: "LexisNexis South Africa",
    year: "2023",
    icon: Medal,
    description: "Voted by clients as the firm that best delivers on promises, exceeding expectations in communication, outcomes, and overall experience.",
    featured: false,
  },
];

const credentials = [
  { label: "LLB — University of Johannesburg", year: "2018" },
  { label: "Admitted Attorney — High Court of South Africa", year: "2019" },
  { label: "Founded IM Attorneys Inc", year: "2023" },
  { label: "BBBEE Level 1 Certified", year: "2024" },
];

const mediaOutlets = [
  "Mail & Guardian",
  "Legal 500 Africa",
  "SACLP",
  "LexisNexis SA",
  "Sunday Times",
  "Business Day",
];

/* ══════════════════════════════════════════════════════════════════════
   ANIMATIONS
   ══════════════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ══════════════════════════════════════════════════════════════════════
   FEATURED AWARD CARD
   ══════════════════════════════════════════════════════════════════════ */

function FeaturedAwardCard({ award }: { award: AwardItem }) {
  const Icon = award.icon;
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl"
      style={{
        background: "linear-gradient(145deg, rgba(198,168,75,0.08), rgba(198,168,75,0.02))",
        border: "1px solid rgba(198,168,75,0.15)",
        boxShadow: "0 0 50px rgba(198,168,75,0.06)",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Shimmer top bar */}
      <div className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, #8B6914, #C6A84B, #F5E6B8, #E4D49A, #C6A84B, #8B6914)",
          backgroundSize: "200% 100%",
          animation: "goldGlossyShimmer 5s ease-in-out infinite",
        }}
      />

      <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(198,168,75,0.15), rgba(198,168,75,0.06))",
              border: "1.5px solid rgba(198,168,75,0.25)",
              boxShadow: "0 0 24px rgba(198,168,75,0.15)",
            }}
          >
            <Icon className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
              style={{ background: "rgba(198,168,75,0.12)", color: "#E4D49A", border: "1px solid rgba(198,168,75,0.2)" }}
            >
              Featured
            </span>
            <span className="font-body text-[10px] text-white/30 uppercase tracking-wider">{award.year}</span>
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-bold text-white/90 mb-2">
            {award.title}
          </h3>
          <p className="font-body text-sm font-medium text-brand-gold/70 mb-3">
            {award.organisation}
          </p>
          <p className="font-body text-sm leading-relaxed text-white/40">
            {award.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   AWARD CARD (standard)
   ══════════════════════════════════════════════════════════════════════ */

function AwardCard({ award, index }: { award: AwardItem; index: number }) {
  const Icon = award.icon;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-1 cursor-default"
      style={{
        background: "rgba(255,255,255,0.015)",
        border: "1px solid rgba(198,168,75,0.07)",
      }}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{
        borderColor: "rgba(198,168,75,0.2)",
        background: "rgba(255,255,255,0.025)",
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Hover spotlight */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(198,168,75,0.04) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
            style={{
              background: "rgba(198,168,75,0.06)",
              border: "1px solid rgba(198,168,75,0.1)",
            }}
          >
            <Icon className="w-5 h-5 text-brand-gold/70" strokeWidth={1.5} />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-display text-base font-bold text-white/85 mb-1 group-hover:text-brand-gold/90 transition-colors duration-300">
              {award.title}
            </h4>
            <div className="flex items-center gap-2">
              <p className="font-body text-xs text-brand-gold/50">{award.organisation}</p>
              <span className="text-white/15">&middot;</span>
              <span className="font-body text-[11px] text-white/25">{award.year}</span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="font-body text-xs leading-relaxed text-white/40">
                  {award.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand hint */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-5 h-px bg-brand-gold/30" />
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-brand-gold/10 rounded-tr-xl pointer-events-none" />
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MEDIA MARQUEE
   ══════════════════════════════════════════════════════════════════════ */

function MediaMarquee() {
  const items = [...mediaOutlets, ...mediaOutlets];
  return (
    <div className="relative w-full overflow-hidden py-5">
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F9F8F5] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F9F8F5] to-transparent z-10 pointer-events-none" />
      <div className="marquee-container w-full">
        <div className="marquee-content">
          {items.map((outlet, i) => (
            <span
              key={`${outlet}-${i}`}
              className="inline-flex items-center gap-6 sm:gap-8 font-body text-xs sm:text-sm tracking-[0.3em] uppercase select-none"
              style={{ color: "rgba(13, 27, 42, 0.25)" }}
            >
              {outlet}
              <span className="inline-block w-1.5 h-1.5 rotate-45 rounded-[1px] flex-shrink-0" style={{ background: "rgba(198,168,75,0.3)" }} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MOBILE CAROUSEL
   ══════════════════════════════════════════════════════════════════════ */

function MobileCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  const updateScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    const cardWidth = el.querySelector<HTMLElement>(":scope > *")?.offsetWidth ?? 240;
    setActiveIdx(Math.min(Math.round(el.scrollLeft / (cardWidth + 16)), awards.length - 1));
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateScroll();
    el.addEventListener("scroll", updateScroll, { passive: true });
    return () => el.removeEventListener("scroll", updateScroll);
  }, [updateScroll]);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const w = el.querySelector<HTMLElement>(":scope > *")?.offsetWidth ?? 240;
    el.scrollBy({ left: dir === "left" ? -(w + 16) : w + 16, behavior: "smooth" });
  }, []);

  return (
    <div className="md:hidden">
      <div ref={carouselRef} className="flex gap-4 overflow-x-auto py-4 px-1 snap-x snap-mandatory" style={{ scrollPaddingLeft: "16px" }}>
        {awards.map((award, i) => (
          <AwardCard key={award.title} award={award} index={i} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 mt-4">
        <button onClick={() => scroll("left")} disabled={!canScrollLeft}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-brand-gold/20 text-brand-gold/60 disabled:opacity-20 transition-all hover:border-brand-gold/40"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {awards.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIdx ? 20 : 6,
                height: 6,
                background: i === activeIdx ? "#C6A84B" : "rgba(198,168,75,0.2)",
              }}
            />
          ))}
        </div>
        <button onClick={() => scroll("right")} disabled={!canScrollRight}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-brand-gold/20 text-brand-gold/60 disabled:opacity-20 transition-all hover:border-brand-gold/40"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════ */

export function AwardsRecognition() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const featuredAwards = awards.filter((a) => a.featured);
  const standardAwards = awards.filter((a) => !a.featured);

  return (
    <section
      ref={sectionRef}
      id="awards-recognition"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#F9F8F5" }}
      aria-label="Awards & Recognition"
    >
      {/* ── Top separator ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(198,168,75,0.3) 30%, rgba(198,168,75,0.5) 50%, rgba(198,168,75,0.3) 70%, transparent 100%)" }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        {/* ═══════ Section Header ═══════ */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.span
            className="font-body text-[11px] sm:text-xs uppercase tracking-[0.3em] text-brand-gold mb-5 block"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
          >
            Awards &amp; Recognition
          </motion.span>

          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent mx-auto mb-8 max-w-[120px]"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <motion.h2
            className="heading-section-light mb-6"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.3}
          >
            Hall of Excellence
          </motion.h2>

          <motion.p
            className="font-body text-base sm:text-lg text-brand-body max-w-2xl mx-auto leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.45}
          >
            Our pursuit of legal excellence has been recognised by South Africa&apos;s most esteemed institutions. These accolades reflect the calibre of advocacy we deliver every day and the trust our clients place in us.
          </motion.p>
        </div>

        {/* ═══════ Featured Awards ═══════ */}
        <div className="hidden md:grid md:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-14">
          {featuredAwards.map((award) => (
            <FeaturedAwardCard key={award.title} award={award} />
          ))}
        </div>

        {/* Mobile: show first featured */}
        <div className="md:hidden mb-8">
          <FeaturedAwardCard award={featuredAwards[0]} />
        </div>

        {/* ═══════ Standard Awards — Desktop Grid ═══════ */}
        <div className="hidden md:block mb-14 sm:mb-18">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-6 w-px bg-brand-gold/40" />
              <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold/60">Additional Recognitions</span>
              <div className="flex-1 h-px bg-brand-gold/10" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {standardAwards.map((award, i) => (
              <AwardCard key={award.title} award={award} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile carousel */}
        <MobileCarousel />

        {/* ═══════ Credentials Timeline ═══════ */}
        <ScrollReveal>
          <div className="mt-16 sm:mt-20 p-6 sm:p-8 rounded-xl" style={{
            background: "rgba(13,27,42,0.03)",
            border: "1px solid rgba(198,168,75,0.08)",
          }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{
                background: "rgba(198,168,75,0.08)",
                border: "1px solid rgba(198,168,75,0.12)",
              }}>
                <Sparkles className="w-4 h-4 text-brand-gold/70" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-brand-dark">
                Professional Credentials
              </h3>
            </div>

            <div className="space-y-0">
              {credentials.map((cred, i) => (
                <motion.div
                  key={cred.label}
                  className="flex items-center gap-4 py-3 border-b border-brand-border/30 last:border-b-0"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-brand-gold/40 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="font-body text-sm text-brand-dark/80">{cred.label}</span>
                  </div>
                  <span className="font-body text-xs font-bold text-brand-gold/60 flex-shrink-0">{cred.year}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ═══════ As Featured In ═══════ */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 sm:mt-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-brand-gold/30" />
              <span className="font-body text-[10px] sm:text-xs tracking-[0.3em] uppercase text-brand-gold/50">
                As Featured In
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-brand-gold/30" />
            </div>
            <MediaMarquee />
          </div>
        </ScrollReveal>

        {/* ═══════ Quote ═══════ */}
        <motion.div
          className="mt-14 sm:mt-18 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Quote className="w-5 h-5 text-brand-gold/30" />
          </div>
          <p className="font-display text-lg sm:text-xl italic leading-relaxed" style={{ color: "rgba(13,27,42,0.6)" }}>
            &ldquo;Recognition is meaningful only when it reflects genuine impact in the lives of the people we serve. These awards belong to our clients as much as to our team.&rdquo;
          </p>
          <p className="font-body text-sm font-semibold text-brand-gold mt-3">Ingrid Mtsweni, Founder</p>
        </motion.div>
      </div>

      {/* ── Bottom separator ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(198,168,75,0.3) 30%, rgba(198,168,75,0.5) 50%, rgba(198,168,75,0.3) 70%, transparent 100%)" }}
      />
    </section>
  );
}
