"use client";

import { useMemo, useState } from "react";
import { formatPkr } from "@/lib/formatters/currency";

export default function LoanCalculator({ price }: { price: number }) {
  const [down, setDown] = useState(20); // %
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(15); // % per year (assumed)

  const r = useMemo(() => {
    const loan = price * (1 - down / 100);
    const n = years * 12;
    const i = rate / 100 / 12;
    const monthly = i === 0 ? loan / n : (loan * i) / (1 - Math.pow(1 + i, -n));
    const total = monthly * n;
    return { loan, monthly, total, interest: total - loan, downAmt: price - loan };
  }, [price, down, years, rate]);

  const interestPct = Math.min(100, Math.max(0, (r.interest / r.total) * 100));
  const range = "h-2 w-full cursor-pointer appearance-none rounded-full bg-neutral-200 accent-brand-500";

  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
      <div className="space-y-6 lg:col-span-3">
        <label className="block">
          <span className="flex items-baseline justify-between text-sm font-bold text-ink">
            Down payment
            <span className="font-display text-base text-brand-600">{down}% · PKR {formatPkr(r.downAmt)}</span>
          </span>
          <input type="range" min={10} max={70} step={5} value={down} onChange={(e) => setDown(+e.target.value)} className={`${range} mt-3`} />
        </label>
        <label className="block">
          <span className="flex items-baseline justify-between text-sm font-bold text-ink">
            Loan period
            <span className="font-display text-base text-brand-600">{years} years</span>
          </span>
          <input type="range" min={5} max={25} step={1} value={years} onChange={(e) => setYears(+e.target.value)} className={`${range} mt-3`} />
        </label>
        <label className="block">
          <span className="flex items-baseline justify-between text-sm font-bold text-ink">
            Assumed yearly rate
            <span className="font-display text-base text-brand-600">{rate}%</span>
          </span>
          <input type="range" min={5} max={30} step={0.5} value={rate} onChange={(e) => setRate(+e.target.value)} className={`${range} mt-3`} />
        </label>
      </div>

      <div className="rounded-2xl bg-ink p-5 text-white sm:p-6 lg:col-span-2">
        <p className="text-xs font-bold uppercase tracking-wider text-white/60">Estimated monthly payment</p>
        <p className="mt-1 font-display text-3xl font-extrabold text-brand-400 sm:text-4xl">PKR {formatPkr(Math.round(r.monthly))}</p>

        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/15" role="img" aria-label={`Interest is ${Math.round(interestPct)} percent of total payable`}>
          <div className="h-full rounded-full bg-brand-500" style={{ width: `${interestPct}%` }} />
        </div>
        <dl className="mt-4 space-y-2.5 text-sm">
          <div className="flex justify-between"><dt className="text-white/60">Loan amount</dt><dd className="font-bold">PKR {formatPkr(r.loan)}</dd></div>
          <div className="flex justify-between"><dt className="text-white/60">Total interest</dt><dd className="font-bold">PKR {formatPkr(r.interest)}</dd></div>
          <div className="flex justify-between border-t border-white/15 pt-2.5"><dt className="text-white/60">Total payable</dt><dd className="font-bold">PKR {formatPkr(r.total)}</dd></div>
        </dl>
      </div>

      <p className="text-xs leading-relaxed text-neutral-500 lg:col-span-5">
        This is an estimate only. The rate is an assumption, not an offer. Actual rates, fees and eligibility depend on the bank.
      </p>
    </div>
  );
}