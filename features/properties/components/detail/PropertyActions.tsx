"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFlag, faHeart, faShareNodes } from "@fortawesome/free-solid-svg-icons";

export default function PropertyActions({ slug, title }: { slug: string; title: string }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Saved state sirf is browser mein (localStorage), backend nahi
  useEffect(() => {
    try {
      const list: string[] = JSON.parse(localStorage.getItem("sm_saved") || "[]");
      setSaved(list.includes(slug));
    } catch {
      /* ignore */
    }
  }, [slug]);

  const toggleSave = () => {
    setSaved((v) => {
      const nv = !v;
      try {
        const list: string[] = JSON.parse(localStorage.getItem("sm_saved") || "[]");
        const out = nv ? Array.from(new Set([...list, slug])) : list.filter((s) => s !== slug);
        localStorage.setItem("sm_saved", JSON.stringify(out));
      } catch {
        /* ignore */
      }
      return nv;
    });
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user ne cancel kiya */
    }
  };

  const btn =
    "inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-xs font-bold text-ink shadow-sm ring-1 ring-neutral-200 transition-colors hover:bg-neutral-100 sm:text-sm";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={share} className={btn}>
        <FontAwesomeIcon icon={copied ? faCheck : faShareNodes} className="!h-3.5 !w-3.5 text-brand-500" />
        {copied ? "Link copied" : "Share"}
      </button>
      <button type="button" onClick={toggleSave} aria-pressed={saved} className={btn}>
        <FontAwesomeIcon icon={faHeart} className={`!h-3.5 !w-3.5 ${saved ? "text-brand-500" : "text-neutral-400"}`} />
        {saved ? "Saved" : "Save"}
      </button>
      <Link href={`/contact?topic=report-listing&ref=${slug}`} className={btn}>
        <FontAwesomeIcon icon={faFlag} className="!h-3.5 !w-3.5 text-neutral-400" />
        Report
      </Link>
    </div>
  );
}