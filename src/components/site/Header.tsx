import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "About", to: "/about" },
  { label: "The Cambridge Pathway", to: "/pathway" },
  { label: "School Life", to: "/school-life" },
  { label: "Admissions", to: "/admissions" },
  { label: "News & Events", to: "/news" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent transition-all duration-300",
        scrolled
          ? "border-border/70 bg-background/95 shadow-[0_1px_20px_-12px_rgba(0,0,0,0.4)] backdrop-blur"
          : "bg-background/80 backdrop-blur",
      )}
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-serif text-sm text-primary-foreground">
            ISG
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-[17px] leading-tight text-primary">
              International School Guwahati
            </span>
            <span className="hidden text-[11px] tracking-[0.18em] text-muted-foreground uppercase sm:block">
              Cambridge · Est. 2010
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-6 xl:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-[13.5px] text-foreground/80 transition-colors hover:text-accent"
                activeProps={{ className: "text-accent" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/contact"
            hash="enquire"
            className="hidden shrink-0 rounded-full bg-accent px-5 py-2.5 text-[13.5px] font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.03] sm:inline-block"
          >
            Book a Visit
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-primary xl:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-5 pb-5 xl:hidden">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-3 font-serif text-lg text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            hash="enquire"
            onClick={() => setOpen(false)}
            className="mt-4 inline-block rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground"
          >
            Book a Visit
          </Link>
        </nav>
      )}
    </header>
  );
}
