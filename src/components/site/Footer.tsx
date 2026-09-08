import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

const QUICK = [
  { label: "About", to: "/about" },
  { label: "The Cambridge Pathway", to: "/pathway" },
  { label: "School Life", to: "/school-life" },
  { label: "Admissions", to: "/admissions" },
  { label: "News & Events", to: "/news" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
] as const;

export function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setEmail("");
    toast.success("You're on the list — school news, once a month.");
  };

  return (
    <footer className="bg-navy-deep text-white/85">
      <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.8fr_1fr]">
          <div>
            <p className="font-serif text-2xl text-white">International School Guwahati</p>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/70">
              Education with pleasure, not pressure. The North East's first Cambridge school, since
              2010.
            </p>
            <address className="mt-6 space-y-1 text-[14.5px] not-italic text-white/75">
              <p>Nalapara, Kalimandir Path, Sarusajai</p>
              <p>P.O Saukuchi, Guwahati-781040, Assam</p>
              <p className="pt-3">
                <a className="hover:text-white" href="tel:+919435049200">
                  +91 94350 49200
                </a>
              </p>
              <p>
                <a className="hover:text-white" href="mailto:admissions@isguwahati.edu.in">
                  admissions@isguwahati.edu.in
                </a>
              </p>
              <p className="pt-3 text-white/55">Office hours: Monday–Saturday, 8:30am – 4:00pm</p>
            </address>
            {/* Space reserved for social icons */}
            <div className="mt-6 h-10" aria-hidden="true" />
          </div>

          <nav aria-label="Footer">
            <p className="text-[11px] tracking-[0.2em] text-white/45 uppercase">Quick links</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {QUICK.map((q) => (
                <li key={q.to}>
                  <Link to={q.to} className="text-white/75 transition-colors hover:text-white">
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[11px] tracking-[0.2em] text-white/45 uppercase">Find us</p>
            <div className="mt-4 overflow-hidden rounded-lg border border-white/15">
              <iframe
                title="Map showing International School Guwahati, Sarusajai, Guwahati"
                src="https://www.google.com/maps?q=Sarusajai%2C%20Saukuchi%2C%20Guwahati%20781040%2C%20Assam&output=embed"
                width="100%"
                height="200"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
            <form onSubmit={subscribe} className="mt-6">
              <label htmlFor="newsletter" className="block text-[14.5px] text-white/75">
                School news, once a month.
              </label>
              <div className="mt-3 flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/12 pt-6 text-[13px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} International School Guwahati · NR Education Foundation</p>
          <p>Cambridge International Education accredited</p>
        </div>
      </div>
    </footer>
  );
}
