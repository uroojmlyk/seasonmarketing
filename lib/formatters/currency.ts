// Turns 5000000 into "50 Lakh" so people can read big numbers easily.

function trim(n: number) {
  // Agar decimal ke baad .00 hai toh usko hata dein
  return Number(n.toFixed(2)).toString();
}

export function formatPkr(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "";
  
  if (value >= 10000000) return `${trim(value / 10000000)} Crore`;
  if (value >= 100000) return `${trim(value / 100000)} Lakh`;
  if (value >= 1000) return `${trim(value / 1000)} Thousand`;
  
  return String(value);
}

// Ek extra helper jo "PKR" prefix ke sath return karega (agar zaroorat ho)
export function formatPkrWithPrefix(value: number): string {
  const formatted = formatPkr(value);
  return formatted ? `PKR ${formatted}` : "";
}