import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", to: "/" },
  { 
    label: "About Us", 
    to: "#", 
    items: [
      { label: "About School", to: "/about" },
      { label: "Why ISG", to: "/pathway" },
      { label: "Mission and Vision", to: "/mission-vision" },
      { label: "Faculty", to: "/faculty" }
    ]
  },
  { label: "Academics", to: "/academics" },
  { label: "Admission", to: "/admissions" },
  { 
    label: "School Life", 
    to: "#", 
    items: [
      { label: "Gallery", to: "/gallery" },
      { label: "Overview", to: "/school-life" }
    ] 
  },
  { label: "Career", to: "/career" },
  { label: "Blogs", to: "/news" },
];

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
        "sticky top-0 z-50 border-b transition-all duration-300 bg-[#FFFFFF]",
        scrolled
          ? "border-border/70 shadow-[0_1px_20px_-12px_rgba(0,0,0,0.4)]"
          : "border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-2 lg:py-3 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img 
            src="/images/ISG LOGO.jpg" 
            alt="ISG Logo" 
            className="h-[44px] lg:h-[60px] w-auto shrink-0 object-contain"
          />
        </Link>

        <div className="flex items-center gap-3 lg:gap-5">
          <nav className="hidden items-center gap-5 xl:flex">
            {NAV.map((item) => {
              if (item.items) {
                return (
                  <div key={item.label} className="relative group py-2">
                    <button
                      type="button"
                      className="flex items-center gap-1 text-[14.5px] font-semibold text-foreground/80 transition-colors group-hover:text-maroon focus:outline-none cursor-pointer"
                    >
                      {item.label}
                      <ChevronDown size={14} className="opacity-70 transition-transform duration-200 group-hover:rotate-180" />
                    </button>

                    {/* CSS Hover Dropdown Menu - Works 100% in static HTML */}
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-200 z-50">
                      <div className="w-64 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] py-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.to}
                            to={subItem.to}
                            onClick={(e) => {
                              // Remove focus after clicking so the dropdown closes
                              const target = e.currentTarget;
                              if (target && target.blur) target.blur();
                            }}
                            className="block w-full px-6 py-3 text-[15px] font-medium text-[#111827] hover:bg-sand/60 hover:text-maroon transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-1 text-[14.5px] font-semibold text-foreground/80 transition-colors hover:text-maroon"
                  activeProps={{ className: "text-maroon" }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* School Tour Request CTA Button */}
          <Link
            to="/admissions"
            hash="enquire"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-maroon px-5 py-2.5 font-sans text-[13.5px] font-bold text-white shadow-sm transition-all duration-200 hover:bg-maroon/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            Book a Campus Tour
          </Link>

          <img 
            src="/images/NEW CAMBRIDGE LOGO.png" 
            alt="Cambridge Logo" 
            className="hidden lg:block h-[55px] w-auto shrink-0 object-contain ml-2"
          />

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

      {/* Mobile Drawer */}
      <nav
        id="mobile-nav"
        className={cn(
          "border-t border-border bg-background px-5 pb-5 xl:hidden",
          !open && "hidden"
        )}
      >
        <ul className="flex flex-col">
          {NAV.map((item) => (
            <li key={item.label} className="flex flex-col border-b border-border/60">
              {item.items ? (
                <>
                  <div className="flex items-center justify-between py-3 font-sans font-semibold text-lg text-primary">
                    {item.label}
                  </div>
                  <ul className="flex flex-col pb-2 pl-4">
                    {item.items.map((sub) => (
                      <li key={sub.to}>
                        <Link
                          to={sub.to}
                          onClick={() => setOpen(false)}
                          className="block py-2 text-[15px] font-medium text-foreground/80 hover:text-maroon"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3 font-sans font-semibold text-lg text-primary"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <Link
            to="/admissions"
            hash="enquire"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center rounded-full bg-maroon px-6 py-3 font-sans font-bold text-white shadow-md transition-all active:scale-[0.98]"
          >
            Book a Campus Tour
          </Link>
        </div>
      </nav>
    </header>
  );
}
