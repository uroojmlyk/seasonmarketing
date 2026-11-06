import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink">
      
      {/* Background Image - Higher Opacity */}
      <Image
        src="/images/house-1.jpg" // Aap yahan apni clean modern exterior image dalein
        alt="Premium Real Estate"
        fill
        priority
        quality={100}
        className="object-cover object-center opacity-60"
      />
      
      {/* Lighter Overlay - So Image Shows Through */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-br from-ink/80 via-transparent to-ink/80" />

      {/* Back to Home Button - Top Left */}
      <div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-md transition-all duration-200 hover:bg-black/50 hover:text-white"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </div>

      {/* Content Wrapper - Centered & Responsive */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center px-4 py-16 sm:px-6">
        {children}
      </div>
    </div>
  );
}