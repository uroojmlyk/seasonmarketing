// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// export default function SectionHeading({
//   eyebrow,
//   title,
//   subtitle,
//   href,
//   hrefLabel = "View all",
//   light = false,
// }: {
//   eyebrow: string;
//   title: string;
//   subtitle?: string;
//   href?: string;
//   hrefLabel?: string;
//   light?: boolean;
// }) {
//   return (
//     <div className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
//       <div className="max-w-3xl">
//         <p
//           className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest ${
//             light
//               ? "border-white/15 bg-white/5 text-brand-300"
//               : "border-brand-200 bg-brand-50 text-brand-700"
//           }`}
//         >
//           <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
//           {eyebrow}
//         </p>
//         <h2
//           className={`text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl ${
//             light ? "text-white" : "text-ink"
//           }`}
//         >
//           {title}
//         </h2>
//         {subtitle && (
//           <p className={`mt-4 max-w-2xl text-base sm:text-lg ${light ? "text-neutral-400" : "text-neutral-600"}`}>
//             {subtitle}
//           </p>
//         )}
//       </div>
//       {href && (
//         <Link
//           href={href}
//           className={`group inline-flex shrink-0 items-center gap-2 self-start rounded-full border px-5 py-2.5 text-sm font-bold transition sm:self-auto ${
//             light
//               ? "border-white/20 text-white hover:border-brand-400 hover:bg-brand-500"
//               : "border-neutral-300 text-ink hover:border-ink hover:bg-ink hover:text-white"
//           }`}
//         >
//           {hrefLabel}
//           <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
//         </Link>
//       )}
//     </div>
//   );
// }



import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  href,
  hrefLabel = "View all",
  light = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p
          className={`mb-3 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.16em] ${
            light ? "text-brand-400" : "text-brand-600"
          }`}
        >
          <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-500" />
          {eyebrow}
        </p>
        <h2
          className={`text-[1.75rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.6rem] ${
            light ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-3 max-w-xl text-[15px] leading-relaxed sm:text-base ${
              light ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className={`group inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full border px-5 text-sm font-bold transition-colors sm:self-auto ${
            light
              ? "border-white/20 text-white hover:border-brand-500 hover:bg-brand-500"
              : "border-neutral-300 text-ink hover:border-ink hover:bg-ink hover:text-white"
          }`}
        >
          {hrefLabel}
          <FontAwesomeIcon
            icon={faArrowRight}
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}