"use client";

import { useEffect, useState } from "react";

export interface NavItem {
  id: string;
  label: string;
}

// Sticky section tabs: scroll par active tab khud highlight hota hai
export default function SectionNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Page sections"
      className="sticky top-[84px] z-30 -mx-4 border-b border-neutral-200 bg-white/95 px-4 backdrop-blur sm:top-[92px] sm:-mx-6 sm:px-6 lg:top-[104px] lg:mx-0 lg:rounded-2xl lg:border lg:px-2"
    >
      <ul className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((it) => (
          <li key={it.id} className="shrink-0">
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? "true" : undefined}
              className={`block rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                active === it.id ? "bg-ink text-white" : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
              }`}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}