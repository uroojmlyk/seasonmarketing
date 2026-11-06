// "use client";

// import { useEffect, useRef, useState, type ReactNode } from "react";

// export default function Reveal({
//   children,
//   delay = 0,
//   className = "",
// }: {
//   children: ReactNode;
//   delay?: number;
//   className?: string;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const io = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setShow(true);
//           io.disconnect();
//         }
//       },
//       { threshold: 0.12 }
//     );
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);

//   return (
//     <div
//       ref={ref}
//       style={{ transitionDelay: `${delay}ms` }}
//       className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
//         show ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[3px]"
//       } ${className}`}
//     >
//       {children}
//     </div>
//   );
// }





"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Soft fade-up when a block scrolls into view. No blur (smooth on phones),
// and it shows instantly for people who prefer reduced motion.
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: show ? `${delay}ms` : "0ms" }}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        show ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}