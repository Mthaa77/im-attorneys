"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Trophy, TrendingUp, Scale, Award } from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChildVariants,
  CountUp,
  GoldLine,
} from "@/components/im/ScrollReveal";

/* ─── Data ──────────────────────────────────────────────────────── */

const metrics = [
  {
    value: 500,
    suffix: "+",
    prefix: "",
    label: "Cases Handled",
    icon: Trophy,
    duration: 2.2,
    percent: 92,
  },
  {
    value: 98,
    suffix: "%",
    prefix: "",
    label: "Success Rate",
    icon: TrendingUp,
    duration: 2,
    percent: 98,
  },
  {
    value: 50,
    suffix: "M+",
    prefix: "R",
    label: "Recovered",
    icon: Award,
    duration: 2.4,
    percent: 85,
  },
  {
    value: 15,
    suffix: "+",
    prefix: "",
    label: "Monthly Appearances",
    icon: Scale,
    duration: 2,
    percent: 78,
  },
];

const practiceAreas = [
  { name: "Wills & Estates", rate: 99 },
  { name: "Commercial Law", rate: 98 },
  { name: "Family Law", rate: 97 },
  { name: "Criminal Law", rate: 96 },
  { name: "Claims Against State", rate: 95 },
  { name: "General Litigation", rate: 94 },
];

/* ─── Circular Gauge ────────────────────────────────────────────── */

interface GaugeProps {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: number;
  percent: number;
  index: number;
}

function CircularGauge({
  value,
  suffix,
  prefix,
  label,
  icon: Icon,
  duration,
  percent,
  index,
}: GaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [isHovered, setIsHovered] = useState(false);

  // SVG circle math
  const size = 140;
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  const center = size / 2;

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center cursor-pointer panel-3d-float shadow-gold"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.7 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`${label}: ${prefix}${value}${suffix}`}
    >
      {/* Glow behind gauge on hover */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size + 40,
          height: size + 40,
          top: -5,
          left: "50%",
          marginLeft: -(size + 40) / 2,
          background:
            "radial-gradient(circle, rgba(198,168,75,0.25) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Gauge SVG */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative z-10"
        aria-hidden="true"
      >
        {/* Track circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(198,168,75,0.1)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Animated progress circle */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#gauge-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            isInView
              ? { strokeDashoffset }
              : { strokeDashoffset: circumference }
          }
          transition={{
            duration: 2,
            delay: index * 0.15 + 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            transformOrigin: "50% 50%",
            transform: "rotate(-90deg)",
          }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient
            id="gauge-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#C6A84B" />
            <stop offset="50%" stopColor="#E4D49A" />
            <stop offset="100%" stopColor="#C6A84B" />
          </linearGradient>
        </defs>
      </svg>

      {/* Content inside gauge */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-20"
        style={{ pointerEvents: "none" }}
      >
        {/* Small icon */}
        <Icon
          className="h-4 w-4 mb-1"
          style={{ color: "rgba(198,168,75,0.5)" }}
        />

        {/* Animated number */}
        <span className="font-display text-2xl sm:text-3xl font-bold" style={{ color: "#C6A84B" }}>
          <CountUp
            end={value}
            suffix={suffix}
            prefix={prefix}
            duration={duration}
            className="font-display font-bold text-2xl sm:text-3xl"
            // Override color via style on wrapper
          />
        </span>
      </div>

      {/* Label below */}
      <span
        className="mt-3 text-center text-xs sm:text-sm font-medium uppercase tracking-wider"
        style={{ color: "rgba(239,232,220,0.55)" }}
      >
        {label}
      </span>

      {/* Tooltip on hover */}
      <motion.div
        className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap z-30"
        style={{
          background: "rgba(198,168,75,0.9)",
          color: "#0D1B2A",
        }}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
        transition={{ duration: 0.2 }}
      >
        {prefix}{value}{suffix}
      </motion.div>
    </motion.div>
  );
}

/* ─── Practice Area Radial Ring ─────────────────────────────────── */

interface RadialRingProps {
  name: string;
  rate: number;
  index: number;
}

function PracticeAreaRing({ name, rate, index }: RadialRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  // SVG ring math
  const ringSize = 48;
  const ringStroke = 4;
  const ringRadius = (ringSize - ringStroke) / 2;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (rate / 100) * ringCircumference;
  const ringCenter = ringSize / 2;

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-3 sm:gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: "easeOut",
      }}
    >
      {/* Radial progress ring */}
      <div className="relative flex-shrink-0">
        <svg
          width={ringSize}
          height={ringSize}
          viewBox={`0 0 ${ringSize} ${ringSize}`}
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx={ringCenter}
            cy={ringCenter}
            r={ringRadius}
            fill="none"
            stroke="rgba(198,168,75,0.12)"
            strokeWidth={ringStroke}
            strokeLinecap="round"
          />
          {/* Progress */}
          <motion.circle
            cx={ringCenter}
            cy={ringCenter}
            r={ringRadius}
            fill="none"
            stroke="#C6A84B"
            strokeWidth={ringStroke}
            strokeLinecap="round"
            strokeDasharray={ringCircumference}
            initial={{ strokeDashoffset: ringCircumference }}
            animate={
              isInView
                ? { strokeDashoffset: ringOffset }
                : { strokeDashoffset: ringCircumference }
            }
            transition={{
              duration: 1.6,
              delay: index * 0.12 + 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              transformOrigin: "50% 50%",
              transform: "rotate(-90deg)",
            }}
          />
        </svg>
        {/* Percentage text inside ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xs font-bold" style={{ color: "#C6A84B" }}>
            <CountUp end={rate} suffix="%" duration={1.8} className="font-display text-xs font-bold" />
          </span>
        </div>
      </div>

      {/* Area name */}
      <span
        className="font-body text-sm sm:text-base font-medium"
        style={{ color: "rgba(239,232,220,0.75)" }}
      >
        {name}
      </span>
    </motion.div>
  );
}

/* ─── Constellation SVG Lines ───────────────────────────────────── */

function ConstellationLines() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <svg
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Connecting lines between gauges — subtle gold paths */}
      {/* Top-left to Top-right */}
      <motion.line
        x1="25%"
        y1="28%"
        x2="75%"
        y2="28%"
        stroke="rgba(198,168,75,0.08)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, delay: 0.5 }}
        strokeDasharray="4 6"
      />
      {/* Bottom-left to Bottom-right */}
      <motion.line
        x1="25%"
        y1="50%"
        x2="75%"
        y2="50%"
        stroke="rgba(198,168,75,0.08)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, delay: 0.7 }}
        strokeDasharray="4 6"
      />
      {/* Top-left to Bottom-left */}
      <motion.line
        x1="25%"
        y1="28%"
        x2="25%"
        y2="50%"
        stroke="rgba(198,168,75,0.06)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, delay: 0.9 }}
        strokeDasharray="4 6"
      />
      {/* Top-right to Bottom-right */}
      <motion.line
        x1="75%"
        y1="28%"
        x2="75%"
        y2="50%"
        stroke="rgba(198,168,75,0.06)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, delay: 1.1 }}
        strokeDasharray="4 6"
      />
      {/* Diagonal: Top-left to Bottom-right */}
      <motion.line
        x1="25%"
        y1="28%"
        x2="75%"
        y2="50%"
        stroke="rgba(198,168,75,0.04)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 2, delay: 1.3 }}
        strokeDasharray="4 8"
      />
      {/* Diagonal: Top-right to Bottom-left */}
      <motion.line
        x1="75%"
        y1="28%"
        x2="25%"
        y2="50%"
        stroke="rgba(198,168,75,0.04)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 2, delay: 1.5 }}
        strokeDasharray="4 8"
      />
    </svg>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */

export function TrackRecord() {
  return (
    <section
      id="track-record"
      className="relative w-full overflow-hidden py-24 sm:py-32"
      style={{ backgroundColor: "#0D1B2A" }}
      aria-label="Our Track Record"
    >
      {/* ── Decorative background ── */}
      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0 pointer-events-none z-[1]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.02]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(198,168,75,0.5) 80px, rgba(198,168,75,0.5) 81px), repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(198,168,75,0.5) 80px, rgba(198,168,75,0.5) 81px)",
        }}
      />

      {/* Top gold accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(198,168,75,0.4), transparent)",
        }}
      />

      {/* Radial glows */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          top: "-15%",
          right: "-5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(198,168,75,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          bottom: "-15%",
          left: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(198,168,75,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Corner accents */}
      <div
        className="absolute top-8 left-6 sm:left-12 h-16 w-16 pointer-events-none z-[1]"
        style={{
          borderTop: "2px solid rgba(198,168,75,0.2)",
          borderLeft: "2px solid rgba(198,168,75,0.2)",
          borderTopLeftRadius: "2px",
        }}
      />
      <div
        className="absolute top-8 right-6 sm:right-12 h-16 w-16 pointer-events-none z-[1]"
        style={{
          borderTop: "2px solid rgba(198,168,75,0.2)",
          borderRight: "2px solid rgba(198,168,75,0.2)",
          borderTopRightRadius: "2px",
        }}
      />
      <div
        className="absolute bottom-8 left-6 sm:left-12 h-16 w-16 pointer-events-none z-[1]"
        style={{
          borderBottom: "2px solid rgba(198,168,75,0.2)",
          borderLeft: "2px solid rgba(198,168,75,0.2)",
          borderBottomLeftRadius: "2px",
        }}
      />
      <div
        className="absolute bottom-8 right-6 sm:right-12 h-16 w-16 pointer-events-none z-[1]"
        style={{
          borderBottom: "2px solid rgba(198,168,75,0.2)",
          borderRight: "2px solid rgba(198,168,75,0.2)",
          borderBottomRightRadius: "2px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <ScrollReveal className="text-center mb-16 sm:mb-24">
          <div className="flex flex-col items-center">
            <span className="label-premium mb-4 block">Our Impact</span>
            <h2 className="heading-section-light">
              Results That Speak for Themselves
            </h2>
            <p className="subheading-premium-dark mt-4">
              Behind every statistic is a real person whose life, livelihood, or legacy we fought to protect. These numbers reflect our unwavering commitment to justice.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Part 1: Circular Gauge Meters ── */}
        <div className="relative">
          {/* Constellation lines behind gauges */}
          <ConstellationLines />

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-6 mb-20 sm:mb-28">
            {metrics.map((m, i) => (
              <div key={m.label} className="flex justify-center">
                <CircularGauge {...m} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Gold separator ── */}
        <div className="mb-12 sm:mb-16">
          <div
            className="h-px mx-auto max-w-sm"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(198,168,75,0.3), transparent)",
            }}
          />
        </div>

        {/* ── Part 2: Practice Area Success Rings ── */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <ScrollReveal className="lg:col-span-3">
            <h3
            className="heading-gold-glossy text-center mb-2"
          >
            Proven Success Across Every Practice Area
          </h3>
            <p
              className="font-body text-sm sm:text-base text-center lg:text-left"
              style={{ color: "rgba(239,232,220,0.4)" }}
            >
              Strong outcomes you can count on — regardless of the legal challenge
            </p>
          </ScrollReveal>

          <div className="max-w-2xl space-y-4 sm:space-y-5">
          {practiceAreas.map((area, index) => (
            <PracticeAreaRing
              key={area.name}
              name={area.name}
              rate={area.rate}
              index={index}
            />
          ))}
          </div>

          {/* Branded binders image */}
          <ScrollReveal direction="right" delay={0.3} className="hidden lg:block lg:col-span-2">
            <div className="relative rounded-sm overflow-hidden shadow-2xl shadow-brand-gold/5 border border-brand-gold/15">
              <div className="aspect-[3/4] relative">
                <Image
                  src="/images/branded-binders.jpg"
                  alt="IM Attorneys branded document binders — organised case files"
                  fill
                  className="object-cover"
                  sizes="20vw"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-sm font-bold" style={{ color: "#C6A84B" }}>
                  Meticulous Record-Keeping
                </p>
                <p className="font-body text-xs mt-1" style={{ color: "rgba(239,232,220,0.5)" }}>
                  Every case file, organised and secured
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Bottom gold accent line ── */}
        <div className="mt-16 sm:mt-24">
          <div
            className="h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(198,168,75,0.3), transparent)",
            }}
          />
          <div className="flex justify-center mt-2">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 0L12 6L6 12L0 6L6 0Z"
                fill="rgba(198,168,75,0.3)"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
