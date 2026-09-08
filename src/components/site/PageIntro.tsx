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
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
        <p className="text-[11px] tracking-[0.25em] text-white/55 uppercase">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2rem,5vw,3.4rem)] leading-[1.08]">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/75">{lede}</p>
        {children}
        <Link
          to="/contact"
          hash="enquire"
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.03]"
        >
          Book a campus visit
        </Link>
      </div>
    </section>
  );
}
