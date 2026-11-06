// Season Marketing logo mark: ek solid orange ghar.
// Bewajah FontAwesome use nahi kiya, kyunke uska CSS (height/width 1em) size ko dabata hai.
// Yeh plain SVG hai: jitni class se size do, utna hi banega. Koi box ya border nahi.
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M32 5.5 3.5 29.6a3 3 0 0 0 1.9 5.3H11V56a3 3 0 0 0 3 3h12a2 2 0 0 0 2-2V42h8v15a2 2 0 0 0 2 2h12a3 3 0 0 0 3-3V34.9h5.6a3 3 0 0 0 1.9-5.3L32 5.5Z" />
    </svg>
  );
}