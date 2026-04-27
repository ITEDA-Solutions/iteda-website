"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sprout,
  Lightbulb,
  Users,
  Globe,
  Award,
  Zap,
  X,
  Camera,
  Play,
  Link2,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const timelineEvents = [
  {
    year: "2020",
    title: "The Idea Sparks",
    description:
      "Born from a simple observation — tonnes of harvested crops were rotting due to inadequate drying infrastructure. Our founders set out to change that with IoT-powered precision.",
    icon: Lightbulb,
    accent: "#028037",
  },
  {
    year: "2021",
    title: "First Prototype",
    description:
      "After months of research and fieldwork with smallholder farmers across Kenya, we built our first solar-powered crop dryer prototype and tested it with maize farmers in Nakuru.",
    icon: Sprout,
    accent: "#2E9F5F",
  },
  {
    year: "2022",
    title: "Community Pilots",
    description:
      "We partnered with three farming cooperatives to run pilots at scale. Post-harvest losses dropped by up to 60% in participating communities.",
    icon: Users,
    accent: "#aa9241",
  },
  {
    year: "2023",
    title: "bridGe Launches",
    description:
      "Recognising that payment friction stifled agri-business growth, we launched bridGe — bringing M-Pesa and card payments directly into Google Forms.",
    icon: Zap,
    accent: "#FCD85D",
  },
  {
    year: "2024",
    title: "Expanding Across East Africa",
    description:
      "With operations in Kenya, Uganda, and Tanzania, ITEDA Solutions now serves thousands of farmers, processors, and agri-businesses.",
    icon: Globe,
    accent: "#028037",
  },
  {
    year: "2025",
    title: "Recognised for Impact",
    description:
      "Named among East Africa's top agri-tech innovators, we continue to push the frontier — building smarter, greener, connected food systems.",
    icon: Award,
    accent: "#01443e",
  },
];

const values = [
  {
    title: "Farmer First",
    description:
      "Every feature, every product decision starts with one question: how does this make a farmer's life better?",
    emoji: "🌾",
    bg: "from-primary/10 to-primary/5",
    border: "border-primary/20",
  },
  {
    title: "Radical Simplicity",
    description:
      "Technology should be invisible. If a solution is hard to use, it isn't done yet.",
    emoji: "✨",
    bg: "from-accent/20 to-accent/5",
    border: "border-accent/30",
  },
  {
    title: "Sustainable Impact",
    description:
      "Solar-powered, low-waste, and designed for the long run — the planet is our biggest stakeholder.",
    emoji: "♻️",
    bg: "from-primary-light/10 to-primary/5",
    border: "border-primary-light/20",
  },
  {
    title: "Transparent Partnership",
    description:
      "We build with communities, not for them. Trust is earned through honesty, not promises.",
    emoji: "🤝",
    bg: "from-accent-gold/10 to-accent/5",
    border: "border-accent-gold/20",
  },
];

const publications = [
  {
    type: "Blog",
    title: "How IoT Is Cutting Post-Harvest Losses in Sub-Saharan Africa",
    excerpt:
      "A deep dive into the data behind crop spoilage and how precision drying changes the economics of smallholder farming.",
    date: "March 2025",
    readTime: "6 min read",
    icon: BookOpen,
    tag: "Research",
    tagBg: "bg-primary/10",
    tagText: "text-primary",
    accentBorder: "border-l-primary",
    href: "#",
  },
  {
    type: "LinkedIn",
    title: "Lessons from 3 Years of Building AgriTech in Kenya",
    excerpt:
      "What we got wrong, what surprised us, and why farmers are the best product managers we've ever worked with.",
    date: "February 2025",
    readTime: "4 min read",
    icon: Link2,
    tag: "Insights",
    tagBg: "bg-blue-50",
    tagText: "text-blue-700",
    accentBorder: "border-l-blue-400",
    href: "#",
  },
  {
    type: "Blog",
    title: "bridGe: Why We Built Payments Into a Google Form",
    excerpt:
      "The story behind our simplest product — and how zero lines of code can unlock revenue for agri-businesses.",
    date: "December 2024",
    readTime: "5 min read",
    icon: BookOpen,
    tag: "Product",
    tagBg: "bg-accent/20",
    tagText: "text-accent-gold",
    accentBorder: "border-l-accent",
    href: "#",
  },
  {
    type: "LinkedIn",
    title: "What 60% Less Post-Harvest Loss Actually Looks Like",
    excerpt:
      "Real numbers, real farmers, real change. Our Nakuru pilot results and what they mean for food security.",
    date: "October 2024",
    readTime: "3 min read",
    icon: Link2,
    tag: "Impact",
    tagBg: "bg-primary/10",
    tagText: "text-primary",
    accentBorder: "border-l-primary",
    href: "#",
  },
  {
    type: "Blog",
    title: "Solar + Sensors: The Architecture of Our Crop Dryer",
    excerpt:
      "A technical walkthrough of the hardware and firmware stack powering our Smart Solar Crop Dryer.",
    date: "August 2024",
    readTime: "8 min read",
    icon: BookOpen,
    tag: "Technical",
    tagBg: "bg-primary-dark/10",
    tagText: "text-primary-dark",
    accentBorder: "border-l-primary-dark",
    href: "#",
  },
  {
    type: "LinkedIn",
    title: "East Africa's AgriTech Moment Is Now",
    excerpt:
      "Why mobile money, affordable sensors, and climate urgency make this the most important decade for African food systems.",
    date: "June 2024",
    readTime: "5 min read",
    icon: Link2,
    tag: "Opinion",
    tagBg: "bg-blue-50",
    tagText: "text-blue-700",
    accentBorder: "border-l-blue-400",
    href: "#",
  },
];

// Gallery items — first item uses the real photo, rest use styled placeholders
const galleryItems = [
  {
    realImage: "/hero-solar-dryer.jpg",
    label: "Smart Solar Crop Dryer",
    sublabel: "Nakuru Pilot — 2021",
    emoji: null,
    gradient: "from-primary-dark/80 to-primary/60",
    size: "large", // col-span-2 row-span-2
  },
  {
    realImage: null,
    label: "Community Training",
    sublabel: "Kisumu Farmers' Cooperative",
    emoji: "👥",
    gradient: "from-primary/30 to-primary-light/20",
    size: "normal",
  },
  {
    realImage: null,
    label: "IoT Sensor Lab",
    sublabel: "Calibration & QA",
    emoji: "📡",
    gradient: "from-accent-gold/30 to-accent/20",
    size: "normal",
  },
  {
    realImage: null,
    label: "Farmer Onboarding",
    sublabel: "Meru County, Kenya",
    emoji: "🧑‍🌾",
    gradient: "from-primary-light/30 to-primary-dark/20",
    size: "tall", // row-span-2
  },
  {
    realImage: null,
    label: "Market-Ready Harvest",
    sublabel: "Post-drying quality check",
    emoji: "🌽",
    gradient: "from-accent/30 to-accent-gold/20",
    size: "normal",
  },
  {
    realImage: null,
    label: "AgriTech Awards 2025",
    sublabel: "East Africa Innovation Prize",
    emoji: "🏆",
    gradient: "from-primary-dark/30 to-primary/20",
    size: "normal",
  },
  {
    realImage: null,
    label: "Solar Panel Array",
    sublabel: "Off-grid power system",
    emoji: "☀️",
    gradient: "from-accent-gold/20 to-primary/20",
    size: "normal",
  },
  {
    realImage: null,
    label: "bridGe Demo Day",
    sublabel: "Nairobi, February 2024",
    emoji: "💳",
    gradient: "from-primary/20 to-accent/20",
    size: "normal",
  },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = galleryItems[index];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image area */}
        <div className="relative aspect-video bg-black">
          {item.realImage ? (
            <Image
              src={item.realImage}
              alt={item.label}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          ) : (
            <div
              className={`h-full w-full bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center gap-4`}
            >
              <span className="text-9xl">{item.emoji}</span>
            </div>
          )}
          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-white font-bold text-xl">{item.label}</p>
            <p className="text-white/70 text-sm mt-0.5">{item.sublabel}</p>
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2.5 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {galleryItems.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Gallery Card ─────────────────────────────────────────────────────────────

function GalleryCard({
  item,
  onClick,
}: {
  item: (typeof galleryItems)[0];
  onClick: () => void;
}) {
  const sizeClass =
    item.size === "large"
      ? "col-span-2 row-span-2"
      : item.size === "tall"
        ? "row-span-2"
        : "";

  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer focus-visible:ring-4 focus-visible:ring-primary focus-visible:outline-none ${sizeClass}`}
      aria-label={`View photo: ${item.label}`}
    >
      {item.realImage ? (
        <Image
          src={item.realImage}
          alt={item.label}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      ) : (
        <div
          className={`h-full w-full bg-gradient-to-br ${item.gradient} flex items-center justify-center transition-transform duration-700 group-hover:scale-105`}
        >
          <span
            className={`transition-all duration-300 group-hover:scale-110 ${
              item.size === "large" ? "text-8xl" : "text-5xl"
            } opacity-70 group-hover:opacity-90`}
          >
            {item.emoji}
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white font-semibold text-sm leading-tight">
          {item.label}
        </p>
        <p className="text-white/70 text-xs mt-0.5">{item.sublabel}</p>
      </div>

      {/* Camera icon badge */}
      <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Camera className="h-3 w-3 text-white" />
      </div>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OurStoryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + galleryItems.length) % galleryItems.length : null,
    );
  const nextImage = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % galleryItems.length : null,
    );

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light py-24 md:py-40">
        {/* Decorative rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[400, 600, 800, 1000].map((size) => (
            <div
              key={size}
              className="absolute rounded-full border border-white/5"
              style={{
                width: size,
                height: size,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
        {/* Blurred blobs */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary-dark/40 blur-3xl" />

        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-2 text-sm font-medium text-white/90 backdrop-blur-sm mb-8">
            <Sprout className="h-4 w-4 text-accent" />
            Est. 2020 · Nairobi, Kenya
          </div>

          <h1 className="text-5xl font-bold text-white md:text-7xl leading-[1.1] tracking-tight">
            Rooted in Fields,
            <br />
            <span className="text-accent">Grown by Purpose</span>
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-lg text-white/75 md:text-xl leading-relaxed">
            ITEDA Solutions began with a single conviction — that the right
            technology, designed with empathy, can transform the lives of
            millions of farmers across Africa.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#story"
              className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent/90 px-8 py-3.5 font-semibold text-black shadow-lg shadow-accent/20 transition-all hover:scale-105 hover:no-underline"
            >
              Read Our Story
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 hover:border-white/60 px-8 py-3.5 font-semibold text-white transition-all hover:bg-white/10 hover:no-underline"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── NARRATIVE ────────────────────────────────────────────────────── */}
      <section id="story" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold md:text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block">
                Where It All Began
              </h2>
              <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-text-light">
              <p>
                Agriculture feeds the world, yet the farmers who grow our food
                often lose a staggering share of their harvest before it ever
                reaches a market. In Kenya alone, post-harvest losses cost
                smallholder farmers over{" "}
                <strong className="text-text font-semibold">
                  $300 million every year
                </strong>{" "}
                — not because of drought or disease, but because of something
                entirely preventable: inadequate drying.
              </p>
              <p>
                Our founders witnessed this first-hand, watching communities
                work from dawn to dusk only to see their maize spoil in storage.
                They asked a simple question: what if we could wrap precision
                drying intelligence around the power of the sun?
              </p>
              <p>
                That question became ITEDA Solutions — a company built on the
                belief that{" "}
                <strong className="text-text font-semibold">
                  technology&apos;s highest calling is human dignity
                </strong>
                . Every sensor we ship, every line of code we write, every
                partnership we forge is in service of that belief.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 md:gap-6">
              {[
                { value: "60%", label: "Reduction in post-harvest loss" },
                { value: "10K+", label: "Farmers impacted" },
                { value: "3", label: "Countries & growing" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent/10 border border-primary/10 p-5 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs md:text-sm text-text-light leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold md:text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block">
                Our Journey
              </h2>
              <div className="mt-2 mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
              <p className="mt-4 text-text-light">
                Five years of iteration, resilience, and growing impact.
              </p>
            </div>

            <div className="relative pl-10 md:pl-0">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary-dark md:-translate-x-px" />

              <div className="space-y-8">
                {timelineEvents.map((event, i) => {
                  const Icon = event.icon;
                  const isRight = i % 2 === 0;
                  return (
                    <div
                      key={event.year}
                      className={`relative flex md:items-center ${isRight ? "md:flex-row" : "md:flex-row-reverse"}`}
                    >
                      {/* Icon node */}
                      <div className="absolute -left-10 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg ring-4 ring-white"
                          style={{ backgroundColor: event.accent }}
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                      </div>

                      {/* Card */}
                      <div
                        className={`md:w-[calc(50%-2rem)] ${
                          isRight ? "md:pr-8 md:text-right" : "md:pl-8"
                        }`}
                      >
                        <div className="group rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                          <span
                            className="inline-block rounded-full px-3 py-1 text-xs font-bold text-white mb-3"
                            style={{ backgroundColor: event.accent }}
                          >
                            {event.year}
                          </span>
                          <h3 className="text-base font-bold text-text mb-2">
                            {event.title}
                          </h3>
                          <p className="text-sm text-text-light leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold md:text-4xl bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent inline-block">
                What We Stand For
              </h2>
              <div className="mt-2 mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-accent to-primary" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className={`group rounded-2xl bg-gradient-to-br ${v.bg} border ${v.border} p-6 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300`}
                >
                  <div className="mb-4 text-4xl">{v.emoji}</div>
                  <h3 className="mb-2 font-bold text-text group-hover:text-primary transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-sm text-text-light leading-relaxed">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="absolute left-0 top-1/3 h-80 w-80 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold md:text-4xl bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent inline-block">
                  Life at ITEDA
                </h2>
                <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-accent to-primary" />
                <p className="mt-3 text-text-light">
                  In the fields, in the lab, and in the communities we serve.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Camera className="h-4 w-4" />
                <span>{galleryItems.length} photos</span>
                <span className="text-text-muted/40">·</span>
                <span>Click to expand</span>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[200px]">
              {galleryItems.map((item, i) => (
                <GalleryCard
                  key={i}
                  item={item}
                  onClick={() => openLightbox(i)}
                />
              ))}
            </div>

            {/* View all CTA */}
            <div className="mt-8 text-center">
              <button className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-6 py-3 text-sm font-medium text-primary hover:bg-primary/5 hover:border-primary/40 transition-all shadow-sm">
                <Play className="h-4 w-4" />
                View Full Gallery
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold md:text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block">
                  Publications & Insights
                </h2>
                <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
                <p className="mt-3 text-text-light">
                  Thinking out loud on agriculture, tech, and impact.
                </p>
              </div>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors hover:no-underline flex-shrink-0"
              >
                <Link2 className="h-4 w-4" />
                Follow on LinkedIn
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {publications.map((pub) => {
                const Icon = pub.icon;
                return (
                  <a
                    key={pub.title}
                    href={pub.href}
                    className={`group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden hover:no-underline border-l-4 ${pub.accentBorder}`}
                  >
                    <div className="flex items-center justify-between px-5 pt-5 pb-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${pub.tagBg} ${pub.tagText}`}
                      >
                        {pub.tag}
                      </span>
                      <div className="flex items-center gap-1.5 text-text-muted">
                        <Icon className="h-3.5 w-3.5" />
                        <span className="text-xs">{pub.type}</span>
                      </div>
                    </div>

                    <div className="flex-1 px-5 pb-3">
                      <h3 className="font-bold text-text text-sm leading-snug group-hover:text-primary transition-colors mb-2">
                        {pub.title}
                      </h3>
                      <p className="text-xs text-text-light leading-relaxed line-clamp-3">
                        {pub.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-50">
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <span>{pub.date}</span>
                        <span>·</span>
                        <span>{pub.readTime}</span>
                      </div>
                      <ExternalLink className="h-3 w-3 text-text-muted group-hover:text-primary transition-colors" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark to-primary py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          {[120, 240, 360, 480, 600].map((size) => (
            <div
              key={size}
              className="absolute rounded-full border border-white/5"
              style={{
                width: size,
                height: size,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="container relative mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white md:text-5xl mb-4 leading-tight">
            Be Part of the Story
          </h2>
          <p className="mx-auto max-w-xl text-white/75 text-lg mb-10 leading-relaxed">
            Whether you&apos;re a farmer, investor, partner, or curious mind —
            there is a place for you in what we&apos;re building.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent/90 px-8 py-3.5 font-semibold text-black shadow-lg shadow-black/20 transition-all hover:scale-105 hover:no-underline"
            >
              Contact Us
            </Link>
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 hover:border-white/60 px-8 py-3.5 font-semibold text-white transition-all hover:bg-white/10 hover:no-underline"
            >
              Explore Our Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}
