import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative bg-[#111625] pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/CISG.webp"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329]/90 via-[#0b1329]/75 to-[#0b1329]/40" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-12">
        <p className="text-[13px] tracking-[0.2em] text-white/70 font-bold uppercase mb-4">{eyebrow}</p>
        <h1 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] text-white font-bold leading-[1.15] max-w-4xl tracking-tight mb-4">
          {title}
        </h1>
        <p className="font-sans text-[clamp(1.05rem,1.8vw,1.25rem)] text-gray-300 font-normal max-w-3xl leading-relaxed">{lede}</p>
        {children}
        <div className="mt-8">
          <Link
            to="/admissions"
            hash="enquire"
            className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.03]"
          >
            Book a campus visit
          </Link>
        </div>
      </div>
    </section>
  );
}
