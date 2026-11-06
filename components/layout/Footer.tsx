import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoMark from "@/components/ui/LogoMark";
import { 
  faClock, faEnvelope, faPhone,
  faGlobe, faShareNodes, faUserGroup, faCircleInfo
} from "@fortawesome/free-solid-svg-icons";
import { SITE } from "@/lib/constants/site";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Buy Property", href: "/properties?intent=buy" },
      { label: "Rent Property", href: "/properties?intent=rent" },
      { label: "Sell or Rent Out", href: "/sell" },
      { label: "All Properties", href: "/properties" },
    ],
  },
  {
    title: "Popular Cities",
    links: [
      { label: "Lahore", href: "/areas/lahore" },
      { label: "Karachi", href: "/areas/karachi" },
      { label: "Islamabad", href: "/areas/islamabad" },
      { label: "Peshawar", href: "/areas/peshawar" },
      { label: "Quetta", href: "/areas/quetta" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Help and Safety", href: "/help" },
      { label: "Report a Listing", href: "/help#report" },
      { label: "Sign in", href: "/sign-in" },
      { label: "Create Account", href: "/register" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "/legal/terms" },
      { label: "Privacy Notice", href: "/legal/privacy" },
      { label: "Cookie Notice", href: "/legal/cookies" },
      { label: "Listing Rules", href: "/legal/listing-rules" },
      { label: "Paid Promotion Terms", href: "/legal/paid-promotion" },
      { label: "Refund Policy", href: "/legal/refunds" },
    ],
  },
];

const SOCIALS = [
  { label: "Facebook", href: "#", icon: faGlobe },
  { label: "Instagram", href: "#", icon: faShareNodes },
  { label: "Twitter", href: "#", icon: faUserGroup },
  { label: "LinkedIn", href: "#", icon: faCircleInfo },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        {/* Main Grid: mobile 2 col, tablet 4 col, desktop 6 col */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8 md:gap-y-12 lg:grid-cols-6">

          {/* Brand & Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            {/* Logo: navbar jaisa bada icon (! FontAwesome ke CSS ko override karta hai) */}
            <Link href="/" aria-label="Season Marketing home" className="group inline-flex items-center gap-2 sm:gap-3">
              <LogoMark className="h-11 w-11 shrink-0 text-brand-500 transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
              <span className="whitespace-nowrap font-display text-xl font-extrabold tracking-tight min-[400px]:text-2xl sm:text-3xl">
                <span className="text-white">Season</span>
                <span className="text-brand-500">Marketing</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-400">
              A nationwide property marketplace for Pakistan. Discover, compare, list and enquire about homes,
              plots, commercial spaces and new projects.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3 text-sm">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 transition-colors hover:text-white">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5">
                  <FontAwesomeIcon icon={faEnvelope} className="!h-3.5 text-brand-500" />
                </span>
                <span className="min-w-0 break-words">{SITE.email}</span>
              </a>
              <a href={SITE.phoneHref} className="flex items-center gap-3 transition-colors hover:text-white">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5">
                  <FontAwesomeIcon icon={faPhone} className="!h-3.5 text-brand-500" />
                </span>
                <span className="min-w-0">{SITE.phone}</span>
              </a>
              <p className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5">
                  <FontAwesomeIcon icon={faClock} className="!h-3.5 text-brand-500" />
                </span>
                <span className="min-w-0">Support: {SITE.supportHours}</span>
              </p>
            </div>

            {/* Social Media */}
            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-neutral-400 transition-colors hover:bg-brand-500 hover:text-white"
                >
                  <FontAwesomeIcon icon={social.icon} className="!h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {columns.map((col) => (
            <div key={col.title} className="min-w-0">
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white sm:mb-4">{col.title}</h4>
              <ul className="space-y-1 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="inline-block py-1.5 transition-colors hover:text-brand-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs leading-relaxed sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="text-neutral-500">
            &copy; 2026 {SITE.name}. All rights reserved.
          </p>
          <p className="max-w-xl text-neutral-500 sm:text-right">
            Listing presence on this platform is not government approval or title certification. Always verify
            documents independently before any payment.
          </p>
        </div>
      </div>
    </footer>
  );
}