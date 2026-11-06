import Link from "next/link";
import LogoMark from "@/components/ui/LogoMark";

export default function Logo({
  dark = true,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Season Marketing home"
      className={`group inline-flex shrink-0 items-center gap-2.5 sm:gap-3 ${className}`}
    >
      <LogoMark className="h-10 w-10 shrink-0 text-brand-500 transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12" />
      <span className="whitespace-nowrap font-display text-xl font-extrabold tracking-tight sm:text-2xl">
        <span className={dark ? "text-white" : "text-ink"}>Season</span>
        <span className="text-brand-500">Marketing</span>
      </span>
    </Link>
  );
}