// "use client";

// import { useMemo, useState } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowLeft,
//   faPlus,
//   faMagnifyingGlass,
//   faPen,
//   faTrashCan,
//   faEye,
//   faBook,
//   faCircleQuestion,
//   faGlobe,
//   faCircleCheck,
//   faCircleInfo,
//   faXmark,
//   faSave,
//   faTriangleExclamation,
//   faArrowRight,
//   faChevronLeft,
//   faChevronRight,
// } from "@fortawesome/free-solid-svg-icons";

// /* ============================================
//    TYPES
//    ============================================ */

// type TabId = "articles" | "faqs" | "seo";
// type ArticleStatus = "Published" | "Draft";

// interface Article {
//   id: number;
//   title: string;
//   category: string;
//   author: string;
//   status: ArticleStatus;
//   views: number;
//   updated: string;
// }

// interface FAQ {
//   id: number;
//   q: string;
//   a: string;
// }

// const TABS: { id: TabId; label: string; desc: string; icon: any }[] = [
//   {
//     id: "articles",
//     label: "Guides & Articles",
//     desc: "Long-form guides for users",
//     icon: faBook,
//   },
//   {
//     id: "faqs",
//     label: "FAQs",
//     desc: "Common questions and answers",
//     icon: faCircleQuestion,
//   },
//   {
//     id: "seo",
//     label: "SEO Settings",
//     desc: "Meta tags, indexing, robots",
//     icon: faGlobe,
//   },
// ];

// const ARTICLE_FILTERS: { key: "all" | ArticleStatus; label: string }[] = [
//   { key: "all", label: "All" },
//   { key: "Published", label: "Published" },
//   { key: "Draft", label: "Draft" },
// ];

// /* ============================================
//    DATA
//    ============================================ */

// const INITIAL_ARTICLES: Article[] = [
//   {
//     id: 1,
//     title: "Property Buyer Safety Checklist",
//     category: "Guides",
//     author: "Content Team",
//     status: "Published",
//     views: 1240,
//     updated: "Oct 28, 2026",
//   },
//   {
//     id: 2,
//     title: "Rent Agreement Basics for Tenants",
//     category: "Guides",
//     author: "Content Team",
//     status: "Published",
//     views: 890,
//     updated: "Oct 25, 2026",
//   },
//   {
//     id: 3,
//     title: "How to Write a Great Listing",
//     category: "Tips",
//     author: "Admin",
//     status: "Draft",
//     views: 0,
//     updated: "Oct 24, 2026",
//   },
//   {
//     id: 4,
//     title: "Frequently Asked Questions (FAQs)",
//     category: "FAQs",
//     author: "Support",
//     status: "Published",
//     views: 320,
//     updated: "Oct 20, 2026",
//   },
// ];

// const INITIAL_FAQS: FAQ[] = [
//   {
//     id: 1,
//     q: "How do I post a property?",
//     a: "Click 'Post Property' in the navbar, choose a category, and fill the required fields. Your listing goes through moderation before going live.",
//   },
//   {
//     id: 2,
//     q: "Is my data secure?",
//     a: "Yes. We use strict privacy policies and never sell your data. Contact details are only revealed when you choose to enquire.",
//   },
// ];

// /* ============================================
//    PAGE
//    ============================================ */

// export default function AdminContentPage() {
//   const [activeTab, setActiveTab] = useState<TabId>("articles");

//   // Articles
//   const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
//   const [articleFilter, setArticleFilter] = useState<"all" | ArticleStatus>(
//     "all"
//   );
//   const [articleSearch, setArticleSearch] = useState("");
//   const [viewArticle, setViewArticle] = useState<Article | null>(null);
//   const [editArticle, setEditArticle] = useState<Article | null>(null);
//   const [deleteArticle, setDeleteArticle] = useState<Article | null>(null);

//   // FAQs
//   const [faqs, setFaqs] = useState<FAQ[]>(INITIAL_FAQS);
//   const [editFaq, setEditFaq] = useState<FAQ | null>(null);
//   const [deleteFaq, setDeleteFaq] = useState<FAQ | null>(null);
//   const [addFaqOpen, setAddFaqOpen] = useState(false);

//   // Create content modal
//   const [createOpen, setCreateOpen] = useState(false);

//   // SEO state
//   const [seo, setSeo] = useState({
//     title:
//       "Season Marketing | Buy, Rent and Sell Property in Pakistan",
//     description:
//       "Search houses, plots, commercial properties and new projects across Pakistan. List your property and connect with buyers and tenants.",
//     robots: "allow",
//   });
//   const [seoSaved, setSeoSaved] = useState(false);

//   const filteredArticles = useMemo(() => {
//     return articles.filter((a) => {
//       if (articleFilter !== "all" && a.status !== articleFilter) return false;
//       if (articleSearch) {
//         const q = articleSearch.toLowerCase();
//         if (
//           !a.title.toLowerCase().includes(q) &&
//           !a.category.toLowerCase().includes(q) &&
//           !a.author.toLowerCase().includes(q)
//         ) {
//           return false;
//         }
//       }
//       return true;
//     });
//   }, [articles, articleFilter, articleSearch]);

//   const articleCounts = useMemo(
//     () => ({
//       all: articles.length,
//       Published: articles.filter((a) => a.status === "Published").length,
//       Draft: articles.filter((a) => a.status === "Draft").length,
//     }),
//     [articles]
//   );

//   const confirmDeleteArticle = () => {
//     if (!deleteArticle) return;
//     setArticles((prev) => prev.filter((a) => a.id !== deleteArticle.id));
//     setDeleteArticle(null);
//   };

//   const confirmDeleteFaq = () => {
//     if (!deleteFaq) return;
//     setFaqs((prev) => prev.filter((f) => f.id !== deleteFaq.id));
//     setDeleteFaq(null);
//   };

//   const saveSeo = () => {
//     setSeoSaved(true);
//     setTimeout(() => setSeoSaved(false), 2500);
//   };

//   return (
//     <div className="min-h-screen bg-neutral-50">
//       {/* =========================================
//           HEADER
//           ========================================= */}
//       <header className="border-b border-neutral-200 bg-white">
//         <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//             <div className="min-w-0">
//               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600">
//                 <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
//                 Admin · Content Management
//               </div>
//               <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
//                 Content Management
//               </h1>
//               <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
//                 Manage website guides, FAQs, and SEO metadata. All changes are
//                 audited.
//               </p>
//             </div>

//             <div className="flex flex-wrap items-center gap-2">
//               <Link
//                 href="/dashboard/admin"
//                 className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
//               >
//                 <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
//                 Back
//               </Link>
//               <button
//                 type="button"
//                 onClick={() => setCreateOpen(true)}
//                 className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
//               >
//                 <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
//                 Create Content
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
//         <div className="flex flex-col gap-6 lg:flex-row">
//           {/* =========================================
//               SIDEBAR NAV
//               ========================================= */}
//           <aside className="w-full shrink-0 lg:w-64">
//             <div className="lg:sticky lg:top-24">
//               <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
//                 <div className="border-b border-neutral-100 px-4 py-3">
//                   <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
//                     Sections
//                   </p>
//                 </div>
//                 <nav className="p-2" aria-label="Content sections">
//                   {TABS.map((tab) => {
//                     const active = activeTab === tab.id;
//                     return (
//                       <button
//                         key={tab.id}
//                         type="button"
//                         onClick={() => setActiveTab(tab.id)}
//                         aria-current={active ? "page" : undefined}
//                         className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition ${
//                           active ? "bg-brand-50" : "hover:bg-neutral-50"
//                         }`}
//                       >
//                         <span
//                           className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition ${
//                             active
//                               ? "bg-brand-500 text-white"
//                               : "bg-neutral-100 text-neutral-600"
//                           }`}
//                         >
//                           <FontAwesomeIcon
//                             icon={tab.icon}
//                             className="h-3.5 w-3.5"
//                           />
//                         </span>
//                         <div className="min-w-0">
//                           <p
//                             className={`text-sm font-bold ${
//                               active ? "text-brand-700" : "text-ink"
//                             }`}
//                           >
//                             {tab.label}
//                           </p>
//                           <p className="mt-0.5 text-[11px] leading-snug text-neutral-500">
//                             {tab.desc}
//                           </p>
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </nav>
//               </div>

//               {/* Info box */}
//               <div className="mt-3 rounded-xl border border-neutral-200 bg-white p-4">
//                 <div className="flex items-start gap-2.5">
//                   <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
//                     <FontAwesomeIcon
//                       icon={faCircleInfo}
//                       className="h-3.5 w-3.5"
//                     />
//                   </span>
//                   <div>
//                     <p className="text-xs font-bold text-ink">
//                       Editorial policy
//                     </p>
//                     <p className="mt-1 text-[11px] leading-relaxed text-neutral-600">
//                       All published content must include accurate citations for
//                       factual claims. Drafts auto-expire after 30 days.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* =========================================
//               CONTENT AREA
//               ========================================= */}
//           <div className="min-w-0 flex-1">
//             <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
//               {/* =========================================
//                   ARTICLES TAB
//                   ========================================= */}
//               {activeTab === "articles" && (
//                 <>
//                   <div className="flex flex-col gap-3 border-b border-neutral-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
//                     <div
//                       className="flex gap-1 overflow-x-auto"
//                       role="tablist"
//                       aria-label="Filter articles"
//                     >
//                       {ARTICLE_FILTERS.map((f) => {
//                         const active = articleFilter === f.key;
//                         return (
//                           <button
//                             key={f.key}
//                             role="tab"
//                             aria-selected={active}
//                             onClick={() => setArticleFilter(f.key)}
//                             className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3.5 py-2 text-sm font-bold transition ${
//                               active
//                                 ? "bg-ink text-white"
//                                 : "text-neutral-600 hover:bg-neutral-100"
//                             }`}
//                           >
//                             {f.label}
//                             <span
//                               className={`rounded-sm px-1.5 py-0.5 text-[10px] font-black ${
//                                 active
//                                   ? "bg-white/20 text-white"
//                                   : "bg-neutral-100 text-neutral-500"
//                               }`}
//                             >
//                               {articleCounts[f.key]}
//                             </span>
//                           </button>
//                         );
//                       })}
//                     </div>

//                     <div className="relative w-full sm:w-64">
//                       <FontAwesomeIcon
//                         icon={faMagnifyingGlass}
//                         className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
//                       />
//                       <input
//                         type="search"
//                         value={articleSearch}
//                         onChange={(e) => setArticleSearch(e.target.value)}
//                         placeholder="Search articles..."
//                         className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//                       />
//                     </div>
//                   </div>

//                   <div className="overflow-x-auto">
//                     <table className="w-full min-w-[800px] text-left">
//                       <thead className="border-b border-neutral-200 bg-neutral-50">
//                         <tr>
//                           {[
//                             "Title",
//                             "Category",
//                             "Author",
//                             "Status",
//                             "Views",
//                           ].map((h) => (
//                             <th
//                               key={h}
//                               scope="col"
//                               className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
//                             >
//                               {h}
//                             </th>
//                           ))}
//                           <th
//                             scope="col"
//                             className="px-4 py-4 text-right text-xs font-black uppercase tracking-wider text-neutral-500"
//                           >
//                             Actions
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-neutral-100">
//                         {filteredArticles.map((article) => (
//                           <tr
//                             key={article.id}
//                             className="group transition hover:bg-neutral-50/70"
//                           >
//                             <td className="px-4 py-4">
//                               <p className="line-clamp-1 text-base font-bold text-ink group-hover:text-brand-600">
//                                 {article.title}
//                               </p>
//                               <p className="mt-0.5 text-xs text-neutral-500">
//                                 Updated {article.updated}
//                               </p>
//                             </td>
//                             <td className="px-4 py-4">
//                               <span className="inline-flex items-center rounded-md border border-neutral-200 bg-white px-2 py-1 text-[11px] font-black uppercase tracking-wide text-neutral-700">
//                                 {article.category}
//                               </span>
//                             </td>
//                             <td className="px-4 py-4">
//                               <p className="text-sm font-semibold text-ink">
//                                 {article.author}
//                               </p>
//                             </td>
//                             <td className="px-4 py-4">
//                               <span
//                                 className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
//                                   article.status === "Published"
//                                     ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
//                                     : "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
//                                 }`}
//                               >
//                                 <span
//                                   className={`h-1.5 w-1.5 rounded-full ${
//                                     article.status === "Published"
//                                       ? "bg-emerald-500"
//                                       : "bg-amber-500"
//                                   }`}
//                                 />
//                                 {article.status}
//                               </span>
//                             </td>
//                             <td className="px-4 py-4">
//                               <p className="text-sm font-black text-ink">
//                                 {article.views.toLocaleString()}
//                               </p>
//                             </td>
//                             <td className="px-4 py-4">
//                               <div className="flex items-center justify-end gap-1">
//                                 <button
//                                   type="button"
//                                   onClick={() => setViewArticle(article)}
//                                   aria-label={`View ${article.title}`}
//                                   title="View article"
//                                   className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
//                                 >
//                                   <FontAwesomeIcon
//                                     icon={faEye}
//                                     className="h-3.5 w-3.5"
//                                   />
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => setEditArticle(article)}
//                                   aria-label={`Edit ${article.title}`}
//                                   title="Edit article"
//                                   className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
//                                 >
//                                   <FontAwesomeIcon
//                                     icon={faPen}
//                                     className="h-3.5 w-3.5"
//                                   />
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => setDeleteArticle(article)}
//                                   aria-label={`Delete ${article.title}`}
//                                   title="Delete article"
//                                   className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
//                                 >
//                                   <FontAwesomeIcon
//                                     icon={faTrashCan}
//                                     className="h-3.5 w-3.5"
//                                   />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                         {filteredArticles.length === 0 && (
//                           <tr>
//                             <td colSpan={6} className="px-6 py-16 text-center">
//                               <div className="mx-auto flex max-w-sm flex-col items-center">
//                                 <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
//                                   <FontAwesomeIcon
//                                     icon={faBook}
//                                     className="h-6 w-6"
//                                   />
//                                 </span>
//                                 <h3 className="mt-4 text-base font-bold text-ink">
//                                   No articles found
//                                 </h3>
//                                 <p className="mt-1 text-sm text-neutral-500">
//                                   Try adjusting your filters or search keyword.
//                                 </p>
//                                 <button
//                                   onClick={() => {
//                                     setArticleFilter("all");
//                                     setArticleSearch("");
//                                   }}
//                                   className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50"
//                                 >
//                                   Clear filters
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-200 bg-neutral-50/60 px-4 py-3 sm:flex-row sm:px-5">
//                     <p className="text-xs font-medium text-neutral-600">
//                       Showing{" "}
//                       <span className="font-black text-ink">
//                         {filteredArticles.length}
//                       </span>{" "}
//                       of{" "}
//                       <span className="font-black text-ink">
//                         {articles.length}
//                       </span>{" "}
//                       articles
//                     </p>
//                     <div className="flex items-center gap-1">
//                       <button
//                         type="button"
//                         disabled
//                         aria-label="Previous page"
//                         className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
//                       >
//                         <FontAwesomeIcon
//                           icon={faChevronLeft}
//                           className="h-3 w-3"
//                         />
//                       </button>
//                       <button
//                         type="button"
//                         className="flex h-8 min-w-8 items-center justify-center rounded-md bg-ink px-2 text-xs font-black text-white"
//                       >
//                         1
//                       </button>
//                       <button
//                         type="button"
//                         aria-label="Next page"
//                         className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
//                       >
//                         <FontAwesomeIcon
//                           icon={faChevronRight}
//                           className="h-3 w-3"
//                         />
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               )}

//               {/* =========================================
//                   FAQS TAB
//                   ========================================= */}
//               {activeTab === "faqs" && (
//                 <>
//                   <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
//                     <div>
//                       <h2 className="text-lg font-black tracking-tight text-ink">
//                         Manage FAQs
//                       </h2>
//                       <p className="mt-1 text-sm text-neutral-600">
//                         Publicly visible on the Help Centre page.
//                       </p>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => setAddFaqOpen(true)}
//                       className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//                     >
//                       <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
//                       Add FAQ
//                     </button>
//                   </div>

//                   {faqs.length === 0 ? (
//                     <div className="flex flex-col items-center px-6 py-16 text-center">
//                       <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
//                         <FontAwesomeIcon
//                           icon={faCircleQuestion}
//                           className="h-6 w-6"
//                         />
//                       </span>
//                       <h3 className="mt-4 text-base font-bold text-ink">
//                         No FAQs yet
//                       </h3>
//                       <p className="mt-1 text-sm text-neutral-500">
//                         Add your first FAQ to help users find answers faster.
//                       </p>
//                     </div>
//                   ) : (
//                     <ul className="divide-y divide-neutral-100">
//                       {faqs.map((faq) => (
//                         <li key={faq.id} className="px-5 py-4">
//                           <div className="flex items-start justify-between gap-3">
//                             <div className="min-w-0 flex-1">
//                               <p className="text-base font-bold text-ink">
//                                 {faq.q}
//                               </p>
//                               <p className="mt-1 text-sm leading-relaxed text-neutral-600">
//                                 {faq.a}
//                               </p>
//                             </div>
//                             <div className="flex shrink-0 items-center gap-1">
//                               <button
//                                 type="button"
//                                 onClick={() => setEditFaq(faq)}
//                                 aria-label="Edit FAQ"
//                                 title="Edit FAQ"
//                                 className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
//                               >
//                                 <FontAwesomeIcon
//                                   icon={faPen}
//                                   className="h-3.5 w-3.5"
//                                 />
//                               </button>
//                               <button
//                                 type="button"
//                                 onClick={() => setDeleteFaq(faq)}
//                                 aria-label="Delete FAQ"
//                                 title="Delete FAQ"
//                                 className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
//                               >
//                                 <FontAwesomeIcon
//                                   icon={faTrashCan}
//                                   className="h-3.5 w-3.5"
//                                 />
//                               </button>
//                             </div>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </>
//               )}

//               {/* =========================================
//                   SEO TAB
//                   ========================================= */}
//               {activeTab === "seo" && (
//                 <div className="p-6 sm:p-8">
//                   <div
//                     className={`mb-4 flex items-center gap-2 overflow-hidden rounded-lg border border-emerald-200 bg-emerald-50 transition-all duration-300 ${
//                       seoSaved
//                         ? "max-h-20 px-4 py-3 opacity-100"
//                         : "max-h-0 border-0 px-4 py-0 opacity-0"
//                     }`}
//                   >
//                     <FontAwesomeIcon
//                       icon={faCircleCheck}
//                       className="h-4 w-4 shrink-0 text-emerald-600"
//                     />
//                     <p className="text-sm font-semibold text-emerald-800">
//                       SEO settings saved successfully.
//                     </p>
//                   </div>

//                   <div>
//                     <h2 className="text-lg font-black tracking-tight text-ink">
//                       SEO Settings
//                     </h2>
//                     <p className="mt-1 text-sm text-neutral-600">
//                       Configure global metadata and indexing policy.
//                     </p>
//                   </div>

//                   <div className="mt-6 space-y-5">
//                     <div>
//                       <label
//                         htmlFor="seo-title"
//                         className="text-xs font-black uppercase tracking-wider text-neutral-600"
//                       >
//                         Default meta title
//                       </label>
//                       <input
//                         id="seo-title"
//                         type="text"
//                         value={seo.title}
//                         onChange={(e) =>
//                           setSeo({ ...seo, title: e.target.value })
//                         }
//                         className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//                       />
//                       <p className="mt-1 text-xs text-neutral-500">
//                         {seo.title.length} / 60 characters recommended
//                       </p>
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="seo-desc"
//                         className="text-xs font-black uppercase tracking-wider text-neutral-600"
//                       >
//                         Default meta description
//                       </label>
//                       <textarea
//                         id="seo-desc"
//                         rows={3}
//                         value={seo.description}
//                         onChange={(e) =>
//                           setSeo({ ...seo, description: e.target.value })
//                         }
//                         className="mt-2 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//                       />
//                       <p className="mt-1 text-xs text-neutral-500">
//                         {seo.description.length} / 160 characters recommended
//                       </p>
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="seo-robots"
//                         className="text-xs font-black uppercase tracking-wider text-neutral-600"
//                       >
//                         Robots & indexing
//                       </label>
//                       <select
//                         id="seo-robots"
//                         value={seo.robots}
//                         onChange={(e) =>
//                           setSeo({ ...seo, robots: e.target.value })
//                         }
//                         className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//                       >
//                         <option value="allow">Allow all search engines</option>
//                         <option value="block">Block all search engines</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="mt-8 flex justify-end border-t border-neutral-100 pt-6">
//                     <button
//                       type="button"
//                       onClick={saveSeo}
//                       className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
//                     >
//                       <FontAwesomeIcon icon={faSave} className="h-4 w-4" />
//                       Save SEO Settings
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* =========================================
//           CREATE CONTENT MODAL
//           ========================================= */}
//       {createOpen && (
//         <Modal
//           onClose={() => setCreateOpen(false)}
//           title="Create new content"
//           subtitle="Start a new article, guide, or FAQ"
//         >
//           <div className="space-y-4">
//             <div>
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                 Title <span className="text-brand-600">*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. How to Choose the Right Locality"
//                 className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//             <div>
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                 Type <span className="text-brand-600">*</span>
//               </label>
//               <select className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15">
//                 <option>Guide</option>
//                 <option>Article</option>
//                 <option>FAQ</option>
//                 <option>News</option>
//               </select>
//             </div>
//             <div>
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                 Status
//               </label>
//               <select className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15">
//                 <option>Draft</option>
//                 <option>Published</option>
//               </select>
//             </div>
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setCreateOpen(false)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={() => setCreateOpen(false)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
//               Create content
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           VIEW ARTICLE MODAL
//           ========================================= */}
//       {viewArticle && (
//         <Modal
//           onClose={() => setViewArticle(null)}
//           title={viewArticle.title}
//           subtitle={`${viewArticle.category} · ${viewArticle.status}`}
//         >
//           <div className="space-y-4">
//             <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600">
//               <span>
//                 <strong className="font-bold text-ink">Author:</strong>{" "}
//                 {viewArticle.author}
//               </span>
//               <span>
//                 <strong className="font-bold text-ink">Views:</strong>{" "}
//                 {viewArticle.views.toLocaleString()}
//               </span>
//               <span>
//                 <strong className="font-bold text-ink">Updated:</strong>{" "}
//                 {viewArticle.updated}
//               </span>
//             </div>
//             <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
//               <p className="text-sm leading-relaxed text-neutral-700">
//                 This is a preview of the article. Full article content will
//                 appear here once the editor is integrated.
//               </p>
//             </div>
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setViewArticle(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Close
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setEditArticle(viewArticle);
//                 setViewArticle(null);
//               }}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               <FontAwesomeIcon icon={faPen} className="h-3.5 w-3.5" />
//               Edit article
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           EDIT ARTICLE MODAL
//           ========================================= */}
//       {editArticle && (
//         <Modal
//           onClose={() => setEditArticle(null)}
//           title="Edit article"
//           subtitle={editArticle.title}
//         >
//           <div className="space-y-4">
//             <div>
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 defaultValue={editArticle.title}
//                 className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div>
//                 <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                   Category
//                 </label>
//                 <input
//                   type="text"
//                   defaultValue={editArticle.category}
//                   className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                   Status
//                 </label>
//                 <select
//                   defaultValue={editArticle.status}
//                   className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//                 >
//                   <option>Draft</option>
//                   <option>Published</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setEditArticle(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={() => setEditArticle(null)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               <FontAwesomeIcon icon={faSave} className="h-3.5 w-3.5" />
//               Save changes
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           DELETE ARTICLE MODAL
//           ========================================= */}
//       {deleteArticle && (
//         <Modal
//           onClose={() => setDeleteArticle(null)}
//           title="Delete this article?"
//           subtitle={deleteArticle.title}
//         >
//           <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
//             <FontAwesomeIcon
//               icon={faTriangleExclamation}
//               className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
//             />
//             <div>
//               <p className="text-sm font-bold text-red-900">
//                 This action cannot be undone
//               </p>
//               <p className="mt-1 text-xs text-red-800">
//                 The article will be permanently removed from the website. Any
//                 inbound links will show a 404.
//               </p>
//             </div>
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setDeleteArticle(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={confirmDeleteArticle}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700"
//             >
//               <FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" />
//               Delete article
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           ADD FAQ MODAL
//           ========================================= */}
//       {addFaqOpen && (
//         <Modal
//           onClose={() => setAddFaqOpen(false)}
//           title="Add new FAQ"
//           subtitle="Publicly visible on the Help Centre"
//         >
//           <div className="space-y-4">
//             <div>
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                 Question <span className="text-brand-600">*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. How do I report a fake listing?"
//                 className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//             <div>
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                 Answer <span className="text-brand-600">*</span>
//               </label>
//               <textarea
//                 rows={4}
//                 placeholder="Provide a clear, factual answer."
//                 className="mt-1.5 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setAddFaqOpen(false)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={() => setAddFaqOpen(false)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
//               Add FAQ
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           EDIT FAQ MODAL
//           ========================================= */}
//       {editFaq && (
//         <Modal
//           onClose={() => setEditFaq(null)}
//           title="Edit FAQ"
//           subtitle={editFaq.q}
//         >
//           <div className="space-y-4">
//             <div>
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                 Question
//               </label>
//               <input
//                 type="text"
//                 defaultValue={editFaq.q}
//                 className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//             <div>
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
//                 Answer
//               </label>
//               <textarea
//                 rows={4}
//                 defaultValue={editFaq.a}
//                 className="mt-1.5 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
//               />
//             </div>
//           </div>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setEditFaq(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={() => setEditFaq(null)}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
//             >
//               <FontAwesomeIcon icon={faSave} className="h-3.5 w-3.5" />
//               Save FAQ
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* =========================================
//           DELETE FAQ MODAL
//           ========================================= */}
//       {deleteFaq && (
//         <Modal
//           onClose={() => setDeleteFaq(null)}
//           title="Delete this FAQ?"
//           subtitle={deleteFaq.q}
//         >
//           <p className="text-sm leading-relaxed text-neutral-600">
//             This FAQ will be removed from the public Help Centre immediately.
//             This action cannot be undone.
//           </p>

//           <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={() => setDeleteFaq(null)}
//               className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={confirmDeleteFaq}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700"
//             >
//               <FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" />
//               Delete FAQ
//             </button>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }

// /* ============================================
//    MODAL SHELL
//    ============================================ */

// function Modal({
//   onClose,
//   title,
//   subtitle,
//   children,
// }: {
//   onClose: () => void;
//   title: string;
//   subtitle?: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
//       onClick={onClose}
//       role="dialog"
//       aria-modal="true"
//       aria-label={title}
//     >
//       <div
//         className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-start justify-between gap-3 border-b border-neutral-100 px-6 py-4">
//           <div className="min-w-0">
//             <h3 className="text-lg font-black tracking-tight text-ink">
//               {title}
//             </h3>
//             {subtitle && (
//               <p className="mt-1 line-clamp-1 text-xs font-medium text-neutral-500">
//                 {subtitle}
//               </p>
//             )}
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close dialog"
//             className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-100"
//           >
//             <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
//           </button>
//         </div>
//         <div className="p-6">{children}</div>
//       </div>
//     </div>
//   );
// }










"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlus,
  faMagnifyingGlass,
  faPen,
  faTrashCan,
  faEye,
  faBook,
  faCircleQuestion,
  faGlobe,
  faCircleCheck,
  faCircleInfo,
  faXmark,
  faSave,
  faTriangleExclamation,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type TabId = "articles" | "faqs" | "seo";
type ArticleStatus = "Published" | "Draft";

interface Article {
  id: number;
  title: string;
  category: string;
  author: string;
  status: ArticleStatus;
  views: number;
  updated: string;
}

interface FAQ {
  id: number;
  q: string;
  a: string;
}

const TABS: { id: TabId; label: string; desc: string; icon: any }[] = [
  {
    id: "articles",
    label: "Guides & Articles",
    desc: "Long-form guides for users",
    icon: faBook,
  },
  {
    id: "faqs",
    label: "FAQs",
    desc: "Common questions and answers",
    icon: faCircleQuestion,
  },
  {
    id: "seo",
    label: "SEO Settings",
    desc: "Meta tags, indexing, robots",
    icon: faGlobe,
  },
];

const ARTICLE_FILTERS: { key: "all" | ArticleStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "Published", label: "Published" },
  { key: "Draft", label: "Draft" },
];

/* ============================================
   DATA
   ============================================ */

const INITIAL_ARTICLES: Article[] = [
  {
    id: 1,
    title: "Property Buyer Safety Checklist",
    category: "Guides",
    author: "Content Team",
    status: "Published",
    views: 1240,
    updated: "Oct 28, 2026",
  },
  {
    id: 2,
    title: "Rent Agreement Basics for Tenants",
    category: "Guides",
    author: "Content Team",
    status: "Published",
    views: 890,
    updated: "Oct 25, 2026",
  },
  {
    id: 3,
    title: "How to Write a Great Listing",
    category: "Tips",
    author: "Admin",
    status: "Draft",
    views: 0,
    updated: "Oct 24, 2026",
  },
  {
    id: 4,
    title: "Frequently Asked Questions (FAQs)",
    category: "FAQs",
    author: "Support",
    status: "Published",
    views: 320,
    updated: "Oct 20, 2026",
  },
];

const INITIAL_FAQS: FAQ[] = [
  {
    id: 1,
    q: "How do I post a property?",
    a: "Click 'Post Property' in the navbar, choose a category, and fill the required fields. Your listing goes through moderation before going live.",
  },
  {
    id: 2,
    q: "Is my data secure?",
    a: "Yes. We use strict privacy policies and never sell your data. Contact details are only revealed when you choose to enquire.",
  },
];

/* ============================================
   PAGE
   ============================================ */

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<TabId>("articles");

  // Articles
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [articleFilter, setArticleFilter] = useState<"all" | ArticleStatus>(
    "all"
  );
  const [articleSearch, setArticleSearch] = useState("");
  const [viewArticle, setViewArticle] = useState<Article | null>(null);
  const [editArticle, setEditArticle] = useState<Article | null>(null);
  const [deleteArticle, setDeleteArticle] = useState<Article | null>(null);

  // FAQs
  const [faqs, setFaqs] = useState<FAQ[]>(INITIAL_FAQS);
  const [editFaq, setEditFaq] = useState<FAQ | null>(null);
  const [deleteFaq, setDeleteFaq] = useState<FAQ | null>(null);
  const [addFaqOpen, setAddFaqOpen] = useState(false);

  // Create content modal
  const [createOpen, setCreateOpen] = useState(false);

  // SEO state
  const [seo, setSeo] = useState({
    title:
      "Season Marketing | Buy, Rent and Sell Property in Pakistan",
    description:
      "Search houses, plots, commercial properties and new projects across Pakistan. List your property and connect with buyers and tenants.",
    robots: "allow",
  });
  const [seoSaved, setSeoSaved] = useState(false);

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      if (articleFilter !== "all" && a.status !== articleFilter) return false;
      if (articleSearch) {
        const q = articleSearch.toLowerCase();
        if (
          !a.title.toLowerCase().includes(q) &&
          !a.category.toLowerCase().includes(q) &&
          !a.author.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [articles, articleFilter, articleSearch]);

  const articleCounts = useMemo(
    () => ({
      all: articles.length,
      Published: articles.filter((a) => a.status === "Published").length,
      Draft: articles.filter((a) => a.status === "Draft").length,
    }),
    [articles]
  );

  const confirmDeleteArticle = () => {
    if (!deleteArticle) return;
    setArticles((prev) => prev.filter((a) => a.id !== deleteArticle.id));
    setDeleteArticle(null);
  };

  const confirmDeleteFaq = () => {
    if (!deleteFaq) return;
    setFaqs((prev) => prev.filter((f) => f.id !== deleteFaq.id));
    setDeleteFaq(null);
  };

  const saveSeo = () => {
    setSeoSaved(true);
    setTimeout(() => setSeoSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* =========================================
          HEADER
          ========================================= */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Admin · Content Management
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Content Management
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                Manage website guides, FAQs, and SEO metadata. All changes are
                audited.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/dashboard/admin"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
                Back
              </Link>
              <button
                type="button"
                onClick={() => setCreateOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                Create Content
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* =========================================
              SIDEBAR NAV
              ========================================= */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-100 px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                    Sections
                  </p>
                </div>
                <nav className="p-2" aria-label="Content sections">
                  {TABS.map((tab) => {
                    const active = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        aria-current={active ? "page" : undefined}
                        className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                          active ? "bg-brand-50" : "hover:bg-neutral-50"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition ${
                            active
                              ? "bg-brand-500 text-white"
                              : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={tab.icon}
                            className="h-3.5 w-3.5"
                          />
                        </span>
                        <div className="min-w-0">
                          <p
                            className={`text-sm font-bold ${
                              active ? "text-brand-700" : "text-ink"
                            }`}
                          >
                            {tab.label}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-snug text-neutral-500">
                            {tab.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Info box */}
              <div className="mt-3 rounded-xl border border-neutral-200 bg-white p-4">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="h-3.5 w-3.5"
                    />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-ink">
                      Editorial policy
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-neutral-600">
                      All published content must include accurate citations for
                      factual claims. Drafts auto-expire after 30 days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* =========================================
              CONTENT AREA
              ========================================= */}
          <div className="min-w-0 flex-1">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              {/* =========================================
                  ARTICLES TAB
                  ========================================= */}
              {activeTab === "articles" && (
                <>
                  <div className="flex flex-col gap-3 border-b border-neutral-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <div
                      className="flex gap-1 overflow-x-auto"
                      role="tablist"
                      aria-label="Filter articles"
                    >
                      {ARTICLE_FILTERS.map((f) => {
                        const active = articleFilter === f.key;
                        return (
                          <button
                            key={f.key}
                            role="tab"
                            aria-selected={active}
                            onClick={() => setArticleFilter(f.key)}
                            className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3.5 py-2 text-sm font-bold transition ${
                              active
                                ? "bg-ink text-white"
                                : "text-neutral-600 hover:bg-neutral-100"
                            }`}
                          >
                            {f.label}
                            <span
                              className={`rounded-sm px-1.5 py-0.5 text-[10px] font-black ${
                                active
                                  ? "bg-white/20 text-white"
                                  : "bg-neutral-100 text-neutral-500"
                              }`}
                            >
                              {articleCounts[f.key]}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="relative w-full sm:w-64">
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
                      />
                      <input
                        type="search"
                        value={articleSearch}
                        onChange={(e) => setArticleSearch(e.target.value)}
                        placeholder="Search articles..."
                        className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full md:min-w-[800px] text-left max-md:block max-md:[&_thead]:hidden max-md:[&_tbody]:block max-md:[&_tr]:block max-md:[&_tr]:p-4 max-md:[&_td]:flex max-md:[&_td]:items-center max-md:[&_td]:justify-between max-md:[&_td]:gap-4 max-md:[&_td]:px-0 max-md:[&_td]:py-1.5 max-md:[&_td]:text-right max-md:[&_td:first-child]:justify-start max-md:[&_td:first-child]:text-left max-md:[&_td]:before:content-[attr(data-label)] max-md:[&_td]:before:shrink-0 max-md:[&_td]:before:text-[11px] max-md:[&_td[colspan]]:justify-center max-md:[&_td[colspan]]:text-center max-md:[&_td[colspan]]:before:hidden max-md:[&_td]:before:font-bold max-md:[&_td]:before:uppercase max-md:[&_td]:before:tracking-wider max-md:[&_td]:before:text-neutral-400">
                      <thead className="border-b border-neutral-200 bg-neutral-50">
                        <tr>
                          {[
                            "Title",
                            "Category",
                            "Author",
                            "Status",
                            "Views",
                          ].map((h) => (
                            <th
                              key={h}
                              scope="col"
                              className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
                            >
                              {h}
                            </th>
                          ))}
                          <th
                            scope="col"
                            className="px-4 py-4 text-right text-xs font-black uppercase tracking-wider text-neutral-500"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {filteredArticles.map((article) => (
                          <tr
                            key={article.id}
                            className="group transition hover:bg-neutral-50/70"
                          >
                            <td className="px-4 py-4">
                              <p className="line-clamp-1 text-base font-bold text-ink group-hover:text-brand-600">
                                {article.title}
                              </p>
                              <p className="mt-0.5 text-xs text-neutral-500">
                                Updated {article.updated}
                              </p>
                            </td>
                            <td data-label="Category" className="px-4 py-4">
                              <span className="inline-flex items-center rounded-md border border-neutral-200 bg-white px-2 py-1 text-[11px] font-black uppercase tracking-wide text-neutral-700">
                                {article.category}
                              </span>
                            </td>
                            <td data-label="Author" className="px-4 py-4">
                              <p className="text-sm font-semibold text-ink">
                                {article.author}
                              </p>
                            </td>
                            <td data-label="Status" className="px-4 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
                                  article.status === "Published"
                                    ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                                    : "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    article.status === "Published"
                                      ? "bg-emerald-500"
                                      : "bg-amber-500"
                                  }`}
                                />
                                {article.status}
                              </span>
                            </td>
                            <td data-label="Views" className="px-4 py-4">
                              <p className="text-sm font-black text-ink">
                                {article.views.toLocaleString()}
                              </p>
                            </td>
                            <td data-label="Actions" className="px-4 py-4">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  type="button"
                                  onClick={() => setViewArticle(article)}
                                  aria-label={`View ${article.title}`}
                                  title="View article"
                                  className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    className="h-3.5 w-3.5"
                                  />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditArticle(article)}
                                  aria-label={`Edit ${article.title}`}
                                  title="Edit article"
                                  className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
                                >
                                  <FontAwesomeIcon
                                    icon={faPen}
                                    className="h-3.5 w-3.5"
                                  />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteArticle(article)}
                                  aria-label={`Delete ${article.title}`}
                                  title="Delete article"
                                  className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
                                >
                                  <FontAwesomeIcon
                                    icon={faTrashCan}
                                    className="h-3.5 w-3.5"
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredArticles.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-6 py-16 text-center">
                              <div className="mx-auto flex max-w-sm flex-col items-center">
                                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                                  <FontAwesomeIcon
                                    icon={faBook}
                                    className="h-6 w-6"
                                  />
                                </span>
                                <h3 className="mt-4 text-base font-bold text-ink">
                                  No articles found
                                </h3>
                                <p className="mt-1 text-sm text-neutral-500">
                                  Try adjusting your filters or search keyword.
                                </p>
                                <button
                                  onClick={() => {
                                    setArticleFilter("all");
                                    setArticleSearch("");
                                  }}
                                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50"
                                >
                                  Clear filters
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-200 bg-neutral-50/60 px-4 py-3 sm:flex-row sm:px-5">
                    <p className="text-xs font-medium text-neutral-600">
                      Showing{" "}
                      <span className="font-black text-ink">
                        {filteredArticles.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-black text-ink">
                        {articles.length}
                      </span>{" "}
                      articles
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled
                        aria-label="Previous page"
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <FontAwesomeIcon
                          icon={faChevronLeft}
                          className="h-3 w-3"
                        />
                      </button>
                      <button
                        type="button"
                        className="flex h-8 min-w-8 items-center justify-center rounded-md bg-ink px-2 text-xs font-black text-white"
                      >
                        1
                      </button>
                      <button
                        type="button"
                        aria-label="Next page"
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                      >
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-3 w-3"
                        />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* =========================================
                  FAQS TAB
                  ========================================= */}
              {activeTab === "faqs" && (
                <>
                  <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
                    <div>
                      <h2 className="text-lg font-black tracking-tight text-ink">
                        Manage FAQs
                      </h2>
                      <p className="mt-1 text-sm text-neutral-600">
                        Publicly visible on the Help Centre page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAddFaqOpen(true)}
                      className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
                    >
                      <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
                      Add FAQ
                    </button>
                  </div>

                  {faqs.length === 0 ? (
                    <div className="flex flex-col items-center px-6 py-16 text-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                        <FontAwesomeIcon
                          icon={faCircleQuestion}
                          className="h-6 w-6"
                        />
                      </span>
                      <h3 className="mt-4 text-base font-bold text-ink">
                        No FAQs yet
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        Add your first FAQ to help users find answers faster.
                      </p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-neutral-100">
                      {faqs.map((faq) => (
                        <li key={faq.id} className="px-5 py-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <p className="text-base font-bold text-ink">
                                {faq.q}
                              </p>
                              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                                {faq.a}
                              </p>
                            </div>
                            <div className="flex shrink-0 items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setEditFaq(faq)}
                                aria-label="Edit FAQ"
                                title="Edit FAQ"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
                              >
                                <FontAwesomeIcon
                                  icon={faPen}
                                  className="h-3.5 w-3.5"
                                />
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteFaq(faq)}
                                aria-label="Delete FAQ"
                                title="Delete FAQ"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
                              >
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  className="h-3.5 w-3.5"
                                />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}

              {/* =========================================
                  SEO TAB
                  ========================================= */}
              {activeTab === "seo" && (
                <div className="p-6 sm:p-8">
                  <div
                    className={`mb-4 flex items-center gap-2 overflow-hidden rounded-lg border border-emerald-200 bg-emerald-50 transition-all duration-300 ${
                      seoSaved
                        ? "max-h-20 px-4 py-3 opacity-100"
                        : "max-h-0 border-0 px-4 py-0 opacity-0"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="h-4 w-4 shrink-0 text-emerald-600"
                    />
                    <p className="text-sm font-semibold text-emerald-800">
                      SEO settings saved successfully.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-black tracking-tight text-ink">
                      SEO Settings
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600">
                      Configure global metadata and indexing policy.
                    </p>
                  </div>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label
                        htmlFor="seo-title"
                        className="text-xs font-black uppercase tracking-wider text-neutral-600"
                      >
                        Default meta title
                      </label>
                      <input
                        id="seo-title"
                        type="text"
                        value={seo.title}
                        onChange={(e) =>
                          setSeo({ ...seo, title: e.target.value })
                        }
                        className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                      />
                      <p className="mt-1 text-xs text-neutral-500">
                        {seo.title.length} / 60 characters recommended
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="seo-desc"
                        className="text-xs font-black uppercase tracking-wider text-neutral-600"
                      >
                        Default meta description
                      </label>
                      <textarea
                        id="seo-desc"
                        rows={3}
                        value={seo.description}
                        onChange={(e) =>
                          setSeo({ ...seo, description: e.target.value })
                        }
                        className="mt-2 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                      />
                      <p className="mt-1 text-xs text-neutral-500">
                        {seo.description.length} / 160 characters recommended
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="seo-robots"
                        className="text-xs font-black uppercase tracking-wider text-neutral-600"
                      >
                        Robots & indexing
                      </label>
                      <select
                        id="seo-robots"
                        value={seo.robots}
                        onChange={(e) =>
                          setSeo({ ...seo, robots: e.target.value })
                        }
                        className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                      >
                        <option value="allow">Allow all search engines</option>
                        <option value="block">Block all search engines</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end border-t border-neutral-100 pt-6">
                    <button
                      type="button"
                      onClick={saveSeo}
                      className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
                    >
                      <FontAwesomeIcon icon={faSave} className="h-4 w-4" />
                      Save SEO Settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* =========================================
          CREATE CONTENT MODAL
          ========================================= */}
      {createOpen && (
        <Modal
          onClose={() => setCreateOpen(false)}
          title="Create new content"
          subtitle="Start a new article, guide, or FAQ"
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Title <span className="text-brand-600">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. How to Choose the Right Locality"
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Type <span className="text-brand-600">*</span>
              </label>
              <select className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15">
                <option>Guide</option>
                <option>Article</option>
                <option>FAQ</option>
                <option>News</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Status
              </label>
              <select className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15">
                <option>Draft</option>
                <option>Published</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
              Create content
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          VIEW ARTICLE MODAL
          ========================================= */}
      {viewArticle && (
        <Modal
          onClose={() => setViewArticle(null)}
          title={viewArticle.title}
          subtitle={`${viewArticle.category} · ${viewArticle.status}`}
        >
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600">
              <span>
                <strong className="font-bold text-ink">Author:</strong>{" "}
                {viewArticle.author}
              </span>
              <span>
                <strong className="font-bold text-ink">Views:</strong>{" "}
                {viewArticle.views.toLocaleString()}
              </span>
              <span>
                <strong className="font-bold text-ink">Updated:</strong>{" "}
                {viewArticle.updated}
              </span>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-sm leading-relaxed text-neutral-700">
                This is a preview of the article. Full article content will
                appear here once the editor is integrated.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setViewArticle(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                setEditArticle(viewArticle);
                setViewArticle(null);
              }}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faPen} className="h-3.5 w-3.5" />
              Edit article
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          EDIT ARTICLE MODAL
          ========================================= */}
      {editArticle && (
        <Modal
          onClose={() => setEditArticle(null)}
          title="Edit article"
          subtitle={editArticle.title}
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Title
              </label>
              <input
                type="text"
                defaultValue={editArticle.title}
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                  Category
                </label>
                <input
                  type="text"
                  defaultValue={editArticle.category}
                  className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                  Status
                </label>
                <select
                  defaultValue={editArticle.status}
                  className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                >
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setEditArticle(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setEditArticle(null)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faSave} className="h-3.5 w-3.5" />
              Save changes
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          DELETE ARTICLE MODAL
          ========================================= */}
      {deleteArticle && (
        <Modal
          onClose={() => setDeleteArticle(null)}
          title="Delete this article?"
          subtitle={deleteArticle.title}
        >
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
            />
            <div>
              <p className="text-sm font-bold text-red-900">
                This action cannot be undone
              </p>
              <p className="mt-1 text-xs text-red-800">
                The article will be permanently removed from the website. Any
                inbound links will show a 404.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setDeleteArticle(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDeleteArticle}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700"
            >
              <FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" />
              Delete article
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          ADD FAQ MODAL
          ========================================= */}
      {addFaqOpen && (
        <Modal
          onClose={() => setAddFaqOpen(false)}
          title="Add new FAQ"
          subtitle="Publicly visible on the Help Centre"
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Question <span className="text-brand-600">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. How do I report a fake listing?"
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Answer <span className="text-brand-600">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Provide a clear, factual answer."
                className="mt-1.5 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setAddFaqOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setAddFaqOpen(false)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
              Add FAQ
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          EDIT FAQ MODAL
          ========================================= */}
      {editFaq && (
        <Modal
          onClose={() => setEditFaq(null)}
          title="Edit FAQ"
          subtitle={editFaq.q}
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Question
              </label>
              <input
                type="text"
                defaultValue={editFaq.q}
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                Answer
              </label>
              <textarea
                rows={4}
                defaultValue={editFaq.a}
                className="mt-1.5 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setEditFaq(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setEditFaq(null)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faSave} className="h-3.5 w-3.5" />
              Save FAQ
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          DELETE FAQ MODAL
          ========================================= */}
      {deleteFaq && (
        <Modal
          onClose={() => setDeleteFaq(null)}
          title="Delete this FAQ?"
          subtitle={deleteFaq.q}
        >
          <p className="text-sm leading-relaxed text-neutral-600">
            This FAQ will be removed from the public Help Centre immediately.
            This action cannot be undone.
          </p>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setDeleteFaq(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDeleteFaq}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700"
            >
              <FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" />
              Delete FAQ
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ============================================
   MODAL SHELL
   ============================================ */

function Modal({
  onClose,
  title,
  subtitle,
  children,
}: {
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-lg max-h-[92dvh] overflow-y-auto overscroll-contain rounded-t-2xl bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl sm:max-h-[90dvh] sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-neutral-100 px-6 py-4">
          <div className="min-w-0">
            <h3 className="text-lg font-black tracking-tight text-ink">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-1 line-clamp-1 text-xs font-medium text-neutral-500">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-100"
          >
            <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}