import { useState, useEffect, type FormEvent } from "react";
import { X, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import campusHero from "@/assets/hero-bg-new.png";

const schema = z.object({
  studentName: z.string().trim().min(2, "Please enter student's name").max(80),
  parentName: z.string().trim().min(2, "Please enter parent's name").max(80),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(15),
  email: z.string().trim().email("Please enter a valid email address").max(120),
  grade: z.string().trim().min(1, "Please select entering stage"),
  city: z.string().trim().min(2, "Please enter your city").max(60),
  consent: z.boolean().refine((val) => val === true, "Please check consent box to proceed"),
});

const GRADES = [
  "Playgroup / Nursery (Age 3–4)",
  "LKG / UKG (Age 4–6)",
  "Primary School (Class 1–5)",
  "Middle School (Class 6–8)",
  "IGCSE / Class 9–10 (Age 14–16)",
  "A Level / Class 11–12 (Age 16–18)",
];

export function AdmissionPopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check if user already dismissed modal during this browser session
    const dismissed = sessionStorage.getItem("isg_admission_popup_dismissed");
    if (dismissed) return;

    // Show popup after 2 seconds on site entry
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("isg_admission_popup_dismissed", "true");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      studentName: formData.get("studentName") as string,
      parentName: formData.get("parentName") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      grade: formData.get("grade") as string,
      city: formData.get("city") as string,
      consent: formData.get("consent") === "on",
    };

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        nextErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    if (!captchaVerified) {
      setErrors({ captcha: "Please check 'I'm not a robot' to verify security" });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Application Submitted! The ISG Admissions Team will call you shortly.");
      sessionStorage.setItem("isg_admission_popup_dismissed", "true");
    }, 800);
  };

  return (
    <div
      id="admission-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      className={isOpen ? "block" : "hidden"}
      style={{ display: isOpen ? undefined : 'none' }}
    >
      <div
        id="admission-popup-overlay"
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/80 text-white transition-all hover:bg-maroon hover:scale-110 shadow-md cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* LEFT PANEL: Branded Visual Showcase (Desktop/Tablet) */}
        <div className="relative hidden md:flex w-5/12 flex-col justify-between p-8 text-white bg-navy overflow-hidden shrink-0">
          <div className="absolute inset-0 z-0">
            <img
              src={campusHero}
              alt="International School Guwahati Campus"
              className="h-full w-full object-cover opacity-30 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07132B] via-[#07132B]/85 to-[#07132B]/60" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-maroon px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase text-white shadow-xs mb-4">
              <Sparkles className="h-3 w-3 text-amber-300" />
              <span>Admission Open 2026–27</span>
            </div>

            <h2 className="font-serif text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight text-white">
              Admission Open for 2026–27
            </h2>
            <p className="mt-1 font-serif text-sm italic text-amber-300 font-medium">
              (Nursery to A levels / Class 11–12)
            </p>

            <p className="mt-4 font-sans text-[13px] leading-relaxed text-slate-200">
              Get quality Cambridge international education for your child starting from Playgroup to A Levels.
            </p>
          </div>

          <div className="relative z-10 mt-6 space-y-3 pt-6 border-t border-white/15">
            <div className="flex items-center gap-2.5 text-[12px] font-medium text-slate-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
              <span>Max 20 students per section</span>
            </div>
            <div className="flex items-center gap-2.5 text-[12px] font-medium text-slate-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
              <span>1st Cambridge School in North East</span>
            </div>
            <div className="flex items-center gap-2.5 text-[12px] font-medium text-slate-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
              <span>90% graduates at universities abroad</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Form */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 bg-white overflow-y-auto max-h-[85vh] md:max-h-none">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 shadow-xs">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-navy">Application Submitted!</h3>
              <p className="mt-3 max-w-sm font-sans text-[14px] leading-relaxed text-slate-600">
                Thank you for your interest in International School Guwahati. Our admissions team will call you shortly.
              </p>
              <button
                onClick={handleClose}
                type="button"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-maroon px-7 py-3 font-sans text-sm font-bold text-white shadow-md hover:bg-maroon/90 transition-all cursor-pointer"
              >
                <span>Close Window</span>
              </button>
            </div>
          ) : (
            <div>
              {/* Mobile Header Banner */}
              <div className="md:hidden mb-5 pr-8">
                <span className="inline-block rounded-full bg-maroon/10 px-3 py-0.5 text-[11px] font-bold tracking-wide uppercase text-maroon mb-1">
                  Admission Open 2026–27
                </span>
                <h2 className="font-serif text-xl font-bold text-slate-900 leading-tight">
                  Inquire for Admission (Nursery to A Level)
                </h2>
                <p className="text-[12px] text-slate-600 mt-1">
                  Give your child North East's premier Cambridge education.
                </p>
              </div>

              <div className="hidden md:block mb-5 pr-8">
                <h3 className="font-serif text-xl font-bold text-navy">Inquire for Admission</h3>
                <p className="font-sans text-[13px] text-slate-500 mt-0.5">
                  Fill in the details below and the ISG Admissions team will contact you.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                {/* Student Name */}
                <div>
                  <input
                    type="text"
                    name="studentName"
                    placeholder="Student Name *"
                    className={`w-full rounded-lg border bg-slate-50 px-3.5 py-2.5 text-[14px] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-maroon focus:outline-none transition-all ${
                      errors.studentName ? "border-red-500 bg-red-50/30" : "border-slate-200"
                    }`}
                  />
                  {errors.studentName && <p className="mt-1 text-[11px] font-medium text-red-600">{errors.studentName}</p>}
                </div>

                {/* Parent Name & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <input
                      type="text"
                      name="parentName"
                      placeholder="Parent Name *"
                      className={`w-full rounded-lg border bg-slate-50 px-3.5 py-2.5 text-[14px] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-maroon focus:outline-none transition-all ${
                        errors.parentName ? "border-red-500 bg-red-50/30" : "border-slate-200"
                      }`}
                    />
                    {errors.parentName && <p className="mt-1 text-[11px] font-medium text-red-600">{errors.parentName}</p>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      className={`w-full rounded-lg border bg-slate-50 px-3.5 py-2.5 text-[14px] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-maroon focus:outline-none transition-all ${
                        errors.phone ? "border-red-500 bg-red-50/30" : "border-slate-200"
                      }`}
                    />
                    {errors.phone && <p className="mt-1 text-[11px] font-medium text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email & City Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      className={`w-full rounded-lg border bg-slate-50 px-3.5 py-2.5 text-[14px] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-maroon focus:outline-none transition-all ${
                        errors.email ? "border-red-500 bg-red-50/30" : "border-slate-200"
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-[11px] font-medium text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="city"
                      placeholder="City *"
                      className={`w-full rounded-lg border bg-slate-50 px-3.5 py-2.5 text-[14px] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-maroon focus:outline-none transition-all ${
                        errors.city ? "border-red-500 bg-red-50/30" : "border-slate-200"
                      }`}
                    />
                    {errors.city && <p className="mt-1 text-[11px] font-medium text-red-600">{errors.city}</p>}
                  </div>
                </div>

                {/* Applying For Dropdown */}
                <div>
                  <select
                    name="grade"
                    defaultValue=""
                    className={`w-full rounded-lg border bg-slate-50 px-3.5 py-2.5 text-[14px] text-slate-800 focus:bg-white focus:border-maroon focus:outline-none transition-all ${
                      errors.grade ? "border-red-500 bg-red-50/30" : "border-slate-200"
                    }`}
                  >
                    <option value="" disabled>
                      Applying For (Select Stage/Grade) *
                    </option>
                    {GRADES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  {errors.grade && <p className="mt-1 text-[11px] font-medium text-red-600">{errors.grade}</p>}
                </div>

                {/* Consent Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="consent"
                      defaultChecked
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-maroon focus:ring-maroon cursor-pointer"
                    />
                    <span className="text-[12px] leading-snug text-slate-600">
                      By continuing, you access to receive call for admission purpose by ISG Team
                    </span>
                  </label>
                  {errors.consent && <p className="mt-1 text-[11px] font-medium text-red-600">{errors.consent}</p>}
                </div>

                {/* Security Verification Box (reCAPTCHA style verification) */}
                <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 flex items-center justify-between shadow-xs">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={captchaVerified}
                      onChange={(e) => setCaptchaVerified(e.target.checked)}
                      className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="text-[13px] font-medium text-slate-700">I'm not a robot</span>
                  </label>
                  <div className="flex flex-col items-end text-[10px] text-slate-400">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <span>reCAPTCHA</span>
                  </div>
                </div>
                {errors.captcha && <p className="text-[11px] font-medium text-red-600">{errors.captcha}</p>}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-maroon py-3.5 text-center font-sans text-[14px] font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-maroon/90 hover:shadow-lg active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? "Submitting Application..." : "SUBMIT APPLICATION"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
