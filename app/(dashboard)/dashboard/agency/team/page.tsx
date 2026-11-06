"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlus,
  faMagnifyingGlass,
  faEnvelope,
  faPhone,
  faUserTie,
  faBuilding,
  faChartLine,
  faTrashCan,
  faPen,
  faXmark,
  faCircleCheck,
  faTriangleExclamation,
  faCircleInfo,
  faSave,
  faChevronLeft,
  faChevronRight,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

/* ============================================
   TYPES
   ============================================ */

type MemberStatus = "Active" | "Inactive";

type MemberRole = "Agent" | "Senior Agent" | "Junior Agent";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: MemberRole;
  status: MemberStatus;
  listings: number;
  leads: number;
}

const ROLE_OPTIONS: MemberRole[] = ["Agent", "Senior Agent", "Junior Agent"];

/* ============================================
   DATA
   ============================================ */

const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Ali Khan",
    email: "ali@gulbergrealty.pk",
    phone: "+92 300 1234567",
    role: "Senior Agent",
    status: "Active",
    listings: 18,
    leads: 45,
  },
  {
    id: 2,
    name: "Maryam Siddiqui",
    email: "maryam@gulbergrealty.pk",
    phone: "+92 321 9876543",
    role: "Agent",
    status: "Active",
    listings: 12,
    leads: 28,
  },
  {
    id: 3,
    name: "Hamza Butt",
    email: "hamza@gulbergrealty.pk",
    phone: "+92 333 5555555",
    role: "Junior Agent",
    status: "Inactive",
    listings: 3,
    leads: 5,
  },
];

/* ============================================
   HELPERS
   ============================================ */

const statusTone: Record<MemberStatus, string> = {
  Active: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
  Inactive: "bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200",
};

const statusDot: Record<MemberStatus, string> = {
  Active: "bg-emerald-500",
  Inactive: "bg-neutral-400",
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/* ============================================
   PAGE
   ============================================ */

export default function AgencyTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | MemberStatus>("all");

  // Modals
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TeamMember | null>(null);
  const [removeTarget, setRemoveTarget] = useState<TeamMember | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Agent" as MemberRole,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const stats = useMemo(
    () => ({
      totalAgents: members.length,
      activeListings: members.reduce((acc, m) => acc + m.listings, 0),
      totalLeads: members.reduce((acc, m) => acc + m.leads, 0),
    }),
    [members]
  );

  const counts = useMemo(
    () => ({
      all: members.length,
      Active: members.filter((m) => m.status === "Active").length,
      Inactive: members.filter((m) => m.status === "Inactive").length,
    }),
    [members]
  );

  const filtered = useMemo(() => {
    return members.filter((m) => {
      if (tab !== "all" && m.status !== tab) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !m.name.toLowerCase().includes(q) &&
          !m.email.toLowerCase().includes(q) &&
          !m.phone.includes(q) &&
          !m.role.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [members, tab, search]);

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", role: "Agent" });
    setErrors({});
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.phone.trim()) e.phone = "Phone is required.";
    return e;
  };

  const addMember = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setMembers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role,
        status: "Active",
        listings: 0,
        leads: 0,
      },
    ]);
    setAddOpen(false);
    resetForm();
  };

  const updateMember = () => {
    if (!editTarget) return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setMembers((prev) =>
      prev.map((m) =>
        m.id === editTarget.id
          ? {
              ...m,
              name: form.name.trim(),
              email: form.email.trim(),
              phone: form.phone.trim(),
              role: form.role,
            }
          : m
      )
    );
    setEditTarget(null);
    resetForm();
  };

  const removeMember = () => {
    if (!removeTarget) return;
    setMembers((prev) => prev.filter((m) => m.id !== removeTarget.id));
    setRemoveTarget(null);
  };

  const toggleStatus = (member: TeamMember) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === member.id
          ? {
              ...m,
              status: m.status === "Active" ? "Inactive" : "Active",
            }
          : m
      )
    );
  };

  const openEdit = (member: TeamMember) => {
    setForm({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
    });
    setErrors({});
    setEditTarget(member);
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
                Agency · Team Management
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Team Management
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                Manage your agency staff, assign roles, and monitor their
                performance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/dashboard/agent"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-bold text-ink transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
                Back
              </Link>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setAddOpen(true);
                }}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                Add Team Member
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* =========================================
            STATS
            ========================================= */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              label: "Total Agents",
              value: stats.totalAgents,
              icon: faUsers,
            },
            {
              label: "Active Listings",
              value: stats.activeListings,
              icon: faBuilding,
            },
            {
              label: "Total Leads",
              value: stats.totalLeads,
              icon: faChartLine,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                  <FontAwesomeIcon icon={s.icon} className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-neutral-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* =========================================
            TABLE CARD
            ========================================= */}
        <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
          {/* Filter bar */}
          <div className="flex flex-col gap-3 border-b border-neutral-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div
              className="flex gap-1 overflow-x-auto"
              role="tablist"
              aria-label="Filter team members"
            >
              {(
                [
                  { key: "all" as const, label: "All" },
                  { key: "Active" as const, label: "Active" },
                  { key: "Inactive" as const, label: "Inactive" },
                ]
              ).map((t) => {
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.key)}
                    className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3.5 py-2 text-sm font-bold transition ${
                      active
                        ? "bg-ink text-white"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
                    }`}
                  >
                    {t.label}
                    <span
                      className={`rounded-sm px-1.5 py-0.5 text-[10px] font-black ${
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

            <div className="relative w-full sm:w-72">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or role..."
                className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="border-b border-neutral-200 bg-neutral-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    Member
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-center text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    Listings
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-center text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    Leads
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-right text-xs font-black uppercase tracking-wider text-neutral-500"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((member) => (
                  <tr
                    key={member.id}
                    className="group transition hover:bg-neutral-50/70"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-black text-white">
                          {initials(member.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-base font-bold text-ink group-hover:text-brand-600">
                            {member.name}
                          </p>
                          <p className="truncate text-xs text-neutral-500">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-2 py-1 text-[11px] font-black uppercase tracking-wide text-neutral-700">
                        <FontAwesomeIcon
                          icon={faUserTie}
                          className="h-2.5 w-2.5 text-neutral-400"
                        />
                        {member.role}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <p className="text-sm font-black text-ink">
                        {member.listings}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <p className="text-sm font-black text-ink">
                        {member.leads}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => toggleStatus(member)}
                        aria-label={`Toggle status for ${member.name}`}
                        title="Toggle status"
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide transition ${
                          statusTone[member.status]
                        } hover:opacity-80`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            statusDot[member.status]
                          }`}
                        />
                        {member.status}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`tel:${member.phone}`}
                          aria-label={`Call ${member.name}`}
                          title="Call"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-emerald-600 transition hover:bg-emerald-50"
                        >
                          <FontAwesomeIcon
                            icon={faPhone}
                            className="h-3.5 w-3.5"
                          />
                        </a>
                        <a
                          href={`mailto:${member.email}`}
                          aria-label={`Email ${member.name}`}
                          title="Email"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
                        >
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="h-3.5 w-3.5"
                          />
                        </a>
                        <button
                          type="button"
                          onClick={() => openEdit(member)}
                          aria-label={`Edit ${member.name}`}
                          title="Edit"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink"
                        >
                          <FontAwesomeIcon
                            icon={faPen}
                            className="h-3.5 w-3.5"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => setRemoveTarget(member)}
                          aria-label={`Remove ${member.name}`}
                          title="Remove"
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

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                          <FontAwesomeIcon
                            icon={faUsers}
                            className="h-6 w-6"
                          />
                        </span>
                        <h3 className="mt-4 text-base font-bold text-ink">
                          No team members found
                        </h3>
                        <p className="mt-1 text-sm text-neutral-500">
                          Try adjusting filters or add your first team member.
                        </p>
                        {(tab !== "all" || search) && (
                          <button
                            onClick={() => {
                              setTab("all");
                              setSearch("");
                            }}
                            className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-50"
                          >
                            Clear filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-200 bg-neutral-50/60 px-4 py-3 sm:flex-row sm:px-5">
            <p className="text-xs font-medium text-neutral-600">
              Showing{" "}
              <span className="font-black text-ink">{filtered.length}</span> of{" "}
              <span className="font-black text-ink">{members.length}</span>{" "}
              members
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                aria-label="Previous page"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-400 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
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
                className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50"
              >
                <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Info bar */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-500">
            <FontAwesomeIcon icon={faCircleInfo} className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-sm font-bold text-ink">Team permissions</p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">
              Team members can manage listings within their assigned role.
              Status changes and removals require owner approval and are logged
              per policy.
            </p>
          </div>
        </div>
      </main>

      {/* =========================================
          ADD MEMBER MODAL
          ========================================= */}
      {addOpen && (
        <Modal
          onClose={() => setAddOpen(false)}
          title="Add team member"
          subtitle="Invite a new agent to your agency"
        >
          <MemberForm
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
          />

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setAddOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={addMember}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
              Add member
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          EDIT MEMBER MODAL
          ========================================= */}
      {editTarget && (
        <Modal
          onClose={() => setEditTarget(null)}
          title="Edit team member"
          subtitle={editTarget.name}
        >
          <MemberForm
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
          />

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setEditTarget(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={updateMember}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <FontAwesomeIcon icon={faSave} className="h-3.5 w-3.5" />
              Save changes
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================
          REMOVE MODAL
          ========================================= */}
      {removeTarget && (
        <Modal
          onClose={() => setRemoveTarget(null)}
          title="Remove team member?"
          subtitle={removeTarget.name}
        >
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
            />
            <div>
              <p className="text-sm font-bold text-red-900">
                This action can be undone by re-adding the member
              </p>
              <p className="mt-1 text-xs leading-relaxed text-red-800">
                {removeTarget.name} will lose access to their listings and
                leads. Their {removeTarget.listings} listings and{" "}
                {removeTarget.leads} leads remain in the agency account.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setRemoveTarget(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-bold text-ink transition hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={removeMember}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700"
            >
              <FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" />
              Remove member
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ============================================
   MEMBER FORM (shared between Add & Edit)
   ============================================ */

function MemberForm({
  form,
  setForm,
  errors,
  setErrors,
}: {
  form: { name: string; email: string; phone: string; role: MemberRole };
  setForm: (f: typeof form) => void;
  errors: Record<string, string>;
  setErrors: (e: Record<string, string>) => void;
}) {
  const update = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="member-name"
          className="text-xs font-black uppercase tracking-wider text-neutral-600"
        >
          Full name <span className="text-brand-600">*</span>
        </label>
        <input
          id="member-name"
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="e.g. Ali Khan"
          aria-invalid={!!errors.name}
          className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:ring-2 ${
            errors.name
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/15"
          }`}
        />
        {errors.name && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="member-email"
          className="text-xs font-black uppercase tracking-wider text-neutral-600"
        >
          Email <span className="text-brand-600">*</span>
        </label>
        <input
          id="member-email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="ali@agency.pk"
          aria-invalid={!!errors.email}
          className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:ring-2 ${
            errors.email
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/15"
          }`}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="member-phone"
          className="text-xs font-black uppercase tracking-wider text-neutral-600"
        >
          Phone <span className="text-brand-600">*</span>
        </label>
        <input
          id="member-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="+92 300 1234567"
          aria-invalid={!!errors.phone}
          className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:ring-2 ${
            errors.phone
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/15"
          }`}
        />
        {errors.phone && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="member-role"
          className="text-xs font-black uppercase tracking-wider text-neutral-600"
        >
          Role
        </label>
        <select
          id="member-role"
          value={form.role}
          onChange={(e) => update("role", e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
        >
          {ROLE_OPTIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl"
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