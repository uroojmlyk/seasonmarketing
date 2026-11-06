"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPaperPlane,
  faClock,
  faEllipsisVertical,
  faCircleCheck,
  faCheck,
  faXmark,
  faMagnifyingGlass,
  faEnvelope,
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type Priority = "High" | "Medium";
type Status = "Open" | "Resolved";

interface Message {
  id: string;
  from: "user" | "admin";
  text: string;
  time: string;
}

interface Ticket {
  id: string;
  user: string;
  email: string;
  subject: string;
  category: string;
  priority: Priority;
  date: string;
  status: Status;
  messages: Message[];
}

/* ============================================
   DATA
   ============================================ */

const INITIAL_TICKETS: Ticket[] = [
  {
    id: "TCK-501",
    user: "Ahmed Raza",
    email: "ahmed@example.com",
    subject: "Agent not responding to my enquiry",
    category: "Enquiry Issue",
    priority: "High",
    date: "10 mins ago",
    status: "Open",
    messages: [
      {
        id: "m1",
        from: "user",
        text: "I sent an enquiry to an agent 3 days ago but haven't received any response. Please help.",
        time: "10 mins ago",
      },
    ],
  },
  {
    id: "TCK-502",
    user: "Sara Malik",
    email: "sara@example.com",
    subject: "Duplicate listing reported",
    category: "Listing Issue",
    priority: "Medium",
    date: "1 hour ago",
    status: "Open",
    messages: [
      {
        id: "m1",
        from: "user",
        text: "I reported a duplicate listing yesterday but it's still active. Can you please remove it?",
        time: "1 hour ago",
      },
    ],
  },
  {
    id: "TCK-503",
    user: "Bilal Khan",
    email: "bilal@example.com",
    subject: "Payment not reflecting on my dashboard",
    category: "Billing",
    priority: "High",
    date: "2 hours ago",
    status: "Resolved",
    messages: [
      {
        id: "m1",
        from: "user",
        text: "I paid for the Pro plan but my account still shows Basic.",
        time: "2 hours ago",
      },
      {
        id: "m2",
        from: "admin",
        text: "Hi Bilal, we've checked your payment and upgraded your account. Please refresh your dashboard.",
        time: "1 hour ago",
      },
    ],
  },
];

const TABS: { key: "all" | Status; label: string }[] = [
  { key: "all", label: "All" },
  { key: "Open", label: "Open" },
  { key: "Resolved", label: "Resolved" },
];

/* ============================================
   PAGE
   ============================================ */

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_TICKETS[0].id);
  const [replyText, setReplyText] = useState("");
  const [tab, setTab] = useState<"all" | Status>("all");
  const [search, setSearch] = useState("");
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedTicket = useMemo(
    () => tickets.find((t) => t.id === selectedId) ?? tickets[0],
    [tickets, selectedId]
  );

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      if (tab !== "all" && t.status !== tab) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !t.subject.toLowerCase().includes(q) &&
          !t.user.toLowerCase().includes(q) &&
          !t.id.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [tickets, tab, search]);

  const counts = useMemo(
    () => ({
      all: tickets.length,
      Open: tickets.filter((t) => t.status === "Open").length,
      Resolved: tickets.filter((t) => t.status === "Resolved").length,
    }),
    [tickets]
  );

  // Auto-scroll chat to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedId, selectedTicket.messages.length]);

  const sendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? {
              ...t,
              messages: [
                ...t.messages,
                {
                  id: `m${Date.now()}`,
                  from: "admin",
                  text: replyText.trim(),
                  time: "Just now",
                },
              ],
            }
          : t
      )
    );
    setReplyText("");
  };

  const markResolved = () => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? { ...t, status: "Resolved" as Status }
          : t
      )
    );
  };

  const reopenTicket = () => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id ? { ...t, status: "Open" as Status } : t
      )
    );
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-neutral-50 lg:flex-row">
      {/* =========================================
          LEFT — TICKET LIST
          ========================================= */}
      <div
        className={`flex w-full flex-col border-neutral-200 bg-white lg:w-[420px] lg:shrink-0 lg:border-r ${
          mobileChatOpen ? "hidden lg:flex" : "flex"
        }`}
      >
        {/* Header */}
        <div className="border-b border-neutral-100 px-5 py-5">
          <Link
            href="/dashboard/admin"
            className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-bold text-neutral-600 transition hover:bg-neutral-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-2.5 w-2.5" />
            Back to Dashboard
          </Link>
          <h1 className="mt-3 text-2xl font-black tracking-tight text-ink">
            Support Desk
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Manage customer tickets and conversations.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-neutral-100 border-b border-neutral-100">
          {[
            { label: "Open", value: counts.Open, tone: "brand" as const },
            {
              label: "Resolved",
              value: counts.Resolved,
              tone: "emerald" as const,
            },
            { label: "Total", value: counts.all, tone: "neutral" as const },
          ].map((s) => (
            <div key={s.label} className="px-3 py-3 text-center">
              <p className="text-xl font-black text-ink">{s.value}</p>
              <p className="mt-0.5 text-[10px] font-black uppercase tracking-wider text-neutral-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="border-b border-neutral-100 px-4 py-3">
          <div className="flex flex-col gap-2">
            <div
              className="flex gap-1"
              role="tablist"
              aria-label="Filter tickets"
            >
              {TABS.map((t) => {
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.key)}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-bold transition ${
                      active
                        ? "bg-ink text-white"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {t.label}
                    <span
                      className={`rounded-sm px-1 py-0.5 text-[9px] font-black ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {counts[t.key]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tickets..."
                className="w-full rounded-md border border-neutral-200 bg-white py-2 pl-8 pr-3 text-xs text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
          </div>
        </div>

        {/* Ticket list */}
        <div className="flex-1 overflow-y-auto">
          {filteredTickets.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-12 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-bold text-ink">
                No tickets found
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Try changing filters or search keyword.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {filteredTickets.map((ticket) => {
                const isSelected = ticket.id === selectedTicket.id;
                const isHigh = ticket.priority === "High";
                const isOpen = ticket.status === "Open";
                return (
                  <li key={ticket.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(ticket.id);
                        setMobileChatOpen(true);
                      }}
                      aria-current={isSelected ? "true" : undefined}
                      className={`block w-full border-l-4 px-4 py-3.5 text-left transition ${
                        isSelected
                          ? "border-brand-500 bg-brand-50/60"
                          : "border-transparent hover:bg-neutral-50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] font-black text-neutral-400">
                          {ticket.id}
                        </span>
                        <span
                          className={`rounded-sm px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${
                            isHigh
                              ? "bg-red-50 text-red-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {ticket.priority}
                        </span>
                      </div>
                      <h3 className="mt-1 line-clamp-1 text-sm font-bold text-ink">
                        {ticket.subject}
                      </h3>
                      <p className="mt-0.5 truncate text-xs font-medium text-neutral-500">
                        {ticket.user} · {ticket.date}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${
                            isOpen
                              ? "bg-brand-50 text-brand-700 ring-1 ring-brand-200"
                              : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          }`}
                        >
                          <span
                            className={`h-1 w-1 rounded-full ${
                              isOpen ? "bg-brand-500" : "bg-emerald-500"
                            }`}
                          />
                          {ticket.status}
                        </span>
                        <span className="truncate text-[10px] font-semibold text-neutral-400">
                          {ticket.category}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* =========================================
          RIGHT — CONVERSATION
          ========================================= */}
      <div
        className={`flex min-w-0 flex-1 flex-col bg-neutral-50 ${
          mobileChatOpen ? "flex" : "hidden lg:flex"
        }`}
      >
        {/* Chat header */}
        <div className="border-b border-neutral-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              {/* Mobile back */}
              <button
                type="button"
                onClick={() => setMobileChatOpen(false)}
                aria-label="Back to ticket list"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-600 transition hover:bg-neutral-100 lg:hidden"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
              </button>
              <div className="min-w-0">
                <h2 className="truncate text-base font-black tracking-tight text-ink sm:text-lg">
                  {selectedTicket.subject}
                </h2>
                <p className="mt-0.5 truncate text-xs font-medium text-neutral-600">
                  {selectedTicket.user} ({selectedTicket.email})
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className="rounded-sm bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] font-black text-neutral-600">
                    {selectedTicket.id}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">
                    {selectedTicket.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              {selectedTicket.status === "Open" ? (
                <button
                  type="button"
                  onClick={markResolved}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-brand-500 px-3 text-xs font-bold text-white transition hover:bg-brand-600"
                >
                  <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />
                  <span className="hidden sm:inline">Mark Resolved</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={reopenTicket}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 text-xs font-bold text-ink transition hover:bg-neutral-50"
                >
                  <FontAwesomeIcon icon={faCircleCheck} className="h-3 w-3 text-emerald-500" />
                  <span className="hidden sm:inline">Reopen</span>
                </button>
              )}
              <button
                type="button"
                aria-label="More actions"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100"
              >
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="h-4 w-4"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <ul className="mx-auto max-w-3xl space-y-4">
            {selectedTicket.messages.map((msg) => {
              const isAdmin = msg.from === "admin";
              return (
                <li
                  key={msg.id}
                  className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 sm:max-w-[70%] ${
                      isAdmin
                        ? "rounded-tr-sm bg-ink text-white"
                        : "rounded-tl-sm border border-neutral-200 bg-white text-ink"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p
                      className={`mt-1.5 flex items-center gap-1 text-[10px] font-medium ${
                        isAdmin ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faClock}
                        className="h-2 w-2"
                      />
                      {isAdmin ? "You (Support)" : selectedTicket.user} ·{" "}
                      {msg.time}
                    </p>
                  </div>
                </li>
              );
            })}
            <div ref={messagesEndRef} />
          </ul>
        </div>

        {/* Reply */}
        <div className="border-t border-neutral-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
          {selectedTicket.status === "Resolved" && (
            <div className="mx-auto mb-2 flex max-w-3xl items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="h-3 w-3 shrink-0 text-emerald-600"
              />
              This ticket is resolved. Reopen to continue the conversation.
            </div>
          )}
          <form
            onSubmit={sendReply}
            className="mx-auto flex max-w-3xl items-center gap-2"
          >
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={
                selectedTicket.status === "Resolved"
                  ? "Reopen the ticket to reply..."
                  : "Type your reply to the user..."
              }
              disabled={selectedTicket.status === "Resolved"}
              className="flex-1 rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500"
            />
            <button
              type="submit"
              disabled={
                !replyText.trim() || selectedTicket.status === "Resolved"
              }
              aria-label="Send reply"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}