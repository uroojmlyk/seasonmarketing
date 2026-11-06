import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/ui/Chatbot";
import LogoMark from "@/components/ui/LogoMark";

// Navbar usePathname() use karta hai. Next 16 mein dynamic routes (jaise /properties/[slug])
// par ye hook Suspense ke andar hona zaroori hai, warna "Blocking Route" error aata hai.
// Fallback navbar jaisa hi dikhta hai, is liye page load par layout nahi uchhalta.
function NavbarFallback() {
  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-7xl items-center rounded-2xl border border-white/10 bg-black px-3 py-2 shadow-xl shadow-black/30 sm:px-6 sm:py-2.5 lg:py-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <LogoMark className="h-11 w-11 shrink-0 text-brand-500 min-[400px]:h-12 min-[400px]:w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
          <span className="whitespace-nowrap font-display text-[17px] font-extrabold tracking-tight min-[400px]:text-xl sm:text-2xl lg:text-3xl lg:leading-none">
            <span className="text-white">Season</span>
            <span className="text-brand-500">Marketing</span>
          </span>
        </div>
      </div>
    </header>
  );
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<NavbarFallback />}>
        <Navbar />
      </Suspense>

      <main>{children}</main>

      <Footer />
      <Chatbot />
    </>
  );
}