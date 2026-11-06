"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, faEllipsisVertical, faPhone, 
  faPaperPlane, faClock, faLocationDot, 
  faUserTie, faFilter, faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

const AGENCY_LEADS = [
  {
    id: "AL-101",
    clientName: "Ahmed Raza",
    phone: "+92 300 1234567",
    property: "Modern 1 Kanal House in DHA",
    location: "Lahore",
    image: "/images/house-1.jpg",
    date: "10 mins ago",
    status: "New",
    assignedTo: "Ali Khan", // Agency ka agent
    message: "I'm interested. Is the price negotiable?",
  },
  {
    id: "AL-102",
    clientName: "Sara Malik",
    phone: "+92 321 9876543",
    property: "Luxury Sea View Apartment",
    location: "Karachi",
    image: "/images/flat-3.jpg",
    date: "1 hour ago",
    status: "Contacted",
    assignedTo: "Maryam Siddiqui",
    message: "Please share the floor plan.",
  },
  {
    id: "AL-103",
    clientName: "Bilal Khan",
    phone: "+92 333 5555555",
    property: "Commercial Shop in Gulberg",
    location: "Lahore",
    image: "/images/shop-1.jpg",
    date: "5 hours ago",
    status: "Visit Scheduled",
    assignedTo: "Ali Khan",
    message: "Confirmed for tomorrow at 3 PM.",
  },
];

const AGENTS = ["Ali Khan", "Maryam Siddiqui", "Hamza Butt"];

export default function AgencyLeadsPage() {
  const [selectedLead, setSelectedLead] = useState(AGENCY_LEADS[0]);
  const [replyText, setReplyText] = useState("");
  const [filterAgent, setFilterAgent] = useState("All");

  const filteredLeads = AGENCY_LEADS.filter(lead => 
    filterAgent === "All" || lead.assignedTo === filterAgent
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-neutral-50 lg:flex-row">
      
      {/* LEFT: Leads Inbox */}
      <div className="flex w-full flex-col border-r border-neutral-200 bg-white lg:w-[400px]">
        <div className="border-b border-neutral-100 p-5">
          <Link href="/dashboard/agent" className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-ink">
            <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" /> Back to Dashboard
          </Link>
          <h1 className="text-xl font-extrabold text-ink">Agency Leads</h1>
          <p className="mt-1 text-xs text-neutral-500">All enquiries across your agency.</p>
        </div>

        {/* Filter by Agent */}
        <div className="border-b border-neutral-100 p-3">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFilter} className="h-3.5 w-3.5 text-neutral-400" />
            <select 
              value={filterAgent} 
              onChange={(e) => setFilterAgent(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-1.5 px-2 text-xs font-semibold outline-none focus:border-brand-500"
            >
              <option value="All">All Agents</option>
              {AGENTS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className={`cursor-pointer border-b border-neutral-100 p-4 transition hover:bg-neutral-50 ${
                selectedLead.id === lead.id ? "bg-brand-50/50 border-l-4 border-l-brand-500" : ""
              }`}
            >
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">
                  {lead.clientName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-ink">{lead.clientName}</h3>
                    <span className="text-[10px] text-neutral-400">{lead.date}</span>
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs font-medium text-neutral-600">Re: {lead.property}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      lead.status === "New" ? "bg-blue-50 text-blue-700" :
                      lead.status === "Contacted" ? "bg-amber-50 text-amber-700" :
                      "bg-green-50 text-green-700"
                    }`}>
                      {lead.status}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-neutral-500">
                      <FontAwesomeIcon icon={faUserTie} className="h-2.5 w-2.5" />
                      {lead.assignedTo}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Conversation View */}
      <div className="flex flex-1 flex-col bg-neutral-50">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">
              {selectedLead.clientName.charAt(0)}
            </div>
            <div>
              <h2 className="text-sm font-bold text-ink">{selectedLead.clientName}</h2>
              <p className="text-xs text-neutral-500">{selectedLead.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-1.5 text-xs font-semibold text-neutral-600 sm:flex">
              Assigned to: <span className="font-bold text-ink">{selectedLead.assignedTo}</span>
            </div>
            <a href={`tel:${selectedLead.phone}`} className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600 transition hover:bg-green-100" title="Call">
              <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
            </a>
            <button className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-ink">
              <FontAwesomeIcon icon={faEllipsisVertical} className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Property Card */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <img src={selectedLead.image} alt={selectedLead.property} className="h-16 w-20 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-ink">{selectedLead.property}</h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                  <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3" /> {selectedLead.location}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-start">
              <div className="max-w-[70%] rounded-2xl rounded-tl-sm border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm">
                <p>{selectedLead.message}</p>
                <span className="mt-1 block text-[10px] text-neutral-400">{selectedLead.clientName} • {selectedLead.date}</span>
              </div>
            </div>
            
            {selectedLead.status !== "New" && (
              <div className="flex justify-end">
                <div className="max-w-[70%] rounded-2xl rounded-tr-sm bg-ink px-4 py-3 text-sm text-white shadow-sm">
                  Hi {selectedLead.clientName}, {selectedLead.assignedTo} here from our agency. Let me assist you with this property.
                  <span className="mt-1 block text-[10px] text-neutral-400">{selectedLead.assignedTo} • Just now</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Reply Input */}
        <div className="border-t border-neutral-200 bg-white p-4">
          <form 
            onSubmit={(e) => { e.preventDefault(); setReplyText(""); }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Reply as agency admin..."
                className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white"
              />
              <button 
                type="submit" 
                disabled={!replyText.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white transition hover:bg-brand-600 disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
              </button>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-neutral-400">
              <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
              You are replying as Agency Admin.
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}