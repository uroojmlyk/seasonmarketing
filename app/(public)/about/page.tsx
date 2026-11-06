import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faEye,
  faHandshake,
  faChartLine,
  faCheckCircle,
  faQuoteLeft,
  faMagnifyingGlass,
  faComments,
  faKey,
  faArrowRight,
  faEnvelope,
  faTriangleExclamation,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "About Us | Season Marketing",
  description:
    "Learn about Pakistan's most trusted property marketplace. Our story, values, team, and commitment to honest listings.",
};

const STATS = [
  { value: "50,000+", label: "Verified Listings" },
  { value: "5", label: "Major Cities" },
  { value: "1.2M", label: "Monthly Visitors" },
  { value: "10,000+", label: "Active Agents" },
];

const VALUES = [
  {
    icon: faShieldHalved,
    title: "Trust Before Sales",
    desc: "We would rather lose a listing than allow a fake one. Every advertiser goes through identity checks before posting.",
  },
  {
    icon: faEye,
    title: "Radical Transparency",
    desc: "If a price looks suspiciously low or an agent is unverified, we label it clearly. No misleading badges.",
  },
  {
    icon: faHandshake,
    title: "Direct, No Middlemen",
    desc: "You talk directly to owners and verified agents. We don't hide contact details to force you through a call center.",
  },
  {
    icon: faChartLine,
    title: "Real Market Data",
    desc: "Our price trends and locality insights are based on actual listings, not fabricated numbers.",
  },
];

const TEAM = [
  { name: "Ahmed Raza", role: "Co-Founder & CEO", initials: "AR" },
  { name: "Sara Malik", role: "Co-Founder & CTO", initials: "SM" },
  { name: "Bilal Khan", role: "Head of Operations", initials: "BK" },
  { name: "Zainab Hussain", role: "Head of Marketing", initials: "ZH" },
];

const STEPS = [
  {
    icon: faMagnifyingGlass,
    title: "Search",
    desc: "Filter by city, area, price, and property type to find exactly what you need.",
  },
  {
    icon: faComments,
    title: "Connect",
    desc: "Send an enquiry directly to the owner or agent. No hidden charges.",
  },
  {
    icon: faKey,
    title: "Move In",
    desc: "Visit the property, verify documents, and close the deal with confidence.",
  },
];

const TIMELINE = [
  {
    year: "2024",
    title: "The Idea",
    desc: "Started as a small blog sharing property tips in Lahore.",
  },
  {
    year: "2025",
    title: "Launch in 5 Cities",
    desc: "Expanded to Karachi, Islamabad, Peshawar, and Quetta.",
  },
  {
    year: "2026",
    title: "10,000+ Agents",
    desc: "Now Pakistan's fastest-growing property portal.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* =========================================
          1. HEADER — flat, quiet
          ========================================= */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Our Story
          </div>
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Building Pakistan's most{" "}
            <span className="text-brand-500">trusted</span> property portal.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            No fake prices. No hidden contact details. No misleading badges.
            Just a clean, honest place to find your next home.
          </p>
        </div>
      </header>

      {/* =========================================
          2. STATS — structured table-like strip
          ========================================= */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-neutral-200 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-4 py-8 text-center sm:px-6 ${
                  i >= 2 ? "border-t border-neutral-200 sm:border-t-0" : ""
                }`}
              >
                <p className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          3. STORY — 2 column, image + text
          ========================================= */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Images */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100">
                <Image
                  src="/images/property-1.jpg"
                  alt="Modern home in Pakistan"
                  fill
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100">
                <Image
                  src="/images/property-5.jpg"
                  alt="Interior of a Pakistani home"
                  fill
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-bold text-neutral-400">01</span>
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 sm:text-sm">
                The Problem We Saw
              </h2>
            </div>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Buying a home shouldn't feel like a gamble.
            </h3>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
              <p>
                In 2024, our founders were looking for an apartment in Lahore.
                What they found was a mess: the same listing posted 15 times
                with different prices, agents who refused to share the exact
                location, and images that didn't match the property at all.
              </p>
              <p>
                We realized that the problem wasn't a lack of listings — it was
                a lack of{" "}
                <strong className="font-semibold text-ink">
                  trust and transparency
                </strong>
                . So we decided to build something different.
              </p>
            </div>

            {/* Commitments list */}
            <div className="mt-7 space-y-2.5 border-t border-neutral-100 pt-6">
              {[
                "Every agent's identity is verified via CNIC.",
                "Listings that break rules are removed within 24 hours.",
                "No pay-to-view listings. Contact details are always public.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-neutral-700"
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          4. TRUST DISCLAIMER — honest, spec §12.3
          ========================================= */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink text-brand-400">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="h-4 w-4"
              />
            </span>
            <div>
              <h2 className="text-base font-bold text-ink sm:text-lg">
                What we check — and what we don't
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
                We verify agent identity, review listings for obvious
                violations, and label suspicious content clearly. We do{" "}
                <strong className="font-semibold text-ink">
                  not verify property titles or legal ownership
                </strong>
                . Always inspect the property in person and check the documents
                with a qualified lawyer before any payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          5. HOW IT WORKS — 3 numbered steps
          ========================================= */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-bold text-neutral-400">02</span>
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 sm:text-sm">
            How it works
          </h2>
        </div>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
          Three simple steps.
        </h3>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="rounded-xl border border-neutral-200 bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <FontAwesomeIcon icon={step.icon} className="h-4 w-4" />
                </span>
                <span className="font-mono text-xs font-bold text-neutral-300">
                  0{i + 1}
                </span>
              </div>
              <h4 className="mt-5 text-base font-bold text-ink sm:text-lg">
                {step.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          6. TIMELINE — structured
          ========================================= */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-5">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold text-neutral-400">03</span>
                <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 sm:text-sm">
                  Our Journey
                </h2>
              </div>
              <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                From a small blog to a national platform.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
                We started with one goal: to make property search honest. Here's
                how far we've come in just two years.
              </p>
            </div>

            <div className="lg:col-span-7">
              <ol className="space-y-6 border-l-2 border-neutral-200 pl-6 sm:pl-8">
                {TIMELINE.map((item, i) => (
                  <li key={item.year} className="relative">
                    <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-brand-500 sm:-left-[39px]" />
                    <p className="font-mono text-xs font-bold text-brand-600">
                      {item.year}
                    </p>
                    <h4 className="mt-1 text-base font-bold text-ink">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          7. QUOTE — black band, orange accent
          ========================================= */}
      <section className="bg-ink">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
          <FontAwesomeIcon
            icon={faQuoteLeft}
            className="mx-auto h-6 w-6 text-brand-500 sm:h-8 sm:w-8"
          />
          <blockquote className="mt-5 text-xl font-bold leading-snug text-white sm:text-2xl lg:text-3xl">
            "We don't want to be the biggest property portal in Pakistan. We
            want to be the one people actually{" "}
            <span className="text-brand-500">trust</span>."
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
              AR
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white">Ahmed Raza</p>
              <p className="text-xs text-neutral-400">Co-Founder & CEO</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          8. VALUES — 4 column grid
          ========================================= */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-bold text-neutral-400">04</span>
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 sm:text-sm">
            What We Stand For
          </h2>
        </div>
        <h3 className="mt-3 max-w-2xl text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
          Built on principles, not profits.
        </h3>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-neutral-200 bg-white p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <FontAwesomeIcon icon={v.icon} className="h-4 w-4" />
              </span>
              <h4 className="mt-5 text-base font-bold text-ink">{v.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          9. TEAM — flat, structured
          ========================================= */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-bold text-neutral-400">05</span>
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 sm:text-sm">
              Leadership
            </h2>
          </div>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            The people behind the platform.
          </h3>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-neutral-200 bg-white text-xl font-extrabold text-ink sm:h-28 sm:w-28 sm:text-2xl">
                  {member.initials}
                </div>
                <h4 className="mt-4 text-sm font-bold text-ink sm:text-base">
                  {member.name}
                </h4>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-500 sm:text-xs">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          10. BOTTOM CTA — black band + orange button
          ========================================= */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-400">
                Get started
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Ready to find your next home?
              </h2>
              <p className="mt-2 max-w-xl text-sm text-neutral-400 sm:text-base">
                Join thousands of Pakistanis who trust Season Marketing to find,
                buy, and rent property.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/properties"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-6 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                Browse Properties
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
                Contact Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}