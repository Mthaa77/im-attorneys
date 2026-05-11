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
} from "lucide-react";
import {
  ScrollReveal,
  GoldLine,
} from "@/components/im/ScrollReveal";

/* ─── Data ──────────────────────────────────────────────────────── */

interface AwardData {
  title: string;
  org: string;
  year: string;
  icon: React.ComponentType<{ className?: string }>;
}

const awards: AwardData[] = [
  {
    title: "Top 100 Lawyers in South Africa",
    org: "Mail & Guardian",
    year: "2024",
    icon: Trophy,
  },
  {
    title: "Best Boutique Law Firm",
    org: "Legal 500 Africa",
    year: "2023",
    icon: Award,
  },
  {
    title: "Excellence in Family Law",
    org: "SACLP Awards",
    year: "2024",
    icon: Star,
  },
  {
    title: "Rising Star in Legal Practice",
    org: "Lawyer of the Year",
    year: "2023",
    icon: Crown,
  },
  {
    title: "BBBEE Level 1 Contributor",
    org: "SANAS Certified",
    year: "2024",
    icon: Shield,
  },
  {
    title: "Client Choice Award",
    org: "LexisNexis SA",
    year: "2023",
    icon: Medal,
  },
];

const mediaOutlets = [
  "Mail & Guardian",
  "Legal 500",
  "SACLP",
  "LexisNexis",
  "Sunday Times",
];

/* ─── Hex Badge Component ───────────────────────────────────────── */

interface HexBadgeProps {
  award: AwardData;
  index: number;
  isActive: boolean;
  onHoverStart: (idx: number) => void;
  onHoverEnd: () => void;
}

function HexBadge({ award, index, isActive, onHoverStart, onHoverEnd }: HexBadgeProps) {
  const Icon = award.icon;
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Different float timing per badge
  const floatDuration = 4 + index * 0.7;
  const floatDelay = index * -1.2;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      setTilt({ rotateX, rotateY });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    onHoverEnd();
  }, [onHoverEnd]);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{
        perspective: "600px",
        animation: `hexFloat ${floatDuration}s ease-in-out ${floatDelay}s infinite`,
      }}
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
    >
      {/* Hex container with 3D tilt */}
      <motion.div
        className="relative cursor-default"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: isActive ? 1.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => onHoverStart(index)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Hex clip-path shape */}
        <div
          className="relative w-48 h-52 sm:w-56 sm:h-60 md:w-64 md:h-68 lg:w-72 lg:h-80"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        >
          {/* Glass background */}
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: isActive
                ? "rgba(198,168,75,0.12)"
                : "rgba(198,168,75,0.04)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: isActive
                ? "0 0 60px rgba(198,168,75,0.25), inset 0 0 40px rgba(198,168,75,0.08)"
                : "0 0 30px rgba(198,168,75,0.08), inset 0 0 20px rgba(198,168,75,0.03)",
            }}
          />

          {/* Animated border shimmer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              background: `conic-gradient(from ${isActive ? "0deg" : "180deg"}, transparent 0%, #C6A84B ${isActive ? "20%" : "10%"}, transparent ${isActive ? "40%" : "20%"}, #E4D49A ${isActive ? "60%" : "50%"}, transparent ${isActive ? "80%" : "70%"}, #C6A84B 100%)`,
              mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), black calc(100% - 1.5px))",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 1.5px), black calc(100% - 1.5px))",
              opacity: isActive ? 0.8 : 0.3,
              transition: "opacity 0.5s ease",
              animation: `spin 6s linear infinite`,
            }}
          />
        </div>

        {/* Content (outside clip-path for proper rendering) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4">
          {/* Icon */}
          <div className="mb-3 sm:mb-4">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center rounded-full transition-all duration-500"
              style={{
                background: isActive
                  ? "rgba(198,168,75,0.15)"
                  : "rgba(198,168,75,0.08)",
                boxShadow: isActive
                  ? "0 0 30px rgba(198,168,75,0.3)"
                  : "0 0 10px rgba(198,168,75,0.1)",
              }}
            >
              <Icon
                className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-brand-gold"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Title */}
          <h3
            className="font-display text-sm sm:text-base lg:text-lg font-semibold text-white text-center leading-tight mb-1 sm:mb-2 transition-all duration-500"
            style={{
              opacity: isActive ? 1 : 0.85,
              textShadow: isActive
                ? "0 0 20px rgba(198,168,75,0.4)"
                : "none",
            }}
          >
            {award.title}
          </h3>

          {/* Organization */}
          <p
            className="font-body text-xs sm:text-sm text-white/50 text-center mb-1 sm:mb-2 transition-all duration-500"
            style={{
              opacity: isActive ? 1 : 0.7,
            }}
          >
            {award.org}
          </p>

          {/* Year badge */}
          <span
            className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold/80 bg-brand-gold/10 px-3 py-1 rounded-full transition-all duration-500"
            style={{
              opacity: isActive ? 1 : 0.7,
              boxShadow: isActive
                ? "0 0 15px rgba(198,168,75,0.2)"
                : "none",
            }}
          >
            {award.year}
          </span>

          {/* Extra detail on hover */}
          <AnimatePresence>
            {isActive && (
              <motion.p
                className="font-body text-[11px] text-brand-gold/50 text-center mt-2 max-w-[160px] lg:max-w-[200px]"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                Recognized for outstanding legal excellence and client service
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Featured Marquee ──────────────────────────────────────────── */

function FeaturedMarquee() {
  const items = [...mediaOutlets, ...mediaOutlets];

  return (
    <div className="marquee-container w-full py-5">
      <div className="marquee-content">
        {items.map((outlet, index) => (
          <span
            key={`${outlet}-${index}`}
            className="inline-flex items-center gap-6 sm:gap-8 font-body text-xs sm:text-sm tracking-[0.3em] uppercase select-none"
            style={{ color: "rgba(198, 168, 75, 0.4)" }}
          >
            {outlet}
            <span
              className="inline-block w-1.5 h-1.5 rotate-45 rounded-[1px] flex-shrink-0"
              style={{ background: "rgba(198, 168, 75, 0.3)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Constellation SVG Lines (between hex badges) ──────────────── */

function ConstellationLines({ visible, activeHex }: { visible: boolean; activeHex: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Lines connecting adjacent hexagons - visible on hover */}
      {/* Row 1 connections */}
      <motion.line
        x1="200" y1="200" x2="600" y2="200"
        stroke="rgba(198,168,75,0.12)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible && activeHex >= 0 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.line
        x1="600" y1="200" x2="1000" y2="200"
        stroke="rgba(198,168,75,0.12)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible && activeHex >= 0 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      {/* Row 2 connections (offset) */}
      <motion.line
        x1="400" y1="520" x2="800" y2="520"
        stroke="rgba(198,168,75,0.12)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible && activeHex >= 0 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      {/* Cross-row connections */}
      <motion.line
        x1="400" y1="280" x2="200" y2="440"
        stroke="rgba(198,168,75,0.06)"
        strokeWidth="0.5"
        strokeDasharray="4 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible && activeHex >= 0 ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.line
        x1="800" y1="280" x2="1000" y2="440"
        stroke="rgba(198,168,75,0.06)"
        strokeWidth="0.5"
        strokeDasharray="4 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible && activeHex >= 0 ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </svg>
  );
}

/* ─── Hex-shaped dot navigation ─────────────────────────────────── */

function HexDots({
  count,
  activeIndex,
  onSelect,
}: {
  count: number;
  activeIndex: number;
  onSelect: (idx: number) => void;
}) {
  return (
    <div
      className="flex items-center justify-center gap-2 sm:gap-3 mt-8 sm:mt-10"
      role="tablist"
      aria-label="Award navigation"
    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className="transition-all duration-300"
          style={{
            width: index === activeIndex ? "28px" : "14px",
            height: index === activeIndex ? "16px" : "14px",
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background:
              index === activeIndex
                ? "linear-gradient(135deg, #C6A84B, #E4D49A)"
                : "rgba(198,168,75,0.25)",
            boxShadow:
              index === activeIndex
                ? "0 0 12px rgba(198,168,75,0.4)"
                : "none",
          }}
          role="tab"
          aria-selected={index === activeIndex}
          aria-label={`Go to award ${index + 1}`}
        />
      ))}
    </div>
  );
}

/* ─── Circular arrow buttons ────────────────────────────────────── */

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-brand-gold/20 bg-brand-dark/80 backdrop-blur-sm flex items-center justify-center text-brand-gold/60 hover:text-brand-gold hover:border-brand-gold/50 hover:bg-brand-dark/95 hover:shadow-[0_0_24px_rgba(198,168,75,0.2)] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none disabled:cursor-default"
      style={{
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        width: "48px",
        height: "48px",
      }}
      aria-label={`Scroll awards ${direction}`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */

export function AwardsRecognition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeHex, setActiveHex] = useState(-1);
  const [showConstellation, setShowConstellation] = useState(false);

  // Mobile scroll carousel ref
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    const cardWidth = el.querySelector<HTMLElement>(":scope > *")?.offsetWidth ?? 200;
    const gap = 16;
    setActiveIndex(Math.min(Math.round(el.scrollLeft / (cardWidth + gap)), awards.length - 1));
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, [updateScrollState]);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(":scope > *")?.offsetWidth ?? 200;
    el.scrollBy({
      left: direction === "left" ? -(cardWidth + 16) : cardWidth + 16,
      behavior: "smooth",
    });
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(":scope > *")?.offsetWidth ?? 200;
    el.scrollTo({ left: (cardWidth + 16) * index, behavior: "smooth" });
  }, []);

  return (
    <section
      id="awards-recognition"
      className="relative w-full overflow-hidden bg-brand-dark noise-overlay py-20 sm:py-28"
      aria-label="Awards &amp; Recognition"
    >
      {/* ── Background Effects ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent z-10" />

      {/* Subtle radial glows */}
      <div
        className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(198,168,75,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute -bottom-48 -right-48 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(198,168,75,0.04) 0%, transparent 60%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section heading ── */}
        <ScrollReveal className="text-center mb-14 sm:mb-20">
          <div className="flex flex-col items-center">
            <span className="label-premium mb-4 block">Recognition</span>
            <h2 className="heading-section">
              Hall of Excellence
            </h2>
            <p className="subheading-premium-dark mt-4">
              Our pursuit of legal excellence has been recognised by South Africa's most esteemed institutions — a testament to the calibre of advocacy we deliver every single day.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Desktop: Honeycomb Grid Layout ── */}
        <div
          ref={sectionRef}
          className="relative hidden md:block"
          onMouseEnter={() => setShowConstellation(true)}
          onMouseLeave={() => {
            setShowConstellation(false);
            setActiveHex(-1);
          }}
        >
          {/* Constellation lines */}
          <ConstellationLines visible={showConstellation} activeHex={activeHex} />

          {/* Row 1: 3 hexagons */}
          <div className="relative z-[2] flex justify-center gap-4 lg:gap-8 mb-[-20px] lg:mb-[-28px]">
            {awards.slice(0, 3).map((award, index) => (
              <HexBadge
                key={award.title}
                award={award}
                index={index}
                isActive={activeHex === index}
                onHoverStart={setActiveHex}
                onHoverEnd={() => setActiveHex(-1)}
              />
            ))}
          </div>

          {/* Row 2: 2 hexagons offset (honeycomb) */}
          <div className="relative z-[2] flex justify-center gap-4 lg:gap-8 ml-[120px] lg:ml-[180px]">
            {awards.slice(3, 5).map((award, index) => (
              <HexBadge
                key={award.title}
                award={award}
                index={index + 3}
                isActive={activeHex === index + 3}
                onHoverStart={setActiveHex}
                onHoverEnd={() => setActiveHex(-1)}
              />
            ))}
          </div>

          {/* Centered last hex on row 3 */}
          <div className="relative z-[2] flex justify-center mt-[-20px] lg:mt-[-28px]">
            <HexBadge
              key={awards[5].title}
              award={awards[5]}
              index={5}
              isActive={activeHex === 5}
              onHoverStart={setActiveHex}
              onHoverEnd={() => setActiveHex(-1)}
            />
          </div>
        </div>

        {/* ── Mobile: Horizontal scroll carousel ── */}
        <div className="relative md:hidden">
          <div
            ref={carouselRef}
            className="scroll-carousel flex gap-4 overflow-x-auto py-6 px-1 snap-x snap-mandatory"
            style={{ scrollPaddingLeft: "16px" }}
          >
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                className="flex-shrink-0 snap-center flex items-center justify-center"
                style={{
                  animation: `hexFloat ${4 + index * 0.7}s ease-in-out ${index * -1.2}s infinite`,
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="relative">
                  <div
                    className="w-44 h-48"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "rgba(198,168,75,0.06)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-3 pointer-events-none">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-gold/10 mb-2">
                      {(() => {
                        const Icon = award.icon;
                        return <Icon className="w-6 h-6 text-brand-gold" strokeWidth={1.5} />;
                      })()}
                    </div>
                    <h3 className="font-display text-xs sm:text-sm font-semibold text-white text-center leading-tight mb-1">
                      {award.title}
                    </h3>
                    <p className="font-body text-[11px] text-white/40 text-center mb-1">
                      {award.org}
                    </p>
                    <span className="font-body text-[10px] font-semibold tracking-[0.15em] uppercase text-brand-gold/70 bg-brand-gold/10 px-2 py-0.5 rounded-full">
                      {award.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile arrow buttons */}
          <div className="flex items-center justify-center gap-4 mt-2">
            <ArrowButton
              direction="left"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
            />
            <ArrowButton
              direction="right"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
            />
          </div>

          {/* Hex dot navigation */}
          <HexDots
            count={awards.length}
            activeIndex={activeIndex}
            onSelect={scrollToIndex}
          />
        </div>

        {/* ── "As Featured In" subsection ── */}
        <ScrollReveal delay={0.25} className="mt-16 sm:mt-20">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-block w-1.5 h-1.5 rotate-45 rounded-[1px]"
                style={{ background: "rgba(198, 168, 75, 0.3)" }}
              />
              <span
                className="font-body text-xs sm:text-sm tracking-[0.3em] uppercase"
                style={{ color: "rgba(198, 168, 75, 0.45)" }}
              >
                As Featured In
              </span>
              <span
                className="inline-block w-1.5 h-1.5 rotate-45 rounded-[1px]"
                style={{ background: "rgba(198, 168, 75, 0.3)" }}
              />
            </div>

            <div className="relative w-full max-w-4xl">
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none" />
              <FeaturedMarquee />
            </div>
          </div>
        </ScrollReveal>

        {/* ── Footer ornament ── */}
        <div className="ornament-divider mt-12 sm:mt-16">
          <span className="ornament-diamond" />
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style jsx>{`
        @keyframes hexFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
