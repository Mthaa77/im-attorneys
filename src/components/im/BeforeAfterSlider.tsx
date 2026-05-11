"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ArrowDown,
  ArrowRight,
  Clock,
  Trophy,
  Banknote,
  TrendingUp,
  ShieldCheck,
  Scale,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChildVariants,
  GoldLine,
  CountUp,
} from "@/components/im/ScrollReveal";

/* ─── Data ──────────────────────────────────────────────────────── */

interface ComparisonCard {
  title: string;
  before: {
    heading: string;
    description: string;
    amount: string;
  };
  after: {
    heading: string;
    description: string;
    amount: string;
  };
  practiceArea: string;
  duration: string;
  severity: number;
  severityLabel: string;
  icon: React.ElementType;
}

const comparisonCards: ComparisonCard[] = [
  {
    title: "RAF Claims Success",
    before: {
      heading: "After Car Accident",
      description:
        "Unable to work, mounting medical bills, insurance company denying claim",
      amount: "R0 recovered",
    },
    after: {
      heading: "Settlement Achieved",
      description:
        "Full medical expenses covered, lost income recovered, future care provided",
      amount: "R1.2 Million",
    },
    practiceArea: "RAF Claims",
    duration: "14 months",
    severity: 85,
    severityLabel: "Critical",
    icon: ShieldCheck,
  },
  {
    title: "Criminal Defence Victory",
    before: {
      heading: "Facing Serious Charges",
      description:
        "Bail denied, reputation at stake, career in jeopardy",
      amount: "Charges: Fraud",
    },
    after: {
      heading: "Full Acquittal",
      description:
        "All charges dropped, reputation restored, record expunged",
      amount: "Result: Not Guilty",
    },
    practiceArea: "Criminal Law",
    duration: "8 months",
    severity: 92,
    severityLabel: "Extreme",
    icon: Scale,
  },
  {
    title: "Family Resolution",
    before: {
      heading: "Bitter Custody Battle",
      description:
        "No access to children, lengthy court delays, emotional distress",
      amount: "Duration: 18 months",
    },
    after: {
      heading: "Shared Custody Agreement",
      description:
        "Regular access to children, amicable co-parenting plan, peace of mind",
      amount: "Result: Favorable Order",
    },
    practiceArea: "Family Law",
    duration: "18 months",
    severity: 78,
    severityLabel: "High",
    icon: TrendingUp,
  },
];

const trustIndicators = [
  {
    value: 2500,
    suffix: "+",
    label: "Cases Won",
    icon: Trophy,
  },
  {
    value: 850,
    suffix: "M",
    prefix: "R",
    label: "Total Recovered",
    icon: Banknote,
  },
  {
    value: 96,
    suffix: "%",
    label: "Success Rate",
    icon: TrendingUp,
  },
  {
    value: 8,
    suffix: " yrs",
    label: "Avg. Resolution",
    icon: Clock,
  },
];

/* ─── Animated Severity Meter ──────────────────────────────────── */

function SeverityMeter({
  severity,
  label,
  isInView,
}: {
  severity: number;
  label: string;
  isInView: boolean;
}) {
  const getColor = (s: number) => {
    if (s >= 90) return { bar: "from-red-700 to-red-500", text: "text-red-400", bg: "bg-red-950/40" };
    if (s >= 80) return { bar: "from-red-600 to-orange-500", text: "text-orange-400", bg: "bg-red-900/30" };
    return { bar: "from-orange-600 to-amber-500", text: "text-amber-400", bg: "bg-orange-900/20" };
  };
  const colors = getColor(severity);

  return (
    <div className="flex items-center gap-2">
      <span className={`font-body text-[10px] font-semibold uppercase tracking-widest ${colors.text}`}>
        {label}
      </span>
      <div className={`flex-1 h-1.5 rounded-full ${colors.bg} overflow-hidden`}>
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colors.bar}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${severity}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        />
      </div>
      <span className={`font-body text-[10px] font-bold tabular-nums ${colors.text}`}>
        {severity}%
      </span>
    </div>
  );
}

/* ─── Gold Arrow Divider ───────────────────────────────────────── */

function GoldArrowDivider() {
  return (
    <div className="relative flex items-center justify-center py-2">
      {/* Gradient line */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-red-800/30 via-brand-gold/60 to-emerald-700/30" />
      {/* Glowing circle */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(198,168,75,0.25) 0%, rgba(198,168,75,0.08) 100%)",
          boxShadow: "0 0 20px rgba(198,168,75,0.2), inset 0 0 10px rgba(198,168,75,0.1)",
        }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(198,168,75,0.2), inset 0 0 10px rgba(198,168,75,0.1)",
            "0 0 30px rgba(198,168,75,0.35), inset 0 0 15px rgba(198,168,75,0.15)",
            "0 0 20px rgba(198,168,75,0.2), inset 0 0 10px rgba(198,168,75,0.1)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-8 h-8 rounded-full border border-brand-gold/40 flex items-center justify-center bg-brand-dark/80 backdrop-blur-sm">
          <ArrowDown className="h-4 w-4 text-brand-gold" strokeWidth={2.5} />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Animated Amount Display ──────────────────────────────────── */

function AnimatedAmount({
  amount,
  isInView,
  type,
}: {
  amount: string;
  isInView: boolean;
  type: "before" | "after";
}) {
  if (type === "after" && amount.startsWith("R")) {
    const numericMatch = amount.match(/R([\d.]+)\s*(.*)/);
    if (numericMatch) {
      const numVal = parseFloat(numericMatch[1]);
      const suffix = numericMatch[2];
      return (
        <motion.div
          className="flex items-baseline gap-0.5"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="font-display text-lg sm:text-xl font-bold text-emerald-400">R</span>
          <CountUp
            end={numVal}
            duration={2}
            className="font-display text-2xl sm:text-3xl font-bold text-emerald-300"
          />
          <span className="font-body text-sm font-medium text-emerald-400/80">{suffix}</span>
        </motion.div>
      );
    }
  }

  return (
    <motion.p
      className={`font-body text-sm font-semibold ${type === "before" ? "text-red-400" : "text-emerald-400"}`}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {amount}
    </motion.p>
  );
}

/* ─── Comparison Card ──────────────────────────────────────────── */

function ComparisonCardComponent({
  card,
  index,
}: {
  card: ComparisonCard;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const [hoveredSide, setHoveredSide] = useState<"before" | "after" | null>(null);
  const CardIcon = card.icon;

  return (
    <motion.div
      ref={cardRef}
      className="group relative card-hover-lift"
      variants={staggerChildVariants}
      onMouseEnter={() => setHoveredSide(null)}
    >
      {/* Gradient border wrapper */}
      <div className="card-gradient-border">
        <div className="relative overflow-hidden rounded-xl bg-brand-dark">
          {/* Diagonal split overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Dark diagonal background base */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-navy to-brand-dark" />
            {/* Red-tinted before zone (top-left) */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-red-900/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
            />
            {/* Emerald-tinted after zone (bottom-right) */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tl from-emerald-950/40 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
            />
            {/* Diagonal split line */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.5 + index * 0.1 }}
            >
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 600">
                <defs>
                  <linearGradient id={`split-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(198,168,75,0.05)" />
                    <stop offset="40%" stopColor="rgba(198,168,75,0.6)" />
                    <stop offset="60%" stopColor="rgba(198,168,75,0.6)" />
                    <stop offset="100%" stopColor="rgba(198,168,75,0.05)" />
                  </linearGradient>
                  <filter id={`glow-${index}`}>
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <line
                  x1="0"
                  y1="0"
                  x2="400"
                  y2="600"
                  stroke={`url(#split-gradient-${index})`}
                  strokeWidth="2"
                  filter={`url(#glow-${index})`}
                />
              </svg>
            </motion.div>
          </div>

          {/* Content layer */}
          <div className="relative z-10">
            {/* Card Header */}
            <motion.div
              className="p-5 pb-3 border-b border-white/5"
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                    <CardIcon className="h-4 w-4 text-brand-gold" strokeWidth={1.8} />
                  </div>
                  <span className="font-body text-[11px] font-semibold uppercase tracking-widest text-brand-gold/70">
                    {card.practiceArea}
                  </span>
                </div>
                <span className="font-body text-[11px] font-medium text-white/30 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {card.duration}
                </span>
              </div>
              <SeverityMeter
                severity={card.severity}
                label={card.severityLabel}
                isInView={isInView}
              />
            </motion.div>

            {/* Before Section */}
            <motion.div
              className="p-5 pb-4 relative"
              onMouseEnter={() => setHoveredSide("before")}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 bg-red-900/15 rounded-lg pointer-events-none"
                animate={{
                  opacity: hoveredSide === "before" ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative">
                <div className="flex items-start gap-2.5 mb-2.5">
                  <motion.div
                    className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg bg-red-900/40 border border-red-800/40 flex items-center justify-center"
                    animate={
                      hoveredSide === "before"
                        ? { scale: [1, 1.1, 1] }
                        : {}
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <AlertTriangle className="h-3.5 w-3.5 text-red-400" strokeWidth={2} />
                  </motion.div>
                  <h4 className="font-display text-base sm:text-lg font-semibold text-red-400 leading-tight">
                    {card.before.heading}
                  </h4>
                </div>
                <p className="font-body text-sm leading-relaxed text-red-300/70 mb-3">
                  {card.before.description}
                </p>
                <AnimatedAmount amount={card.before.amount} isInView={isInView} type="before" />
              </div>
            </motion.div>

            {/* Gold Arrow Divider */}
            <div className="px-5">
              <GoldArrowDivider />
            </div>

            {/* After Section */}
            <motion.div
              className="p-5 pt-4 relative"
              onMouseEnter={() => setHoveredSide("after")}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 bg-emerald-900/15 rounded-lg pointer-events-none"
                animate={{
                  opacity: hoveredSide === "after" ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative">
                <div className="flex items-start gap-2.5 mb-2.5">
                  <motion.div
                    className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg bg-emerald-900/40 border border-emerald-700/30 flex items-center justify-center"
                    animate={
                      hoveredSide === "after"
                        ? { scale: [1, 1.1, 1] }
                        : {}
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2} />
                  </motion.div>
                  <h4 className="font-display text-base sm:text-lg font-semibold text-emerald-400 leading-tight">
                    {card.after.heading}
                  </h4>
                </div>
                <p className="font-body text-sm leading-relaxed text-emerald-300/70 mb-3">
                  {card.after.description}
                </p>
                <AnimatedAmount amount={card.after.amount} isInView={isInView} type="after" />
              </div>
            </motion.div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-brand-gold/20 rounded-tl-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-brand-gold/20 rounded-br-xl pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Trust Indicator Card ─────────────────────────────────────── */

function TrustIndicator({
  indicator,
  index,
}: {
  indicator: (typeof trustIndicators)[number];
  index: number;
}) {
  const Icon = indicator.icon;
  return (
    <motion.div
      className="relative flex flex-col items-center text-center p-5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
      variants={staggerChildVariants}
      whileHover={{
        borderColor: "rgba(198, 168, 75, 0.3)",
        backgroundColor: "rgba(198, 168, 75, 0.05)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Icon */}
      <motion.div
        className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-3"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 + index * 0.1 }}
      >
        <Icon className="h-5 w-5 text-brand-gold" strokeWidth={1.8} />
      </motion.div>

      {/* Value */}
      <div className="flex items-baseline gap-0.5 mb-1">
        {indicator.prefix && (
          <span className="font-display text-lg font-semibold text-brand-gold/60">
            {indicator.prefix}
          </span>
        )}
        <CountUp
          end={indicator.value}
          duration={2.5}
          className="font-display text-3xl sm:text-4xl font-bold text-gold-gradient"
        />
        <span className="font-display text-lg font-semibold text-brand-gold/60">
          {indicator.suffix}
        </span>
      </div>

      {/* Label */}
      <span className="font-body text-xs font-medium text-white/40 uppercase tracking-wider">
        {indicator.label}
      </span>
    </motion.div>
  );
}

/* ─── Ornamental Divider ───────────────────────────────────────── */

function OrnamentalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="block h-px w-10 bg-gradient-to-r from-transparent to-brand-gold/40" />
      <span className="block h-1.5 w-1.5 rotate-45 bg-brand-gold/50" />
      <span className="block h-0.5 w-14 bg-gradient-to-r from-brand-gold/15 via-brand-gold/60 to-brand-gold/15" />
      <span className="block h-1.5 w-1.5 rotate-45 bg-brand-gold/50" />
      <span className="block h-px w-10 bg-gradient-to-l from-transparent to-brand-gold/40" />
    </div>
  );
}

/* ─── Floating Particles ───────────────────────────────────────── */

function FloatingParticles() {
  return (
    <div className="particles-container" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          style={{
            left: `${8 + (i * 7.5) % 85}%`,
            animationDuration: `${12 + (i * 3) % 15}s`,
            animationDelay: `${(i * 1.5) % 8}s`,
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────── */

export function BeforeAfterSlider() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="before-after"
      className="relative w-full overflow-hidden bg-brand-dark noise-overlay"
      aria-label="Case Transformation Theatre — Before and After"
    >
      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent z-10" />

      {/* Background layers */}
      <div className="absolute inset-0 bg-crosshatch pointer-events-none" />
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <FloatingParticles />

      {/* Large section number watermark */}
      <span className="section-number" aria-hidden="true">
        04
      </span>

      {/* Ambient side glows */}
      <div
        className="absolute top-0 left-0 w-96 h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 0% 50%, rgba(153, 27, 27, 0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-96 h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 100% 50%, rgba(6, 78, 59, 0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* ─── Content ────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="flex flex-col items-center">
            <span className="label-premium mb-4 block">Case Transformation Theatre</span>

            {/* Gold line */}
            <div className="mb-6">
              <GoldLine width={60} />
            </div>

            {/* Main heading */}
            <h2 className="heading-section">
              Real Results, Real Impact
            </h2>

            <OrnamentalDivider className="mb-5" />

            <p className="subheading-premium-dark">
              Witness the transformation. These side-by-side comparisons reveal how our strategic intervention turns daunting legal battles into powerful success stories.
            </p>
          </div>
        </ScrollReveal>

        {/* Comparison Cards Grid */}
        <StaggerContainer
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7"
          staggerDelay={0.15}
        >
          {comparisonCards.map((card, i) => (
            <ComparisonCardComponent key={card.title} card={card} index={i} />
          ))}
        </StaggerContainer>

        {/* ─── Trust Indicators ─────────────────────────────────── */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          {/* Divider */}
          <ScrollReveal>
            <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent mb-12 sm:mb-16" />
          </ScrollReveal>

          <ScrollReveal className="text-center mb-8 sm:mb-10">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white/80 mb-2">
              Our Track Record Speaks
            </h3>
            <p className="font-body text-sm text-white/30">
              Numbers that reflect our commitment to justice
            </p>
          </ScrollReveal>

          <StaggerContainer
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
            staggerDelay={0.1}
          >
            {trustIndicators.map((indicator, i) => (
              <TrustIndicator key={indicator.label} indicator={indicator} index={i} />
            ))}
          </StaggerContainer>
        </div>

        {/* ─── CTA Section ──────────────────────────────────────── */}
        <ScrollReveal className="mt-16 sm:mt-20 lg:mt-24">
          <div className="flex flex-col items-center text-center gap-6">
            {/* CTA text */}
            <div className="max-w-lg">
              <p className="font-display text-xl sm:text-2xl font-bold text-white/80 mb-2">
                Your transformation starts here.
              </p>
              <p className="font-body text-sm sm:text-base text-white/35 leading-relaxed">
                Every case is unique. Let us discuss your situation and chart a path
                to the outcome you deserve.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <a
                href="#contact"
                className="btn-premium"
                onClick={scrollToContact}
              >
                <span>Request a Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="btn-premium-outline"
                onClick={scrollToContact}
              >
                <span>View All Case Results</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom wave divider */}
      <div className="wave-divider-bottom" aria-hidden="true" />
    </section>
  );
}
